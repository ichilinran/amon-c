/* Modified for Shi: existing fixed-C17 SDK compatibility adaptation.
 * Clang module-dependent guards were simplified for non-modular use.
 * Upstream copyright and license notices are retained.
 * This notice was added during the 2026-11-01 distribution review.
 */
/*===---- __stddef_size_t.h - Definition of size_t -------------------------===
 *
 * Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
 * See https://llvm.org/LICENSE.txt for license information.
 * SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
 *
 *===-----------------------------------------------------------------------===
 */

#ifndef _SIZE_T
#define _SIZE_T

typedef __SIZE_TYPE__ size_t;

#endif
