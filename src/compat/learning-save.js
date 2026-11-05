import {DEFAULT_WORDS,VOCABULARY_VERSION,validateWords} from '../vocabulary/settings.js';
import {restoreWords} from './word-settings.js';
import {normalizeProject} from '../project/input.js';
import {safeFilename} from '../project/filenames.js';
export function readLearningSave(data){
 let document,words=DEFAULT_WORDS,display={annotations:true},selection=null,source;
  if(data.version!==1||typeof data.source!=='string'||data.source.length>40000||data.vocabularyVersion!=null&&(!Number.isInteger(data.vocabularyVersion)||data.vocabularyVersion<1||data.vocabularyVersion>VOCABULARY_VERSION))throw new Error('旧学習保存形式が不正です。');
  if(data.analysisDocument&&data.analysis)throw new Error('解析データが重複しています。');
  words=restoreWords(data.words??{},data.vocabularyVersion??1);display.annotations=data.annotations!==false;source=data.source;
  document=data.analysisDocument??data.analysis;
  selection=data.analysisView??null;
  if(!document) {
    const entry=safeFilename(data.filename);
    return {projectResult:{mode:'project',selection:null,project:normalizeProject({files:{[entry]:source},translationUnits:[{source:entry,args:[]}],words,display})}};
  }
 return {document,words,display,selection,source};
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
