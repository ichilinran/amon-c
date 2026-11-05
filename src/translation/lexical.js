import {C17_KEYWORDS,C17_PUNCTUATORS} from './c17-tokens.js';
export {C17_KEYWORDS,C17_PUNCTUATORS,C17_DIRECTIVES,C17_HEADERS,entryKey,GROUP_LABELS,KIND_LABELS} from './c17-tokens.js';
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

