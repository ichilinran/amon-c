import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {sha256Portable} from '../src/shared/hash.js';
test('portable SHA-256 agrees with Node crypto at padding and Unicode boundaries',()=>{
 for(const size of [0,1,55,56,63,64,65,127,128,4096,40000]){
  const bytes=Uint8Array.from({length:size},(_,i)=>(i*37+17)%256);
  assert.equal(sha256Portable(bytes),createHash('sha256').update(bytes).digest('hex'));
 }
 const bytes=new TextEncoder().encode('日本語 😀\n');
 assert.equal(sha256Portable(bytes),createHash('sha256').update(bytes).digest('hex'));
});
