import {sourceBoundaries,byteToUTF16} from './project-analysis.js';
import {functionBodySurface} from './function-body.js';

// Works on already resolved facts. Anchors identify outer physical calls; they
// never claim an exact contributor graph for #, ##, or nested macro expansions.
export function contextSurfaces({id,unit,facts,views,expanded,expandedIssue=null,functionBody=null,entryInstance=null}) {
  const byInstance=new Map(views.map(v=>[v.instance,v]));
  const boundaries=new Map();
  const key=instance=>`${id}:source:${instance}`;
  const anchor=(instance,byte)=>{
    const view=byInstance.get(instance);if(!view)return null;
    if(!boundaries.has(instance))boundaries.set(instance,sourceBoundaries(view.analysis.source));
    let start;try{start=byteToUTF16(boundaries.get(instance),byte);}catch{return null;}
    const token=view.analysis.tokens.find(t=>t.start===start);
    return {key:key(instance),file:view.file??view.analysis.file,start,end:token?.end??start};
  };
  const definitions=new Map(facts.definitions.map(d=>[d.id,d]));
  const macros=facts.macros.filter(m=>!m.call.macro).map(m=>{
    const definition=definitions.get(m.definitionID),at=anchor(m.call.expansionInstance,m.call.expansionByte);
    if(!definition||!at)return null;
    return {name:m.name,callId:m.id,definitionId:definition.id,definitionFile:definition.location.spellingFile??'',replacement:definition.replacement.map(t=>t.text).join(' '),arguments:m.arguments.map((a,i)=>({parameter:m.parameters[i]??String(i+1),text:a.map(t=>t.text).join(' ')})),anchor:at};
  }).filter(Boolean);
  const userFlags=(unit.args??[]).filter(a=>/^-[DU]/.test(a));
  const label=`${id+1}: ${unit.source.split(/[\\/]/).at(-1)}${userFlags.length?' ['+userFlags.join(' ')+']':''}`;
  const surface=(view,viewKey,title,history)=>({key:viewKey,label:label+' ／ '+title,source:view.analysis.source,text:view.reading.text,segments:view.reading.segments,reasons:view.reading.reasons??[],issues:[...view.reading.issues,...(expandedIssue?[expandedIssue.message]:[])],valid:view.analysis.valid,macros:history});
  const result=views.map(v=>surface(v,key(v.instance),((v.file??v.analysis.file).startsWith('/shi/input/')?(v.file??v.analysis.file).slice(11):(v.file??v.analysis.file).split(/[\\/]/).at(-1))+' #'+v.instance,macros.filter(m=>m.anchor.key===key(v.instance))));
  if(functionBody)return result.map(v=>v.key===key(entryInstance)?functionBodySurface(v,functionBody):v);
  if(!expanded)return result;
  const expandedSurface=surface(expanded,`${id}:expanded`,'マクロ展開後',macros);
  const map=sourceBoundaries(expanded.analysis.source);
  const origins=expanded.tokenOrigins.map(t=>({start:byteToUTF16(map,t.start),end:byteToUTF16(map,t.end),anchor:anchor(t.origin.expansionInstance,t.origin.expansionByte)})).filter(t=>t.anchor);
  expandedSurface.originAnchors=expanded.reading.segments.map(segment=>{
    const ranges=segment.ranges??[],found=new Map();
    for(const t of origins)if(ranges.some(r=>r.start<t.end&&t.start<r.end))found.set(t.anchor.key+':'+t.anchor.start,t.anchor);
    return [...found.values()];
  });
  result.push(expandedSurface);return result;
}
