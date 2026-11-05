#include "model.h"
#include <stdatomic.h>
#include <complex.h>
#include <math.h>
#include <assert.h>
static atomic_uint calls;
Value identity(Value printf) { return printf; }
Value compute(const struct Item *items, size_t count, Transform action) {
    Value total = 0;
    CREATE_SLOT(work,Value,0);
    {
#define SLOT_TYPE int
#define SLOT_INITIAL 1
#include "slot.h"
        work_slot += scratch;
#undef SLOT_TYPE
#undef SLOT_INITIAL
    }
    {
#define SLOT_TYPE Value
#define SLOT_INITIAL 2
#include "slot.h"
        work_slot += scratch;
#undef SLOT_TYPE
#undef SLOT_INITIAL
    }
    for(size_t i=0; i<count; ++i) total += action(items[i].value);
    for(EMPTY;EMPTY;EMPTY) break;
    double complex z = CMPLX(1,2);
    work_slot += (Value)creal(z);
    atomic_fetch_add_explicit(&calls,1,memory_order_relaxed);
    assert(sizeof(Value)>0);
#if defined(USE_DOUBLE)
    total += (Value)0.5;
#else
    total += 1;
#endif
    if(total<0) GO(finish);
    work_slot = 0;
finish_end:
    return total + work_slot;
}
