import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createProjectTranslator} from '../src/translator.js';
import {contextSurfaces} from '../src/project/surfaces.js';
import {analyze,sdkRoots} from './native-runtime.mjs';
test('new analysis surfaces expose bounded macro anchors and recorded call-time definitions',async()=>{
 const project=JSON.parse(await readFile(new URL('../examples/project-acceptance.json',import.meta.url),'utf8'));
 const result=await createProjectTranslator({analyze,sdkRoots})(project);
 const views=result.contexts.flatMap(contextSurfaces);
 assert.equal(views.length,16);
 const expanded=views.find(v=>v.key==='2:expanded');assert.ok(expanded.originAnchors.some(a=>a.length));
 const history=expanded.macros.filter(m=>m.name==='CREATE_SLOT');assert.ok(history.length);
 assert.ok(history[0].replacement.length);assert.ok(history[0].arguments.length);
 for(const view of views)for(const row of view.originAnchors??[])for(const a of row){const target=views.find(v=>v.key===a.key);assert.ok(target);assert.ok(a.start>=0&&a.end>=a.start&&a.end<=target.source.length);}
 const source=views.find(v=>v.key==='2:source:1');assert.ok(source.reasons.length);assert.ok(source.macros.length);
});
