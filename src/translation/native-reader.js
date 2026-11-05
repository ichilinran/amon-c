import {createEditPlan,reviseEdit,resolveEditPlans,composeReadingPlans,isStandardMacroEdit} from './edit-plan.js';
import {createSourceIndex,rangesOverlap,insideRange} from './source-index.js';
import {planUsageReadings} from './usage-reading.js';
import {planPredefined} from './predefined-reader.js';
import {STANDARD_NAMES} from '../vocabulary/standard-catalog.js';
import {readingReason,attachReasons,reasonRangeAt} from './reading-reasons.js';
import {planStandardNames} from './standard-reader.js';
import {readPreprocessing} from './preprocessor-reader.js';
import {planDeclarations} from './declaration-plan.js';
import {alignDeclarationIndentation} from './declaration-layout.js';
import {mainEndingPosition} from './main-ending.js';
import {validateWords,DEFAULT_WORDS} from '../vocabulary/settings.js';
import {originalReading} from '../project/analysis-format.js';
// Native AST supplies roles and bindings. Only physical source tokens are edited.
export function translateAnalysis(source,snapshot,config=DEFAULT_WORDS,{annotations=true,original=false}={}){
 if(original)return originalReading(source);
 const sourceIndex=createSourceIndex(source,snapshot.tokens,{normalizeDigraphs:true});
 snapshot={...snapshot,tokens:sourceIndex.tokens};
 if(snapshot.source!==source)return attachReasons(originalReading(source,'原文が解析時から変わっています。再解析してください。'),[readingReason('source-changed',[{start:0,end:source.length}])]);
 const words=validateWords(config),pp=readPreprocessing(source,words,{keywordMacroNames:snapshot.keywordMacroNames??null,inclusions:snapshot.nodes.filter(n=>n.kind==='INCLUSION_DIRECTIVE')});
 if(!snapshot.valid){
  const diagnostics=snapshot.diagnostics.filter(d=>d.severity>=3),reasons=diagnostics.map(d=>{
   const code=d.category==='missing-input'||/file not found/.test(d.message)?'missing-input':/imaginary types are not supported/.test(d.message)?'sdk-unsupported':'compiler-diagnostic';
   const pos=d.location.expansion;const ranges=pos.file===snapshot.file?reasonRangeAt(source,pos.offset,snapshot.tokens):[];
   const file=pos.file?.split(/[\\/]/).at(-1)||snapshot.filename;
   return readingReason(code,ranges,`${file}:${pos.line} ${d.message}`);
  });
  return attachReasons(composeReadingPlans(source,[pp.plan],[...pp.issues,'C解析の診断（本文は原文保持）：'+diagnostics.map(d=>`${d.location.expansion.file?.split('/').at(-1)||snapshot.filename}:${d.location.expansion.line} ${d.message}`).join(' ／ ')],pp.edits.length).reading,reasons);
 }

 const library=planStandardNames(source,snapshot,words,pp.directives,{sourceIndex});
 const predefined=planPredefined(source,snapshot,words,pp.directives,{preprocessing:library.preprocessing});for(const id of predefined.recognizedMacros)library.recognizedMacros.add(id);
 const initialPlans=[pp.plan,...library.plans,predefined.plan];
 const libraryIds=new Set([...library.edits,...predefined.edits].map(e=>e.proposalId));
 let libraryEdits=[...library.edits,...predefined.edits],edits=[];
 const nodes=snapshot.nodes,tokens=snapshot.tokens,issues=[...pp.issues],reasons=[],blocked=[...snapshot.skipped],done=new Set();let order=pp.edits.length+libraryEdits.length;
 const children=new Map();for(const n of nodes){if(!children.has(n.parent))children.set(n.parent,[]);children.get(n.parent).push(n);}
 const descendants=n=>children.get(n.id)||[];
 const text=n=>source.slice(n.start,n.end);
 const intersects=rangesOverlap;
 const unavailable=n=>blocked.some(b=>intersects(n,b));
 const directives=pp.directives;blocked.push(...directives);
 const reason=(code,range,message)=>reasons.push(readingReason(code,range?[range]:[],message));
 if(snapshot.typeReferenceIndexStatus==='unavailable')reason('reference-index-unavailable',null,snapshot.typeReferenceIndexMessage);
 for(const t of library.indexedUnconfirmedOrigins)reason('standard-origin-unconfirmed',t);
 for(const t of library.genericUnconfirmedTypes)reason('generic-type-unconfirmed',t);
 if(pp.issues.length)reason('preprocessing-held',null,pp.issues.join(' ／ '));
 const lexicalHeld=new Set();
 for(const t of tokens)if(['KEYWORD','IDENTIFIER','PUNCTUATION'].includes(t.kind)&&source.slice(t.start,t.end)!==t.spelling&&/\\(?:\r\n|\r|\n)|\?\?[=/'()!<>-]/.test(source.slice(t.start,t.end))&&!directives.some(d=>intersects(t,d))&&!snapshot.skipped.some(r=>intersects(t,r))){blocked.push(t);lexicalHeld.add(t.start);reason('physical-spelling',t);}

 for(const n of library.macros)blocked.push({start:n.start,end:n.end});
 const replace=(n,value,kind='translation',ranges=[{start:n.start,end:n.end}],note='対応語',operation=kind==='layout'?'layout':kind==='annotation'?'guide':'replacement')=>{if(n&&!unavailable(n))edits.push({start:n.start,end:n.end,text:value,kind,operation,ranges,note,order:order++});};
 const canInsert=at=>!blocked.some(b=>insideRange(at,b));
 const opaqueMacro=n=>library.preprocessing.opaqueOverlap(n,library.recognizedMacros);
 const insert=(at,value,kind,anchor,note='構造に合わせた追加語',priority,role)=>{if(!canInsert(at))return;edits.push({start:at,end:at,text:value,kind,operation:kind==='translation'?'move':'guide',ranges:[{start:anchor.start,end:anchor.end}],note,...(role?{role}:{}),order:priority??order++});};
 const guide=(at,value,anchor,note,priority,role)=>{if(annotations)insert(at,value,'annotation',anchor,note,priority,role);};
 const spaces=(start,end)=>{if(end>start&&/^[ \t]*$/.test(source.slice(start,end)))replace({start,end},'','layout',[],'表示用の空白');};
 const list=sourceIndex.within;
 const next=sourceIndex.next;
 const gap=at=>at<source.length&&!/\s|[{}]/u.test(source[at])?' ':'';
 const pairs=sourceIndex.pairTokens;
 // The SDK aliases expand only their head token. Move that token's reading,
 // preserving comments, argument tokens, and the original physical location.
 const aliasRevisions=[];
 for(const e of libraryEdits){
  const name=e.binding?.name;if(e.kind==='removed'||!['alignas','alignof'].some(name=>isStandardMacroEdit(e,name)))continue;
  const open=next(e.end),close=open&&pairs.get(open.start);
  if(name==='alignas'&&open?.spelling==='('&&close)continue;
  if(open?.spelling==='('&&close&&canInsert(close.end)){const value=e.text;aliasRevisions.push(reviseEdit(e,{text:'',kind:'removed'}));insert(close.end,value+gap(close.end),'translation',{start:e.start,end:e.end},'標準マクロ名 '+name);}
  else {aliasRevisions.push(reviseEdit(e,null));reason('postfix-boundary',{start:e.start,end:e.end});}
 }
 const aliasPlan=createEditPlan('alignment-alias',edits,aliasRevisions);
 const beforeUsage=[...initialPlans,aliasPlan];
 const usage=planUsageReadings(source,snapshot,words,{heads:library.callHeads.filter(h=>!h.disabled),existingEdits:resolveEditPlans(beforeUsage).edits,annotations,sourceIndex});
 const plans=[...beforeUsage,usage.plan],knownEdits=resolveEditPlans(plans).edits;
 libraryEdits=knownEdits.filter(e=>libraryIds.has(e.proposalId));
 edits=[];
 const topLevel=sourceIndex.topLevel;
 // A later body call is not a control header when macros supplied its delimiters.
 const header=n=>{const ts=list(n),head={IF_STMT:'if',WHILE_STMT:'while',FOR_STMT:'for'}[n.kind];if(head&&ts[0]?.spelling!==head)return null;const open=ts[1],close=open?.spelling==='('&&pairs.get(open.start);return close?{ts,open,close}:null;};
 const endAt=(semi,anchor,value=words.end)=>{if(!semi||semi.spelling!==';'||done.has(semi.start)||unavailable(semi))return;done.add(semi.start);if(usage.omitEnd(anchor))return;let at=semi.start;while(at>anchor.start&&/[ \t]/.test(source[at-1]))at--;if(annotations){spaces(at,semi.start);guide(at,' '+value,anchor,'文を締める追加語');}};
 const semicolon=n=>{const ts=list(n);return ts.at(-1)?.spelling===';'?ts.at(-1):next(n.end)?.spelling===';'?next(n.end):null;};
 const forHeaders=[];
 for(const n of nodes.filter(n=>n.kind==='FOR_STMT')){
  const h=header(n);if(h)forHeaders.push({start:h.open.start,end:h.close.end});
  else {const body=descendants(n).at(-1);if(body&&body.start>n.start)forHeaders.push({start:n.start,end:body.start});}
 }
 // Stable keywords only; spelling-identical user identifiers remain untouched.
 const simple=new Set('int void signed unsigned short long char float double _Bool const volatile restrict static register auto extern inline _Thread_local _Atomic _Noreturn _Complex _Imaginary struct union enum typedef return break continue switch default _Generic'.split(' '));
 for(const t of tokens)if(t.kind==='KEYWORD'&&simple.has(t.spelling)&&Object.hasOwn(words,t.spelling))replace(t,words[t.spelling]);
 for(const t of tokens)if(t.spelling==='_Alignas'&&t.kind==='KEYWORD'&&!unavailable(t)){
  const open=next(t.end),close=open&&pairs.get(open.start);if(open?.spelling==='('&&close&&!opaqueMacro({start:open.start,end:close.end})&&canInsert(close.end)){replace(t,'','removed',[]);spaces(t.end,open.start);insert(close.end,words._Alignas+gap(close.end),'translation',t,'_Alignasの対応語を対象の後へ移動');}
 }
 if(nodes.some(n=>n.kind==='MACRO_INSTANTIATION'&&n.name!=='_Pragma'&&!library.recognizedMacros.has(n.id)))issues.push('マクロの呼出しは原文で保持しています。生成された名前は原文へ書き込みません。');
 if(snapshot.skipped.length)issues.push('解析条件で選ばれなかった分岐の本文は原文で保持しています。前処理指令は表示します。');
 const entries=new Map(STANDARD_NAMES.map(e=>[e.source,e])),macroNodes=library.macros;
 const builtins=new Set('__FILE__ __LINE__ __DATE__ __TIME__ __STDC__ __STDC_HOSTED__ __STDC_VERSION__ __STDC_UTF_16__ __STDC_UTF_32__'.split(' '));
 for(const m of macroNodes){
  if(m.name==='_Pragma'||directives.some(d=>intersects(m,d))||snapshot.skipped.some(r=>intersects(m,r)))continue;
  if(!library.recognizedMacros.has(m.id)){
   const loc=m.reference?.location.spelling,parent=macroNodes.some(n=>n.id!==m.id&&n.start<=m.start&&m.end<=n.end&&(n.start<m.start||m.end<n.end)&&library.recognizedMacros.has(n.id));
   const code=parent&&entries.has(m.name)&&loc?.system?'macro-argument':loc?.system?'macro-external':loc?.file==null&&builtins.has(m.name)?'macro-builtin':'macro-user';reason(code,m);
  }else{
   const assertionMode=library.assertArgumentModes.get(m.id);
   if(assertionMode==='ignored'){reason('assert-disabled',m);continue;}
   if(assertionMode==='unknown')reason('assert-unconfirmed',m);
   const inner=macroNodes.some(n=>n.id!==m.id&&!library.recognizedMacros.has(n.id)&&m.start<=n.start&&n.end<=m.end&&(n.start>m.start||n.end<m.end));
   const keywords=tokens.some(t=>t.kind==='KEYWORD'&&t.start>m.start&&t.end<=m.end&&!libraryEdits.some(e=>e.start===t.start&&e.end===t.end));
   const bound=nodes.some(n=>n.reference?.location.spelling.system&&entries.has(n.reference.name)&&n.location.spelling.file===snapshot.file&&n.location.spelling.offset>m.start&&n.location.spelling.offset<m.end&&tokens.some(t=>t.start===n.location.spelling.offset&&t.spelling===n.reference.name)&&!libraryEdits.some(e=>e.start===n.location.spelling.offset));
   if(inner||keywords||bound)reason('macro-argument',m);
  }
 }
 for(const r of snapshot.skipped)reason('inactive-branch',r);
 for(const t of tokens){
  if(!predefined.edits.some(e=>e.start===t.start)&&t.spelling==='__func__'&&source.slice(t.start,t.end)==='__func__'&&!unavailable(t)&&nodes.some(n=>n.kind==='STRING_LITERAL'&&n.start===t.start&&n.end===t.end&&n.origin==='source'))reason('predefined-name',t);
 }
 for(const n of nodes){
  const r=n.reference,at=n.location.expansion.offset,t=tokens.find(t=>t.start===at);
  if(!r?.location.spelling.system||!entries.has(r.name)||!['TYPE_REF','DECL_REF_EXPR','MEMBER_REF_EXPR','MEMBER_REF'].includes(n.kind)||!t||t.spelling!==r.name||source.slice(t.start,t.end)!==r.name||unavailable(t)||libraryEdits.some(e=>e.start===at))continue;
  reason('standard-origin-unconfirmed',t);
 }


 const plan=planDeclarations(source,snapshot,pairs,{specifierStarts:library.specifierStarts,sourceIndex}),guided=new Set(),declarationIndentation=[];
 for(const error of plan.errors)if(!unavailable(error)){issues.push('宣言の案内を局所的に省略：'+error.message+'。名前・括弧は保持しています。');if(annotations)reason('declaration-guide',error,'宣言の案内を局所的に省略：'+error.message);}
 function parameterGuides(suffix){
  const {open,close}=suffix;if(guided.has(open.start)||unavailable(open)||unavailable(close))return;guided.add(open.start);
  if(!suffix.parameters.length){if(annotations)reason('untyped-parameters',{start:open.start,end:close.end});issues.push('型付きでない引数リストには案内語を付けず、元の括弧内を保持しています。');return;}
  guide(open.end,words.parameters+' ',{start:open.start,end:close.end},'受け取る引数の案内語');
  guide(close.start,' '+words.end,{start:open.start,end:close.end},'引数を締める追加語');
  for(const p of suffix.parameters){
   if(p.ellipsis){guide(p.ellipsis.start,words.also+' ',p.ellipsis,'可変個引数の案内語');continue;}
   const fs=p.declarator.suffixes.filter(s=>s.kind==='function');
   for(const f of fs)parameterGuides(f);
  }
 }
 for(const group of [...plan.groups,...plan.functions]){
  const inFor=group.semi&&!group.nodes.every(n=>n.kind==='FIELD_DECL')&&forHeaders.some(h=>group.semi.start>h.start&&group.semi.end<h.end);
  if(group.semi&&!inFor)endAt(group.semi,group);
  for(const part of group.declarations){
   const d=part.declarator,id=d.name;
   for(const suffix of d.suffixes)if(suffix.kind==='function')parameterGuides(suffix);
   const n=id&&group.nodes.find(n=>n.location.expansion.offset===id.start&&n.kind==='FUNCTION_DECL');
   if(n&&!unavailable(id)){
    const ownFunction=d.suffixes.findIndex(s=>s.kind==='function'),distributed=ownFunction>=0&&d.suffixes.length>ownFunction+1;
    if(distributed&&annotations)reason('distributed-return',group);
    if(!distributed)guide(id.start,(source[id.start-1]==='*'?' ':'')+words.typeLink+' ',id,'関数の型と名前をつなぐ追加語');
    if(n.name==='main')replace(id,words.main);
    if(group.definition&&n.name==='main'){
     const end=list(group.body).at(-1);
     if(end&&['}','%>'].includes(end.spelling)){
      const at=mainEndingPosition(source,group.body,end,sourceIndex,{directives,blocked});
      guide(at,' '+words.mainEnd+gap(at),end,'mainの終わりの案内語',undefined,'main-end');
     }
    }
   }
  }
  if(group.unresolved||group.declarations.length<=1||inFor)continue;
  // Prefix copying must not copy a type definition, macro text or expressions.
  if(group.hasDefinition||unavailable(group)||group.prefixTokens.some(t=>!['KEYWORD','IDENTIFIER'].includes(t.kind))){issues.push('型定義・指定式・出所を含む複数宣言は、元の区切りを保持しました。');if(annotations)reason('declaration-unsplit',group);continue;}
  const prefix=group.prefixTokens.map(t=>libraryEdits.find(e=>e.start===t.start&&e.end===t.end)?.text??(t.kind==='KEYWORD'&&Object.hasOwn(words,t.spelling)?words[t.spelling]:text(t))).join(' '),prefixRanges=group.prefixTokens.map(t=>({start:t.start,end:t.end}));
  for(let i=1;i<group.declarations.length;i++){
   const comma=plan.tokens[group.declarations[i-1].separator],at=group.declarations[i].startOffset;
   // Keep the physical gap, including comments and original newlines. Copy
   // the type immediately before its declarator, not before that gap.
   const between=source.slice(comma.end,at),gapAfterComma=/^\s/.test(between)?'':' ';
   guide(comma.start,' '+words.end,{start:group.declarations[i-1].startOffset,end:comma.start},'分けた宣言を締める追加語');
   replace(comma,';'+gapAfterComma,'translation',[{start:comma.start,end:comma.end}],'宣言の区切り','split');
   const gapBeforeType=between&&!/\s$/.test(between)?' ':'';
   insert(at,gapBeforeType+prefix+' ','translation',{start:group.prefixStart,end:group.prefixEnd},'分割した宣言の型',-100);
   const copied=edits.at(-1);if(copied?.start===at&&copied.note==='分割した宣言の型'){
    copied.operation='split';copied.ranges=[{start:comma.start,end:comma.end},...prefixRanges];
   }
   if(/\n/.test(between))declarationIndentation.push({at,target:group.prefixStart,leading:gapBeforeType.length});
  }
 }
 const mainReferences=new Set();
 for(const n of nodes)if(n.kind==='DECL_REF_EXPR'&&n.reference?.kind==='FUNCTION_DECL'&&n.reference.name==='main'&&n.origin==='source'){
  const t=tokens.find(t=>t.start===n.location.spelling.offset&&n.location.spelling.file===snapshot.file&&t.spelling==='main');
  if(t&&!unavailable(t)&&!mainReferences.has(t.start)){replace(t,words.main,'translation',[{start:t.start,end:t.end}],'main関数の参照');mainReferences.add(t.start);}
 }
 for(const n of nodes){
  const ts=list(n),first=ts[0];if(!first||lexicalHeld.has(first.start))continue;
  if(n.kind==='RETURN_STMT')endAt(semicolon(n),n,descendants(n).length?words.end:words.void+' '+words.end);
  if(n.kind==='IF_STMT'){
   const h=header(n);if(!h||first.spelling!=='if'||unavailable(first))continue;
   const prev=sourceIndex.previous(first.start);
   if(prev?.spelling==='else'&&lexicalHeld.has(prev.start))continue;
   if(prev?.spelling==='else'){replace(prev,words.elseIf,'translation',[{start:prev.start,end:prev.end},{start:first.start,end:first.end}],'else ifのまとめ訳');replace(first,'','removed',[]);spaces(prev.end,first.start);}else replace(first,words.if);
   guide(h.close.end,' '+words.then+gap(h.close.end),{start:h.open.start,end:h.close.end},'条件の案内語');
   const bodyChildren=descendants(n),alternative=bodyChildren.at(-1);
   if(alternative&&alternative.kind!=='IF_STMT'){
    const els=ts.filter(t=>t.spelling==='else'&&t.start<alternative.start).at(-1);if(els)replace(els,words.else);
   }
  }
  if(n.kind==='WHILE_STMT'){
   const h=header(n);if(!h||first.spelling!=='while'||unavailable(first))continue;
   replace(first,'','removed',[]);spaces(first.end,h.open.start);insert(h.close.end,' '+words.while+gap(h.close.end),'translation',first,'whileの対応語を条件の後へ移動');
  }
  if(n.kind==='DO_STMT'){
   const body=descendants(n)[0],w=ts.find(t=>t.spelling==='while'&&t.start>=(body?.end??n.end));if(first.spelling!=='do'||!w||lexicalHeld.has(w.start))continue;
   const open=ts[ts.indexOf(w)+1],close=open?.spelling==='('&&pairs.get(open.start);if(!close)continue;
   replace(first,words.do+gap(first.end));replace(w,(w.start>0&&!/\s/u.test(source[w.start-1])?' ':'')+words.doWhile+' ');spaces(w.end,open.start);insert(close.end,' '+words.while,'translation',w,'do whileの対応語を条件の後へ移動');
  }
  if(n.kind==='FOR_STMT'){
   const h=header(n);if(!h||first.spelling!=='for')continue;replace(first,words.for);
   const inside=h.ts.filter(t=>t.start>h.open.start&&t.end<=h.close.start),semis=topLevel(inside).filter(t=>t.spelling===';');if(semis.length!==2){issues.push('forの区切りを確定できず、案内語を省略しました。');if(annotations)reason('for-header',n);continue;}
   const fields=[inside.filter(t=>t.end<=semis[0].start),inside.filter(t=>t.start>=semis[0].end&&t.end<=semis[1].start),inside.filter(t=>t.start>=semis[1].end)];
   // An EMPTY macro has physical tokens but no corresponding C for-clause.
   // Native roles establish absence; older snapshots keep opaque fields unguided.
   for(const [i,role] of ['initial','condition','update'].entries()){
    if(n.forParts?.[role]===false||n.forParts?.[role]===undefined&&fields[i].length&&opaqueMacro({start:fields[i][0].start,end:fields[i].at(-1).end}))fields[i]=[];
   }
   if(fields[0].length)guide(semis[0].start,' '+words.first,{start:fields[0][0].start,end:fields[0].at(-1).end},'初期設定の案内語');
   if(fields[1].length){guide(fields[1].at(-1).end,' '+words.during,{start:fields[1][0].start,end:fields[1].at(-1).end},'継続条件の案内語');if(semis[0].end===fields[1][0].start)guide(fields[1][0].start,' ',semis[0],'表示用の空白');}
   if(fields[2].length){const a=fields[2][0],b=fields[2].at(-1);guide(a.start,(semis[1].end===a.start?' ':'')+words.each+' ',{start:a.start,end:b.end},'更新の案内語');guide(b.end,' '+words.end,{start:a.start,end:b.end},'更新を締める追加語');}else spaces(semis[1].end,h.close.start);
  }
  if(n.kind==='CASE_STMT'&&first.spelling==='case'){
   const value=descendants(n)[0];if(value&&!opaqueMacro(value)&&canInsert(value.end)){replace(first,'','removed',[]);spaces(first.end,value.start);insert(value.end,' '+words.case,'translation',first,'caseの対応語を値の後へ移動');}
  }
  if(n.kind==='GOTO_STMT'&&first.spelling==='goto'){
   const target=ts[1];if(target&&!opaqueMacro(target)&&canInsert(target.end)){replace(first,'','removed',[]);spaces(first.end,target.start);guide(target.end,' '+words.destination,target,'移動先の案内語');insert(target.end,' '+words.goto,'translation',first,'gotoの対応語を移動先の後へ移動');}
  }
  if(n.kind==='CXX_UNARY_EXPR'&&['sizeof','_Alignof'].includes(first.spelling)&&!opaqueMacro(n)&&canInsert(n.end)){
   replace(first,'','removed',[]);spaces(first.end,ts[1]?.start??first.end);let depth=0,p=n;while(p.parent!==null){depth++;p=nodes[p.parent];}insert(n.end,words[first.spelling],'translation',first,'対象の後へ移動',-sourceIndex.indexAt(first.start)*2+1);
  }
  if(n.kind==='STATIC_ASSERT'&&!usage.calls.some(c=>c.source==='static_assert'&&c.start===first.start)){
   const h=header(n);if(!h)continue;replace(first,words._Static_assert);
   const comma=topLevel(ts.filter(t=>t.start>h.open.start&&t.end<=h.close.start)).find(t=>t.spelling===',');
   if(comma){spaces(comma.end,next(comma.end)?.start??comma.end);guide(comma.end,' '+words.assertGuide+' ',comma,'条件を満たさないときの説明');}endAt(semicolon(n),n);
  }
 }
 // Direct expression-statement nodes lack a separate libclang wrapper.
 const statementParents=new Set('COMPOUND_STMT IF_STMT WHILE_STMT DO_STMT FOR_STMT CASE_STMT DEFAULT_STMT LABEL_STMT'.split(' '));
 const expressionKinds=new Set('UNEXPOSED_EXPR BINARY_OPERATOR COMPOUND_ASSIGNMENT_OPERATOR UNARY_OPERATOR CALL_EXPR CSTYLE_CAST_EXPR PAREN_EXPR CXX_UNARY_EXPR INTEGER_LITERAL FLOATING_LITERAL STRING_LITERAL CHARACTER_LITERAL DECL_REF_EXPR MEMBER_REF_EXPR ARRAY_SUBSCRIPT_EXPR CONDITIONAL_OPERATOR COMPOUND_LITERAL_EXPR GENERIC_SELECTION_EXPR'.split(' '));
 for(const n of nodes)if(expressionKinds.has(n.kind)&&statementParents.has(nodes[n.parent]?.kind)){const parent=nodes[n.parent];if(parent.kind==='FOR_STMT'&&descendants(parent).at(-1)?.id!==n.id)continue;const semi=semicolon(n);if(semi&&!forHeaders.some(h=>semi.start>h.start&&semi.end<h.end))endAt(semi,n);}
 // Clang may omit alignment attribute expressions from both the cursor tree
 // and index callbacks. Report physical candidates after all normal edits;
 // do not invent a type binding or a sizeof operand from spelling alone.
 for(const t of tokens){
  const alias=t.spelling==='alignas'&&library.macros.some(m=>m.start===t.start&&library.recognizedMacros.has(m.id));
  if(!(t.kind==='KEYWORD'&&t.spelling==='_Alignas'&&!unavailable(t)||alias))continue;
  const open=next(t.end),close=open&&pairs.get(open.start);if(open?.spelling!=='('||!close)continue;
  for(const p of tokens.filter(p=>p.start>open.start&&p.end<=close.start)){
   const candidate=p.kind==='KEYWORD'||['type','tag'].includes(entries.get(p.spelling)?.kind);
   const edited=[...knownEdits,...edits].some(e=>e.start===p.start&&e.end===p.end&&['translation','removed'].includes(e.kind));
   const userBinding=[...nodes,...(snapshot.indexedTypeReferences??[])].some(n=>n.reference&&n.reference.name===p.spelling&&n.location.spelling.file===snapshot.file&&n.location.spelling.offset===p.start&&!n.reference.location.spelling.system);
   if(candidate&&!edited&&!userBinding)reason('alignment-argument-unconfirmed',p);
  }
 }
 for(const call of usage.calls)if(call.source==='static_assert')endAt(next(call.end),call);
 // Preserve complex grouping for now; no repeated type reconstruction from a name.
 const structurePlan=createEditPlan('structure',edits);
 const composed=declarationIndentation.length?alignDeclarationIndentation(source,[...plans,structurePlan],issues,declarationIndentation):composeReadingPlans(source,[...plans,structurePlan],issues);
 if(composed.diagnostics.length)reason('edit-conflict',{start:0,end:source.length});
 return attachReasons(composed.reading,reasons);
}
