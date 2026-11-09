import {createEditPlan,reviseEdit,isStandardMacroEdit} from './edit-plan.js';
import {createSourceIndex} from './source-index.js';
import {CALL_PROFILES} from './usage-profiles.js';
import {literalFormat} from './format-literal.js';
export {literalFormat} from './format-literal.js';

// C17 format role reader. Unknown extensions leave variadic arguments unlabelled.
export function formatRoles(format,mode){
 if(typeof format!=='string')return null;
 const roles=[];
 for(let i=0;i<format.length;){
  if(format[i++]!=='%')continue;
  const at=i-1,tail=format.slice(at);
  if(mode==='printf'){
   const m=/^%([-+ #0]*)(\*|\d*)(?:\.(\*|\d*))?(hh|ll|[hljztL])?([diouxXfFeEgGaAcspn%])/.exec(tail);
   if(!m)return null;
   const [,flags,width,precision,,conversion]=m;
   if(conversion==='%'){if(m[0]!=='%%')return null;}
   else {
    if(conversion==='n'&&(flags||width||precision!==undefined))return null;
    if(width==='*')roles.push('width');
    if(precision==='*')roles.push('precision');
    roles.push(conversion==='n'?'output_count':'output_value');
   }
   i=at+m[0].length;
  }else if(mode==='scanf'){
   if(tail.startsWith('%%')){i=at+2;continue;}
   const m=/^%(\*)?(\d*)(hh|ll|[hljztL])?/.exec(tail);
   if(!m)return null;
   let j=at+m[0].length;const c=format[j];
   if(c==='['){
    j++;if(format[j]==='^')j++;if(format[j]===']')j++;
    j=format.indexOf(']',j);if(j<0)return null;
   }else if(!c||!'diouxXfFeEgGaAcspn'.includes(c))return null;
   if(c==='n'&&(m[1]||m[2]))return null;
   if(!m[1])roles.push(c==='n'?'input_count':'input_destination');
   i=j+1;
  }else return null;
 }
 return roles;
}
const roleSuffix={width:'ﾉﾊﾊﾞﾃﾞ',precision:'ﾉｾｲﾄﾞﾃﾞ',output_count:'ﾆ',input_count:'ﾆ',input_destination:'ﾆ',output_value:'ｦ'};


export function argumentSpecs(profile,args,{format=null,isNull=()=>false,isVerbCall=()=>false}={}){
 const fixed=profile.parameters.length;
 if(args.length<fixed||!profile.variadic&&args.length!==fixed)return args.map(()=>({}));
 const specs=profile.parameters.map(p=>({...p}));
 if(profile.variadic){
  const roles=formatRoles(format,profile.format_mode),rest=args.length-fixed;
  // With no values, even an unknown format is read as the displayed content.
  // A known value-consuming format with missing arguments is not this case.
  const content=profile.format_mode==='printf'&&Object.hasOwn(profile,'content_suffix')&&
   (roles!==null&&roles.length===0||format===null&&rest===0);
  if(content)specs[profile.format_index]={...specs[profile.format_index],suffix:profile.content_suffix};
  else if(roles===null)specs[profile.format_index]={};
  specs.push(...(roles&&roles.length<=rest?roles.map(role=>({suffix:roleSuffix[role]})):[]));
  while(specs.length<args.length)specs.push({});
 }
 const omit=new Set();
 for(const rule of profile.conditional_omit??[])if(isNull(rule.if_null_argument))for(const i of rule.omit_supplements_for)omit.add(i);
 return specs.map((spec,i)=>{
  if(omit.has(i)||spec.kind?.startsWith('optional')&&isNull(i))return {};
  if(spec.suffix==='ｦ'&&isVerbCall(i))return {...spec,suffix:''};
  return spec;
 });
}

// Heads have already passed the standard-name binding/SDK checks. Physical token
// boundaries preserve every expression, comment and original delimiter exactly once.
export function planUsageReadings(source,snapshot,words,{heads,existingEdits,annotations=true,sourceIndex=createSourceIndex(source,snapshot.tokens),recovery=null}){
 const tokens=sourceIndex.significant,pairs=sourceIndex.pairs,edits=[],revisions=[],calls=[];
 const headPositions=new Set();
 for(const head of heads){
  const profile=CALL_PROFILES[head.key],i=sourceIndex.indexAt(head.start);
  let designator=i,open=i+1;
  while(tokens[open]?.spelling===')'&&pairs.get(designator-1)===open){designator--;open++;}
  const end=pairs.get(open);
  if(designator!==i&&!snapshot.nodes.some(n=>n.kind==='CALL_EXPR'&&n.start===tokens[designator].start&&n.end===tokens[end]?.end))continue;
  if(!profile||headPositions.has(head.start)||tokens[open]?.spelling!=='('||end===undefined)continue;
  const split=sourceIndex.partition(open+1,end);
  const parts=split.parts.filter(p=>p.start!==p.end);
  const bad=split.crossesBoundary||(parts.length!==split.parts.length&&!(split.parts.length===1&&parts.length===0));
  const args=parts.map(p=>tokens.slice(p.start,p.end));
  if(bad||recovery?.structurallyUncertain({start:tokens[designator].start,end:tokens[end].end}))continue;
  headPositions.add(head.start);
  calls.push({...head,nameStart:head.start,profile,args,start:tokens[designator].start,end:tokens[end].end,open:tokens[open],close:tokens[end]});
 }
 const uncertain=arg=>arg?.length&&recovery?.uncertain({start:arg[0].start,end:arg.at(-1).end});
 const staticFormat=arg=>{
  if(!arg?.length||uncertain(arg))return null;
  const literal=physical(arg)?literalFormat(arg):null;if(literal!==null)return literal;
  // Standard PRI/SCN fragments determine the conversion role even when the
  // current project AST does not carry a literal value. Binding is mandatory.
  if(physical(arg)){
   const fragments=arg.map(t=>{
    const m=/^(?:PRI|SCN)([diouxX])(?:8|16|32|64|MAX|PTR|(?:LEAST|FAST)(?:8|16|32|64))$/.exec(t.spelling);
    return m&&existingEdits.some(e=>e.start===t.start&&e.end===t.end&&isStandardMacroEdit(e,t.spelling))?{...t,kind:'LITERAL',spelling:JSON.stringify(m[1])}:t;
   });
   const format=literalFormat(fragments);if(format!==null)return format;
  }
  const literalOnly=n=>{
   for(let p=snapshot.nodes[n.parent];p&&p.start>=arg[0].start&&p.end<=arg.at(-1).end;p=snapshot.nodes[p.parent]){
    if(!['UNEXPOSED_EXPR','PAREN_EXPR'].includes(p.kind))return false;
   }
   return true;
  };
  const values=snapshot.nodes.filter(n=>n.kind==='STRING_LITERAL'&&n.start===arg[0].start&&n.end===arg.at(-1).end&&literalOnly(n)).map(n=>literalFormat([{kind:'LITERAL',spelling:n.name}]));
  const known=[...new Set(values)];return known.length===1?known[0]:null;
 };
 const physical=arg=>arg.every(sourceIndex.physical);
 const isNull=arg=>{
  if(!arg||!physical(arg))return false;
  const spelling=arg.map(t=>t.spelling).join('');
  if(['0','((void*)0)','(void*)0'].includes(spelling))return true;
  return spelling==='NULL'&&existingEdits.some(e=>e.start===arg[0].start&&isStandardMacroEdit(e,'NULL'));
 };
 const verbCall=arg=>{
  if(!arg?.length)return false;
  let a=0,b=arg.length-1;
  // Explicit grouping does not change the fact that the whole operand is a call.
  while(arg[a]?.spelling==='('&&pairs.get(sourceIndex.indexOf(arg[a]))===sourceIndex.indexOf(arg[b])){a++;b--;}
  if(a>b)return false;
  return calls.some(c=>c.profile.reading_form==='verb'&&c.start===arg[a].start&&c.end===arg[b].end);
 };
 for(const call of calls){
  const {profile,args}=call,order=-sourceIndex.indexAt(call.nameStart)*2+0.5;
  if(annotations){
   const fmt=args[profile.format_index];
   const specs=argumentSpecs(profile,args,{format:staticFormat(fmt),isNull:i=>isNull(args[i]),isVerbCall:i=>verbCall(args[i])});
   specs.forEach((spec,i)=>{
    const arg=args[i],range={start:arg[0].start,end:arg.at(-1).end};
    if(uncertain(arg))return;
    if(spec.prefix)edits.push({start:range.start,end:range.start,text:spec.prefix+' ',kind:'annotation',operation:'guide',ranges:[range],note:'引数の役割を示す追加語',order});
    if(spec.suffix)edits.push({start:range.end,end:range.end,text:' '+spec.suffix,kind:'annotation',operation:'guide',ranges:[range],note:'引数の役割を示す追加語',order});
   });
  }
  if(profile.postfix){
   const nameEdit=existingEdits.find(e=>e.start===call.nameStart&&e.end===call.nameStart+call.source.length);
   if(nameEdit?.kind==='translation'&&nameEdit.text){
    revisions.push(reviseEdit(nameEdit,{text:'',kind:'removed',operation:'move'}));
    edits.push({start:call.end,end:call.end,text:' '+words[call.key],kind:'translation',operation:'move',ranges:[{start:call.nameStart,end:nameEdit.end}],note:'標準名を対象の後へ移動 '+call.source,order:order+0.5});
   }else {
    const moved=existingEdits.find(e=>e.start===call.end&&e.start===e.end&&e.ranges?.some(r=>r.start===call.nameStart&&r.end===call.nameStart+call.source.length));
    if(moved)revisions.push(reviseEdit(moved,{text:' '+words[call.key],order:order+0.5}));
   }
  }
 }
 function omitEnd(anchor){
  if(!annotations)return false;
  // Declarations and return statements are deliberately outside these exceptions.
  if(!['CALL_EXPR','UNEXPOSED_EXPR','PAREN_EXPR','BINARY_OPERATOR'].includes(anchor.kind))return false;
  const ts=tokens.filter(t=>t.start>=anchor.start&&t.end<=anchor.end&&t.spelling!==';');
  const unwrapped=part=>{
   let a=0,b=part.length-1;
   while(a<b&&part[a].spelling==='('&&pairs.get(sourceIndex.indexOf(part[a]))===sourceIndex.indexOf(part[b])){a++;b--;}
   return part.slice(a,b+1);
  };
  // Grouping is allowed only by an explicit per-function policy. Do not
  // broaden abort/raise/thrd_yield or strip casts/compound expressions.
  for(const c of calls){
   const p=c.profile.statement_nari;if(!p?.parentheses||p.argument_count!==undefined&&c.args.length!==p.argument_count)continue;
   const matches=part=>{const inner=unwrapped(part);return inner[0]?.start===c.start&&inner.at(-1)?.end===c.end;};
   if(p.standalone&&matches(ts))return true;
   if(!p.simple_assignment||anchor.kind!=='BINARY_OPERATOR')continue;
   let depth=0,equal=-1,bad=false;
   for(let i=0;i<ts.length;i++){
    const s=ts[i].spelling;
    if(['(','[','{'].includes(s))depth++;
    if([')',']','}'].includes(s))depth--;
    if(!depth&&s==='='){if(equal!==-1)bad=true;equal=i;}
    else if(!depth&&[',','+=','-=','*=','/=','%=','&=','|=','^=','<<=','>>='].includes(s))bad=true;
   }
   if(!bad&&equal>0&&matches(ts.slice(equal+1)))return true;
  }
  const call=calls.find(c=>{const policy=c.profile.statement_nari;return policy&&(policy.argument_count===undefined||c.args.length===policy.argument_count)&&c.end===ts.at(-1)?.end;});
  if(!call)return false;
  const policy=call.profile.statement_nari;
  if(ts[0]?.start===call.start)return policy.standalone===true;
  if(policy.simple_assignment!==true||anchor.kind!=='BINARY_OPERATOR')return false;
  const before=ts.filter(t=>t.start<call.start),equals=before.at(-1);
  if(equals?.spelling!=='=')return false;
  // The AST supplies the binary operator; reject comma/chained assignment contexts.
  let depth=0;
  for(const t of before.slice(0,-1)){
   if(['(','[','{'].includes(t.spelling))depth++;
   if([')',']','}'].includes(t.spelling))depth--;
   if(!depth&&[',','=','+=','-=','*=','/=','%=','&=','|=','^=','<<=','>>='].includes(t.spelling))return false;
  }
  return true;
 }
 const plan=createEditPlan('usage',edits,revisions);
 return {edits:plan.edits,plan,calls,omitEnd};
}
