import {DEFAULT_ENTRIES,C17_KEYWORDS,C17_PUNCTUATORS,C17_DIRECTIVES,C17_HEADERS,entryKey,GROUP_LABELS,KIND_LABELS} from './vocabulary.js';
import {LEGACY_ENTRIES} from './legacy-v1.js';
export {DEFAULT_ENTRIES,C17_KEYWORDS,C17_PUNCTUATORS,C17_DIRECTIVES,C17_HEADERS,entryKey,GROUP_LABELS,KIND_LABELS};
const keywordSet=new Set(C17_KEYWORDS);
const punctuators=[...C17_PUNCTUATORS].sort((a,b)=>b.length-a.length);
const TRI={'=':'#','/':'\\',"'":'^','(':'[',')':']','!':'|','<':'{','>':'}','-':'~'};
// C17 Unicode ranges from N1570 Annex D, not JavaScript identifier rules.
const ranges=[[0xa8,0xa8],[0xaa,0xaa],[0xad,0xad],[0xaf,0xaf],[0xb2,0xb5],[0xb7,0xba],[0xbc,0xbe],[0xc0,0xd6],[0xd8,0xf6],[0xf8,0xff],[0x100,0x167f],[0x1681,0x180d],[0x180f,0x1fff],[0x200b,0x200d],[0x202a,0x202e],[0x203f,0x2040],[0x2054,0x2054],[0x2060,0x206f],[0x2070,0x218f],[0x2460,0x24ff],[0x2776,0x2793],[0x2c00,0x2dff],[0x2e80,0x2fff],[0x3004,0x3007],[0x3021,0x302f],[0x3031,0x303f],[0x3040,0xd7ff],[0xf900,0xfd3d],[0xfd40,0xfdcf],[0xfdf0,0xfe44],[0xfe47,0xfffd]];
const forbiddenInitial=[[0x300,0x36f],[0x1dc0,0x1dff],[0x20d0,0x20ff],[0xfe20,0xfe2f]];
function unicodeAllowed(cp,first){const allowed=cp>=0x10000&&cp<=0xefffd?(cp&0xffff)<=0xfffd:ranges.some(([a,b])=>cp>=a&&cp<=b);return allowed&&(!first||!forbiddenInitial.some(([a,b])=>cp>=a&&cp<=b));}
function identifierUnit(text,i,first=false){
  if(i>=text.length)return 0;const cp=text.codePointAt(i);
  if(text[i]==='\\'){const m=/^\\(?:u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/.exec(text.slice(i,i+10));return m&&unicodeAllowed(parseInt(m[0].slice(2),16),first)?m[0].length:0;}
  if((cp>=65&&cp<=90)||(cp>=97&&cp<=122)||cp===95||(!first&&cp>=48&&cp<=57))return 1;
  return unicodeAllowed(cp,first)?(cp>0xffff?2:1):0;
}
function normalizeIdentifier(text){return text.replace(/\\(?:u([0-9a-fA-F]{4})|U([0-9a-fA-F]{8}))/g,(_,a,b)=>String.fromCodePoint(parseInt(a||b,16)));}
function logicalView(raw){
  const chars=[],starts=[],ends=[];
  for(let i=0;i<raw.length;){const a=i;let c;if(raw.slice(i,i+2)==='??'&&Object.hasOwn(TRI,raw[i+2])){c=TRI[raw[i+2]];i+=3;}else if(raw[i]==='\r'){c='\n';i+=raw[i+1]==='\n'?2:1;}else c=raw[i++];chars.push(c);starts.push(a);ends.push(i);}
  let text='';const begin=[],end=[];
  for(let i=0;i<chars.length;i++){if(chars[i]==='\\'&&chars[i+1]==='\n'){i++;continue;}text+=chars[i];begin.push(starts[i]);end.push(ends[i]);}return {text,begin,end};
}
function numberType(s){
  const suffix='(?:[uU](?:[lL]|ll|LL)?|(?:[lL]|ll|LL)[uU]?)?';
  if(new RegExp('^(?:0[xX][0-9a-fA-F]+|0[0-7]*|[1-9][0-9]*)'+suffix+'$').test(s))return '整数定数';
  if(/^(?:(?:[0-9]+\.[0-9]*|\.[0-9]+)(?:[eE][+-]?[0-9]+)?|[0-9]+[eE][+-]?[0-9]+)[fFlL]?$/.test(s))return '浮動小数点定数';
  if(/^0[xX](?:[0-9a-fA-F]+\.?[0-9a-fA-F]*|\.[0-9a-fA-F]+)[pP][+-]?[0-9]+[fFlL]?$/.test(s))return '十六進浮動小数点定数';return '前処理数（値は未確定）';
}
export function lex(raw){
  const {text,begin,end}=logicalView(raw),tokens=[],issues=[];let i=0,atLineStart=true,directive=false,expectDirective=false,headerExpected=false,directiveName='';
  const push=(a,kind,extra={})=>{const logical=text.slice(a,i),t={kind,start:begin[a],end:end[i-1],logical,directive,directiveName,valid:true,...extra};if(kind==='identifier'){t.canonical=normalizeIdentifier(logical);t.category=keywordSet.has(t.canonical)?'keyword':'identifier';}else t.category=kind;if(kind==='pp-number')t.numberType=numberType(logical);tokens.push(t);return t;};
  while(i<text.length){
    const a=i,c=text[i];
    if(/[ \t\v\f\n]/.test(c)||(i===0&&c==='\ufeff')){i++;while(i<text.length&&/[ \t\v\f\n]/.test(text[i]))i++;push(a,'space');if(text.slice(a,i).includes('\n')){atLineStart=true;directive=false;expectDirective=false;headerExpected=false;directiveName='';}continue;}
    if(text.startsWith('//',i)){i=text.indexOf('\n',i);if(i<0)i=text.length;push(a,'comment');continue;}
    if(text.startsWith('/*',i)){const close=text.indexOf('*/',i+2);i=close<0?text.length:close+2;push(a,'comment',{valid:close>=0});if(close<0)issues.push('閉じられていないコメントがあります。');continue;}
    if(directive&&headerExpected&&(c==='"'||c==='<')){const close=c==='"'?'"':'>';i++;while(i<text.length&&text[i]!==close&&text[i]!=='\n')i++;const valid=text[i]===close&&i>a+1;if(text[i]===close)i++;push(a,'header',{valid});headerExpected=false;if(!valid)issues.push('ヘッダ名が空、または閉じられていません。');continue;}
    const literal=/^(?:u8|u|U|L)?"|^(?:u|U|L)?'/.exec(text.slice(i,i+3));
    if(literal){atLineStart=false;headerExpected=false;const quote=literal[0].at(-1),prefix=literal[0].slice(0,-1);i+=literal[0].length;let closed=false;while(i<text.length){if(text[i]===quote){i++;closed=true;break;}if(text[i]==='\n')break;if(text[i]==='\\')i=Math.min(i+2,text.length);else i++;}push(a,quote==='"'?'string':'character',{prefix,valid:closed});if(!closed)issues.push('閉じられていない文字列・文字定数があります。');continue;}
    if(/[0-9]/.test(c)||(c==='.'&&/[0-9]/.test(text[i+1]||''))){atLineStart=false;headerExpected=false;i++;while(i<text.length){if(/[eEpP]/.test(text[i])&&/[+-]/.test(text[i+1]||'')){i+=2;continue;}const n=identifierUnit(text,i);if(n){i+=n;continue;}if(text[i]==='.'){i++;continue;}break;}push(a,'pp-number');continue;}
    const first=identifierUnit(text,i,true);
    if(first){atLineStart=false;i+=first;let n;while((n=identifierUnit(text,i)))i+=n;const t=push(a,'identifier');if(expectDirective){directiveName=t.canonical;t.directiveName=directiveName;t.role='directive-name';headerExpected=directiveName==='include';expectDirective=false;}else headerExpected=false;continue;}
    const p=punctuators.find(p=>text.startsWith(p,i));
    if(p){const start=atLineStart&&(p==='#'||p==='%:');if(start){directive=true;expectDirective=true;}i+=p.length;push(a,'punctuator',{role:start?'directive-start':null});atLineStart=false;headerExpected=false;continue;}
    i+=text.codePointAt(i)>0xffff?2:1;push(a,'other');atLineStart=false;headerExpected=false;
  }
  return {tokens,issues:[...new Set(issues)]};
}

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
