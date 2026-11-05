import {literalFormat} from '../translation/format-literal.js';

// Recover a StringLiteral's spelling only from the compiler's final tokens.
// No macro expansion, expression evaluation, or editable vocabulary is used.
// Return new nodes; callers may pass frozen, saved compiler views.
export function projectLiteralNames(native,nodes){
 const rows=new Map((native.astNodes??[]).map(n=>[n.id,n]));
 const positions=new Map();
 for(const [i,t] of (native.tokens??[]).entries()){
  const key=t?.location?.rawEncoding;if(!Number.isInteger(key))continue;
  positions.set(key,positions.has(key)?null:i);
 }
 return nodes.map(n=>{
  if(n.kind!=='STRING_LITERAL')return n;
  const row=rows.get(n.nativeNode);
  if(row?.kind!=='StringLiteral'||!row.range||!row.range.begin.macro&&!row.range.last.macro)return n;
  const a=positions.get(row.range.begin.rawEncoding),b=positions.get(row.range.last.rawEncoding);
  if(!Number.isInteger(a)||!Number.isInteger(b)||b<a)return n;
  const tokens=native.tokens.slice(a,b+1);
  if(!tokens.every(t=>typeof t?.text==='string'&&typeof t.kind==='string'&&(t.kind==='string_literal'||t.kind.endsWith('_string_literal'))))return n;
  const value=literalFormat(tokens.map(t=>({kind:'LITERAL',spelling:t.text})));
  return value===null?n:{...n,name:JSON.stringify(value)};
 });
}
