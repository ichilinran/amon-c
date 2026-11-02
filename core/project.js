import {validateWords,restoreWords,DEFAULT_WORDS,VOCABULARY_VERSION} from '../reference/dist/reading-config.js';
import {sha256} from './hash.js';
const bytes=text=>new TextEncoder().encode(text).length;
export function projectPath(value,{directory=false}={}) {
  if(directory && value==='.')return '.';
  if(typeof value!=='string'||!value||value.length>1024||/[\\:\0\r\n]/.test(value)||value.startsWith('/')||value.split('/').some(p=>!p||p==='.'||p==='..'))throw new Error('プロジェクト内の相対パスを指定してください。');
  return value;
}
export function analysisArgs(values=[]) {
  if(!Array.isArray(values)||values.length>1024)throw new Error('解析条件の件数が不正です。');
  const out=[];
  for(let i=0;i<values.length;i++) {
    const value=values[i];
    if(typeof value!=='string'||value.length>4096||/[\0\r\n]/.test(value))throw new Error('解析条件が不正です。');
    if(['-I','-iquote','-isystem','-include','-imacros'].includes(value)) {
      const next=projectPath(values[++i],{directory:['-I','-iquote','-isystem'].includes(value)});out.push(value,next);
    }else if(value.startsWith('-I')&&value.length>2)out.push('-I'+projectPath(value.slice(2),{directory:true}));
    else if(value==='-D'||value==='-U') {
      const next=values[++i];if(typeof next!=='string'||!/^[_a-zA-Z]\w*(?:\([^\r\n\0]*\))?(?:=[^\r\n\0]*)?$/.test(next)||next.length>4096)throw new Error('マクロ指定が不正です。');out.push(value,next);
    }else if(/^-[DU][_a-zA-Z]\w*(?:\([^\r\n\0]*\))?(?:=[^\r\n\0]*)?$/.test(value)||['-pthread','-Wno-builtin-macro-redefined'].includes(value))out.push(value);
    else throw new Error('この解析条件は利用できません：'+value);
  }
  return out;
}
export function normalizeInput(request) {
  const entry=projectPath(request.entry??'input.c');
  const files=Object.create(null);
  if(request.files!==undefined) {
    if(!request.files||typeof request.files!=='object'||Array.isArray(request.files))throw new Error('ファイル一覧が不正です。');
    for(const [name,text] of Object.entries(request.files))files[projectPath(name)]=text;
  }
  if(request.source!==undefined) {
    if(Object.hasOwn(files,entry)&&files[entry]!==request.source)throw new Error('入力原文とファイル一覧が一致しません。');
    files[entry]=request.source;
  }
  let total=0;
  for(const [name,text] of Object.entries(files)) {
    if(typeof text!=='string'||text.length>40000||bytes(text)>1048576||/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/u.test(text))throw new Error('原文の文字または長さが不正です：'+name);
    total+=bytes(text);
  }
  if(!Object.hasOwn(files,entry)||Object.keys(files).length>512||total>8388608)throw new Error('入力ファイルがないか、資源上限を超えています。');
  return {...request,entry,source:files[entry],files,directory:projectPath(request.directory??'.',{directory:true}),args:analysisArgs(request.args)};
}
export function normalizeProject(project) {
  if(!project||!Array.isArray(project.translationUnits)||!project.translationUnits.length||project.translationUnits.length>64)throw new Error('解析文脈は1〜64件にしてください。');
  const units=project.translationUnits.map(unit=>{
    if(!unit||typeof unit.source!=='string')throw new Error('解析するCファイルを指定してください。');
    return normalizeInput({files:project.files,entry:unit.source,directory:unit.directory,args:unit.args});
  });
  const first=units[0];
  const files=Object.fromEntries(Object.keys(first.files).sort().map(name=>[name,first.files[name]]));
  return {files,translationUnits:units.map(u=>({source:u.entry,directory:u.directory,args:u.args})),words:validateWords(project.words??DEFAULT_WORDS),display:{annotations:project.display?.annotations!==false,original:project.display?.original===true}};
}
export async function saveProject(project,selection=null) {
  const payload={project:normalizeProject(project),selection,vocabularyVersion:VOCABULARY_VERSION};
  return {format:'shi-browser-project',version:1,...payload,sha256:await sha256(new TextEncoder().encode(JSON.stringify(payload)))};
}
export async function loadProject(saved) {
  if(!saved||saved.format!=='shi-browser-project'||saved.version!==1||typeof saved.sha256!=='string'||!(saved.selection===null||typeof saved.selection==='string'&&saved.selection.length<1024))throw new Error('支位ブラウザプロジェクトの形式が不正です。');
  if(!Number.isInteger(saved.vocabularyVersion)||saved.vocabularyVersion<11||saved.vocabularyVersion>VOCABULARY_VERSION)throw new Error('保存データの訳語版に対応していません。');
  const payload={project:normalizeProject(saved.project),selection:saved.selection,vocabularyVersion:saved.vocabularyVersion};
  if(await sha256(new TextEncoder().encode(JSON.stringify(payload)))!==saved.sha256)throw new Error('保存データの確認値が一致しません。');
  return {...payload,vocabularyVersion:VOCABULARY_VERSION,project:{...payload.project,words:restoreWords(payload.project.words,saved.vocabularyVersion)}};
}
