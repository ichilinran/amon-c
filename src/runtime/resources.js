import {boundedBytes,guardWasmImports} from './resource-budget.js';
// All URLs are project assets. Source code is never part of a resource request.
async function decodedBytes(response,wireLimit,decodedLimit){
  if(!response.ok)throw new Error('解析用ファイルを読み込めません。');
  if(!response.body)throw new Error('解析用ファイルが空です。');
  const declared=Number(response.headers.get('content-length'));
  if(Number.isFinite(declared)&&declared>wireLimit){await response.body.cancel();throw new Error('解析用ファイルのサイズが上限を超えています。');}
  const bytes=await boundedBytes(response.body,wireLimit,'解析用ファイル');
  // Some servers transparently decompress .gz responses. Never decompress twice.
  if(bytes[0]!==0x1f||bytes[1]!==0x8b){if(bytes.byteLength>decodedLimit)throw new Error('展開した解析用ファイルのサイズが上限を超えています。');return bytes;}
  if(typeof DecompressionStream==='undefined')throw new Error('このブラウザは圧縮ファイルの読込みに対応していません。');
  return boundedBytes(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip')),decodedLimit,'展開した解析用ファイル');
}
export async function loadBrowserResources({fetcher=fetch,base=new URL('../../wasm/out/',import.meta.url),compile=bytes=>WebAssembly.compile(bytes)}={}){
  const start=performance.now();
  const [binary,core,index]=await Promise.all([
    fetcher(new URL('shi-clang.wasm.gz',base)).then(r=>decodedBytes(r,32*1024*1024,32*1024*1024)),
    fetcher(new URL('sdk-core.json.gz',base)).then(r=>decodedBytes(r,1024*1024,1024*1024)).then(b=>JSON.parse(new TextDecoder().decode(b))),
    fetcher(new URL('sdk-index.json',base)).then(r=>decodedBytes(r,1024*1024,1024*1024)).then(b=>JSON.parse(new TextDecoder().decode(b))),
  ]);
  const compiled=await compile(binary);
  let full;
  return {
    sdkFiles:core,
    setupMilliseconds:Math.round(performance.now()-start),
    createModuleOptions(options){return {...options,instantiateWasm(imports,receive){guardWasmImports(imports,options.onResourceLimit);const instance=new WebAssembly.Instance(compiled,imports);receive(instance);return instance.exports;}};},
    async resolveSdk(missing){
      if(!missing.some(name=>index.paths.some(path=>path.endsWith('/'+name))))return null;
      full??=fetcher(new URL('sdk.json.gz',base)).then(r=>decodedBytes(r,24*1024*1024,24*1024*1024)).then(b=>JSON.parse(new TextDecoder().decode(b)));
      return full;
    },
  };
}
