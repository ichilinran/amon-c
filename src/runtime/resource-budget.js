// Limits bound retained bytes, not the browser's total memory or one incoming chunk.
export async function boundedBytes(stream,limit,label){
 const reader=stream.getReader(),parts=[];let size=0;
 try{
  for(;;){const {done,value}=await reader.read();if(done)break;
   size+=value.byteLength;if(size>limit)throw new Error(label+'のサイズが上限を超えています。');parts.push(value);
  }
 }catch(error){try{await reader.cancel(error);}catch{}throw error;}
 finally{reader.releaseLock();}
 const bytes=new Uint8Array(size);let at=0;for(const part of parts){bytes.set(part,at);at+=part.byteLength;}return bytes;
}
export function boundedTextSink(limit,label){
 const parts=[];let bytes=0,error=null;
 return {append(value){const text=String(value);if(error)throw error;
   // UTF-8 needs at least one byte per UTF-16 code unit; avoid allocating a
   // second huge buffer when the line already exceeds the remaining budget.
   if(text.length>limit-bytes){error=new Error(label+'のサイズが上限を超えています。');throw error;}
   const size=new TextEncoder().encode(text).length+(parts.length?1:0);if(bytes+size>limit){error=new Error(label+'のサイズが上限を超えています。');throw error;}bytes+=size;parts.push(text);},text(){return parts.join('\n');},check(){if(error)throw error;},get bytes(){return bytes;}};
}
// The pinned Emscripten glue grows memory by at most 20% beyond the old heap
// (rounded to 64 KiB). Reject large growth requests before that allocation.
// This bounds requests, not total RSS; the compiled memory still has its own max.
export const MAX_WASM_GROWTH_REQUEST=256*1024*1024;
export function guardWasmImports(imports,onLimit=()=>{}){
 const env=imports.env;
 if(typeof env?.emscripten_resize_heap!=='function')throw new Error('解析器のメモリ制御に対応していません。');
 const resize=env.emscripten_resize_heap;
 env.emscripten_resize_heap=requested=>{
  if((requested>>>0)>MAX_WASM_GROWTH_REQUEST){const error=new Error('解析器のメモリ上限に達しました。入力やマクロ展開を小さくして再実行してください。');onLimit(error);throw error;}
  return resize(requested);
 };
}
// Bound the worker's accumulated response across contexts. Transactional: a
// rejected context cannot consume budget or append only part of its surfaces.
export function createSurfaceBudget({maxItems=512,maxBytes=32*1024*1024}={}){
 let count=0,bytes=0;
 return {accept(items){
  if(count+items.length>maxItems)throw new Error('表示件数の上限に達しました。解析する組合せを減らしてください。');
  let added=0;
  for(const item of items){
   const text=JSON.stringify(item),remaining=maxBytes-bytes-added;
   if(text.length>remaining)throw new Error('表示データの上限に達しました。解析する組合せを減らしてください。');
   added+=new TextEncoder().encode(text).length;
   if(bytes+added>maxBytes)throw new Error('表示データの上限に達しました。解析する組合せを減らしてください。');
  }
  count+=items.length;bytes+=added;
 },get count(){return count;},get bytes(){return bytes;}};
}
