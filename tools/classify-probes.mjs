import {readFile,writeFile} from 'node:fs/promises';
import {analyze} from '../tests/native-runtime.mjs';
const cases=JSON.parse(await readFile(new URL('../examples/catalog-probes.json',import.meta.url),'utf8'));const rows=[];
for(const [i,c] of cases.entries()){
 try{const r=await analyze({source:c.source});rows.push({id:c.id,valid:r.native.valid,diagnostics:r.native.diagnostics.filter(d=>d.severity>=3).map(d=>d.message)});}
 catch(error){rows.push({id:c.id,valid:false,diagnostics:[error.message]});}
 if((i+1)%100===0)console.log(i+1);
}
await writeFile(new URL('../coverage/probe-classification.json',import.meta.url),JSON.stringify(rows,null,2)+'\n');console.log('valid',rows.filter(r=>r.valid).length,'total',rows.length);
