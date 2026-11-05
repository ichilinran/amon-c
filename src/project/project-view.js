import {byteToUTF16,sourceBoundaries} from './project-analysis.js';
export function projectChoices(result){
 if(result.kind==='legacy')return [];
 return result.document.contexts.flatMap(c=>[
  ...c.views.map((v,i)=>({key:`${c.id}:source:${i}`,context:c.id,kind:'source',index:i,label:`${c.id+1}：${v.analysis.filename}（読込み ${v.instance??i+1}）`})),
  ...(c.expandedViews??[]).map((v,i)=>({key:`${c.id}:expanded:${i}`,context:c.id,kind:'expanded',index:i,label:`${c.id+1}：マクロ展開後の補助表示`}))]);
}
export function selectProjectView(result,key){
 if(result.kind==='legacy')return {analysis:result.document,expanded:null,context:null,key:null};
 const choices=projectChoices(result),choice=key?choices.find(c=>c.key===key):choices.find(c=>c.context===result.document.selectedContext&&c.kind==='source'&&result.document.contexts.find(x=>x.id===c.context).views[c.index].file===result.document.contexts.find(x=>x.id===c.context).mainFile);
 if(!choice)throw new Error('選択した表示がありません。');
 const context=result.document.contexts.find(c=>c.id===choice.context),row=(choice.kind==='source'?context.views:context.expandedViews)[choice.index];
 return {analysis:row.analysis,expanded:choice.kind==='expanded'?row:null,context,key:choice.key};
}
// A macro token is anchored to its outer call. This does not claim its exact
// contributing characters, which can have multiple origins (#, ##, arguments).
export function expandedAnchors(result,selection,ranges){
 if(!selection.expanded)return [];
 const map=sourceBoundaries(selection.analysis.source),context=selection.context,seen=new Set(),anchors=[];
 for(const t of selection.expanded.tokenOrigins){
  const start=byteToUTF16(map,t.start),end=byteToUTF16(map,t.end);
  if(!ranges.some(r=>r.start<end&&start<r.end))continue;
  const p=t.origin,id=p.expansionInstance,byte=p.expansionByte;
  const binding=context.instanceFiles.find(r=>r.instance===id),file=result.document.files.find(f=>f.id===binding?.file);
  if(!file||file.text===null)continue;
  const key=id+':'+byte;if(seen.has(key))continue;seen.add(key);
  const boundary=sourceBoundaries(file.text),at=byteToUTF16(boundary,byte);
  const sourceView=context.views.find(v=>v.instance===id);const token=sourceView?.analysis.tokens.find(t=>t.start===at);
  const viewIndex=context.views.indexOf(sourceView);if(viewIndex<0)continue;
  const call=context.native.macros.find(m=>!m.call.macro&&m.call.expansionInstance===id&&m.call.expansionByte===byte);
  anchors.push({key:`${context.id}:source:${viewIndex}`,file:file.path,start:at,end:token?.end??at,macro:p.macro,definition:call?.definitionID??null,call:call?.id??null});
 }
 return anchors;
}
