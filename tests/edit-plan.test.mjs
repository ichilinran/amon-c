import test from 'node:test';
import assert from 'node:assert/strict';
import {createEditPlan,reviseEdit,resolveEditPlans,composeReadingPlans,applyReadingEdits,isStandardMacroEdit} from '../src/translation/edit-plan.js';
import {planUsageReadings} from '../src/translation/usage-reading.js';
import {DEFAULT_WORDS} from '../src/vocabulary/reading-config.js';
const edit=(start,end,text,extra={})=>({start,end,text,kind:'translation',operation:'replacement',ranges:[{start,end}],note:'説明',order:0,...extra});

test('plans own immutable copies of proposals, anchors and semantic bindings',()=>{
 const input=edit(0,1,'A',{binding:{kind:'standard-macro',name:'NULL'}}),items=[input];
 const plan=createEditPlan('names',items);input.text='B';input.ranges[0].end=99;input.binding.name='changed';items.push(edit(1,2,'C'));
 assert.equal(plan.edits[0].text,'A');assert.equal(plan.edits[0].ranges[0].end,1);assert.equal(plan.edits[0].binding.name,'NULL');assert.equal(plan.edits.length,1);
 assert.throws(()=>{plan.edits[0].text='C';});assert.throws(()=>{plan.edits[0].ranges[0].end=2;});assert.throws(()=>plan.edits.push(input));
});

test('explicit revisions and suppressions are applied centrally without changing earlier rule output',()=>{
 const names=createEditPlan('names',[edit(0,1,'A'),edit(1,2,'B')]);
 const updates=createEditPlan('postfix',[edit(2,2,'X',{operation:'move',ranges:[{start:0,end:1}]})],[reviseEdit(names.edits[0],{text:'',kind:'removed',operation:'move'}),reviseEdit(names.edits[1],null)]);
 const composed=composeReadingPlans('ab',[names,updates]);assert.deepEqual(composed.diagnostics,[]);assert.equal(composed.reading.text,'bX');
 assert.equal(names.edits[0].text,'A');assert.equal(names.edits[1].text,'B');
 assert.deepEqual(resolveEditPlans([names,updates]).edits[0].revisedBy,['postfix']);
});

test('same-position insertions use explicit order before replacement and never sort the caller array',()=>{
 const source='a',items=[edit(0,1,'A'),edit(0,0,'2',{operation:'guide',order:2}),edit(0,0,'1',{operation:'guide',order:1})];
 const before=JSON.stringify(items);const result=applyReadingEdits(source,items);
 assert.equal(result.text,'12A');assert.equal(JSON.stringify(items),before);
 assert.equal(result.segments.some(s=>'ruleId' in s||'proposalId' in s),false);
});

test('overlaps and insertions strictly inside a replacement preserve the whole original with structured diagnostics',()=>{
 for(const items of [[edit(0,2,'A'),edit(1,3,'B')],[edit(0,3,'A'),edit(1,1,'X',{operation:'guide'})]]){
  const result=composeReadingPlans('abc',[createEditPlan('rules',items)]);
  assert.equal(result.reading.text,'abc');assert.equal(result.reading.transformed,0);assert.equal(result.diagnostics[0].code,'edit-overlap');assert.equal(result.diagnostics[0].ruleId,'rules');
 }
});

test('unknown targets, duplicate IDs and duplicate revisions are failures, not silent precedence rules',()=>{
 const base=createEditPlan('base',[edit(0,1,'A')]);
 const unknown=createEditPlan('unknown',[],[{target:'missing',replacement:null}]);
 assert.equal(composeReadingPlans('a',[base,unknown]).diagnostics[0].code,'unknown-revision-target');
 assert.equal(composeReadingPlans('a',[base,base]).diagnostics[0].code,'duplicate-edit-id');
 const duplicate=createEditPlan('twice',[],[reviseEdit(base.edits[0],{text:'B'}),reviseEdit(base.edits[0],{text:'C'})]);
 assert.equal(composeReadingPlans('a',[base,duplicate]).diagnostics[0].code,'duplicate-revision');
 assert.equal(composeReadingPlans('a',[base,duplicate]).reading.text,'a');
});

test('invalid ranges, invalid priorities and split Unicode scalars are rejected before rendering',()=>{
 for(const item of [edit(-1,1,'X'),edit(0,4,'X'),edit(0,1,'X',{ranges:[{start:0,end:4}]}),edit(0,1,'X',{order:NaN}),edit(1,2,'X'),edit(0,2,'X',{operation:'guessed'})]){
  const result=composeReadingPlans('😀a',[createEditPlan('bad',[item])]);assert.equal(result.reading.text,'😀a');assert.equal(result.diagnostics[0].code,'invalid-edit');
 }
});

test('display notes do not choose operations or macro recognition',()=>{
 const a=composeReadingPlans('a',[createEditPlan('plain',[edit(0,1,'X',{operation:undefined,note:'移動して一つずつ表示'})])]);
 assert.equal(a.reading.segments[0].operation,'replacement');
 assert.equal(isStandardMacroEdit({note:'標準マクロ名 NULL'},'NULL'),false);
 assert.equal(isStandardMacroEdit({note:'説明を変更',binding:{kind:'standard-macro',name:'NULL'}},'NULL'),true);
});

test('postfix usage requests a revision of a frozen name plan and its output ignores the explanatory label',()=>{
 const source='alignof(int)',tokens=[{spelling:'alignof',kind:'IDENTIFIER',start:0,end:7},{spelling:'(',kind:'PUNCTUATION',start:7,end:8},{spelling:'int',kind:'KEYWORD',start:8,end:11},{spelling:')',kind:'PUNCTUATION',start:11,end:12}];
 const names=createEditPlan('names',[edit(0,7,DEFAULT_WORDS['library:alignof'],{note:'説明は自由',binding:{kind:'standard-macro',name:'alignof'}})]);
 const before=JSON.stringify(names);
 const usage=planUsageReadings(source,{tokens,nodes:[]},DEFAULT_WORDS,{heads:[{key:'library:alignof',source:'alignof',start:0}],existingEdits:names.edits});
 const result=composeReadingPlans(source,[names,usage.plan]);
 assert.deepEqual(result.diagnostics,[]);assert.equal(result.reading.text,'(int ﾉ) ﾉﾊｲﾁ');assert.equal(JSON.stringify(names),before);assert.equal(usage.plan.revisions.length,1);
});
