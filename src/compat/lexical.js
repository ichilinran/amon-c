import {lex,C17_KEYWORDS,C17_PUNCTUATORS,C17_DIRECTIVES,C17_HEADERS,entryKey,GROUP_LABELS,KIND_LABELS} from '../translation/lexical.js';
import {DEFAULT_ENTRIES} from './legacy-vocabulary.js';
import {LEGACY_ENTRIES} from './legacy-v1.js';
export {lex,DEFAULT_ENTRIES,C17_KEYWORDS,C17_PUNCTUATORS,C17_DIRECTIVES,C17_HEADERS,entryKey,GROUP_LABELS,KIND_LABELS};
const keywordSet=new Set(C17_KEYWORDS);
const kinds=new Set(['identifier','punctuator','header','pp-number','string','character','other']);
const defaultsByKey=new Map(DEFAULT_ENTRIES.map(e=>[entryKey(e),e]));
export function validateEntries(value){
  if(!Array.isArray(value)||value.length>5000)throw new Error('対応表は5000件以内にしてください。');const seen=new Set();
  return value.map((e,index)=>{
    if(!e||typeof e.source!=='string'||!e.source||e.source.length>2000)throw new Error(`${index+1}行目：元の表記は1〜2000文字で指定してください。`);
    const kind=e.kind||'identifier';if(!kinds.has(kind))throw new Error('不明なトークン種別です。');let source=e.source;
    if(kind==='header'){if(/[<>"\r\n\u0000]/.test(source))throw new Error('ヘッダは括弧や引用符を除いたファイル名で指定してください。');}
    else{const checked=lex(source),real=checked.tokens.filter(t=>!['space','comment'].includes(t.kind));if(checked.issues.length||real.length!==1||real[0].kind!==kind||real[0].start!==0||real[0].end!==source.length)throw new Error(`「${source.slice(0,40)}」は指定した種類の一つのトークンではありません。`);source=kind==='identifier'?real[0].canonical:real[0].logical;}
    const key=`${kind}:${source}`;if(seen.has(key))throw new Error(`「${source}」が重複しています。`);seen.add(key);
    if(typeof e.target!=='string'||!e.target.trim()||e.target.length>120||/[\u0000-\u001f\u007f]/.test(e.target))throw new Error(`「${source.slice(0,40)}」の訳語は改行なしの1〜120文字にしてください。`);
    const base=defaultsByKey.get(key),group=kind==='identifier'?(keywordSet.has(source)?'keyword':'name'):kind==='pp-number'?'number':kind;
    return {source,target:e.target,kind,group:base?.group||group,note:typeof e.note==='string'?e.note.slice(0,600):base?.note||'',header:typeof e.header==='string'?e.header.slice(0,120):base?.header||''};
  });
}
export function duplicateTargets(entries){const values=new Map();for(const e of entries){const list=values.get(e.target)||[];list.push(e);values.set(e.target,list);}return [...values.entries()].filter(([,list])=>list.length>1);}
export function coverage(entries){const keys=new Set(entries.map(entryKey));const count=(items,kind)=>items.filter(source=>keys.has(`${kind}:${source}`)).length;return {keywords:count(C17_KEYWORDS,'identifier'),punctuators:count(C17_PUNCTUATORS,'punctuator'),directives:count(C17_DIRECTIVES,'identifier'),headers:count(C17_HEADERS,'header')};}
export function migrateV1(savedEntries){const saved=validateEntries(savedEntries),old=new Map(LEGACY_ENTRIES.map(e=>[e.source,e])),merged=new Map(DEFAULT_ENTRIES.map(e=>[entryKey(e),{...e}])),keys=new Set(saved.map(e=>e.source));for(const source of old.keys())if(!keys.has(source))merged.delete('identifier:'+source);for(const e of saved){const prev=old.get(e.source);if(!prev||e.target!==prev.target)merged.set(entryKey(e),e);}return [...merged.values()];}
function tokenLookup(t){return {source:t.kind==='identifier'?t.canonical:t.kind==='header'&&t.valid?t.logical.slice(1,-1):t.logical,kind:t.kind};}
function locationFor(offset,starts){let lo=0,hi=starts.length;while(lo+1<hi){const mid=(lo+hi)>>1;if(starts[mid]<=offset)lo=mid;else hi=mid;}return {line:lo+1,column:offset-starts[lo]+1};}
export function tokenDescription(t){
  if(t.entry?.note)return t.entry.note;
  if(t.kind==='identifier')return t.role==='directive-name'?'前処理指令の名前です。':'名前の綴りを保持しています。変数名・関数名・型名などの意味の判定は行いません。';
  if(t.kind==='pp-number')return `${t.numberType}です。符号は別のトークン、型を示す接尾辞はこのトークンの一部です。`;
  if(t.kind==='string')return '引用符・接頭辞・エスケープを含めて、一つの文字列トークンです。%dなどの書式指定は、この内部のデータです。';
  if(t.kind==='character')return '引用符・接頭辞・エスケープを含めて、一つの文字定数トークンです。';
  if(t.kind==='header')return '括弧または引用符を含めて、一つのヘッダ名トークンです。';
  if(t.kind==='punctuator')return 'Cの演算子・区切り記号です。役割による訳し分けは行いません。';
  return 'C17の既知のトークンに分類されない文字です。原文を保持しています。';
}
export function translate(raw,entries=DEFAULT_ENTRIES,options={}){
  const {names=true,punctuators=true,preprocessor=true}=options,dict=new Map(entries.map(e=>[entryKey(e),e])),{tokens:lexed,issues}=lex(raw),segments=[],tokens=[],lineStarts=[0];
  for(const m of raw.matchAll(/\r\n|\r|\n/g))lineStarts.push(m.index+m[0].length);
  let cursor=0,count=0;const words=new Set();
  const trivia=(start,end,kind)=>segments.push({start,end,kind,original:raw.slice(start,end),text:raw.slice(start,end),separatorBefore:''});
  for(const t of lexed){
    if(t.start>cursor)trivia(cursor,t.start,'splice');
    if(t.kind==='space'||t.kind==='comment'){trivia(t.start,t.end,t.kind);cursor=t.end;continue;}
    const lookup=tokenLookup(t),key=entryKey(lookup),registered=dict.get(key),enabled=t.valid&&(!t.directive||preprocessor)&&(t.kind!=='punctuator'||punctuators)&&(!registered||!['name','library'].includes(registered.group)||names),entry=enabled?registered:null,original=raw.slice(t.start,t.end);
    let text=entry?(t.kind==='header'?t.logical[0]+entry.target+t.logical.at(-1):entry.target):original;
    if(entry)text+=(original.match(/\r\n|\r|\n/g)||[]).join('');
    const translated=!!entry&&text!==original;if(translated){count++;words.add(key);}
    const status=translated?'translated':registered&&!enabled?'disabled':registered?'identity':t.kind==='identifier'||t.kind==='header'?'unregistered':'identity';
    const segment={...t,...locationFor(t.start,lineStarts),index:tokens.length+1,lookup,key,original,text,entry,registered,translated,status,separatorBefore:''},prev=segments.at(-1);
    if(prev?.index&&prev.end===t.start&&(prev.translated||translated)&&!/[\r\n]$/.test(prev.text))segment.separatorBefore=' ';
    tokens.push(segment);segments.push(segment);cursor=t.end;
  }
  if(cursor<raw.length)trivia(cursor,raw.length,'splice');
  const other=tokens.filter(t=>t.kind==='other').length;if(other)issues.push(`C17の既知の種類に分類されない文字が${other}個あります。原文のまま一覧へ載せています。`);
  return {segments,tokens,text:segments.map(s=>s.separatorBefore+s.text).join(''),count,wordCount:words.size,issues,unknown:[...new Map(tokens.filter(t=>t.status==='unregistered').map(t=>[t.key,t])).values()]};
}
