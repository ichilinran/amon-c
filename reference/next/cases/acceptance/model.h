#ifndef APP_MODEL_H
#define APP_MODEL_H
#include <stddef.h>
#include <stdbool.h>
#if defined(USE_DOUBLE)
typedef double Value;
#else
typedef int Value;
#endif
struct Item { int code; Value value; };
typedef Value (*Transform)(Value);
Value compute(const struct Item *items, size_t count, Transform action);
Value identity(Value printf);
_Static_assert(sizeof(Value) >= sizeof(int), "Value width");
#define JOIN_INNER(a,b) a ## b
#define JOIN(a,b) JOIN_INNER(a,b)
#define TEXT_INNER(x) #x
#define TEXT(x) TEXT_INNER(x)
#define CREATE_SLOT(name,type,value) type JOIN(name,_slot) = (value)
#define EMPTY
#define GO(name) goto JOIN(name,_end)
#endif
