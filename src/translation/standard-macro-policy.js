// C17 public argument roles. Origin and physical spelling must still be proven
// by standard-reader; catalog membership alone never permits translation.
const mathPredicates=new Set('fpclassify isfinite isinf isnan isnormal signbit isgreater isgreaterequal isless islessequal islessgreater isunordered'.split(' '));
const expressionNames=new Set('va_start va_end va_copy setjmp CMPLX CMPLXF CMPLXL'.split(' '));
const aliases=new Set('bool true false noreturn thread_local complex imaginary alignas alignof static_assert'.split(' '));
const alternatives=new Set('and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq'.split(' '));
export const atomicExpression=e=>e?.headers.includes('stdatomic.h')&&['macro','function'].includes(e.kind)&&(/^atomic_/.test(e.source)||['ATOMIC_VAR_INIT','kill_dependency'].includes(e.source));
export function macroArgumentRole(e){
 if(!e)return 'unknown';
 if(e.source==='assert')return 'assert-condition';
 if(e.source==='va_arg')return 'value-and-type';
 if(e.source==='offsetof')return 'type-and-member';
 if(aliases.has(e.source))return 'language-alias';
 if(alternatives.has(e.source))return 'operator-alias';
 if(e.headers.includes('stdint.h')&&/^(U?INT)(8|16|32|64|MAX)_C$/.test(e.source))return 'integer-literal';
 if(e.kind==='function'||mathPredicates.has(e.source)||atomicExpression(e)||expressionNames.has(e.source))return 'expression';
 if(e.kind==='macro')return 'object-value';
 return 'not-macro';
}
