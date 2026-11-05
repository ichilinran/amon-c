// Prepare the existing documentation-only main branch, separately from source.
// No repository or network writes.
import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
export function mainReadme(text){
 const heading='\n## ソースから配信候補を生成する\n';
 if(text.split(heading).length!==2)throw Error('Source README generation section needs review');
 const license='自作部分には [MIT License](LICENSE) を適用しています。対象の区分は [LICENSE-SCOPE.md](LICENSE-SCOPE.md) を参照してください。';
 if(!text.includes(license))throw Error('Source README license paragraph needs review');
 return text.split(heading)[0].replace(license,'このリポジトリの説明・規則・対応表は [MIT License](LICENSE) です。').trimEnd()+'\n';
}
export async function buildMainDocs(){
 const names=['README.md','RULES.md','VOCABULARY.md','LIMITATIONS.md','LICENSE'];
 const directory=path.join(root,'build/public-main');await mkdir(directory,{recursive:true});
 const existing=await readdir(directory);if(existing.some(n=>!names.includes(n)))throw Error('Unexpected file in documentation output');
 for(const name of names){const bytes=await readFile(path.join(root,name));await writeFile(path.join(directory,name),name==='README.md'?mainReadme(bytes.toString()):bytes);}
 let localLinks=0;
 for(const name of names){const text=await readFile(path.join(directory,name),'utf8');
  for(const m of text.matchAll(/\]\(([^)]+)\)/g)){
   if(/^(?:[a-z]+:|#)/i.test(m[1]))continue;
   const dest=path.posix.normalize(m[1].split('#')[0]);if(!names.includes(dest))throw Error('Broken public-main link: '+name+' -> '+dest);localLinks++;
  }
 }
 return {status:'passed',files:names,localLinks,published:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))console.log(JSON.stringify(await buildMainDocs()));
