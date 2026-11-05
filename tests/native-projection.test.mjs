import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {physicalView,expandedView,sdkPolicy} from '../src/analysis/projection.js';
import {createTranslator} from '../src/translator.js';
import {translateAnalysis} from '../src/translation/native-reader.js';
import {analyze,sdkRoots} from './native-runtime.mjs';
const baseline=path.resolve(process.env.SHI_BASELINE??fileURLToPath(new URL('../reference/',import.meta.url)));
const isSdkPath=sdkPolicy(sdkRoots);
const withoutDeclarationSyntax=view=>{const {declarationSyntax,...unchanged}=view;return unchanged;};
import cases from './cases.mjs';
for(const [name,source] of Object.entries(cases))test('fresh Clang → new projection → reading: '+name,async()=>{
  let captured;
  const translate=createTranslator({sdkRoots,analyze:async r=>(captured=await analyze(r))});
  const result=await translate({source});
  const oracle=spawnSync('python3',[fileURLToPath(new URL('./oracle.py',import.meta.url)),baseline],{input:JSON.stringify({...captured,source}),encoding:'utf8',maxBuffer:64*1024*1024});
  assert.equal(oracle.status,0,oracle.stderr);const expected=JSON.parse(oracle.stdout);
  assert.deepEqual(withoutDeclarationSyntax(result.original.analysis),expected.original);
  const {reading,...expanded}=result.expanded;assert.deepEqual({...expanded,analysis:withoutDeclarationSyntax(expanded.analysis)},expected.expanded);
  assert.deepEqual(result.original.reading,translateAnalysis(source,expected.original));
  assert.deepEqual(reading,translateAnalysis(expected.expanded.analysis.source,expected.expanded.analysis));
  if(name==='standard')assert.ok(result.original.reading.text.includes('ﾍｲﾎｳｺﾝ'));
  if(name==='shadow')assert.ok(result.original.reading.text.includes('sqrt'));
  assert.equal(result.original.analysis.valid,!['invalid','missing'].includes(name));
  if(!['invalid','missing'].includes(name))assert.ok(result.original.reading.transformed>0);
  if(name==='unicode')assert.ok(result.original.reading.text.includes('日本語 😀'));
});

test('SDK ownership is explicit and respects path boundaries',()=>{
  const trusted=sdkPolicy(['/sdk/include']);
  assert.equal(trusted('/sdk/include/math.h'),true);
  for(const file of ['/sdk/include-evil/math.h','/sdk/include/../user/math.h','/project/math.h','sdk/include/math.h'])assert.equal(trusted(file),false);
});
test('changed source and truncated reports are rejected before rendering',async()=>{
  const result=await analyze({source:cases.basic});
  await assert.rejects(createTranslator({sdkRoots,analyze:async()=>result})({source:cases.basic+' '}),/does not match/);
  await assert.rejects(createTranslator({sdkRoots,analyze:async()=>({...result,native:{...result.native,truncated:true}})})({source:cases.basic}),/truncated/);
});

test('all stored v2 examples: physical and expanded projections match exactly',async()=>{
  const root=new URL('../examples/analysis/',import.meta.url);let documents=0,views=0;
  for(const filename of (await readdir(root)).filter(f=>f.endsWith('.json'))) {
    const document=JSON.parse(await readFile(new URL(filename,root),'utf8'));
    if(document.version!==2 || !document.contexts)continue;
    documents++;
    for(const context of document.contexts) {
      // The historical oracle trusted these exact native SDK roots.
      const roots=['/usr/include',...context.args.filter(f=>f.startsWith('-isystem')).map(f=>f.slice(8))];
      const options={flags:context.args,diagnostics:context.nativeDiagnostics??'',isSdkPath:sdkPolicy(roots)};
      for(const row of context.views) {
        const source=document.files.find(f=>f.id===row.file).text;
        const actual=await physicalView(context.native,row.instance,source,options);
        assert.deepEqual(withoutDeclarationSyntax(actual),row.analysis,filename+': physical');
        for(const annotations of [true,false])assert.deepEqual(translateAnalysis(source,actual,undefined,{annotations}),translateAnalysis(source,row.analysis,undefined,{annotations}));
        views++;
      }
      const actual=await expandedView(context.native,options);
      assert.deepEqual({...actual,analysis:withoutDeclarationSyntax(actual.analysis)},context.expandedViews[0],filename+': expanded');
      assert.deepEqual(translateAnalysis(actual.analysis.source,actual.analysis),translateAnalysis(context.expandedViews[0].analysis.source,context.expandedViews[0].analysis));views++;
    }
  }
  assert.ok(documents>=2);assert.ok(views>=60);
  await writeFile(new URL('../comparison-counts.json',import.meta.url),JSON.stringify({documents,views,freshCases:Object.keys(cases).length},null,2)+'\n');
});
