## 支位について

算盤（そろばん）における読上算（よみあげさん）の規則を参考にして、  
計算機（コンピュータ）における算譜言語（プログラミング）を片仮名に変換する規則を用意しました。  
日本語の形式を保ったまま、記述されている算法（アルゴリズム）が直感的に理解しやすくなるのを助けることを目的としています。

「支位（しい）」では、Ｃ言語を変換することができます。




## 変換の具体例

### ① Hello World

#### Ｃ

```c
#include <stdio.h>

int main(void)
{
    printf("Hello World\n");

    return 0;
}
```

#### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｱﾗﾜｽﾉﾊ("Hello World\n" ﾃﾞ) ﾅﾘ;

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```

### ② 読上算

#### Ｃ

```c
#include <stdio.h>

int main(void)
{
    int prices[5] = {120, 350, 80, 400, 250};
    int total = 0;
    int i = 0;

    while (i < 5)
    {
        total += prices[i];
        i++;
    }

    printf("%d\n", total);

    return 0;
}
```

#### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｾｲｽｳ prices[5] = {120, 350, 80, 400, 250} ﾅﾘ;
    ｾｲｽｳ total = 0 ﾅﾘ;
    ｾｲｽｳ i = 0 ﾅﾘ;

    (i < 5) ﾉｱｲﾀﾞ
    ｛
        total += prices[i] ﾅﾘ;
        i++ ﾅﾘ;
    ｝

    ｱﾗﾜｽﾉﾊ("%d\n" ﾃﾞ, total ｦ) ﾅﾘ;

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```

### ③ 関数

#### Ｃ

```c
#include <stdio.h>

int average(int a, int b)
{
    return (a + b) / 2;
}

int main(void)
{
    int x = 70;
    int y = 90;
    int result = average(x, y);

    printf("%d\n", result);

    return 0;
}
```

#### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｾｲｽｳ ﾆﾃ average(ｳｹﾄﾙﾉﾊ ｾｲｽｳ a, ｾｲｽｳ b ﾅﾘ)
｛
    ｶｴｽﾉﾊ (a + b) / 2 ﾅﾘ;
｝

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｾｲｽｳ x = 70 ﾅﾘ;
    ｾｲｽｳ y = 90 ﾅﾘ;
    ｾｲｽｳ result = average(x, y) ﾅﾘ;

    ｱﾗﾜｽﾉﾊ("%d\n" ﾃﾞ, result ｦ) ﾅﾘ;

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```

### ④ FizzBuzz

#### Ｃ

```c
#include <stdio.h>

int main(void)
{
    for (int i = 1; i <= 15; i++)
    {
        if (i % 15 == 0)
        {
            printf("FizzBuzz\n");
        }
        else if (i % 3 == 0)
        {
            printf("Fizz\n");
        }
        else if (i % 5 == 0)
        {
            printf("Buzz\n");
        }
        else
        {
            printf("%d\n", i);
        }
    }

    return 0;
}
```

#### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｸﾘｶｴｽﾉﾊ (ｾｲｽｳ i = 1 ｶﾞ; i <= 15 ﾉｱｲﾀﾞ; ﾂﾄﾞ i++ ﾅﾘ)
    ｛
        ﾓｼ (i % 15 == 0) ﾅﾗﾊﾞ
        ｛
            ｱﾗﾜｽﾉﾊ("FizzBuzz\n" ﾃﾞ) ﾅﾘ;
        ｝
        ﾅｲｼﾊ (i % 3 == 0) ﾅﾗﾊﾞ
        ｛
            ｱﾗﾜｽﾉﾊ("Fizz\n" ﾃﾞ) ﾅﾘ;
        ｝
        ﾅｲｼﾊ (i % 5 == 0) ﾅﾗﾊﾞ
        ｛
            ｱﾗﾜｽﾉﾊ("Buzz\n" ﾃﾞ) ﾅﾘ;
        ｝
        ﾅｲｼﾊ
        ｛
            ｱﾗﾜｽﾉﾊ("%d\n" ﾃﾞ, i ｦ) ﾅﾘ;
        ｝
    ｝

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```

### ⑤ 構造体とポインタ

#### Ｃ

```c
#include <stdio.h>

struct Point
{
    int x;
    int y;
};

void move(struct Point *p, int dx, int dy)
{
    p->x += dx;
    p->y += dy;
}

int main(void)
{
    struct Point pos = {1, 2};

    move(&pos, 3, 4);

    printf("%d\n", pos.x);
    printf("%d\n", pos.y);

    return 0;
}
```

#### 支位

```text
#ﾌｸﾒﾙ 〈ﾋｮｳｼﾞｭﾝ_ﾆｭｳｼｭﾂﾘｮｸ.ｻｷﾖﾐ〉

ｺｳｿﾞｳﾀｲ Point
{
    ｾｲｽｳ x ﾅﾘ;
    ｾｲｽｳ y ﾅﾘ;
} ﾅﾘ;

ﾑﾅｼ ﾆﾃ move(ｳｹﾄﾙﾉﾊ ｺｳｿﾞｳﾀｲ Point *p, ｾｲｽｳ dx, ｾｲｽｳ dy ﾅﾘ)
｛
    p->x += dx ﾅﾘ;
    p->y += dy ﾅﾘ;
｝

ｾｲｽｳ ﾆﾃ ﾈｶﾞｲﾏｼﾃﾊ(ｳｹﾄﾙﾉﾊ ﾑﾅｼ ﾅﾘ)
｛
    ｺｳｿﾞｳﾀｲ Point pos = {1, 2} ﾅﾘ;

    move(&pos, 3, 4) ﾅﾘ;

    ｱﾗﾜｽﾉﾊ("%d\n" ﾃﾞ, pos.x ｦ) ﾅﾘ;
    ｱﾗﾜｽﾉﾊ("%d\n" ﾃﾞ, pos.y ｦ) ﾅﾘ;

    ｶｴｽﾉﾊ 0 ﾅﾘ;
    ﾃﾞﾊ
｝
```
