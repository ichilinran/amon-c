const cases={
  basic:'int main(void){int sum=0;for(int i=0;i<4;i++){if(i%2)sum+=i;}return sum;}',
  declaration:'typedef int Count; int add(int x){return x+1;} int (*choose(void))(int){return add;} Count run(Count x){int (*cb)(int)=choose();return cb(x);}',
  standard:'#include <math.h>\n#include <stdio.h>\ndouble f(double x){printf("%.*f\\n",2,x);return sqrt(x);}',
  shadow:'double sqrt(double x){return x;} double f(double x){return sqrt(x);}',
  macro:'#include <math.h>\n#define TWICE(x) ((x)+(x))\n#define USE 1\n#if USE\ndouble f(double x){return sqrt(TWICE(x));}\n#else\nint unused(void){return 0;}\n#endif',
  assertion:'#include <assert.h>\nint f(int x){assert(x>0);return x;}',
  disabled:'#define NDEBUG\n#include <assert.h>\nint f(int x){assert(x>0);return x;}',
  unicode:'// 日本語 😀\nint main(void){int x=1;return x;}',
  invalid:'int f(void){return ; unexpected ???}',
  missing:'#include "missing.h"\nint main(void){return 0;}',
};
cases.allHeaders='assert complex ctype errno fenv float inttypes iso646 limits locale math setjmp signal stdalign stdarg stdatomic stdbool stddef stdint stdio stdlib stdnoreturn string tgmath threads time uchar wchar wctype'.split(' ').map(h=>'#include <'+h+'.h>').join('\n')+'\nint main(void){return 0;}';
for(const key of Object.keys(cases))cases[key]+='\n';
export default cases;
