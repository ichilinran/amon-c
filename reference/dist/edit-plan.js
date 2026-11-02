// Rule output is immutable data. Only this module applies explicit revisions,
// orders candidates and checks conflicts. Human-readable notes are never policy.
const OPERATIONS=new Set(['replacement','move','guide','layout','split']);
const HIDDEN=new Set(['proposalId','ruleId','binding','revisedBy']);
const cloneFreeze=value=>{
  if(Array.isArray(value))return Object.freeze(value.map(cloneFreeze));
  if(value&&typeof value==='object')return Object.freeze(Object.fromEntries(Object.entries(value).map(([key,item])=>[key,cloneFreeze(item)])));
  return value;
};
const defaultOperation=kind=>kind==='annotation'?'guide':kind==='layout'?'layout':'replacement';
export function createEditPlan(ruleId,edits=[],revisions=[]) {
  if(typeof ruleId!=='string'||!ruleId)throw new Error('An edit plan needs a rule ID');
  return Object.freeze({ruleId,
    edits:Object.freeze(edits.map((edit,index)=>cloneFreeze({...edit,operation:edit.operation??defaultOperation(edit.kind),ruleId,proposalId:`${ruleId}:${index}`}))),
    revisions:cloneFreeze(revisions),
  });
}
export function reviseEdit(edit,changes) {
  return {target:edit.proposalId,replacement:changes===null?null:{...edit,...changes}};
}
export function resolveEditPlans(plans) {
  const ids=[],seenIds=new Set(),byId=new Map(),diagnostics=[];
  for(const plan of plans) {
    const revised=new Set();
    for(const revision of plan.revisions) {
      const previous=byId.get(revision.target);
      if(!previous||revised.has(revision.target)) {
        diagnostics.push({code:previous?'duplicate-revision':'unknown-revision-target',ruleId:plan.ruleId,target:revision.target??null});continue;
      }
      revised.add(revision.target);
      if(revision.replacement===null)byId.delete(revision.target);
      else byId.set(revision.target,cloneFreeze({...revision.replacement,proposalId:previous.proposalId,ruleId:previous.ruleId,revisedBy:[...(previous.revisedBy??[]),plan.ruleId]}));
    }
    for(const edit of plan.edits) {
      if(seenIds.has(edit.proposalId)) {diagnostics.push({code:'duplicate-edit-id',ruleId:plan.ruleId,proposalId:edit.proposalId});continue;}
      ids.push(edit.proposalId);seenIds.add(edit.proposalId);byId.set(edit.proposalId,edit);
    }
  }
  return {edits:Object.freeze(ids.filter(id=>byId.has(id)).map(id=>byId.get(id))),diagnostics:Object.freeze(diagnostics)};
}
export function originalReading(source,message) {
  return {text:source,segments:[{text:source,start:0,end:source.length,kind:'raw',ranges:[{start:0,end:source.length}]}],issues:message?[message]:[],transformed:0,partial:!!message};
}
const conflictMessage='表示規則の重なり・位置不整合を検出したため、原文を表示しています。';
const visibleEdit=edit=>Object.fromEntries(Object.entries(edit).filter(([key])=>!HIDDEN.has(key)));
export function composeReadingPlans(source,plans,issues=[],transformed) {
  const resolved=resolveEditPlans(plans),diagnostics=[...resolved.diagnostics];
  const edits=[...resolved.edits].sort((a,b)=>a.start-b.start||(a.end===a.start?-1:1)-(b.end===b.start?-1:1)||(a.order??0)-(b.order??0));
  const segments=[];let cursor=0,previous=null;
  for(const edit of edits) {
    const boundary=at=>!(at>0&&at<source.length&&source.charCodeAt(at)>=0xdc00&&source.charCodeAt(at)<=0xdfff&&source.charCodeAt(at-1)>=0xd800&&source.charCodeAt(at-1)<=0xdbff);
    const span=range=>range&&Number.isInteger(range.start)&&Number.isInteger(range.end)&&range.start>=0&&range.end>=range.start&&range.end<=source.length&&boundary(range.start)&&boundary(range.end);
    if(!span(edit)||typeof edit.text!=='string'||!Array.isArray(edit.ranges)||!edit.ranges.every(span)||!OPERATIONS.has(edit.operation)||!Number.isFinite(edit.order??0)) {
      diagnostics.push({code:'invalid-edit',ruleId:edit.ruleId,proposalId:edit.proposalId});break;
    }
    if(edit.start<cursor) {
      diagnostics.push({code:'edit-overlap',ruleId:edit.ruleId,proposalId:edit.proposalId,previous:previous?.proposalId??null});break;
    }
    if(edit.start>cursor)segments.push({text:source.slice(cursor,edit.start),start:cursor,end:edit.start,kind:'raw',ranges:[{start:cursor,end:edit.start}]});
    if(edit.text)segments.push(visibleEdit(edit));
    cursor=edit.end;previous=edit;
  }
  if(diagnostics.length)return {reading:originalReading(source,conflictMessage),diagnostics};
  if(cursor<source.length)segments.push({text:source.slice(cursor),start:cursor,end:source.length,kind:'raw',ranges:[{start:cursor,end:source.length}]});
  return {reading:{text:segments.map(s=>s.text).join(''),segments,issues:[...new Set(issues)],transformed:transformed??edits.filter(e=>e.kind==='translation'&&e.text).length,partial:!!issues.length},diagnostics:[]};
}
// Compatibility for callers that already provide a flat candidate list. No
// sorting in place, shared-object writes, or operation inference from notes.
export function applyReadingEdits(source,edits,issues=[],transformed=0) {
  return composeReadingPlans(source,[createEditPlan('flat-reading',edits)],issues,transformed).reading;
}
export function isStandardMacroEdit(edit,name) {
  return edit.binding?.kind==='standard-macro'&&edit.binding.name===name;
}
