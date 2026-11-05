import {normalizeProject} from '../project/input.js';
import {VOCABULARY_VERSION} from '../vocabulary/settings.js';
import {restoreWords} from './word-settings.js';
import {sha256} from '../shared/hash.js';
export async function loadProject(saved) {
  if(!saved||saved.format!=='shi-browser-project'||saved.version!==1||typeof saved.sha256!=='string'||!(saved.selection===null||typeof saved.selection==='string'&&saved.selection.length<1024))throw new Error('支位ブラウザプロジェクトの形式が不正です。');
  if(!Number.isInteger(saved.vocabularyVersion)||saved.vocabularyVersion<11||saved.vocabularyVersion>VOCABULARY_VERSION)throw new Error('保存データの訳語版に対応していません。');
  const payload={project:normalizeProject(saved.project),selection:saved.selection,vocabularyVersion:saved.vocabularyVersion};
  if(await sha256(new TextEncoder().encode(JSON.stringify(payload)))!==saved.sha256)throw new Error('保存データの確認値が一致しません。');
  return {...payload,vocabularyVersion:VOCABULARY_VERSION,project:{...payload.project,words:restoreWords(payload.project.words,saved.vocabularyVersion)}};
}
