import {writeFile} from 'node:fs/promises';
import {STANDARD_NAMES} from '../src/vocabulary/standard-catalog.js';
import {CALL_PROFILES} from '../src/translation/usage-profiles.js';
const rows=[];
for(const e of STANDARD_NAMES){
 const p=CALL_PROFILES[e.key],id=rows.length,name=e.source;
 const headers=new Set([e.headers[0]]);let declaration='',body='';
 if(p){
  const args=p.parameters.map(()=> '0');
  if(p.format_index!==undefined)args[p.format_index]=name.includes('wprintf')||name.includes('wscanf')?'L"%d"':'"%d"';
  if(p.variadic)args.push(name.includes('scanf')?'&integer':'0');
  if(name.startsWith('atomic_')){
   headers.add('stdatomic.h');declaration='atomic_int atom=ATOMIC_VAR_INIT(0); atomic_flag flag=ATOMIC_FLAG_INIT; int expected=0;';
   args[0]=name.startsWith('atomic_flag_')?'&flag':'&atom';
   if(name.startsWith('atomic_compare_exchange'))args[1]='&expected';
   for(let i=0;i<p.parameters.length;i++)if(p.parameters[i].kind?.includes('order'))args[i]='memory_order_seq_cst';
  }
  if(['fpclassify','isfinite','isinf','isnan','isnormal','signbit','isgreater','isgreaterequal','isless','islessequal','islessgreater','isunordered'].includes(name))args.fill('0.0');
  if(['atomic_thread_fence','atomic_signal_fence'].includes(name))args[0]='memory_order_seq_cst';
  if(name==='va_start'||name==='va_arg'||name==='va_copy'||name==='va_end'){
   headers.add('stdarg.h');declaration='va_list ap,copy;';
   if(name==='va_start')body='va_start(ap,last);';
   if(name==='va_arg')body='(void)va_arg(ap,int);';
   if(name==='va_copy')body='va_copy(copy,ap);';
   if(name==='va_end')body='va_end(ap);';
  }else if(name==='alignas'){body='alignas(16) int aligned;';}
  else if(name==='alignof'){body='(void)alignof(int);';}
  else if(name==='offsetof'){declaration='struct P { int member; };';body='(void)offsetof(struct P,member);';}
  else if(name==='static_assert'){body='static_assert(1,"ok");';}
  else if(name==='assert'){body='assert(integer==0);';}
  else if(name==='setjmp'){headers.add('setjmp.h');declaration='jmp_buf env;';body='if(setjmp(env)==0){}';}
  else if(name==='longjmp'){headers.add('setjmp.h');declaration='jmp_buf env;';body='longjmp(env,1);';}
  else body=`(void)${name}(${args.join(',')});`;
 }else if(e.kind==='type')body=`${name} *value; (void)value;`;
 else if(e.kind==='tag')body=`struct ${name} *value; (void)value;`;
 else if(['tv_sec','tv_nsec'].includes(name))body=`(void)((struct timespec*)0)->${name};`;
 else if(['quot','rem'].includes(name))body=`(void)((div_t*)0)->${name};`;
 else if(e.kind==='member')body=`(void)((struct ${e.headers.includes('locale.h')?'lconv':e.headers.includes('time.h')||e.headers.includes('wchar.h')?'tm':'timespec'}*)0)->${name};`;
 else if(name==='complex')body='double complex value=0;(void)value;';
 else if(name==='ONCE_FLAG_INIT')body='once_flag flag=ONCE_FLAG_INIT;(void)flag;';
 else if(name==='ATOMIC_FLAG_INIT')body='atomic_flag flag=ATOMIC_FLAG_INIT;(void)flag;';
 else if(['and','and_eq','bitand','bitor','not_eq','or','or_eq','xor','xor_eq'].includes(name))body=`integer ${name} 1;`;
 else if(['compl','not'].includes(name))body=`(void)(${name} integer);`;
 else if(name==='bool')body='bool value=0;(void)value;';
 else if(name==='noreturn')body='';
 else if(name==='thread_local')body='static thread_local int value;(void)value;';
 else if(name==='ATOMIC_VAR_INIT')body='atomic_int value=ATOMIC_VAR_INIT(0);(void)value;';
 else body=`(void)${name};`;
 let code=`${[...headers].map(h=>'#include <'+h+'>').join('\n')}\nvoid probe_${id}(int last,...) { int integer=0; ${declaration} ${body} }\n`;
 if(name==='noreturn')code=`#include <stdnoreturn.h>\nnoreturn void probe_${id}(void){for(;;){}}\n`;
 rows.push({id:e.key,source:code,name,kind:e.kind,call:!!p});
}
await writeFile(new URL('../examples/catalog-probes.json',import.meta.url),JSON.stringify(rows,null,2)+'\n');
console.log(rows.length);
