import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {CALL_PROFILES} from '../src/translation/usage-profiles.js';
// Fixed current argument and statement configuration.
// Development annotations are not runtime policy fields.
const expected='a6dad5b48022f3410856b0231ee1689bbf8058d8b2af98e682c006692c262d98';
test('runtime policies preserve all effective settings without development evidence',()=>{
 assert.equal(Object.keys(CALL_PROFILES).length,560);
 const inspect=v=>{if(!v||typeof v!=='object')return;for(const [key,value] of Object.entries(v)){assert(!['provenance','nested_suffix','notes'].includes(key),key);inspect(value);}};inspect(CALL_PROFILES);
 const canonical=JSON.stringify(CALL_PROFILES,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.entries(v).sort(([a],[b])=>a.localeCompare(b))):v);
 assert.equal(createHash('sha256').update(canonical).digest('hex'),expected);
});
