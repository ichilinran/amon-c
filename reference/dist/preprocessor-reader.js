import {createEditPlan} from './edit-plan.js';
import {directiveMacroPolicy} from './preprocessing-context.js';
import {STANDARD_HEADERS} from './standard-catalog.js';
import {lex} from './lexical.js';
// Physical source is retained. Directive names are roles, not substring matches.
const directiveKeys={include:'include',define:'ppDefine',undef:'ppUndef',ifdef:'ppIfdef',ifndef:'ppIfndef',if:'ppIf',elif:'ppElif',else:'ppElse',endif:'ppEndif',line:'ppLine',error:'ppError',pragma:'ppPragma'};
const bodyKeywords=new Set('void char short int long float double signed unsigned _Bool _Complex _Imaginary const volatile restrict _Atomic _Noreturn typedef extern static _Thread_local auto register inline struct union enum return break continue'.split(' '));
export function readPreprocessing(source,words,{keywordMacroNames=null,inclusions=null}={}){
 const {tokens,issues:lexIssues}=lex(source),directives=[],edits=[],issues=[];
 let current=null;
 for(const t of tokens){
  if(t.role==='directive-start'){current={start:t.start,end:source.length,tokens:[]};directives.push(current);}
  if(current){if(t.directive)current.tokens.push(t);else {current.end=t.start;current=null;}}
 }
 for(let i=0;i<directives.length-1;i++)directives[i].end=Math.min(directives[i].end,directives[i+1].start);
 const significant=d=>d.tokens.filter(t=>!['space','comment'].includes(t.kind));
 const pragmaBodyTokens=new Set();
 for(const d of directives){const ts=significant(d);d.nameToken=ts.find(t=>t.role==='directive-name');d.name=d.nameToken?.canonical||'';d.parts=ts;
 }
 const {names:macroNames,bodySafe}=directiveMacroPolicy(directives,keywordMacroNames);
 const raw=t=>source.slice(t.start,t.end);
 const replace=(t,text,note)=>{const splices=raw(t).match(/(?:\\|\?\?\/)(?:\r\n|\r|\n)/g)||[];edits.push({start:t.start,end:t.end,text:text+splices.join(''),kind:'translation',operation:'replacement',ranges:[{start:t.start,end:t.end}],note,order:edits.length});};
 if(lexIssues.length)issues.push('字句の確認：'+lexIssues.join(' '));
 for(const d of directives){
  const ts=d.parts,key=directiveKeys[d.name];
  if(d.tokens.some(t=>t.valid===false)){issues.push('字句が閉じていない前処理指令は原文で保持しました。');continue;}
  if(!d.name){if(ts.length>1)issues.push('名前を確認できない前処理指令は原文で保持しました。');continue;}
  if(!key){issues.push('未対応の前処理指令 #'+d.name+' は原文で保持しました。');continue;}
  replace(d.nameToken,words[key],'前処理指令 '+d.name);
  const intro=ts[0];if(intro.logical!=='#'||raw(intro)!=='#')replace(intro,'#','前処理指令の導入記号');
  if(d.name==='include'){
   const header=ts.find(t=>t.kind==='header');
   if(header?.valid&&header.logical[0]==='<'){
    const file=header.logical.slice(1,-1),entry=STANDARD_HEADERS.find(e=>e.source===file);
    const binding=inclusions?.find(n=>n.start<=intro.start&&n.end>=header.end);
    const knownUserHeader=binding?.includedSystem===false;
    replace(header,'〈'+(entry&&!knownUserHeader?words[entry.key]:file)+'〉',knownUserHeader?'利用者ヘッダの原文名':'includeのヘッダ名');
   }
  }
  if(['if','elif'].includes(d.name))for(const t of ts.slice(2))if(t.kind==='identifier'&&t.canonical==='defined')replace(t,words.ppDefined,'前処理の定義有無の判定');
  // Standard pragma contents are not subject to macro replacement (C 6.10.6).
  if(d.name==='pragma'&&ts.length===5&&ts[2]?.canonical==='STDC'&&['FENV_ACCESS','FP_CONTRACT','CX_LIMITED_RANGE'].includes(ts[3]?.canonical)&&['ON','OFF','DEFAULT'].includes(ts[4]?.canonical)){
   for(const t of ts.slice(2))replace(t,words['pragma:'+t.canonical],'標準pragmaの内容 '+t.canonical);
  }
  if(d.name==='define'){
   const name=ts[2];if(!name||name.kind!=='identifier'){issues.push('マクロ名を確認できない定義は、名前と内容を原文で保持しました。');continue;}
   const params=new Set([name.canonical]);let first=3;
   // A space or comment between name and '(' makes an object-like macro.
   const adjacent=source.slice(name.end,ts[3]?.start??name.end).replace(/(?:\\|\?\?\/)(?:\r\n|\r|\n)/g,'')==='';
   if(ts[3]?.logical==='('&&adjacent){
    let depth=0,close=-1;for(let i=3;i<ts.length;i++){if(ts[i].logical==='(')depth++;if(ts[i].logical===')'&&--depth===0){close=i;break;}if(ts[i].kind==='identifier')params.add(ts[i].canonical);}
    if(close<0){issues.push('マクロの引数リストが閉じていないため、内容を原文で保持しました。');continue;}first=close+1;
   }
   // Without header macro information, do not guess the role of keyword-like
   // names in replacement text. Never change stringization or pasting operands.
   if(bodySafe)for(let i=first;i<ts.length;i++){
    const t=ts[i],prev=ts[i-1]?.logical,next=ts[i+1]?.logical;
    if(t.kind!=='identifier'||params.has(t.canonical)||macroNames.has(t.canonical)||['#','%:','##','%:%:'].includes(prev)||['##','%:%:'].includes(next))continue;
    if(t.canonical==='_Pragma')pragmaBodyTokens.add(t.start);
    if(!bodyKeywords.has(t.canonical))continue;
    replace(t,words[t.canonical],'マクロ置換内容の型語・逐語表記');
   }
  }
 }
 // _Pragma is an operator, not a #pragma directive or ordinary function.
 for(let i=0;i<tokens.length;i++){
  const t=tokens[i];if(t.kind!=='identifier'||t.canonical!=='_Pragma'||macroNames.has('_Pragma')||(t.directive&&!pragmaBodyTokens.has(t.start)))continue;
  const next=tokens.slice(i+1).find(t=>!['space','comment'].includes(t.kind));
  if(next?.logical==='(')replace(t,words.ppPragmaOperator,'前処理の処理系指示演算子');
 }
 const plan=createEditPlan('preprocessing',edits);
 return {directives,edits:plan.edits,plan,issues,tokens};
}
