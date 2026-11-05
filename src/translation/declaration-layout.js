import {createEditPlan,composeReadingPlans} from './edit-plan.js';

// Columns in the code pane: four-cell tabs, one-cell ASCII/halfwidth kana,
// two-cell wide characters. Font fallback may affect unsupported glyph widths.
const graphemes=new Intl.Segmenter('ja',{granularity:'grapheme'});
export function codeColumn(text){
 let column=0;
 for(const {segment} of graphemes.segment(text)){
  if(segment==='\t'){column+=4-column%4;continue;}
  if(/\p{Extended_Pictographic}|\p{Regional_Indicator}|\u20e3/u.test(segment)){column+=2;continue;}
  for(const c of segment){
   const n=c.codePointAt(0);
   if(n<32||n===127||/\p{Mark}/u.test(c)||n===0x200d||n>=0xfe00&&n<=0xfe0f)continue;
   const wide=n>=0x1100&&n<=0x115f||n>=0x2329&&n<=0x232a||n>=0x2e80&&n<=0xa4cf&&n!==0x303f||n>=0xac00&&n<=0xd7a3||n>=0xf900&&n<=0xfaff||n>=0xfe10&&n<=0xfe19||n>=0xfe30&&n<=0xfe6f||n>=0xff01&&n<=0xff60||n>=0xffe0&&n<=0xffe6||n>=0x20000&&n<=0x3fffd;
   column+=wide?2:1;
  }
 }
 return column;
}
function renderedOffset(reading,sourceAt){
 let offset=0;
 for(const s of reading.segments){
  if(s.start===sourceAt)return offset;
  if(s.start<sourceAt&&sourceAt<s.end)return s.kind==='raw'?offset+sourceAt-s.start:null;
  offset+=s.text.length;
 }
 return null;
}
// Layout uses a checked, already translated preview. Semantic parsing remains
// upstream. Only leading spaces/tabs may change; newlines/comments stay raw.
export function alignDeclarationIndentation(source,plans,issues,requests){
 let result=composeReadingPlans(source,plans,issues);
 for(const [i,r] of [...requests].sort((a,b)=>a.at-b.at).entries()){
  if(result.diagnostics.length)break;
  const lineStart=source.lastIndexOf('\n',r.at-1)+1,before=source.slice(lineStart,r.at);
  const at=renderedOffset(result.reading,r.target);
  if(at===null)continue;
  const text=result.reading.text.slice(result.reading.text.lastIndexOf('\n',at-1)+1,at);
  const targetColumn=codeColumn(text);let start=lineStart,indent;
  if(/^[ \t]*$/.test(before)){
   const leading=text.match(/^[ \t]*/)[0];indent=leading+' '.repeat(Math.max(0,targetColumn-codeColumn(leading)));
  }else{
   // A comment may precede the declarator. Adjust only the whitespace after
   // it; if it already extends beyond the target, retain it rather than move it.
   start=r.at-before.match(/[ \t]*$/)[0].length;
   const offset=renderedOffset(result.reading,start);if(offset===null)continue;
   const prefix=result.reading.text.slice(result.reading.text.lastIndexOf('\n',offset-1)+1,offset);
   const used=codeColumn(prefix)+(r.leading??0);if(used>targetColumn)continue;
   indent=' '.repeat(targetColumn-used);
  }
  if(source.slice(start,r.at)===indent)continue;
  const edit={start,end:r.at,text:indent,kind:'layout',operation:'layout',ranges:[{start,end:r.at}],note:'分割した宣言の字下げ',order:-200};
  plans=[...plans,createEditPlan('declaration-indentation:'+i,[edit])];
  result=composeReadingPlans(source,plans,issues);
 }
 return result;
}
