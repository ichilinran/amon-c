import {createSurfaceBudget} from '../core/resource-budget.js';
import {contextSurfaces} from '../core/surfaces.js';
import {loadBrowserResources} from '../core/resources.js';
import {normalizeProject} from '../core/project.js';
import createModule from './out/shi-clang.mjs';
import {createWasmAnalyzer,browserSdkRoots} from '../core/wasm-runtime.js';
import {createTranslator,runProjectContexts} from '../core/pipeline.js';
let environment;
async function translator(){
 environment??=(async()=>{const resources=await loadBrowserResources();return {resources,translate:createTranslator({analyze:createWasmAnalyzer({createModule:o=>createModule(resources.createModuleOptions(o)),sdkFiles:resources.sdkFiles,resolveSdk:resources.resolveSdk}),sdkRoots:browserSdkRoots})};})();
 return environment;
}
self.onmessage=async({data})=>{
 try {
  const project=normalizeProject(data.project),setupStart=performance.now();
  const {translate}=await translator();const setupMilliseconds=Math.round(performance.now()-setupStart);
  const start=performance.now(),views=[],metrics=[],surfaceBudget=createSurfaceBudget();let valid=true;
  const contextErrors=await runProjectContexts(project,translate,result=>{
   const surfaces=contextSurfaces(result);
   surfaceBudget.accept(surfaces);
   valid&&=result.original.analysis.valid;views.push(...surfaces);metrics.push(result.metrics);
  });
  self.postMessage({ok:true,views,milliseconds:Math.round(performance.now()-start),setupMilliseconds,contexts:project.translationUnits.length,valid:valid&&!contextErrors.length,metrics,contextErrors});
 }catch(error){environment=null;self.postMessage({ok:false,error:error.message});}
};
