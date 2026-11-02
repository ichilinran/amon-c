import {LEGACY_ENTRIES} from './legacy-v1.js';

// C17 lexical vocabulary; WG14 N1570 §§6.4, 6.10, 7.1.2, Annex B.
// C17 retains these C11 token lists. All Japanese labels are editable drafts.
export const C17_KEYWORDS = 'auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while _Alignas _Alignof _Atomic _Bool _Complex _Generic _Imaginary _Noreturn _Static_assert _Thread_local'.split(' ');
export const C17_PUNCTUATORS = '[ ] ( ) { } . -> ++ -- & * + - ~ ! / % << >> < > <= >= == != ^ | && || ? : ; ... = *= /= %= += -= <<= >>= &= ^= |= , # ## <: :> <% %> %: %:%:'.split(' ');
export const C17_DIRECTIVES = 'define undef include if ifdef ifndef elif else endif line error pragma'.split(' ');
export const C17_HEADERS = 'assert complex ctype errno fenv float inttypes iso646 limits locale math setjmp signal stdalign stdarg stdatomic stdbool stddef stdint stdio stdlib stdnoreturn string tgmath threads time uchar wchar wctype'.split(' ').map(x=>x+'.h');
export const GROUP_LABELS={keyword:'キーワード',punctuator:'演算子・記号',directive:'前処理の名前',header:'標準ヘッダ',library:'標準ライブラリ名',name:'利用者の名前',number:'数値',string:'文字列',character:'文字定数',other:'その他'};
export const KIND_LABELS={identifier:'名前',keyword:'キーワード',punctuator:'記号',header:'ヘッダ名','pp-number':'前処理数',string:'文字列',character:'文字定数',other:'その他',comment:'コメント',space:'空白',splice:'行継続'};
export const entryKey=e=>`${e.kind||'identifier'}:${e.source}`;
const entries=new Map();
const add=(source,target,group='library',note='',kind='identifier',header='')=>{
  const key=`${kind}:${source}`;
  if(entries.has(key)) {
    // Preserve the first release's established words, but enrich categorization.
    const old=entries.get(key);if(group==='library'){old.group=group;old.header=header||old.header;}
    return;
  }
  entries.set(key,{source,target,group,kind,note:note||`${source} の仮の対応語です。`,header});
};
for(const e of LEGACY_ENTRIES)add(e.source,e.target,e.group,e.note);
for(const [s,t] of [['_Alignas','整列指定'],['_Alignof','整列幅'],['_Atomic','原子的'],['_Complex','複素数型'],['_Generic','型による選択'],['_Imaginary','虚数型'],['_Noreturn','戻らない'],['_Static_assert','静的検査'],['_Thread_local','スレッド局所']])add(s,t,'keyword');
entries.get('identifier:bool').target='真偽の型名';

const symbols=[
  ['[','角開'],[']','角閉'],['(','丸開'],[')','丸閉'],['{','波開'],['}','波閉'],['.','点'],['->','矢印'],
  ['++','増分'],['--','減分'],['&','アンパサンド'],['*','星印'],['+','加号'],['-','減号'],['~','ビット反転'],['!','論理否定'],
  ['/','除号'],['%','剰余'],['<<','左シフト'],['>>','右シフト'],['<','小なり'],['>','大なり'],['<=','以下'],['>=','以上'],['==','等しい'],['!=','等しくない'],['^','排他的論理和'],['|','縦棒'],['&&','論理積'],['||','論理和'],
  ['?','疑問符'],[':','コロン'],[';','セミコロン'],['...','三点'],['=','代入'],['*=','乗算代入'],['/=','除算代入'],['%=','剰余代入'],['+=','加算代入'],['-=','減算代入'],['<<=','左シフト代入'],['>>=','右シフト代入'],['&=','ビット積代入'],['^=','排他的論理和代入'],['|=','ビット和代入'],[',','コンマ'],['#','井桁'],['##','二重井桁'],
  ['<:','角開・別表記'],[':>','角閉・別表記'],['<%','波開・別表記'],['%>','波閉・別表記'],['%:','井桁・別表記'],['%:%:','二重井桁・別表記']
];
const symbolNotes={
  '*':'掛け算・間接参照・ポインタ宣言などに使う同じ記号です。字句段階では訳し分けません。',
  '&':'アドレス取得やビット論理積に使う同じ記号です。字句段階では訳し分けません。',
  '+':'加算や単項の正符号などに使います。', '-':'減算や単項の負符号などに使います。',
  '(':'式・呼び出し・宣言などで使う開き丸括弧です。', ')':'閉じ丸括弧です。',
  '{':'ブロックや初期化子などの開き波括弧です。','}':'閉じ波括弧です。',
  ';':'文の終わりやforの区切りなどで使う記号です。',':':'条件演算子・ラベル・ビットフィールドなどで使います。',
  '#':'前処理指令の開始や、マクロ引数の文字列化に使う記号です。','##':'マクロ展開でトークンを結合する記号です。',
  ',':'引数や宣言の区切り、コンマ演算子などで使います。','...':'可変個数の引数などを表します。'
};
for(const [s,t] of symbols)add(s,t,'punctuator',symbolNotes[s]||`${s} というCの記号です。文脈による役割の判定はしません。`,'punctuator');

for(const [s,t] of [['define','定義'],['undef','定義解除'],['include','取り込み'],['ifdef','定義があれば'],['ifndef','定義がなければ'],['elif','他の条件なら'],['endif','条件終了'],['line','行指定'],['error','エラー通知'],['pragma','処理系指示'],['defined','定義済み'],['_Pragma','指示演算子'],['__VA_ARGS__','可変引数群']])add(s,t,'directive');
add('__func__','現在の関数名','name','各関数内で利用できる定義済みの識別子です。プリプロセッサのマクロではありません。');
const predefined={__FILE__:'現在のファイル名',__LINE__:'現在の行番号',__DATE__:'翻訳日付',__TIME__:'翻訳時刻',__STDC__:'標準C適合',__STDC_HOSTED__:'ホスト環境',__STDC_VERSION__:'標準C版',__STDC_IEC_559__:'浮動小数点IEC適合',__STDC_IEC_559_COMPLEX__:'複素数IEC適合',__STDC_ISO_10646__:'文字集合ISO版',__STDC_MB_MIGHT_NEQ_WC__:'文字符号差あり',__STDC_UTF_16__:'UTF16文字対応',__STDC_UTF_32__:'UTF32文字対応',__STDC_ANALYZABLE__:'解析対応',__STDC_LIB_EXT1__:'境界検査拡張版',__STDC_NO_ATOMICS__:'原子機能なし',__STDC_NO_COMPLEX__:'複素数機能なし',__STDC_NO_THREADS__:'スレッド機能なし',__STDC_NO_VLA__:'可変長配列なし'};
for(const [s,t] of Object.entries(predefined))add(s,t,'directive','処理系が条件に応じて提供する標準の定義済みマクロ名です。値や定義の有無は評価しません。');
for(const [s,t] of [['STDC','標準指示'],['ON','有効指定'],['OFF','無効指定'],['DEFAULT','既定指定'],['FENV_ACCESS','浮動環境参照'],['FP_CONTRACT','浮動式短縮'],['CX_LIMITED_RANGE','複素数範囲制限']])add(s,t,'directive');

const headerTargets=['検査','複素数','文字分類','エラー番号','浮動環境','浮動小数点特性','整数書式','記号の別表記','整数範囲','地域設定','数学','非局所移動','シグナル','整列','可変引数','原子操作','真偽','共通定義','固定幅整数','標準入出力','標準汎用','非復帰','文字列','型共通数学','スレッド','時刻','Unicode文字','ワイド文字','ワイド文字分類'];
C17_HEADERS.forEach((s,i)=>add(s,headerTargets[i]+'.h','header','標準ヘッダの仮の表示名です。実際に開かれるファイル名は元のCのままです。','header',s));

function rows(header,text) {
  for(const line of text.trim().split('\n')){
    if(!line.trim())continue;const [source,target]=line.trim().split('|');
    add(source,target,'library',`${header} に関連する標準の名前です。名前の綴りによる翻訳で、実際の参照先は判定しません。`,'identifier',header);
  }
}
rows('assert.h',`assert|実行時検査
static_assert|静的検査名
NDEBUG|検査を省略`);
rows('stdio.h',`FILE|ファイル型
fpos_t|ファイル位置型
stdin|標準入力
stdout|標準出力
stderr|標準エラー出力
EOF|入力終端
BUFSIZ|推奨バッファ量
FILENAME_MAX|ファイル名最大長
FOPEN_MAX|同時ファイル数
L_tmpnam|一時名必要長
TMP_MAX|一時名最大数
_IOFBF|完全バッファ
_IOLBF|行バッファ
_IONBF|無バッファ
SEEK_SET|先頭基準
SEEK_CUR|現在位置基準
SEEK_END|末尾基準
remove|ファイル削除
rename|ファイル改名
tmpfile|一時ファイル
tmpnam|一時ファイル名
fclose|ファイルを閉じる
fflush|出力を反映
fopen|ファイルを開く
freopen|ファイルを開き直す
setbuf|バッファ設定
setvbuf|バッファ詳細設定
fprintf|ファイル書式表示
fscanf|ファイル書式入力
printf|書式表示
scanf|書式入力
snprintf|長さ制限文字列書式表示
sprintf|文字列書式表示
sscanf|文字列書式入力
vfprintf|引数列ファイル書式表示
vfscanf|引数列ファイル書式入力
vprintf|引数列書式表示
vscanf|引数列書式入力
vsnprintf|引数列長さ制限書式表示
vsprintf|引数列文字列書式表示
vsscanf|引数列文字列書式入力
fgetc|ファイル一文字入力
fgets|ファイル一行入力
fputc|ファイル一文字出力
fputs|ファイル文字列出力
getc|ストリーム一文字入力
getchar|一文字入力
putc|ストリーム一文字出力
putchar|一文字表示
puts|一行表示
ungetc|一文字戻す
fread|領域を読み込む
fwrite|領域を書き出す
fgetpos|ファイル位置取得
fseek|ファイル位置移動
fsetpos|ファイル位置設定
ftell|ファイル位置照会
rewind|ファイル先頭へ
clearerr|エラー状態消去
feof|終端状態
ferror|エラー状態
perror|エラー理由表示`);
rows('stdlib.h',`div_t|整数商余型
ldiv_t|長整数商余型
lldiv_t|長長整数商余型
EXIT_SUCCESS|正常終了値
EXIT_FAILURE|失敗終了値
RAND_MAX|乱数最大値
MB_CUR_MAX|現在の多バイト最大長
atof|実数へ変換
atoi|整数へ変換
atol|長整数へ変換
atoll|長長整数へ変換
strtod|文字列を倍精度へ
strtof|文字列を単精度へ
strtold|文字列を長倍精度へ
strtol|文字列を長整数へ
strtoll|文字列を長長整数へ
strtoul|文字列を符号なし長整数へ
strtoull|文字列を符号なし長長整数へ
rand|擬似乱数
srand|乱数初期値
aligned_alloc|整列領域確保
calloc|ゼロ初期化確保
free|領域解放
malloc|領域確保
realloc|領域変更
abort|異常終了
atexit|終了時処理を登録
at_quick_exit|迅速終了時処理を登録
exit|終了
_Exit|即時終了
quick_exit|迅速終了
getenv|環境変数取得
system|外部指令実行
bsearch|二分探索
qsort|並べ替え
abs|整数絶対値
labs|長整数絶対値
llabs|長長整数絶対値
div|整数商余
ldiv|長整数商余
lldiv|長長整数商余
mblen|多バイト文字長
mbtowc|多バイトからワイド文字
wctomb|ワイドから多バイト文字
mbstowcs|多バイト列からワイド列
wcstombs|ワイド列から多バイト列`);
rows('string.h',`memcpy|メモリ複写
memmove|重複可メモリ複写
strcpy|文字列複写
strncpy|長さ制限文字列複写
strcat|文字列連結
strncat|長さ制限文字列連結
memcmp|メモリ比較
strcmp|文字列比較
strcoll|地域別文字列比較
strncmp|長さ制限文字列比較
strxfrm|地域比較用変換
memchr|メモリ文字探索
strchr|先頭側文字探索
strcspn|非一致先頭長
strpbrk|文字集合探索
strrchr|末尾側文字探索
strspn|一致先頭長
strstr|部分文字列探索
strtok|文字列を分割
memset|メモリ充填
strerror|エラー理由文字列
strlen|文字列長`);
rows('ctype.h',`isalnum|英数字判定
isalpha|英字判定
isblank|空欄判定
iscntrl|制御文字判定
isdigit|十進数字判定
isgraph|図形文字判定
islower|小文字判定
isprint|表示文字判定
ispunct|句読記号判定
isspace|空白文字判定
isupper|大文字判定
isxdigit|十六進数字判定
tolower|小文字へ
toupper|大文字へ`);
rows('stddef.h',`NULL|ヌル
size_t|大きさの型
ptrdiff_t|ポインタ差型
wchar_t|ワイド文字型
max_align_t|最大基本整列型
offsetof|メンバー位置`);
rows('stdbool.h',`bool|真偽の型名
true|真
false|偽
__bool_true_false_are_defined|真偽名定義済み`);
rows('stdalign.h',`alignas|整列指定名
alignof|整列幅名
__alignas_is_defined|整列指定名定義済み
__alignof_is_defined|整列幅名定義済み`);
rows('stdnoreturn.h',`noreturn|非復帰指定名`);
rows('stdarg.h',`va_list|可変引数列型
va_start|可変引数開始
va_arg|可変引数取得
va_end|可変引数終了
va_copy|可変引数列複製`);
rows('errno.h',`errno|エラー番号
EDOM|定義域エラー
ERANGE|範囲エラー
EILSEQ|不正文字列エラー`);
rows('setjmp.h',`jmp_buf|復帰環境型
setjmp|復帰点保存
longjmp|復帰点へ移動`);
rows('signal.h',`sig_atomic_t|シグナル原子整数型
signal|シグナル処理設定
raise|シグナル発生
SIGABRT|異常終了シグナル
SIGFPE|算術異常シグナル
SIGILL|不正命令シグナル
SIGINT|割込みシグナル
SIGSEGV|不正記憶アクセスシグナル
SIGTERM|終了要求シグナル
SIG_DFL|既定シグナル処理
SIG_ERR|シグナル設定失敗
SIG_IGN|シグナル無視`);
rows('time.h',`clock_t|処理時間型
time_t|暦時刻型
tm|分解時刻型名
timespec|秒ナノ秒時刻型名
CLOCKS_PER_SEC|毎秒クロック数
TIME_UTC|協定世界時基準
clock|処理時間取得
difftime|時刻差
mktime|分解時刻を暦時刻へ
time|現在時刻
timespec_get|高精度時刻取得
asctime|分解時刻を文字列へ
ctime|暦時刻を文字列へ
gmtime|協定世界時へ分解
localtime|地域時刻へ分解
strftime|時刻書式化`);
rows('locale.h',`lconv|地域数値形式型名
setlocale|地域設定
localeconv|地域数値形式取得
LC_ALL|全地域分類
LC_COLLATE|照合順序分類
LC_CTYPE|文字分類設定
LC_MONETARY|通貨分類
LC_NUMERIC|数値分類
LC_TIME|時刻分類`);
rows('uchar.h',`char16_t|UTF16文字型
char32_t|UTF32文字型
mbrtoc16|多バイトからUTF16
c16rtomb|UTF16から多バイト
mbrtoc32|多バイトからUTF32
c32rtomb|UTF32から多バイト`);

const mathRows=`acos|逆余弦
asin|逆正弦
atan|逆正接
atan2|座標の偏角
cos|余弦
sin|正弦
tan|正接
acosh|逆双曲余弦
asinh|逆双曲正弦
atanh|逆双曲正接
cosh|双曲余弦
sinh|双曲正弦
tanh|双曲正接
exp|自然指数
exp2|二の指数
expm1|自然指数から一を引く
frexp|仮数指数分解
ilogb|整数指数取得
ldexp|二の指数を掛ける
log|自然対数
log10|常用対数
log1p|一加算の自然対数
log2|二進対数
logb|実数指数取得
modf|整数小数分解
scalbn|基数指数倍
scalbln|長整数基数指数倍
cbrt|立方根
fabs|実数絶対値
hypot|斜辺長
pow|累乗
sqrt|平方根
erf|誤差関数
erfc|相補誤差関数
lgamma|ガンマ絶対値対数
tgamma|ガンマ関数
ceil|上側整数へ
floor|下側整数へ
nearbyint|例外抑制丸め
rint|現在方式丸め
lrint|現在方式長整数丸め
llrint|現在方式長長整数丸め
round|近い整数へ
lround|近い長整数へ
llround|近い長長整数へ
trunc|小数切捨て
fmod|実数剰余
remainder|最寄り商の剰余
remquo|剰余と商情報
copysign|符号複写
nan|非数生成
nextafter|隣接実数へ
nexttoward|長倍精度方向の隣接実数へ
fdim|正の差
fmax|実数最大
fmin|実数最小
fma|積和演算`;
for(const line of mathRows.split('\n')){
  const [s,t]=line.split('|');
  for(const [suffix,label] of [['',''],['f','・単精度'],['l','・長倍精度']])add(s+suffix,t+label,'library','math.h の数学関数名です。型や引数の検査は行いません。','identifier','math.h');
}
rows('math.h',`float_t|計算用単精度型
double_t|計算用倍精度型
HUGE_VAL|巨大倍精度値
HUGE_VALF|巨大単精度値
HUGE_VALL|巨大長倍精度値
INFINITY|正の無限大
NAN|非数定数
FP_INFINITE|無限大分類
FP_NAN|非数分類
FP_NORMAL|正規数分類
FP_SUBNORMAL|非正規数分類
FP_ZERO|ゼロ分類
FP_FAST_FMA|高速積和あり
FP_FAST_FMAF|高速単精度積和あり
FP_FAST_FMAL|高速長倍精度積和あり
FP_ILOGB0|ゼロ指数結果
FP_ILOGBNAN|非数指数結果
MATH_ERRNO|番号式数学エラー
MATH_ERREXCEPT|例外式数学エラー
math_errhandling|数学エラー方式
fpclassify|浮動分類
isfinite|有限判定
isinf|無限大判定
isnan|非数判定
isnormal|正規数判定
signbit|符号ビット
isgreater|大きい判定
isgreaterequal|以上判定
isless|小さい判定
islessequal|以下判定
islessgreater|不等順序判定
isunordered|順序なし判定`);
rows('complex.h',`complex|複素数の型名
imaginary|虚数の型名
_Complex_I|複素単位
_Imaginary_I|虚単位
I|虚数単位名
CMPLX|複素数構成
CMPLXF|単精度複素数構成
CMPLXL|長倍精度複素数構成`);
for(const line of `cacos|複素逆余弦
casin|複素逆正弦
catan|複素逆正接
ccos|複素余弦
csin|複素正弦
ctan|複素正接
cacosh|複素逆双曲余弦
casinh|複素逆双曲正弦
catanh|複素逆双曲正接
ccosh|複素双曲余弦
csinh|複素双曲正弦
ctanh|複素双曲正接
cexp|複素自然指数
clog|複素自然対数
cabs|複素絶対値
cpow|複素累乗
csqrt|複素平方根
carg|複素偏角
cimag|虚部取得
conj|複素共役
cproj|複素射影
creal|実部取得`.split('\n')){
  const [s,t]=line.split('|');for(const [suffix,label] of [['',''],['f','・単精度'],['l','・長倍精度']])add(s+suffix,t+label,'library','','identifier','complex.h');
}
rows('fenv.h',`fenv_t|浮動環境型
fexcept_t|浮動例外状態型
FE_DIVBYZERO|ゼロ除算例外
FE_INEXACT|不正確例外
FE_INVALID|無効演算例外
FE_OVERFLOW|上溢れ例外
FE_UNDERFLOW|下溢れ例外
FE_ALL_EXCEPT|全浮動例外
FE_DOWNWARD|下向き丸め
FE_TONEAREST|最近接丸め
FE_TOWARDZERO|ゼロ向き丸め
FE_UPWARD|上向き丸め
FE_DFL_ENV|既定浮動環境
feclearexcept|浮動例外消去
fegetexceptflag|浮動例外印取得
feraiseexcept|浮動例外発生
fesetexceptflag|浮動例外印設定
fetestexcept|浮動例外検査
fegetround|丸め方向取得
fesetround|丸め方向設定
fegetenv|浮動環境取得
feholdexcept|浮動環境退避
fesetenv|浮動環境設定
feupdateenv|浮動環境更新`);
rows('float.h',`FLT_RADIX|浮動基数
FLT_ROUNDS|浮動丸め指標
FLT_EVAL_METHOD|浮動計算方式
DECIMAL_DIG|最広型往復十進桁数`);
for(const [p,label] of [['FLT','単精度'],['DBL','倍精度'],['LDBL','長倍精度']])for(const [s,t] of [['MANT_DIG','仮数桁数'],['DIG','十進精度'],['MIN_EXP','最小指数'],['MIN_10_EXP','最小十進指数'],['MAX_EXP','最大指数'],['MAX_10_EXP','最大十進指数'],['MAX','最大値'],['EPSILON','一近傍間隔'],['MIN','最小正規値'],['TRUE_MIN','最小正値'],['HAS_SUBNORM','非正規数対応'],['DECIMAL_DIG','往復十進桁数']])add(p+'_'+s,label+t,'library','','identifier','float.h');
rows('limits.h',`CHAR_BIT|一バイトのビット数
MB_LEN_MAX|多バイト最大長`);
for(const [p,t,unsigned] of [['CHAR','文字型',false],['SCHAR','符号あり文字型',false],['UCHAR','符号なし文字型',true],['SHRT','短整数',false],['USHRT','符号なし短整数',true],['INT','整数',false],['UINT','符号なし整数',true],['LONG','長整数',false],['ULONG','符号なし長整数',true],['LLONG','長長整数',false],['ULLONG','符号なし長長整数',true]]){
  add(p+'_MAX',t+'最大値','library','','identifier','limits.h');if(!unsigned)add(p+'_MIN',t+'最小値','library','','identifier','limits.h');
}

// Enumerated 8/16/32/64-bit families. Availability of optional exact-width
// types/macros depends on the C implementation; this is a display dictionary.
for(const n of [8,16,32,64])for(const [part,label] of [['',''],['_least','最小幅'],['_fast','高速']]){
  for(const [u,sign] of [['',''],['u','符号なし']])add(`${u}int${part}${n}_t`,`${sign}${label}${n}ビット整数型`,'library','','identifier','stdint.h');
  const stem='INT'+part.toUpperCase()+n;
  add(stem+'_MIN',`${label}${n}ビット整数最小値`,'library','','identifier','stdint.h');
  add(stem+'_MAX',`${label}${n}ビット整数最大値`,'library','','identifier','stdint.h');
  add('U'+stem+'_MAX',`${label}${n}ビット符号なし最大値`,'library','','identifier','stdint.h');
}
rows('stdint.h',`intptr_t|ポインタ保持整数型
uintptr_t|ポインタ保持符号なし型
intmax_t|最大幅整数型
uintmax_t|最大幅符号なし型
INTPTR_MIN|ポインタ保持整数最小値
INTPTR_MAX|ポインタ保持整数最大値
UINTPTR_MAX|ポインタ保持符号なし最大値
INTMAX_MIN|最大幅整数最小値
INTMAX_MAX|最大幅整数最大値
UINTMAX_MAX|最大幅符号なし最大値
PTRDIFF_MIN|ポインタ差最小値
PTRDIFF_MAX|ポインタ差最大値
SIG_ATOMIC_MIN|シグナル整数最小値
SIG_ATOMIC_MAX|シグナル整数最大値
SIZE_MAX|大きさ型最大値
WCHAR_MIN|ワイド文字最小値
WCHAR_MAX|ワイド文字最大値
WINT_MIN|ワイド入力最小値
WINT_MAX|ワイド入力最大値`);
for(const n of [8,16,32,64])for(const p of ['INT','UINT'])add(`${p}${n}_C`,`${n}ビット${p==='UINT'?'符号なし':''}定数化`,'library','','identifier','stdint.h');
add('INTMAX_C','最大幅整数定数化','library','','identifier','stdint.h');add('UINTMAX_C','最大幅符号なし定数化','library','','identifier','stdint.h');
rows('inttypes.h',`imaxdiv_t|最大幅商余型
imaxabs|最大幅絶対値
imaxdiv|最大幅商余
strtoimax|文字列を最大幅整数へ
strtoumax|文字列を最大幅符号なしへ
wcstoimax|ワイド列を最大幅整数へ
wcstoumax|ワイド列を最大幅符号なしへ`);
const formatTypes=[...[8,16,32,64].flatMap(n=>[[String(n),`${n}ビット`],[`LEAST${n}`,`最小${n}ビット`],[`FAST${n}`,`高速${n}ビット`]]),['MAX','最大幅'],['PTR','ポインタ幅']];
for(const [prefix,action] of [['PRI','出力'],['SCN','入力']])for(const [spec,label] of [['d','十進符号'],['i','整数'],['o','八進'],['u','十進無符号'],['x','十六進小字'],...(prefix==='PRI'?[['X','十六進大字']]:[])])for(const [suffix,type] of formatTypes)add(prefix+spec+suffix,type+label+action+'書式','library','','identifier','inttypes.h');

rows('iso646.h',`and|論理積名
and_eq|ビット積代入名
bitand|ビット積名
bitor|ビット和名
compl|ビット反転名
not|論理否定名
not_eq|不等名
or|論理和名
or_eq|ビット和代入名
xor|排他的論理和名
xor_eq|排他的論理和代入名`);
rows('stdatomic.h',`memory_order|メモリ順序型
memory_order_relaxed|順序緩和
memory_order_consume|依存順序
memory_order_acquire|取得順序
memory_order_release|解放順序
memory_order_acq_rel|取得解放順序
memory_order_seq_cst|逐次一貫順序
ATOMIC_VAR_INIT|原子変数初期値
ATOMIC_FLAG_INIT|原子フラグ初期値
atomic_init|原子初期化
kill_dependency|依存除去
atomic_thread_fence|スレッド順序障壁
atomic_signal_fence|シグナル順序障壁
atomic_is_lock_free|無ロック判定
atomic_flag|原子フラグ型`);
for(const [s,t] of [['store','書込み'],['load','読出し'],['exchange','交換'],['compare_exchange_strong','強い比較交換'],['compare_exchange_weak','弱い比較交換'],['fetch_add','旧値取得加算'],['fetch_sub','旧値取得減算'],['fetch_or','旧値取得論理和'],['fetch_xor','旧値取得排他的和'],['fetch_and','旧値取得論理積'],['flag_test_and_set','フラグ検査設定'],['flag_clear','フラグ消去']])for(const suffix of ['','_explicit'])add('atomic_'+s+suffix,'原子'+t+(suffix?'・順序指定':''),'library','','identifier','stdatomic.h');
for(const [s,t] of [['bool','真偽'],['char','文字'],['schar','符号あり文字'],['uchar','符号なし文字'],['short','短整数'],['ushort','符号なし短整数'],['int','整数'],['uint','符号なし整数'],['long','長整数'],['ulong','符号なし長整数'],['llong','長長整数'],['ullong','符号なし長長整数'],['char16_t','UTF16文字'],['char32_t','UTF32文字'],['wchar_t','ワイド文字'],['intptr_t','ポインタ保持整数'],['uintptr_t','ポインタ保持符号なし'],['size_t','大きさ'],['ptrdiff_t','ポインタ差'],['intmax_t','最大幅整数'],['uintmax_t','最大幅符号なし']])add('atomic_'+s,'原子'+t+'型','library','','identifier','stdatomic.h');
for(const n of [8,16,32,64])for(const p of ['int_least','uint_least','int_fast','uint_fast'])add(`atomic_${p}${n}_t`,'原子'+(p.startsWith('u')?'符号なし':'')+(p.includes('least')?'最小幅':'高速')+n+'ビット型','library','','identifier','stdatomic.h');
for(const [s,t] of [['BOOL','真偽'],['CHAR','文字'],['CHAR16_T','UTF16'],['CHAR32_T','UTF32'],['WCHAR_T','ワイド文字'],['SHORT','短整数'],['INT','整数'],['LONG','長整数'],['LLONG','長長整数'],['POINTER','ポインタ']])add('ATOMIC_'+s+'_LOCK_FREE',t+'原子無ロック特性','library','','identifier','stdatomic.h');
rows('threads.h',`cnd_t|条件変数型
thrd_t|スレッド型
tss_t|スレッド固有キー型
mtx_t|ミューテックス型
tss_dtor_t|固有値破棄関数型
thrd_start_t|スレッド開始関数型
once_flag|一度だけフラグ型
ONCE_FLAG_INIT|一度だけ初期値
TSS_DTOR_ITERATIONS|固有値破棄反復数
thread_local|スレッド局所名
mtx_plain|通常ミューテックス
mtx_recursive|再帰ミューテックス
mtx_timed|時間指定ミューテックス
thrd_success|スレッド成功
thrd_timedout|スレッド時間切れ
thrd_busy|スレッド使用中
thrd_nomem|スレッド記憶不足
thrd_error|スレッドエラー
call_once|一度だけ呼ぶ
cnd_broadcast|条件全通知
cnd_destroy|条件変数破棄
cnd_init|条件変数初期化
cnd_signal|条件一通知
cnd_timedwait|条件時間待機
cnd_wait|条件待機
mtx_destroy|ロック破棄
mtx_init|ロック初期化
mtx_lock|ロック取得
mtx_timedlock|ロック時間取得
mtx_trylock|ロック試行
mtx_unlock|ロック解放
thrd_create|スレッド作成
thrd_current|現在スレッド
thrd_detach|スレッド切離し
thrd_equal|スレッド同一判定
thrd_exit|スレッド終了
thrd_join|スレッド終了待ち
thrd_sleep|スレッド休止
thrd_yield|スレッド譲渡
tss_create|固有キー作成
tss_delete|固有キー削除
tss_get|スレッド固有値取得
tss_set|スレッド固有値設定`);
rows('wchar.h',`wint_t|ワイド入力型
mbstate_t|文字変換状態型
WEOF|ワイド入力終端
fwide|ストリーム向き
btowc|一バイトをワイドへ
wctob|ワイドを一バイトへ
mbsinit|変換状態初期判定
mbrlen|再開可能文字長
mbrtowc|再開可能ワイド変換
wcrtomb|再開可能多バイト変換
mbsrtowcs|再開可能ワイド列変換
wcsrtombs|再開可能多バイト列変換
wcsftime|ワイド時刻書式化
wcslen|ワイド文字列長
wcscpy|ワイド文字列複写
wcsncpy|ワイド長さ制限複写
wcscat|ワイド文字列連結
wcsncat|ワイド長さ制限連結
wcscmp|ワイド文字列比較
wcscoll|ワイド地域別比較
wcsncmp|ワイド長さ制限比較
wcsxfrm|ワイド地域比較用変換
wcschr|ワイド先頭側文字探索
wcscspn|ワイド非一致先頭長
wcspbrk|ワイド文字集合探索
wcsrchr|ワイド末尾側文字探索
wcsspn|ワイド一致先頭長
wcsstr|ワイド部分文字列探索
wcstok|ワイド文字列分割
wmemchr|ワイドメモリ文字探索
wmemcmp|ワイドメモリ比較
wmemcpy|ワイドメモリ複写
wmemmove|ワイド重複可複写
wmemset|ワイドメモリ充填
fgetwc|ファイルワイド一文字入力
fgetws|ファイルワイド一行入力
fputwc|ファイルワイド一文字出力
fputws|ファイルワイド文字列出力
getwc|ストリームワイド一文字入力
getwchar|ワイド一文字入力
putwc|ストリームワイド一文字出力
putwchar|ワイド一文字表示
ungetwc|ワイド一文字戻す
fwprintf|ファイルワイド書式表示
fwscanf|ファイルワイド書式入力
wprintf|ワイド書式表示
wscanf|ワイド書式入力
swprintf|ワイド文字列書式表示
swscanf|ワイド文字列書式入力
vfwprintf|引数列ファイルワイド表示
vfwscanf|引数列ファイルワイド入力
vwprintf|引数列ワイド書式表示
vwscanf|引数列ワイド書式入力
vswprintf|引数列ワイド文字列表示
vswscanf|引数列ワイド文字列入力
wcstod|ワイド列を倍精度へ
wcstof|ワイド列を単精度へ
wcstold|ワイド列を長倍精度へ
wcstol|ワイド列を長整数へ
wcstoll|ワイド列を長長整数へ
wcstoul|ワイド列を符号なし長整数へ
wcstoull|ワイド列を符号なし長長整数へ`);
rows('wctype.h',`wctrans_t|ワイド文字変換指定型
wctype_t|ワイド文字分類指定型
iswctype|指定ワイド分類判定
towctrans|指定ワイド文字変換
wctrans|ワイド変換指定取得
wctype|ワイド分類指定取得`);
for(const s of ['alnum','alpha','blank','cntrl','digit','graph','lower','print','punct','space','upper','xdigit'])add('isw'+s,'ワイド'+entries.get('identifier:is'+s).target,'library','','identifier','wctype.h');
for(const s of ['lower','upper'])add('tow'+s,'ワイド'+entries.get('identifier:to'+s).target,'library','','identifier','wctype.h');

// Keep the vocabulary auditable and the UI independent from its construction.
export const DEFAULT_ENTRIES=[...entries.values()];
export const DEFAULT_COUNTS=Object.fromEntries(Object.keys(GROUP_LABELS).map(g=>[g,DEFAULT_ENTRIES.filter(e=>e.group===g).length]));
