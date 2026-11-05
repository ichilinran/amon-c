// Physical token geometry only. No name binding or C semantic decisions here.
const DIGRAPHS={'<:':'[',':>':']','<%':'{','%>':'}'};
const CLOSE={'(':')','[':']','{':'}','<:':':>','<%':'%>'};
const CLOSERS=new Set(Object.values(CLOSE));
export const rangesOverlap=(a,b)=>a.start<b.end&&b.start<a.end;
export const rangeContains=(outer,inner)=>outer.start<=inner.start&&inner.end<=outer.end;
export const insideRange=(at,range)=>range.start<at&&at<range.end;
function lowerBound(tokens,at,property='start') {
  let lo=0,hi=tokens.length;
  while(lo<hi){const mid=(lo+hi)>>1;if(tokens[mid][property]<at)lo=mid+1;else hi=mid;}
  return lo;
}
export function createSourceIndex(source,inputTokens,{normalizeDigraphs=false}={}) {
  const tokens=normalizeDigraphs?inputTokens.map(t=>t.kind==='PUNCTUATION'&&DIGRAPHS[t.spelling]?{...t,spelling:DIGRAPHS[t.spelling]}:t):inputTokens;
  const significant=tokens.filter(t=>t.kind!=='COMMENT');
  const byStart=new Map(tokens.map(t=>[t.start,t]));
  const indices=new Map(),tokenIndices=new Map(),pairs=new Map(),pairTokens=new Map(),parentheses=new Map();
  const stack=[],parens=[];
  for(const [i,t] of significant.entries()) {
    if(!indices.has(t.start))indices.set(t.start,i);tokenIndices.set(t,i);
    if(t.kind!=='PUNCTUATION')continue;
    if(t.spelling==='(')parens.push(t);
    else if(t.spelling===')'){const open=parens.pop();if(open)parentheses.set(open.start,t);}
    if(Object.hasOwn(CLOSE,t.spelling))stack.push(i);
    else if(CLOSERS.has(t.spelling)) {
      const open=stack.pop();
      if(open!==undefined&&CLOSE[significant[open].spelling]===t.spelling) {
        pairs.set(open,i);pairTokens.set(significant[open].start,t);
      }
    }
  }
  const within=span=>{
    const out=[];
    for(let i=lowerBound(significant,span.start);i<significant.length&&significant[i].start<=span.end;i++) {
      const t=significant[i];if(t.end<=span.end)out.push(t);
    }
    return out;
  };
  const partition=(start,end,separator=',')=>{
    const parts=[];let first=start,balanced=true,crossesBoundary=false;
    for(let i=start;i<end;i++) {
      const t=significant[i],close=pairs.get(i);
      if(close!==undefined) {
        if(close>=end){balanced=false;crossesBoundary=true;break;}
        i=close;continue;
      }
      if(t.kind==='PUNCTUATION'&&(Object.hasOwn(CLOSE,t.spelling)||CLOSERS.has(t.spelling)))balanced=false;
      if(t.spelling===separator){parts.push({start:first,end:i,separator:i});first=i+1;}
    }
    parts.push({start:first,end,separator:null});
    return {parts,balanced,crossesBoundary};
  };
  const topLevel=selection=>{
    const out=[];
    for(let i=0;i<selection.length;i++) {
      const t=selection[i];out.push(t);const end=pairTokens.get(t.start);
      if(end)while(i+1<selection.length&&selection[i+1].start<=end.start)i++;
    }
    return out;
  };
  return {source,tokens,significant,byStart,indices,pairs,pairTokens,parentheses,within,partition,topLevel,
    indexOf:token=>tokenIndices.get(token)??-1,
    indexAt:at=>indices.get(at)??-1,
    next:at=>significant[lowerBound(significant,at)],
    previous:at=>{let i=lowerBound(significant,at,'end');if(significant[i]?.end===at)return significant[i];return significant[i-1];},
    physical:token=>source.slice(token.start,token.end)===token.spelling};
}
