import {selectProjectView} from './project-view.js';
import {DEFAULT_WORDS} from '../vocabulary/settings.js';
import {translateAnalysis} from '../translation/native-reader.js';
import {normalizeProject} from './input.js';
import {loadProject} from '../compat/project-save.js';
import {contextSurfaces} from './surfaces.js';
import {projectLiteralNames} from '../analysis/literal-facts.js';
import {verifiedDocument} from '../compat/analysis-document.js';
import {readLearningSave} from '../compat/learning-save.js';
import {safeFilename} from './filenames.js';
export {saveImported} from '../compat/learning-save.js';
export async function importSaved(data){
  if(data?.format==='shi-browser-project')return {mode:'project',...await loadProject(data)};
  const state=data?.format==='c-kotoba-learning'?readLearningSave(data):{document:data,words:DEFAULT_WORDS,display:{annotations:true},selection:null,source:undefined};
  if(state.projectResult)return state.projectResult;
  let {document,words,display,selection,source}=state;
  const checked=await verifiedDocument(document);document=checked.document;
  const make=(analysis,native)=>{
    const current=native?{...analysis,nodes:projectLiteralNames(native,analysis.nodes)}:analysis;
    return {analysis:current,reading:translateAnalysis(current.source,current,words,display)};
  };
  let views,selected,selectedContext;
  if(checked.kind==='legacy') {
    const view=make(checked.document);
    views=[{key:'legacy:source',label:'旧解析：'+view.analysis.filename,source:view.analysis.source,text:view.reading.text,segments:view.reading.segments,reasons:view.reading.reasons??[],issues:view.reading.issues,valid:view.analysis.valid,macros:[]}];selected=views[0];
  }else {
    views=checked.document.contexts.flatMap(context=>contextSurfaces({id:context.id,unit:{source:checked.document.files.find(f=>f.id===context.mainFile).path,args:context.args},facts:context.native,views:context.views.map(v=>({instance:v.instance,file:v.analysis.file,...make(v.analysis,context.native)})),expanded:context.expandedViews?.length?{...context.expandedViews[0],...make(context.expandedViews[0].analysis,context.native)}:null}));
    const old=selectProjectView(checked,selection);selectedContext=old.context;
    selected=views.find(v=>v.key===(old.expanded?`${old.context.id}:expanded`:`${old.context.id}:source:${old.analysis.instance}`));
  }
  if(!selected)throw new Error('選択した原文がありません。');
  if(source!==undefined&&source!==selected.source)throw new Error('保存された入力と解析時の原文が一致しません。');
  const entry=safeFilename(selected.label.includes('マクロ展開後')?'source.c':selected.label.split(/[\\/]/).at(-1).replace(/ #\d+$/,''));
  // Editing this input starts a new analysis. Imported snapshots remain read-only.
  const original=checked.kind==='project'?selectedContext.views.find(v=>v.file===selectedContext.mainFile)?.analysis:checked.document;
  const filename=safeFilename(original?.filename??entry);
  return {mode:'analysis',views,selection:selected.key,document,words,display,project:normalizeProject({files:{[filename]:original?.source??selected.source},translationUnits:[{source:filename,args:[]}],words,display})};
}
