import {importSaved,saveImported} from './core/import.js';
import {normalizeProject,saveProject} from './core/project.js';
import {classify,highlightText,enhanceEditor,copyButton,menus,tabs,numberOutput,colourSplit} from './ui-view.js';
const $=id=>document.getElementById(id);
const paintEditor=enhanceEditor($('source'));
let project={files:{'input.c':'#include <math.h>\n#include <stdio.h>\ndouble f(double x) {\n    printf("%.*f\\n", 2, x);\n    return sqrt(x);\n}\n'},translationUnits:[{source:'input.c',args:[]}]};
let file='input.c',context=0,worker,timer,views=[],selection=null,summary='',imported=null,busy=false,generation=0,idleTimer;
const setStatus=text=>$('status').textContent=text;
const option=(text,value)=>{const el=document.createElement('option');el.textContent=text;el.value=value;return el;};
function finish(){busy=false;clearTimeout(timer);clearTimeout(idleTimer);if(worker)idleTimer=setTimeout(()=>{worker?.terminate();worker=null;},30000);$('cancel').disabled=true;$('translate').disabled=!!imported;}
function stop(){generation++;clearTimeout(idleTimer);worker?.terminate();worker=null;finish();}
function invalidate(){imported=null;$('reanalyse').hidden=true;$('source').readOnly=false;if(busy)stop();else finish();views=[];$('views').replaceChildren();$('views').disabled=true;$('output').textContent='';$('source-view').replaceChildren();$('links').replaceChildren();$('origins').replaceChildren();$('macros').replaceChildren();$('reasons').replaceChildren();setStatus('入力が変わりました。翻訳してください。');}
function paintInputs(){
 $('filechoice').replaceChildren(...Object.keys(project.files).map(n=>option(n,n)));$('filechoice').value=file;$('source').value=project.files[file];paintEditor();
 $('contexts').replaceChildren(...project.translationUnits.map((u,i)=>option(`${i+1}: ${u.source} ${(u.args??[]).join(' ')}`,String(i))));$('contexts').value=String(context);
 $('entry').replaceChildren(...Object.keys(project.files).filter(n=>n.endsWith('.c')).map(n=>option(n,n)));$('entry').value=project.translationUnits[context].source;
 $('args').value=(project.translationUnits[context].args??[]).join('\n');$('annotations').checked=project.display?.annotations!==false;
}
function highlight(view,ranges){
 if(!ranges.length)return;
 $('source-details').open=true;
 const start=Math.min(...ranges.map(r=>r.start)),end=Math.max(...ranges.map(r=>r.end));
 const mark=document.createElement('mark');mark.textContent=view.source.slice(start,end);
 $('source-view').replaceChildren(document.createTextNode(view.source.slice(0,start)),mark,document.createTextNode(view.source.slice(end)));mark.scrollIntoView({block:'nearest'});
}
function jump(anchor){
 const view=views.find(v=>v.key===anchor.key);if(!view)return;
 $('views').value=anchor.key;showView();highlight(view,[anchor]);
}
function showView(){
 const view=views.find(v=>v.key===$('views').value);if(!view)return;
 selection=view.key;$('source-view').textContent=view.source;$('links').replaceChildren();$('origins').replaceChildren();
 const fragment=document.createDocumentFragment();
 for(const [index,segment] of view.segments.entries()){
  if(!['translation','annotation'].includes(segment.kind)||!segment.ranges?.length){fragment.append(highlightText(segment.text));continue;}
  const span=document.createElement('span');span.className='lexeme '+(segment.kind==='annotation'?'s-guide':classify(view.source,segment.ranges[0].start,segment.ranges[0].end));span.textContent=segment.text;colourSplit(span,segment,view);span.tabIndex=0;span.setAttribute('role','button');span.title=segment.note??'対応する原文を見る';
  const select=()=>{
   highlight(view,segment.ranges);$('origins').replaceChildren();
   if(view.originAnchors){
    const note=document.createElement('p');note.textContent='展開語の原文側の位置です。マクロでは外側の呼出しを示し、すべての寄与文字を追跡するものではありません。';$('origins').append(note);
    for(const at of view.originAnchors[index]??[]){const button=document.createElement('button');button.textContent=at.file+'：原文へ';button.onclick=()=>jump(at);$('origins').append(button);}
   }
  };
  span.onclick=select;span.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select();}};fragment.append(span);
 }
 $('output').replaceChildren(fragment);numberOutput($('output'),view);$('macros').replaceChildren();
 for(const macro of view.macros??[]){
  const row=document.createElement('div'),button=document.createElement('button'),description=document.createElement('pre');
  button.textContent=macro.name+'：呼出しへ';button.onclick=()=>jump(macro.anchor);
  description.textContent=`定義 ${macro.definitionId}：${macro.definitionFile}\n置換内容：${macro.replacement||'（空）'}\n展開前の引数：${macro.arguments.map(a=>a.parameter+' = '+a.text).join(' ／ ')||'（なし）'}`;
  row.append(button,description);$('macros').append(row);
 }
 if(!view.macros?.length)$('macros').textContent=imported?.document.version===1?'この旧解析形式には呼出し履歴を収録していません。':'この表示に対応するマクロ呼出しはありません。';
 $('reasons').replaceChildren();
 for(const reason of view.reasons??[]){const b=document.createElement('button');b.textContent=reason.message+' ／ 次の対処：'+reason.action;b.onclick=()=>highlight(view,reason.ranges??[]);$('reasons').append(b);}
 if(!view.reasons?.length)$('reasons').textContent='個別の保留理由はありません。';
 setStatus(summary+(view.issues.length?' ／ 表示上の注意：'+view.issues.join(' ／ '):''));
}
function applyImported(result){
 project=result.project;context=0;file=project.translationUnits[0].source;selection=result.selection;invalidate();paintInputs();selection=result.selection;
 if(result.mode==='analysis'){
  imported=result;views=result.views;summary='保存済みの解析を表示中（再解析していません）';
  $('views').replaceChildren(...views.map(v=>option(v.label,v.key)));$('views').disabled=false;$('views').value=selection;
  $('source').readOnly=true;$('translate').disabled=true;$('reanalyse').hidden=false;showView();
 }else setStatus('保存した入力を復元しました。翻訳して表示を再生成してください。');
}
$('source').oninput=()=>{project.files[file]=$('source').value;invalidate();};
$('filechoice').onchange=()=>{file=$('filechoice').value;$('source').value=project.files[file];paintEditor();};
$('contexts').onchange=()=>{context=Number($('contexts').value);paintInputs();};
$('entry').onchange=()=>{project.translationUnits[context].source=$('entry').value;invalidate();paintInputs();};
$('args').oninput=()=>{project.translationUnits[context].args=$('args').value.split('\n').map(x=>x.trim()).filter(Boolean);invalidate();};
$('annotations').onchange=async()=>{project.display={...project.display,annotations:$('annotations').checked};if(imported){try{applyImported(await importSaved(saveImported(imported,selection,project.words,project.display)));}catch(e){setStatus(e.message);}}else invalidate();};
$('add-context').onclick=()=>{project.translationUnits.push(structuredClone(project.translationUnits[context]));context=project.translationUnits.length-1;invalidate();paintInputs();};
$('sample').onclick=async()=>{try{const r=await fetch('./examples/project-acceptance.json');if(!r.ok)throw new Error('例を読み込めません。');project=normalizeProject(await r.json());file=project.translationUnits[0].source;context=0;selection=null;invalidate();paintInputs();setStatus('4ファイル・4組合せの例を開きました。');}catch(e){setStatus(e.message);}};
$('translate').onclick=()=>{
 try{project=normalizeProject(project);}catch(e){setStatus(e.message);return;}
 clearTimeout(timer);clearTimeout(idleTimer);const ticket=++generation;busy=true;$('output').textContent='';$('translate').disabled=true;$('cancel').disabled=false;setStatus('解析器を準備・解析中…');
 worker??=new Worker('./wasm/worker.js',{type:'module'});
 worker.onmessage=({data})=>{if(ticket!==generation)return;if(data.ok){views=data.views;$('views').replaceChildren(...views.map(v=>option(v.label,v.key)));$('views').disabled=!views.length;if(views.some(v=>v.key===selection))$('views').value=selection;summary=`${data.contextErrors?.length?'一部の組合せを表示できませんでした':data.valid?'翻訳完了':'Cの診断あり'}：${data.contexts}組合せ・${views.length}表示 ／ ${data.milliseconds}ms`+(data.contextErrors?.length?' ／ '+data.contextErrors.map(e=>`${e.id+1}: ${e.unit.source}：${e.message}`).join(' ／ '):'');setStatus(summary);showView();}else setStatus('エラー：'+data.error);finish();};
 worker.onerror=e=>{if(ticket!==generation)return;setStatus('解析器を起動できませんでした：'+e.message);stop();};
 timer=setTimeout(()=>{stop();setStatus('解析を中止しました（120秒）。');},120000);worker.postMessage({project});
};
$('views').onchange=showView;
$('cancel').onclick=()=>{stop();setStatus('解析を中止しました。');};
$('import-files').onclick=()=>$('files').click();$('import-folder').onclick=()=>$('folder').click();
async function importFiles(input){
 try{
  const selected=[...input.files];if(selected.length>512)throw new Error('ファイル数が多すぎます。');
  const candidate=structuredClone(project);let total=0;
  for(const f of selected){if(!/\.[ch]$/.test(f.name))continue;if(f.size>1048576)throw new Error('ファイルが大きすぎます。');total+=f.size;if(total>8388608)throw new Error('合計サイズが大きすぎます。');const name=f.webkitRelativePath?f.webkitRelativePath.split('/').slice(1).join('/'):f.name;candidate.files[name]=await f.text();}
  project=normalizeProject(candidate);invalidate();paintInputs();setStatus('ファイルを追加しました。翻訳するCと解析条件を選んでください。');
 }catch(e){setStatus(e.message);}finally{input.value='';}
}
$('files').onchange=()=>importFiles($('files'));$('folder').onchange=()=>importFiles($('folder'));
$('save').onclick=async()=>{try{const snapshot=imported?saveImported(imported,selection,project.words,project.display):await saveProject(project,selection),url=URL.createObjectURL(new Blob([JSON.stringify(snapshot,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='shi-project.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus(imported?'旧形式の解析結果・選択・訳語設定を保存しました。':'ファイル・条件・訳語設定を保存しました。解析結果は再生成します。');}catch(e){setStatus(e.message);}};
$('load').onclick=()=>$('saved').click();
$('saved').onchange=async()=>{try{const f=$('saved').files[0];if(!f)return;if(f.size>67108864)throw new Error('保存データが大きすぎます。');applyImported(await importSaved(JSON.parse(await f.text())));}catch(e){setStatus(e.message);}finally{$('saved').value='';}};
paintInputs();

$('reanalyse').onclick=()=>{invalidate();setStatus('入力を編集できます。再解析に必要な利用者ヘッダと解析条件を追加してください。');};

$('legacy-sample').onclick=async()=>{try{const r=await fetch('./reference/dist/examples/project-21.analysis.json');if(!r.ok)throw new Error('旧解析例を読み込めません。');applyImported(await importSaved(await r.json()));}catch(e){setStatus(e.message);}};

copyButton($('copy-c'),()=>$('source').value);copyButton($('copy-shi'),()=>$('output').textContent);menus();tabs();
