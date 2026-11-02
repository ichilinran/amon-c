import {LEGACY_V11_WORDS} from './vocabulary-v11.js';
import {currentWord} from './vocabulary-current.js';
import {LEGACY_V10_WORDS} from './vocabulary-v10.js';
import {PREDEFINED_WORDS} from './predefined-reader.js';
import {STANDARD_WORDS} from './standard-catalog.js';
export const WORDS=[
 ...STANDARD_WORDS,
 ...PREDEFINED_WORDS,
 ['ppDefine','define指令'],['ppUndef','undef指令'],['ppIfdef','ifdef指令'],['ppIfndef','ifndef指令'],
 ['ppIf','if指令'],['ppElif','elif指令'],['ppElse','else指令'],['ppEndif','endif指令'],['ppDefined','defined演算子'],
 ['ppLine','line指令'],['ppError','error指令'],['ppPragma','pragma指令'],['ppPragmaOperator','_Pragma演算子'],
 ['also','可変個引数の案内語'],
 ['int','整数型'],['void','void'],
 ['signed','signed'],['unsigned','unsigned'],['short','short'],['long','long'],['char','char'],
 ['float','float'],['double','double'],['_Bool','_Bool'],['const','const'],['volatile','volatile'],['NULL','NULL（標準マクロ）'],
 ['main','main関数'],['printf','printf'],
 ['include','include指令'],['stdio','stdio.h'],['return','return'],
 ['if','if'],['elseIf','else if'],['else','else'],['while','while（条件の後）'],['for','for'],
 ['break','break'],['continue','continue'],['do','do'],
 ['switch','switch'],['case','case（値の後）'],['default','default'],['goto','goto（名前の後）'],['destination','移動先を示す追加語'],
 ['typeLink','関数の型と名前の間'],['parameters','受け取る引数の始まり'],['end','文・引数・ヘッダの終わり'],
 ['then','if条件の後'],['mainEnd','mainの最後'],['first','forの初期設定の後'],['during','forの継続条件'],['each','forの更新'],
 ['doWhile','do whileの条件の前'],['static','static'],['register','register'],['_Thread_local','_Thread_local'],['inline','inline'],['restrict','restrict'],
 ['struct','struct'],['union','union'],['enum','enum'],['typedef','typedef'],['extern','extern'],['auto','auto'],
 ['sizeof','sizeof'],['_Alignof','_Alignof'],['_Alignas','_Alignas'],['_Static_assert','_Static_assert'],['assertGuide','静的確認のメッセージの前'],
 ['_Atomic','_Atomic'],['_Noreturn','_Noreturn'],['_Generic','_Generic'],['_Complex','_Complex'],['_Imaginary','_Imaginary']
].map(([key,label])=>[key,label,currentWord(key)]);
export const VOCABULARY_VERSION=12;
export const DEFAULT_WORDS=Object.fromEntries(WORDS.map(([key,,value])=>[key,value]));
export function validateWords(input){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('訳語の形式が正しくありません。');
 for(const key of Object.keys(input))if(!Object.hasOwn(DEFAULT_WORDS,key)&&!['argumentOpen','argumentClose'].includes(key))throw new Error('この版で扱えない訳語の項目があります。');
 return Object.fromEntries(WORDS.map(([key,,fallback])=>{
   const value=input[key]??fallback;
   if(typeof value!=='string'||!value.trim()||value.length>60||/[\u0000-\u001f\u007f]/.test(value))throw new Error('訳語は改行なしの1〜60文字で指定してください。');
   return [key,value.trim()];
 }));
}

// Upgrade only known old defaults; preserve any user-customized readings.
export function restoreWords(input,vocabularyVersion=1){
 const words=validateWords(input);
 if(vocabularyVersion<11){
  for(const key of Object.keys(LEGACY_V10_WORDS))if(input[key]===LEGACY_V10_WORDS[key])words[key]=DEFAULT_WORDS[key];
 }
 if(vocabularyVersion<12){
  for(const key of Object.keys(LEGACY_V11_WORDS))if(words[key]===LEGACY_V11_WORDS[key])words[key]=DEFAULT_WORDS[key];
 }
 if(vocabularyVersion<3){
  if(['ﾌｸﾒﾙ','ﾌｸﾒﾙﾉﾊ'].includes(input.include))words.include=DEFAULT_WORDS.include;
  if(input.first==='ﾏｽﾞ')words.first=DEFAULT_WORDS.first;
 }
 return words;
}
