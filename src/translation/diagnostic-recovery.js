import {insideRange,rangesOverlap} from './source-index.js';
import {readingReason,reasonRangeAt} from './reading-reasons.js';

const conditionalOpen=new Set(['if','ifdef','ifndef']);
const changesPreprocessing=new Set(['define','undef','include','pragma','line','error']);

// Compiler diagnostics identify trouble spots. Only use a narrow range when
// the original tokens and compiler node boundaries agree.
export function diagnosticRecovery(snapshot,sourceIndex,directives){
 const {source,nodes,tokens,file,filename}=snapshot;
 const {significant,byStart,next,previous,pairTokens,indexAt,indexOf,partition}=sourceIndex;
 const errors=snapshot.diagnostics.filter(d=>d.severity>=3);
 const held=[],structural=[],reasons=[];
 let lexicalOnly=false;
 const compounds=nodes.filter(n=>n.kind==='COMPOUND_STMT'&&n.origin==='source');
 const roots=nodes.filter(n=>n.parent===null&&n.role==='declaration'&&n.origin==='source');
 const boundaries=n=>{
  const last=previous(n.end),after=next(n.end);
  const terminal=last?.end===n.end&&[';','}'].includes(last.spelling)?last:
   after?.spelling===';'&&last?.end===n.end?after:null;
  const start=indexAt(n.start);
  return terminal&&start>=0&&partition(start,indexOf(terminal)+1).balanced?terminal:null;
 };
 for(const d of errors){
  const {message,location:{expansion:pos}}=d;
  const at=pos.file===file?pos.offset:null;
  const range=reasonRangeAt(source,at,tokens)[0];
  const missing=d.category==='missing-input'||/file not found/.test(message);
  const code=missing?'missing-input':/imaginary types are not supported/.test(message)?'sdk-unsupported':'compiler-diagnostic';
  let hold=range;
  if(!range)lexicalOnly=true;
  else if(missing){
   // A missing include can change later conditional branches. Only carry
   // that uncertainty past the branch when it can alter preprocessing.
   for(let i=0;i<directives.length;i++){
    const open=directives[i];
    if(open.start<=at||!conditionalOpen.has(open.name))continue;
    let depth=1,changes=false,end=source.length;
    while(++i<directives.length){
     const d=directives[i];
     if(conditionalOpen.has(d.name))depth++;
     else if(d.name==='endif'&&--depth===0){if(!changes)end=d.end;break;}
     if(changesPreprocessing.has(d.name))changes=true;
    }
    const affected={start:open.start,end};
    structural.push(affected);
    reasons.push(readingReason('conditional-unconfirmed',[affected]));
    if(end===source.length)break;
   }
  }else{
   const name=/^(call to undeclared (?:library )?function|use of undeclared identifier) '([^']+)'/.exec(message);
   const head=byStart.get(range.start);
   if(name&&head?.kind==='IDENTIFIER'&&head.spelling===name[2]&&sourceIndex.physical(head)){
    const open=next(head.end),close=open?.spelling==='('?pairTokens.get(open.start):null;
    if(name[1].startsWith('call ')&&close&&nodes.some(n=>n.kind==='CALL_EXPR'&&n.origin==='source'&&n.start===head.start&&n.end===close.end)){
     hold={start:head.start,end:close.end};
    }
    held.push(hold);
   }else{
    const atEnd=at>=(significant.at(-1)?.end??0);
    const body=compounds.filter(n=>insideRange(at,n)||atEnd&&n.end===at)
     .reduce((inner,n)=>!inner||n.start>=inner.start&&n.end<=inner.end?n:inner,null);
    // An absent final brace does not invalidate already terminated statements.
    if(atEnd&&body&&/^expected '}'$/.test(message)){
     hold=range;
    }else if(body){
     const members=nodes.filter(n=>n.parent===body.id&&n.origin==='source');
     const member=members.find(n=>n.start<=at&&at<n.end||atEnd&&n.end===at&&n.start<at&&!boundaries(n));
     const end=member&&boundaries(member);
     if(member&&end)hold={start:member.start,end:end.end};
     else{
      const previousEnd=members.filter(n=>n.end<=at).map(boundaries).filter(t=>t&&t.end<=at).at(-1);
      hold={start:member?.start??previousEnd?.end??byStart.get(body.start)?.end??body.start,end:body.end};
     }
     structural.push(hold);
    }else{
     const root=roots.find(n=>n.start<=at&&at<n.end)??(atEnd?roots.at(-1):null);
     const boundary=root&&boundaries(root);
     if(root&&(!atEnd||!boundary)){
      hold={start:root.start,end:boundary?.end??(atEnd?source.length:root.end)};
      structural.push(hold);
     }else if(atEnd&&boundary&&next(boundary.end)){
      hold={start:next(boundary.end).start,end:source.length};
      structural.push(hold);
     }else if(!atEnd)lexicalOnly=true;
    }
   }
  }
  const where=pos.file?.split(/[\\/]/).at(-1)||filename;
  reasons.push(readingReason(code,hold?[hold]:[],`${where}:${pos.line} ${message}`));
 }
 const protectedRanges=[...held,...structural];
 return {
  lexicalOnly,reasons,protectedRanges,
  uncertain:range=>protectedRanges.some(other=>rangesOverlap(range,other)),
  structurallyUncertain:range=>structural.some(other=>rangesOverlap(range,other)),
 };
}
