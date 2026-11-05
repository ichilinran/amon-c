/* 支位's fixed C17 SDK compatibility layer, not an upstream LLVM header.
 * glibc's GCC-version gate omits CMPLX under Clang 18 (GCC compatibility 4.2).
 * Preserve the host header and any definitions it already supplies.
 */
#ifndef _SHI_C17_COMPLEX_COMPAT_H
#define _SHI_C17_COMPLEX_COMPAT_H
#include_next <complex.h>

#if defined(__clang__) && !defined(__cplusplus) && defined(__GLIBC__)
#if defined(__STDC_VERSION__) && __STDC_VERSION__ >= 201112L
#if __has_builtin(__builtin_complex) && !defined(__STDC_NO_COMPLEX__)
#ifndef CMPLX
#define CMPLX(x, y) __builtin_complex((double)(x), (double)(y))
#endif
#ifndef CMPLXF
#define CMPLXF(x, y) __builtin_complex((float)(x), (float)(y))
#endif
#ifndef CMPLXL
#define CMPLXL(x, y) __builtin_complex((long double)(x), (long double)(y))
#endif
#endif
#endif
#endif
#endif
