## 支位について

算盤（そろばん）における読上算（よみあげさん）の規則を参考にして、  
計算機（コンピュータ）における算譜言語（プログラミング）を片仮名に変換する規則を用意しました。  
日本語の形式を保ったまま、記述されている算法（アルゴリズム）が直感的に理解しやすくなるのを助けることを目的としています。

「支位（しい）」では、Ｃ言語を変換することができます。




## 変換の具体例

### Ｃ

```c
#include <stdio.h>

int main(void)
{
    printf("Hello World\n");

    return 0;
}
```

### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｱﾗﾜｽﾉﾊ("Hello World\n" ﾃﾞ) ﾅﾘ;

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```

### Ｃ

```c
#include <stdio.h>

int calculate(int a, int b)
{
    return (a + b) * (a - b) / b;
}

int main(void)
{
    int x = 12;
    int y = 4;
    int result = calculate(x, y);

    printf("%d\n", result);

    return 0;
}
```

### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｾｲｽｳ ﾆﾃ calculate(ｳｹﾄﾙﾉﾊ ｾｲｽｳ a, ｾｲｽｳ b ﾅﾘ)
｛
    ｶｴｽﾉﾊ (a + b) * (a - b) / b ﾅﾘ;
｝

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｾｲｽｳ x = 12 ﾅﾘ;
    ｾｲｽｳ y = 4 ﾅﾘ;
    ｾｲｽｳ result = calculate(x, y) ﾅﾘ;

    ｱﾗﾜｽﾉﾊ("%d\n" ﾃﾞ, result ｦ) ﾅﾘ;

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```

### Ｃ

```c
#include <stdio.h>

int main(void)
{
    int values[5] = {3, 8, 2, 10, 5};
    int max = values[0];

    for (int i = 1; i < 5; i++)
    {
        if (values[i] > max)
        {
            max = values[i];
        }
    }

    printf("%d\n", max);

    return 0;
}
```

### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｾｲｽｳ values[5] = {3, 8, 2, 10, 5} ﾅﾘ;
    ｾｲｽｳ max = values[0] ﾅﾘ;

    ｸﾘｶｴｽﾉﾊ (ｾｲｽｳ i = 1 ｶﾞ; i < 5 ﾉｱｲﾀﾞ; ﾂﾄﾞ i++ ﾅﾘ)
    ｛
        ﾓｼ (values[i] > max) ﾅﾗﾊﾞ
        ｛
            max = values[i] ﾅﾘ;
        ｝
    ｝

    ｱﾗﾜｽﾉﾊ("%d\n" ﾃﾞ, max ｦ) ﾅﾘ;

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```
