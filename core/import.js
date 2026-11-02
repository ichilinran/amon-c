import {physicalView,expandedView,sdkPolicy} from './projection.js';
import {checkDocument} from '../reference/dist/project-analysis.js';
import {selectProjectView} from '../reference/dist/project-view.js';
import {restoreWords,DEFAULT_WORDS,VOCABULARY_VERSION,validateWords} from '../reference/dist/reading-config.js';
import {translateAnalysis} from '../reference/dist/native-reader.js';
import {sha256} from './hash.js';
import {normalizeProject,loadProject} from './project.js';
import {contextSurfaces} from './surfaces.js';

async function verifyHash(source,expected){
  if(await sha256(new TextEncoder().encode(source))!==expected)throw new Error('解析データの原文と確認値が一致しません。');
}
function sameDerived(a,b){
 if(a===b)return true;
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;
 const keys=Object.keys(a);if(keys.length!==Object.keys(b).length)return false;
 return keys.every(key=>Object.hasOwn(b,key)&&sameDerived(a[key],b[key]));
}
async function verifiedDocument(data){
  // Work on a copy only when upgrading old derived metadata.
  if(data?.contexts?.some(c=>[...c.views,...(c.expandedViews??[])].some(v=>v.analysis?.declarationSyntax?.version===1)))data=structuredClone(data);
  const result=checkDocument(data);
  if(result.kind==='legacy'){
    if(data.declarationSyntax!==undefined)throw new Error('宣言の派生情報を照合するClangの記録がありません。');
    await verifyHash(data.source,data.sha256);
  }
  else {
    for(const file of data.files)if(file.text!==null)await verifyHash(file.text,file.sha256);
    for(const context of data.contexts){
     for(const row of [...context.views,...(context.expandedViews??[])])await verifyHash(row.analysis.source,row.analysis.sha256);
     const roots=['/usr/include',...context.args.filter(a=>a.startsWith('-isystem')).map(a=>a.slice(8))];
     const options={flags:context.args,diagnostics:context.nativeDiagnostics??'',isSdkPath:sdkPolicy(roots)};
     async function verifyDerived(row,expanded){
      const saved=row.analysis.declarationSyntax;if(!saved)return;
      const settings={...options,declarationSyntaxVersion:saved.version};
      const regenerated=expanded?(await expandedView(context.native,settings)).analysis:await physicalView(context.native,row.instance,row.analysis.source,settings);
      if(!sameDerived(saved,regenerated.declarationSyntax))throw new Error('保存された宣言の派生情報がClangの記録と一致しません。');
      if(saved.version===1){const current=expanded?(await expandedView(context.native,options)).analysis:await physicalView(context.native,row.instance,row.analysis.source,options);row.analysis.declarationSyntax=current.declarationSyntax;}
     }
     for(const row of context.views)await verifyDerived(row,false);
     for(const row of context.expandedViews??[])await verifyDerived(row,true);
    }
  }
  return result;
}
const safeFilename=name=>{
  const base=typeof name==='string'?name.split(/[\\/]/).at(-1):'source.c';
  return base&&!/[\0\r\n:]/.test(base)&&!['.','..'].includes(base)?base:'source.c';
};
export async function importSaved(data){
  if(data?.format==='shi-browser-project')return {mode:'project',...await loadProject(data)};
  let document=data,words=DEFAULT_WORDS,display={annotations:true},selection=null,source;
  if(data?.format==='c-kotoba-learning') {
    if(data.version!==1||typeof data.source!=='string'||data.source.length>40000||data.vocabularyVersion!=null&&(!Number.isInteger(data.vocabularyVersion)||data.vocabularyVersion<1||data.vocabularyVersion>VOCABULARY_VERSION))throw new Error('旧学習保存形式が不正です。');
    if(data.analysisDocument&&data.analysis)throw new Error('解析データが重複しています。');
    words=restoreWords(data.words??{},data.vocabularyVersion??1);display.annotations=data.annotations!==false;source=data.source;
    document=data.analysisDocument??data.analysis;
    selection=data.analysisView??null;
    if(!document) {
      const entry=safeFilename(data.filename);
      return {mode:'project',selection:null,project:normalizeProject({files:{[entry]:source},translationUnits:[{source:entry,args:[]}],words,display})};
    }
  }
  const checked=await verifiedDocument(document);document=checked.document;
  const make=analysis=>({analysis,reading:translateAnalysis(analysis.source,analysis,words,display)});
  let views,selected,selectedContext;
  if(checked.kind==='legacy') {
    const view=make(checked.document);
    views=[{key:'legacy:source',label:'旧解析：'+view.analysis.filename,source:view.analysis.source,text:view.reading.text,segments:view.reading.segments,reasons:view.reading.reasons??[],issues:view.reading.issues,valid:view.analysis.valid,macros:[]}];selected=views[0];
  }else {
    views=checked.document.contexts.flatMap(context=>contextSurfaces({id:context.id,unit:{source:checked.document.files.find(f=>f.id===context.mainFile).path,args:context.args},facts:context.native,views:context.views.map(v=>({instance:v.instance,file:v.analysis.file,...make(v.analysis)})),expanded:context.expandedViews?.length?{...context.expandedViews[0],...make(context.expandedViews[0].analysis)}:null}));
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
export function saveImported(imported,selection,words=imported.words,display=imported.display){
  const view=imported.views.find(v=>v.key===selection);if(!view)throw new Error('保存する表示がありません。');
  const doc=imported.document;
  let analysisView;
  if(doc.version===2){
    const [contextId,kind,instance]=selection.split(':');const context=doc.contexts.find(c=>c.id===Number(contextId));
    analysisView=kind==='expanded'?`${contextId}:expanded:0`:`${contextId}:source:${context.views.findIndex(v=>v.instance===Number(instance))}`;
  }
  return {format:'c-kotoba-learning',version:1,vocabularyVersion:VOCABULARY_VERSION,source:view.source,filename:'source.c',words:validateWords(words),annotations:display.annotations!==false,...(doc.version===2?{analysisDocument:doc,analysisView}:{analysis:doc})};
}
