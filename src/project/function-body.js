import {createSourceCoordinates} from '../translation/source-coordinates.js';

const prefix='void __shi_function_body(void) {\n#line 1\n';
const suffix='\n\n}\n';

export function functionBodyInput(source) {
  const bom=source.startsWith('\ufeff')?1:0;
  const start=bom+prefix.length,end=prefix.length+source.length;
  return {source,bom,start,end,text:source.slice(0,bom)+prefix+source.slice(bom)+suffix};
}

// Keep physical offsets for the translation rules and report diagnostic lines
// relative to the pasted text. A diagnostic in the suffix points to its end.
export function functionBodyDiagnostics(analysis,body) {
  const {lineColumn}=createSourceCoordinates(body.source);
  const side=pos=>pos.offset===null?pos:{
    ...pos,...lineColumn(Math.max(0,Math.min(body.source.length,pos.offset-body.start+body.bom))),
  };
  return analysis.diagnostics.map(d=>({...d,location:{
    spelling:side(d.location.spelling),expansion:side(d.location.expansion),
  }}));
}

export function functionBodySurface(view,body) {
  const {source,bom,start,end}=body;
  const offset=at=>at-start+bom;
  const inside=r=>r.start>=start&&r.end<=end;
  const mapped=r=>({...r,start:offset(r.start),end:offset(r.end)});
  const intersection=r=>({start:Math.max(start,r.start),end:Math.min(end,r.end)});
  const raw=(from,to)=>({kind:'raw',start:from,end:to,text:source.slice(from,to),ranges:[{start:from,end:to}]});
  const segments=bom?[raw(0,bom)]:[];
  for(const s of view.segments) {
    if(s.kind!=='raw'&&inside(s)&&s.ranges.every(inside)){
      segments.push({...mapped(s),ranges:s.ranges.map(mapped)});
      continue;
    }
    const range=intersection(s);
    if(range.start<range.end)segments.push(raw(offset(range.start),offset(range.end)));
  }
  const reasons=view.reasons.map(r=>({
    ...r,
    action:['macro-user','postfix-boundary'].includes(r.code)?'必要に応じて、函数の定義を含むC全体で翻訳してください。':r.action,
    ranges:r.ranges.flatMap(span=>{
      const range=intersection(span);
      return range.start<=range.end?[mapped(range)]:[];
    }),
  }));
  const macros=view.macros.filter(m=>inside(m.anchor)).map(m=>({...m,anchor:mapped(m.anchor)}));
  return {...view,label:view.label+'（函数の中身）',source,segments,text:segments.map(s=>s.text).join(''),reasons,macros};
}
