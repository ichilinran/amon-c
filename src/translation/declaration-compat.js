// Compatibility only: legacy snapshots and nonphysical or unavailable TypeLoc.
const qualifiers=new Set('const volatile restrict _Atomic'.split(' '));
export function createCompatibilityDeclarator({tokens,typeRefs,oldStyleHeaders,nodes,parts,prefix,afterPair}){
 function declarator(start,end,depth=0){
  if(depth>256)throw new Error('宣言子の入れ子が256段の表示資源上限を超えています');
  let i=start,name=null;const suffixes=[];
  while(tokens[i]?.spelling==='*'&&i<end){i++;while(i<end&&qualifiers.has(tokens[i].spelling))i++;}
  if(i<end&&tokens[i].kind==='IDENTIFIER'){name=tokens[i];i++;}
  else if(i<end&&tokens[i].spelling==='('){
   const j=afterPair(i),next=tokens[i+1];
   if(j!=null&&j<=end&&next&&(next.spelling==='*'||next.spelling==='('||next.kind==='IDENTIFIER'&&!typeRefs.has(next.start))){
    const inner=declarator(i+1,j-1,depth+1);if(inner.end!==j-1)throw new Error('宣言子の括弧内が未対応');name=inner.name;suffixes.push(...inner.suffixes);i=j;
   }
  }
  while(i<end&&['(','['].includes(tokens[i].spelling)){
   const j=afterPair(i);if(j==null||j>end)throw new Error('宣言子の区切りが不明');
   const suffix={kind:tokens[i].spelling==='('?'function':'array',open:tokens[i],close:tokens[j-1],parameters:[]};
   if(suffix.kind==='function'){
    const owningOld=nodes.find(n=>oldStyleHeaders.has(n.id)&&n.start<=tokens[i].start&&tokens[j-1].end<=oldStyleHeaders.get(n.id));
    const identifierList=owningOld&&tokens.slice(i+1,j-1).every(t=>t.spelling===','||t.kind==='IDENTIFIER'&&nodes.some(p=>p.parent===owningOld.id&&p.kind==='PARM_DECL'&&p.name===t.spelling));
    if(identifierList){suffix.untyped=true;suffixes.push(suffix);i=j;continue;}
    for(const part of parts(i+1,j-1)){
     if(part.start===part.end)continue;
     if(tokens[part.start].spelling==='...'){suffix.parameters.push({ellipsis:tokens[part.start]});continue;}
     const p=prefix(part.start,part.end);if(!p||p.end===part.start)throw new Error('引数の型の原文が未対応');
     const d=declarator(p.end,part.end,depth+1);if(d.end!==part.end)throw new Error('引数宣言子の残りが未対応');
     suffix.parameters.push({start:tokens[part.start].start,end:tokens[part.end-1].end,declarator:d});
    }
   }
   suffixes.push(suffix);i=j;
  }
  return {name,suffixes,start,end:i};
 }
 return declarator;
}
