import {DEFAULT_WORDS,validateWords} from '../vocabulary/settings.js';
import {LEGACY_V10_WORDS} from './vocabulary-v10.js';
import {LEGACY_V11_WORDS} from './vocabulary-v11.js';
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
