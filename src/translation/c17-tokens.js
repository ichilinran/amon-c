// C17 token names and display labels. No translation dictionary.
export const C17_KEYWORDS = 'auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while _Alignas _Alignof _Atomic _Bool _Complex _Generic _Imaginary _Noreturn _Static_assert _Thread_local'.split(' ');
export const C17_PUNCTUATORS = '[ ] ( ) { } . -> ++ -- & * + - ~ ! / % << >> < > <= >= == != ^ | && || ? : ; ... = *= /= %= += -= <<= >>= &= ^= |= , # ## <: :> <% %> %: %:%:'.split(' ');
export const C17_DIRECTIVES = 'define undef include if ifdef ifndef elif else endif line error pragma'.split(' ');
export const C17_HEADERS = 'assert complex ctype errno fenv float inttypes iso646 limits locale math setjmp signal stdalign stdarg stdatomic stdbool stddef stdint stdio stdlib stdnoreturn string tgmath threads time uchar wchar wctype'.split(' ').map(x=>x+'.h');
export const GROUP_LABELS={keyword:'キーワード',punctuator:'演算子・記号',directive:'前処理の名前',header:'標準ヘッダ',library:'標準ライブラリ名',name:'利用者の名前',number:'数値',string:'文字列',character:'文字定数',other:'その他'};
export const KIND_LABELS={identifier:'名前',keyword:'キーワード',punctuator:'記号',header:'ヘッダ名','pp-number':'前処理数',string:'文字列',character:'文字定数',other:'その他',comment:'コメント',space:'空白',splice:'行継続'};
export const entryKey=e=>`${e.kind||'identifier'}:${e.source}`;
