#include "model.h"
#include <stdio.h>
#include <assert.h>
// 支位の確認😀：利用者の名前と表示用の文字列は保持する。
int main(void) {
    struct Item items[] = {{1,2},{2,3}};
    int 日本語 = 7;
    Value total = compute(items, sizeof(items)/sizeof(items[0]), identity);
    assert(sizeof(Value)>0);
    printf("支位😀 %s %d\n", TEXT(JOIN(sample,_name)), 日本語);
    if(total < 0) return 1;
    return 0;
}
