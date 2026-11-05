import {physicalView,expandedView,sdkPolicy} from '../analysis/projection.js';
import {checkDocument} from '../project/project-analysis.js';
import {sha256} from '../shared/hash.js';
async function verifyHash(source,expected){
  if(await sha256(new TextEncoder().encode(source))!==expected)throw new Error('解析データの原文と確認値が一致しません。');
}
function sameDerived(a,b){
 if(a===b)return true;
 if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;
 const keys=Object.keys(a);if(keys.length!==Object.keys(b).length)return false;
 return keys.every(key=>Object.hasOwn(b,key)&&sameDerived(a[key],b[key]));
}
export async function verifiedDocument(data){
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
