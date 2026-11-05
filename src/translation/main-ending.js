// The compiler supplies the body and closing token. This function chooses a
// physical insertion boundary; it never invents a line or edits a comment.
export function mainEndingPosition(source,body,close,index,{directives=[],blocked=[]}={}){
 const fallback=close.end;
 const lineStart=at=>source.lastIndexOf('\n',at-1)+1;
 const closeLine=lineStart(close.start);
 const inDirective=t=>directives.some(d=>t.start<d.end&&d.start<t.end);
 const code=index.significant.filter(t=>t.start>body.start&&t.end<=close.start&&!inDirective(t));
 if(code.some(t=>t.start>=closeLine))return fallback;
 const last=code.at(-1);if(!last)return fallback;
 if(directives.some(d=>d.start>=last.end&&d.start<close.start))return fallback;
 const start=lineStart(last.start),newline=source.indexOf('\n',last.end),end=newline<0?source.length:newline;
 if(/(?:\\|\?\?\/)\r?$/.test(source.slice(start,end)))return fallback;
 if(blocked.some(r=>r.start<end&&start<r.end))return fallback;
 return last.end;
}
