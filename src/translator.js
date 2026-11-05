import {normalizeInput,normalizeProject} from './project/input.js';
import {sha256} from './shared/hash.js';
import {physicalView,expandedView,sdkPolicy} from './analysis/projection.js';
import {MAX_EXPANDED_CHARACTERS,ExpandedViewLimitError} from './runtime/limits.js';
import {checkReadingView} from './project/analysis-format.js';
import {translateAnalysis} from './translation/native-reader.js';

// Exactly one semantic backend. Existing reading rules are deliberately reused.
export function createTranslator({analyze,sdkRoots,expandedCharacterLimit=MAX_EXPANDED_CHARACTERS}) {
  const isSdkPath=sdkPolicy(sdkRoots);
  return async function translate(request) {
    request=normalizeInput(request);
    const result=await analyze(request);
    const {native,entryInstance,flags,diagnostics=''}=result;
    if(native.format!=='shi-clang-cpp'||native.version!==1||native.truncated)throw new Error('Unsupported or truncated semantic report');
    if(native.sourceBuffers.find(b=>b.instance===entryInstance)?.text!==request.source)throw new Error('Semantic report does not match the input');
    if(Object.values(native).filter(Array.isArray).reduce((n,a)=>n+a.length,0)>250000||native.fileInstances.length>8192)throw new Error('解析情報が資源上限を超えました。');
    const options={flags,diagnostics,isSdkPath};
    const originalAnalysis=await physicalView(native,entryInstance,request.source,options);
    const views=[];
    for(const buffer of native.sourceBuffers) {
      const instance=native.fileInstances.find(i=>i.id===buffer.instance);
      if(!instance?.physicalFile||instance.systemHeader)continue;
      const analysis=buffer.instance===entryInstance?originalAnalysis:await physicalView(native,buffer.instance,buffer.text,options);
      checkReadingView(analysis);
      if(await sha256(new TextEncoder().encode(analysis.source))!==analysis.sha256)throw new Error('Source hash mismatch');
      views.push({instance:buffer.instance,file:instance.file,analysis,reading:translateAnalysis(analysis.source,analysis,request.words,request.display)});
    }
    const original=views.find(v=>v.instance===entryInstance);
    if(!original)throw new Error('The entry file has no physical reading view');

    // Expanded output is an optional display. Its failure cannot discard an
    // already checked physical-source reading, and has its own bounded budget.
    let expanded=null,expandedIssue=null;
    try {
      const view=await expandedView(native,{...options,maxCharacters:expandedCharacterLimit});
      checkReadingView(view.analysis);
      if(await sha256(new TextEncoder().encode(view.analysis.source))!==view.analysis.sha256)throw new Error('Source hash mismatch');
      expanded={...view,reading:translateAnalysis(view.analysis.source,view.analysis,request.words,request.display)};
    }catch(error) {
      expandedIssue={code:error instanceof ExpandedViewLimitError?error.code:'expanded-view-failed',message:error instanceof ExpandedViewLimitError?error.message:'マクロ展開後の表示を生成できませんでした。原文側の翻訳は表示できます。'};
    }
    return {original:{analysis:original.analysis,reading:original.reading},expanded,expandedIssue,facts:native,views,metrics:result.metrics??null};
  };
}

// A failed context is reported once, without losing earlier results or skipping
// later contexts. The consumer chooses whether to retain facts or UI surfaces.
export async function runProjectContexts(project,translate,consume) {
  const contextErrors=[];
  for(const [id,unit] of project.translationUnits.entries()) {
    try {
      const result=await translate({files:project.files,entry:unit.source,directory:unit.directory,args:unit.args,words:project.words,display:project.display});
      await consume({id,unit,...result});
    }catch(error) {
      contextErrors.push({id,unit,code:'context-analysis-failed',message:error instanceof Error?error.message:'解析に失敗しました。'});
    }
  }
  return contextErrors;
}

export function createProjectTranslator(dependencies) {
  const translate=createTranslator(dependencies);
  return async function translateProject(input) {
    const project=normalizeProject(input),contexts=[];
    const contextErrors=await runProjectContexts(project,translate,result=>contexts.push(result));
    return {project,contexts,contextErrors};
  };
}
