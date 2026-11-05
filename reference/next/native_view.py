"""Project native AST onto a physical file instance without resolving C again.

Semantic types remain graph references in the project document. The small type
placeholder below exists only for the older display planner, which does not read
it. No printed type is parsed and no libclang AST is mixed into this view.
"""
import hashlib
import re
from pathlib import Path

STANDARD_HEADERS = {s + '.h' for s in 'assert complex ctype errno fenv float inttypes iso646 limits locale math setjmp signal stdalign stdarg stdatomic stdbool stddef stdint stdio stdlib stdnoreturn string tgmath threads time uchar wchar wctype'.split()}
KEYWORDS = set('auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while _Alignas _Alignof _Atomic _Bool _Complex _Generic _Imaginary _Noreturn _Static_assert _Thread_local'.split())
KINDS = {'MemberExpr':'MEMBER_REF_EXPR','OffsetOfMember':'MEMBER_REF','OffsetOfExpr':'UNEXPOSED_EXPR','CompoundAssignOperator':'COMPOUND_ASSIGNMENT_OPERATOR','AtomicExpr':'UNEXPOSED_EXPR','Function':'FUNCTION_DECL','Var':'VAR_DECL','ParmVar':'PARM_DECL','Field':'FIELD_DECL','Typedef':'TYPEDEF_DECL','Enum':'ENUM_DECL','EnumConstant':'ENUM_CONSTANT_DECL','StaticAssert':'STATIC_ASSERT','TypeReference':'TYPE_REF','UnaryExprOrTypeTraitExpr':'CXX_UNARY_EXPR','ImplicitCastExpr':'UNEXPOSED_EXPR','PredefinedExpr':'STRING_LITERAL','CStyleCastExpr':'CSTYLE_CAST_EXPR'}


def kind(row):
    name = row['kind']
    if name == 'Record': return 'UNION_DECL' if row.get('union') else 'STRUCT_DECL'
    return KINDS.get(name, re.sub(r'(?<!^)(?=[A-Z])', '_', name).upper())


def token_kind(t):
    k = t['kind']
    if k == 'comment': return 'COMMENT'
    if k in ('identifier', 'raw_identifier'): return 'IDENTIFIER'
    if k in KEYWORDS: return 'KEYWORD'
    if 'literal' in k or k == 'numeric_constant': return 'LITERAL'
    return 'PUNCTUATION'


def physical_view(native, instance_id, source, flags, diagnostics=''):
    instances = {i['id']:i for i in native['fileInstances']}
    instance = instances[instance_id]
    path = instance['file']
    raw = source.encode('utf-8')
    boundaries = {0:0}; byte = unit = 0
    for c in source:
        byte += len(c.encode('utf-8')); unit += len(c.encode('utf-16-le'))//2
        boundaries[byte] = unit
    def pos(byte):
        return boundaries[byte]
    def side(p, s):
        f = p.get(s+'File')
        b = p.get(s+'Byte') if p.get(s+'Instance') == instance_id else None
        offset = boundaries.get(b)
        before = raw[:b].decode('utf-8') if offset is not None else ''
        return {'file':f, 'offset':offset, 'system':bool(p.get(s+'System') or (s=='spelling' and p.get('system'))),
                'line':before.count('\n')+1 if offset is not None else p.get('presumedLine',0),
                'column':len(before.rsplit('\n',1)[-1])+1 if offset is not None else 0}
    def location(p): return {s:side(p,s) for s in ('spelling','expansion')}
    sdk_roots=(Path('/usr/include'),Path(__file__).resolve().parents[1]/'tools/clang18-headers',Path(__file__).resolve().parent/'sdk-compat')
    def trusted_path(path):
        return bool(path) and any(Path(path).resolve().is_relative_to(root) for root in sdk_roots)
    def owners(p):
        origin=p.get('expansionFile') if p.get('system') else p.get('spellingFile')
        if not trusted_path(origin):return []
        headers=set(); seen=set(); at=p.get('expansionInstance') if p.get('system') else p.get('spellingInstance')
        while at and at not in seen:
            seen.add(at); row=instances.get(at)
            if not row: break
            name=Path(row['file']).name
            trusted=trusted_path(row['file'])
            if row.get('systemHeader') and trusted and name in STANDARD_HEADERS: headers.add(name)
            at=row['parent']
        return sorted(headers)
    def reference(r):
        out={'kind':kind(r),'name':r['name'],'usr':r.get('usr',''),'location':location(r['location'])}
        out['sdkOrigin']=bool(r['location'].get('system') and trusted_path(r['location'].get('expansionFile')))
        if 'id' in r:out['symbolId']=r['id']
        headers=owners(r['location'])
        if out['location']['spelling']['system']: out['standardHeaders']=headers
        return out
    physical=[t for t in native['originalTokens'] if t['instance']==instance_id]
    by_start={t['start']:t for t in physical}
    def span(r):
        a,z=r['begin'],r['afterLast']
        if a.get('expansionInstance')!=instance_id: return None
        start=a['expansionByte']; end=z.get('expansionByte') if z.get('expansionInstance')==instance_id else None
        if end is None or end < start:
            last=r['last']; t=by_start.get(last.get('expansionByte')) if last.get('expansionInstance')==instance_id else None
            end=t['end'] if t else None
        if start not in boundaries or end not in boundaries or end<start: return None
        return {'start':pos(start),'end':pos(end)}
    emptytype={'kind':'UNAVAILABLE','spelling':'','const':False,'volatile':False,'restrict':False}
    nodes=[]; scopes=[]; nodeids={}; scopeids={}
    def base(k,name,loc,extent,parent=None,scope=None,role='preprocessing'):
        ns='tag' if k in ('STRUCT_DECL','UNION_DECL','ENUM_DECL') else 'member' if k in ('FIELD_DECL','MEMBER_REF_EXPR','MEMBER_REF') else 'label' if k in ('GOTO_STMT','LABEL_STMT') else 'ordinary'
        return {'id':len(nodes),'parent':parent,'scope':scope,'kind':k,'name':name,**extent,'location':location(loc),'type':dict(emptytype),'namespace':ns,'usr':'','origin':'macro' if loc.get('macro') else 'source','role':role}
    definitions={d['id']:d for d in native['definitions']}
    for m in native['macros']:
        p=m['call']; last=m['end']
        if p.get('expansionInstance')!=instance_id or p.get('macro'): continue
        start=p['expansionByte']; t=by_start.get(last.get('expansionByte'))
        if start not in boundaries or not t: continue
        d=definitions[m['definitionID']]
        n=base('MACRO_INSTANTIATION',m['name'],p,{'start':pos(start),'end':pos(t['end'])})
        n['reference']=reference({'kind':'MACRO_DEFINITION','name':m['name'],'location':d['location']})
        n['reference']['kind']='MACRO_DEFINITION'
        n['builtinMacro']=d['builtin'] or d['location'].get('presumedFile')=='<built-in>' and not instances.get(d['location'].get('spellingInstance'),{}).get('physicalFile',True);  n['origin']='source'
        if m['name']=='assert' and len(d['parameters'])==1:
            n['assertIgnored']=not any(t['text']==d['parameters'][0] for t in d['replacement'])
        nodes.append(n)
    for inc in native['includes']:
        p=inc['location']
        if p.get('expansionInstance')!=instance_id: continue
        a=p['expansionByte']; end=raw.find(b'\n',a)
        if end<0:end=len(raw)
        n=base('INCLUSION_DIRECTIVE',inc['written'],p,{'start':pos(a),'end':pos(end)})
        n['includedFile']=inc['resolved'];n['includedSystem']=any(i['file']==inc['resolved'] and i.get('systemHeader') and trusted_path(i['file']) for i in instances.values())
        nodes.append(n)
    for row in native['astNodes']:
        parent=nodeids.get(row['parent']); scope=scopeids.get(row['parent'])
        extent=span(row['range'])
        if not extent or row.get('implicit'):
            nodeids[row['id']]=parent; scopeids[row['id']]=scope; continue
        k=kind(row)
        n=base(k,row.get('name',''),row['location'],extent,parent,scope,row['category'])
        if 'reference' in row:
            n['reference']=reference(row['reference'])
            if k=='TYPE_REF' and n['reference']['kind'] in ('STRUCT_DECL','UNION_DECL','ENUM_DECL'):n['namespace']='tag'
        for key in ('semanticType','typeSyntax','hasWrittenPrototype'):
            if key in row:n[key]=row[key]
        if k=='FOR_STMT':
            roles={r['role']:r for r in row.get('childRoles',[])}
            if all(key in roles for key in ('initial','condition','update')):
                n['forParts']={key:not roles[key]['absent'] for key in ('initial','condition','update')}
        n['nativeNode']=row.get('originalNativeNode',row['id'])
        nodeids[row['id']]=n['id'];nodes.append(n)
        if k in ('FUNCTION_DECL','COMPOUND_STMT','FOR_STMT'):
            scope=len(scopes);scopes.append({'id':scope,'parent':n['scope'],'owner':n['id'],**extent})
        scopeids[row['id']]=scope
    # Some reference cursors in CIndex have a role distinct from their expression.
    # The renderer uses kinds and bindings, so native categories stay explicit.
    ds=[{'severity':d['severity'],'message':d['message'],'location':location(d['location']),'category':'missing-input' if 'file not found' in d['message'] else 'compiler-diagnostic'} for d in native.get('diagnostics',[])]
    if not native['valid'] and not any(d['severity']>=3 for d in ds):
        ds=[{'severity':3,'message':diagnostics.strip() or 'Cの解析でエラーが発生しました。','location':location({}), 'category':'compiler-diagnostic'}]
    skipped=[s for r in native.get('skipped',[]) if (s:=span(r)) is not None]
    return {'format':'shi-reading-view','version':1,'positionEncoding':'utf-16','source':source,'filename':Path(path).name,'file':path,
            'sha256':hashlib.sha256(raw).hexdigest(),'profile':{'backend':'clang-cpp','version':native['compiler'],'standard':'c17','args':flags},
            'valid':native['valid'],'tokens':[{'kind':token_kind(t),'spelling':t['text'],'start':pos(t['start']),'end':pos(t['end'])} for t in physical],
            'nodes':nodes,'scopes':scopes,'skipped':skipped,'diagnostics':ds,'keywordMacroNames':sorted({d['name'] for d in native['definitions'] if d['name'] in KEYWORDS}),
            'typeReferenceIndexStatus':'complete','indexedTypeReferences':[],'instance':instance_id}


def expanded_view(native, flags, diagnostics=''):
    """Display final user-code tokens, using the same TU's resolved AST.

    This is a virtual reading surface, not a standalone compilable translation
    unit. SDK declarations are deliberately absent. Raw SourceLocation encodings
    are used only within this one native report, never as durable source IDs.
    """
    from copy import deepcopy
    synthetic_id=max(i['id'] for i in native['fileInstances'])+1
    path='shi-expanded://translation-unit'
    pieces=[]; original=[]; source_map=[]; positions={}; cursor=0; parens=0
    for index,t in enumerate(native['tokens']):
        spelling=t['text']; byte_len=len(spelling.encode('utf8')); p=t['location']
        start=cursor;end=start+byte_len
        original.append({'instance':synthetic_id,'start':start,'end':end,'text':spelling,'kind':t['kind']})
        positions.setdefault(p['rawEncoding'],[]).append((start,end))
        source_map.append({'token':index,'start':start,'end':end,'origin':p})
        if spelling=='(':parens+=1
        if spelling==')':parens=max(0,parens-1)
        separator='\n' if spelling in ('{','}') or spelling==';' and parens==0 else ' '
        pieces.extend((spelling,separator));cursor=end+len(separator)
    source=''.join(pieces)
    def at(byte):
        return {'valid':True,'macro':False,'rawEncoding':byte+1,'spellingFile':path,'expansionFile':path,
                'spellingByte':byte,'expansionByte':byte,'spellingInstance':synthetic_id,'expansionInstance':synthetic_id,
                'system':False,'spellingSystem':False,'expansionSystem':False,'originChain':[],'originChainTruncated':False}
    def lookup(p,end=False):
        candidates=positions.get(p.get('rawEncoding'),[])
        return candidates[0][1 if end else 0] if len(candidates)==1 else None
    projected=[]; parents={}; omissions=[]; unavailable=set()
    for row in native['astNodes']:
        # Reparenting a for-initializer under its surviving compound statement
        # would turn it into a normal statement and invent end-of-statement guides.
        # Preserve the final tokens, but do not invent roles below a lost ancestor.
        if row['parent'] in unavailable:
            unavailable.add(row['id'])
            omissions.append({'node':row['id'],'reason':'ancestor-final-token-range-unavailable'})
            continue
        begin=lookup(row['range']['begin']);end=lookup(row['range']['last'],True);loc=lookup(row['location'])
        parent=parents.get(row['parent'],-1)
        if begin is None or end is None or loc is None or begin>end:
            parents[row['id']]=parent
            unavailable.add(row['id'])
            omissions.append({'node':row['id'],'reason':'ambiguous-or-absent-final-token-range'})
            continue
        copy=deepcopy(row);copy['originalNativeNode']=row['id'];copy['id']=len(projected);copy['parent']=parent
        copy['location']=at(loc);copy['range']={'begin':at(begin),'last':at(lookup(row['range']['last'])),'afterLast':at(end)}
        parents[row['id']]=copy['id'];projected.append(copy)
    report={**native,'astNodes':projected,'originalTokens':original,'macros':[],'includes':[],'skipped':[],
            'fileInstances':[*native['fileInstances'],{'id':synthetic_id,'file':path,'physicalFile':False,'systemHeader':False,'parent':0,'includeByte':-1}]}
    view=physical_view(report,synthetic_id,source,flags,diagnostics)
    view['keywordMacroNames']=[]
    return {'analysis':view,'positionEncoding':'utf-8','tokenOrigins':source_map,'omittedNodes':omissions,
            'status':'partial' if omissions or native['truncated'] else 'complete',
            'description':'User-code final tokens from one translation unit; SDK declarations are omitted. Not standalone C.'}
