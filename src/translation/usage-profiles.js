// Runtime argument and statement policies; recognition is binding-based.
// reading_form is fixed metadata, independent of editable vocabulary.
export const CALL_PROFILES={
  "library:abs": {
    "source": "abs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:div": {
    "source": "div",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:labs": {
    "source": "labs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ldiv": {
    "source": "ldiv",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:llabs": {
    "source": "llabs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lldiv": {
    "source": "lldiv",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:INT16_C": {
    "source": "INT16_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:INT32_C": {
    "source": "INT32_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:INT64_C": {
    "source": "INT64_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:INT8_C": {
    "source": "INT8_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:INTMAX_C": {
    "source": "INTMAX_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:UINT16_C": {
    "source": "UINT16_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:UINT32_C": {
    "source": "UINT32_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:UINT64_C": {
    "source": "UINT64_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:UINT8_C": {
    "source": "UINT8_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:UINTMAX_C": {
    "source": "UINTMAX_C",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:imaxabs": {
    "source": "imaxabs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:imaxdiv": {
    "source": "imaxdiv",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:longjmp": {
    "source": "longjmp",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "input_buffer"
      },
      {
        "name": "value",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:setjmp": {
    "source": "setjmp",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_buffer"
      }
    ]
  },
  "library:fprintf": {
    "source": "fprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "printf",
    "wide": false,
    "content_suffix": "ｦ"
  },
  "library:fscanf": {
    "source": "fscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": false
  },
  "printf": {
    "source": "printf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "printf",
    "wide": false,
    "content_suffix": ""
  },
  "library:scanf": {
    "source": "scanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "scanf",
    "wide": false
  },
  "library:snprintf": {
    "source": "snprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 2,
    "format_mode": "printf",
    "wide": false,
    "content_suffix": "ｦ"
  },
  "library:sprintf": {
    "source": "sprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "printf",
    "wide": false,
    "content_suffix": "ｦ"
  },
  "library:sscanf": {
    "source": "sscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": false
  },
  "library:vfprintf": {
    "source": "vfprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vfscanf": {
    "source": "vfscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vprintf": {
    "source": "vprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vscanf": {
    "source": "vscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vsnprintf": {
    "source": "vsnprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 2,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vsprintf": {
    "source": "vsprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vsscanf": {
    "source": "vsscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:clearerr": {
    "source": "clearerr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:feof": {
    "source": "feof",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:ferror": {
    "source": "ferror",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fflush": {
    "source": "fflush",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_stream"
      }
    ]
  },
  "library:fgetc": {
    "source": "fgetc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fgets": {
    "source": "fgets",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fputc": {
    "source": "fputc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fputs": {
    "source": "fputs",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fread": {
    "source": "fread",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fwrite": {
    "source": "fwrite",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:getc": {
    "source": "getc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:getchar": {
    "source": "getchar",
    "reading_form": "verb",
    "parameters": [],
    "statement_nari": {
      "standalone": true,
      "simple_assignment": true,
      "argument_count": 0,
      "parentheses": true
    }
  },
  "library:perror": {
    "source": "perror",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "prefix",
        "suffix": "ｦｿｴﾃ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:putc": {
    "source": "putc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:putchar": {
    "source": "putchar",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:puts": {
    "source": "puts",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:setbuf": {
    "source": "setbuf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      }
    ]
  },
  "library:setvbuf": {
    "source": "setvbuf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "buffer",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾀﾒﾎｳｼｷﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ungetc": {
    "source": "ungetc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fclose": {
    "source": "fclose",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fopen": {
    "source": "fopen",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "filename",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾓｰﾄﾞﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:freopen": {
    "source": "freopen",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "filename",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾓｰﾄﾞﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:remove": {
    "source": "remove",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "filename",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:rename": {
    "source": "rename",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "old_name",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "new_name",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tmpfile": {
    "source": "tmpfile",
    "reading_form": "noun",
    "parameters": []
  },
  "library:tmpnam": {
    "source": "tmpnam",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      }
    ]
  },
  "library:fgetpos": {
    "source": "fgetpos",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "position",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:fseek": {
    "source": "fseek",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "offset",
        "suffix": "ﾀﾞｹ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "origin",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fsetpos": {
    "source": "fsetpos",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "position",
        "suffix": "ﾉｲﾁｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ftell": {
    "source": "ftell",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:rewind": {
    "source": "rewind",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:aligned_alloc": {
    "source": "aligned_alloc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "alignment",
        "suffix": "ﾊﾞｲﾄﾉﾊｲﾁﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:calloc": {
    "source": "calloc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:free": {
    "source": "free",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "pointer",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer"
      }
    ]
  },
  "library:malloc": {
    "source": "malloc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:realloc": {
    "source": "realloc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "pointer",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:alignas": {
    "source": "alignas",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "alignment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "type_or_constant"
      }
    ]
  },
  "library:alignof": {
    "source": "alignof",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "type",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "type"
      }
    ],
    "postfix": true
  },
  "library:offsetof": {
    "source": "offsetof",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "type",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "type"
      },
      {
        "name": "member",
        "suffix": "ﾏﾃﾞ",
        "prefix": "",
        "kind": "member_designator"
      }
    ],
    "postfix": true
  },
  "library:atof": {
    "source": "atof",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atoi": {
    "source": "atoi",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atol": {
    "source": "atol",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atoll": {
    "source": "atoll",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:mblen": {
    "source": "mblen",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          1
        ]
      }
    ]
  },
  "library:mbstowcs": {
    "source": "mbstowcs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:mbtowc": {
    "source": "mbtowc",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 1,
        "omit_supplements_for": [
          0,
          2
        ]
      }
    ]
  },
  "library:strtod": {
    "source": "strtod",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:strtof": {
    "source": "strtof",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:strtol": {
    "source": "strtol",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strtold": {
    "source": "strtold",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:strtoll": {
    "source": "strtoll",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strtoul": {
    "source": "strtoul",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strtoull": {
    "source": "strtoull",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcstombs": {
    "source": "wcstombs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:memchr": {
    "source": "memchr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:memcmp": {
    "source": "memcmp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:memcpy": {
    "source": "memcpy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:memmove": {
    "source": "memmove",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:memset": {
    "source": "memset",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strcat": {
    "source": "strcat",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strchr": {
    "source": "strchr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strcmp": {
    "source": "strcmp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strcoll": {
    "source": "strcoll",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strcpy": {
    "source": "strcpy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strcspn": {
    "source": "strcspn",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strerror": {
    "source": "strerror",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "error_number",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strlen": {
    "source": "strlen",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "text",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strncat": {
    "source": "strncat",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strncmp": {
    "source": "strncmp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strncpy": {
    "source": "strncpy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strpbrk": {
    "source": "strpbrk",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "set",
        "suffix": "ﾉｲｽﾞﾚｶｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strrchr": {
    "source": "strrchr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strspn": {
    "source": "strspn",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strstr": {
    "source": "strstr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "needle",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strtok": {
    "source": "strtok",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "delimiters",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strxfrm": {
    "source": "strxfrm",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isalnum": {
    "source": "isalnum",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isalpha": {
    "source": "isalpha",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isblank": {
    "source": "isblank",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iscntrl": {
    "source": "iscntrl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isdigit": {
    "source": "isdigit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isgraph": {
    "source": "isgraph",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:islower": {
    "source": "islower",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isprint": {
    "source": "isprint",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ispunct": {
    "source": "ispunct",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isspace": {
    "source": "isspace",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isupper": {
    "source": "isupper",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswalnum": {
    "source": "iswalnum",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswalpha": {
    "source": "iswalpha",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswblank": {
    "source": "iswblank",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswcntrl": {
    "source": "iswcntrl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswctype": {
    "source": "iswctype",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｶﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "classification",
        "suffix": "ｶ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswdigit": {
    "source": "iswdigit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswgraph": {
    "source": "iswgraph",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswlower": {
    "source": "iswlower",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswprint": {
    "source": "iswprint",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswpunct": {
    "source": "iswpunct",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswspace": {
    "source": "iswspace",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswupper": {
    "source": "iswupper",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:iswxdigit": {
    "source": "iswxdigit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isxdigit": {
    "source": "isxdigit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tolower": {
    "source": "tolower",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:toupper": {
    "source": "toupper",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:towctrans": {
    "source": "towctrans",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "transformation",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:towlower": {
    "source": "towlower",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:towupper": {
    "source": "towupper",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wctrans": {
    "source": "wctrans",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "name",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wctype": {
    "source": "wctype",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "name",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:btowc": {
    "source": "btowc",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:mbrlen": {
    "source": "mbrlen",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "source",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          1
        ]
      }
    ]
  },
  "library:mbrtowc": {
    "source": "mbrtowc",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 1,
        "omit_supplements_for": [
          0,
          2
        ]
      }
    ]
  },
  "library:mbsinit": {
    "source": "mbsinit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "state",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_pointer"
      }
    ]
  },
  "library:mbsrtowcs": {
    "source": "mbsrtowcs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source_pointer",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          2
        ]
      }
    ]
  },
  "library:wcrtomb": {
    "source": "wcrtomb",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          1
        ]
      }
    ]
  },
  "library:wctob": {
    "source": "wctob",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:c16rtomb": {
    "source": "c16rtomb",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          1
        ]
      }
    ]
  },
  "library:c32rtomb": {
    "source": "c32rtomb",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          1
        ]
      }
    ]
  },
  "library:mbrtoc16": {
    "source": "mbrtoc16",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 1,
        "omit_supplements_for": [
          0,
          2
        ]
      }
    ]
  },
  "library:mbrtoc32": {
    "source": "mbrtoc32",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 1,
        "omit_supplements_for": [
          0,
          2
        ]
      }
    ]
  },
  "library:fgetwc": {
    "source": "fgetwc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fgetws": {
    "source": "fgetws",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fputwc": {
    "source": "fputwc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fputws": {
    "source": "fputws",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:fwide": {
    "source": "fwide",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾑｷｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fwprintf": {
    "source": "fwprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "printf",
    "wide": true,
    "content_suffix": "ｦ"
  },
  "library:fwscanf": {
    "source": "fwscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": true
  },
  "library:getwc": {
    "source": "getwc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:getwchar": {
    "source": "getwchar",
    "reading_form": "verb",
    "parameters": []
  },
  "library:putwc": {
    "source": "putwc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:putwchar": {
    "source": "putwchar",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:swprintf": {
    "source": "swprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "capacity",
        "suffix": "ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 2,
    "format_mode": "printf",
    "wide": true,
    "content_suffix": "ｦ"
  },
  "library:swscanf": {
    "source": "swscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": true
  },
  "library:ungetwc": {
    "source": "ungetwc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      }
    ]
  },
  "library:vfwprintf": {
    "source": "vfwprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vfwscanf": {
    "source": "vfwscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vswprintf": {
    "source": "vswprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "capacity",
        "suffix": "ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 2,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vswscanf": {
    "source": "vswscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vwprintf": {
    "source": "vwprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vwscanf": {
    "source": "vwscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": true
  },
  "library:wprintf": {
    "source": "wprintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "printf",
    "wide": true,
    "content_suffix": ""
  },
  "library:wscanf": {
    "source": "wscanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "scanf",
    "wide": true
  },
  "library:wcscat": {
    "source": "wcscat",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcschr": {
    "source": "wcschr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcscmp": {
    "source": "wcscmp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcscoll": {
    "source": "wcscoll",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcscpy": {
    "source": "wcscpy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcscspn": {
    "source": "wcscspn",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsftime": {
    "source": "wcsftime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcslen": {
    "source": "wcslen",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "text",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsncat": {
    "source": "wcsncat",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsncmp": {
    "source": "wcsncmp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsncpy": {
    "source": "wcsncpy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcspbrk": {
    "source": "wcspbrk",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "set",
        "suffix": "ﾉｲｽﾞﾚｶｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsrchr": {
    "source": "wcsrchr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsrtombs": {
    "source": "wcsrtombs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source_pointer",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout_pointer"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          2
        ]
      }
    ]
  },
  "library:wcsspn": {
    "source": "wcsspn",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsstr": {
    "source": "wcsstr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "needle",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcstod": {
    "source": "wcstod",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:wcstof": {
    "source": "wcstof",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:wcstok": {
    "source": "wcstok",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "delimiters",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "state_pointer",
        "suffix": "ﾉｷﾛｸﾃﾞ",
        "prefix": "",
        "kind": "inout_pointer"
      }
    ]
  },
  "library:wcstol": {
    "source": "wcstol",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcstold": {
    "source": "wcstold",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:wcstoll": {
    "source": "wcstoll",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcstoul": {
    "source": "wcstoul",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcstoull": {
    "source": "wcstoull",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcsxfrm": {
    "source": "wcsxfrm",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "capacity",
        "suffix": "ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wmemchr": {
    "source": "wmemchr",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wmemcmp": {
    "source": "wmemcmp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wmemcpy": {
    "source": "wmemcpy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wmemmove": {
    "source": "wmemmove",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wmemset": {
    "source": "wmemset",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "character",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strtoimax": {
    "source": "strtoimax",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:strtoumax": {
    "source": "strtoumax",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcstoimax": {
    "source": "wcstoimax",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:wcstoumax": {
    "source": "wcstoumax",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:rand": {
    "source": "rand",
    "reading_form": "noun",
    "parameters": []
  },
  "library:srand": {
    "source": "srand",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "seed",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:acos": {
    "source": "acos",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:acosf": {
    "source": "acosf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:acosh": {
    "source": "acosh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:acoshf": {
    "source": "acoshf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:acoshl": {
    "source": "acoshl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:acosl": {
    "source": "acosl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:asin": {
    "source": "asin",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:asinf": {
    "source": "asinf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:asinh": {
    "source": "asinh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:asinhf": {
    "source": "asinhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:asinhl": {
    "source": "asinhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:asinl": {
    "source": "asinl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atan": {
    "source": "atan",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atan2": {
    "source": "atan2",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "y",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atan2f": {
    "source": "atan2f",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "y",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atan2l": {
    "source": "atan2l",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "y",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atanf": {
    "source": "atanf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atanh": {
    "source": "atanh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atanhf": {
    "source": "atanhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atanhl": {
    "source": "atanhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atanl": {
    "source": "atanl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cbrt": {
    "source": "cbrt",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cbrtf": {
    "source": "cbrtf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cbrtl": {
    "source": "cbrtl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:copysign": {
    "source": "copysign",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉﾌｺﾞｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:copysignf": {
    "source": "copysignf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉﾌｺﾞｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:copysignl": {
    "source": "copysignl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉﾌｺﾞｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cos": {
    "source": "cos",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cosf": {
    "source": "cosf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cosh": {
    "source": "cosh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:coshf": {
    "source": "coshf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:coshl": {
    "source": "coshl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cosl": {
    "source": "cosl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:erf": {
    "source": "erf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:erfc": {
    "source": "erfc",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:erfcf": {
    "source": "erfcf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:erfcl": {
    "source": "erfcl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:erff": {
    "source": "erff",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:erfl": {
    "source": "erfl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:exp": {
    "source": "exp",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:exp2": {
    "source": "exp2",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:exp2f": {
    "source": "exp2f",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:exp2l": {
    "source": "exp2l",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:expf": {
    "source": "expf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:expl": {
    "source": "expl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:expm1": {
    "source": "expm1",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:expm1f": {
    "source": "expm1f",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:expm1l": {
    "source": "expm1l",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fabs": {
    "source": "fabs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fabsf": {
    "source": "fabsf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fabsl": {
    "source": "fabsl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fdim": {
    "source": "fdim",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value"
      }
    ]
  },
  "library:fdimf": {
    "source": "fdimf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value"
      }
    ]
  },
  "library:fdiml": {
    "source": "fdiml",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value"
      }
    ]
  },
  "library:fma": {
    "source": "fma",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉｾｷﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "z",
        "suffix": "ｦﾀｼﾃ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmaf": {
    "source": "fmaf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉｾｷﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "z",
        "suffix": "ｦﾀｼﾃ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmal": {
    "source": "fmal",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉｾｷﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "z",
        "suffix": "ｦﾀｼﾃ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmax": {
    "source": "fmax",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmaxf": {
    "source": "fmaxf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmaxl": {
    "source": "fmaxl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmin": {
    "source": "fmin",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fminf": {
    "source": "fminf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fminl": {
    "source": "fminl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmod": {
    "source": "fmod",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmodf": {
    "source": "fmodf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fmodl": {
    "source": "fmodl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:frexp": {
    "source": "frexp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:frexpf": {
    "source": "frexpf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:frexpl": {
    "source": "frexpl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:hypot": {
    "source": "hypot",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:hypotf": {
    "source": "hypotf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:hypotl": {
    "source": "hypotl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ilogb": {
    "source": "ilogb",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ilogbf": {
    "source": "ilogbf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ilogbl": {
    "source": "ilogbl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ldexp": {
    "source": "ldexp",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ldexpf": {
    "source": "ldexpf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ldexpl": {
    "source": "ldexpl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lgamma": {
    "source": "lgamma",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lgammaf": {
    "source": "lgammaf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lgammal": {
    "source": "lgammal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log": {
    "source": "log",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log10": {
    "source": "log10",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log10f": {
    "source": "log10f",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log10l": {
    "source": "log10l",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log1p": {
    "source": "log1p",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log1pf": {
    "source": "log1pf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log1pl": {
    "source": "log1pl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log2": {
    "source": "log2",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log2f": {
    "source": "log2f",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:log2l": {
    "source": "log2l",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:logb": {
    "source": "logb",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:logbf": {
    "source": "logbf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:logbl": {
    "source": "logbl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:logf": {
    "source": "logf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:logl": {
    "source": "logl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:modf": {
    "source": "modf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "integer_part",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:modff": {
    "source": "modff",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "integer_part",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:modfl": {
    "source": "modfl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "integer_part",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:nan": {
    "source": "nan",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "tag",
        "suffix": "ﾉｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nanf": {
    "source": "nanf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "tag",
        "suffix": "ﾉｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nanl": {
    "source": "nanl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "tag",
        "suffix": "ﾉｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nextafter": {
    "source": "nextafter",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nextafterf": {
    "source": "nextafterf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nextafterl": {
    "source": "nextafterl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nexttoward": {
    "source": "nexttoward",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nexttowardf": {
    "source": "nexttowardf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nexttowardl": {
    "source": "nexttowardl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:pow": {
    "source": "pow",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:powf": {
    "source": "powf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:powl": {
    "source": "powl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:remainder": {
    "source": "remainder",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:remainderf": {
    "source": "remainderf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:remainderl": {
    "source": "remainderl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:remquo": {
    "source": "remquo",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾃ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "quotient_bits",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:remquof": {
    "source": "remquof",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾃ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "quotient_bits",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:remquol": {
    "source": "remquol",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾃ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "quotient_bits",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:scalbln": {
    "source": "scalbln",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:scalblnf": {
    "source": "scalblnf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:scalblnl": {
    "source": "scalblnl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:scalbn": {
    "source": "scalbn",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:scalbnf": {
    "source": "scalbnf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:scalbnl": {
    "source": "scalbnl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sin": {
    "source": "sin",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sinf": {
    "source": "sinf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sinh": {
    "source": "sinh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sinhf": {
    "source": "sinhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sinhl": {
    "source": "sinhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sinl": {
    "source": "sinl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sqrt": {
    "source": "sqrt",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sqrtf": {
    "source": "sqrtf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:sqrtl": {
    "source": "sqrtl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tan": {
    "source": "tan",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tanf": {
    "source": "tanf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tanh": {
    "source": "tanh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tanhf": {
    "source": "tanhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tanhl": {
    "source": "tanhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tanl": {
    "source": "tanl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tgamma": {
    "source": "tgamma",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tgammaf": {
    "source": "tgammaf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tgammal": {
    "source": "tgammal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ceil": {
    "source": "ceil",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ceilf": {
    "source": "ceilf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ceill": {
    "source": "ceill",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:floor": {
    "source": "floor",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:floorf": {
    "source": "floorf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:floorl": {
    "source": "floorl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:llrint": {
    "source": "llrint",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:llrintf": {
    "source": "llrintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:llrintl": {
    "source": "llrintl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:llround": {
    "source": "llround",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:llroundf": {
    "source": "llroundf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:llroundl": {
    "source": "llroundl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lrint": {
    "source": "lrint",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lrintf": {
    "source": "lrintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lrintl": {
    "source": "lrintl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lround": {
    "source": "lround",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lroundf": {
    "source": "lroundf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:lroundl": {
    "source": "lroundl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nearbyint": {
    "source": "nearbyint",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nearbyintf": {
    "source": "nearbyintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:nearbyintl": {
    "source": "nearbyintl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:rint": {
    "source": "rint",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:rintf": {
    "source": "rintf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:rintl": {
    "source": "rintl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:round": {
    "source": "round",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:roundf": {
    "source": "roundf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:roundl": {
    "source": "roundl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:trunc": {
    "source": "trunc",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:truncf": {
    "source": "truncf",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:truncl": {
    "source": "truncl",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:feclearexcept": {
    "source": "feclearexcept",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fegetenv": {
    "source": "fegetenv",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:fegetexceptflag": {
    "source": "fegetexceptflag",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "flags",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "exceptions",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fegetround": {
    "source": "fegetround",
    "reading_form": "noun",
    "parameters": []
  },
  "library:feholdexcept": {
    "source": "feholdexcept",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      }
    ]
  },
  "library:feraiseexcept": {
    "source": "feraiseexcept",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fesetenv": {
    "source": "fesetenv",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾉﾅｲﾖｳﾆ",
        "prefix": "",
        "kind": "input_pointer"
      }
    ]
  },
  "library:fesetexceptflag": {
    "source": "fesetexceptflag",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "flags",
        "suffix": "ﾉﾅｲﾖｳﾆ",
        "prefix": "",
        "kind": "input_pointer"
      },
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fesetround": {
    "source": "fesetround",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "mode",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:fetestexcept": {
    "source": "fetestexcept",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:feupdateenv": {
    "source": "feupdateenv",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾉﾅｲﾖｳﾆ",
        "prefix": "",
        "kind": "input_pointer"
      }
    ]
  },
  "library:fpclassify": {
    "source": "fpclassify",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isfinite": {
    "source": "isfinite",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isgreater": {
    "source": "isgreater",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isgreaterequal": {
    "source": "isgreaterequal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isinf": {
    "source": "isinf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isless": {
    "source": "isless",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:islessequal": {
    "source": "islessequal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:islessgreater": {
    "source": "islessgreater",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isnan": {
    "source": "isnan",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isnormal": {
    "source": "isnormal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:isunordered": {
    "source": "isunordered",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:signbit": {
    "source": "signbit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cabs": {
    "source": "cabs",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cabsf": {
    "source": "cabsf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cabsl": {
    "source": "cabsl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cacos": {
    "source": "cacos",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cacosf": {
    "source": "cacosf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cacosh": {
    "source": "cacosh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cacoshf": {
    "source": "cacoshf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cacoshl": {
    "source": "cacoshl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cacosl": {
    "source": "cacosl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:carg": {
    "source": "carg",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cargf": {
    "source": "cargf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cargl": {
    "source": "cargl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:casin": {
    "source": "casin",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:casinf": {
    "source": "casinf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:casinh": {
    "source": "casinh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:casinhf": {
    "source": "casinhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:casinhl": {
    "source": "casinhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:casinl": {
    "source": "casinl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:catan": {
    "source": "catan",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:catanf": {
    "source": "catanf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:catanh": {
    "source": "catanh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:catanhf": {
    "source": "catanhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:catanhl": {
    "source": "catanhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:catanl": {
    "source": "catanl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ccos": {
    "source": "ccos",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ccosf": {
    "source": "ccosf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ccosh": {
    "source": "ccosh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ccoshf": {
    "source": "ccoshf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ccoshl": {
    "source": "ccoshl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ccosl": {
    "source": "ccosl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cexp": {
    "source": "cexp",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cexpf": {
    "source": "cexpf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cexpl": {
    "source": "cexpl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cimag": {
    "source": "cimag",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cimagf": {
    "source": "cimagf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cimagl": {
    "source": "cimagl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:clog": {
    "source": "clog",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:clogf": {
    "source": "clogf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:clogl": {
    "source": "clogl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:conj": {
    "source": "conj",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:conjf": {
    "source": "conjf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:conjl": {
    "source": "conjl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cpow": {
    "source": "cpow",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cpowf": {
    "source": "cpowf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cpowl": {
    "source": "cpowl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cproj": {
    "source": "cproj",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cprojf": {
    "source": "cprojf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cprojl": {
    "source": "cprojl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:creal": {
    "source": "creal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:crealf": {
    "source": "crealf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:creall": {
    "source": "creall",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csin": {
    "source": "csin",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csinf": {
    "source": "csinf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csinh": {
    "source": "csinh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csinhf": {
    "source": "csinhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csinhl": {
    "source": "csinhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csinl": {
    "source": "csinl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csqrt": {
    "source": "csqrt",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csqrtf": {
    "source": "csqrtf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:csqrtl": {
    "source": "csqrtl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ctan": {
    "source": "ctan",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ctanf": {
    "source": "ctanf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ctanh": {
    "source": "ctanh",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ctanhf": {
    "source": "ctanhf",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ctanhl": {
    "source": "ctanhl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ctanl": {
    "source": "ctanl",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:CMPLX": {
    "source": "CMPLX",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "real",
        "suffix": "ｦｼﾞﾂﾌﾞﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "imaginary",
        "suffix": "ｦｷｮﾌﾞﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:CMPLXF": {
    "source": "CMPLXF",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "real",
        "suffix": "ｦｼﾞﾂﾌﾞﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "imaginary",
        "suffix": "ｦｷｮﾌﾞﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:CMPLXL": {
    "source": "CMPLXL",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "real",
        "suffix": "ｦｼﾞﾂﾌﾞﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "imaginary",
        "suffix": "ｦｷｮﾌﾞﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:asctime": {
    "source": "asctime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:clock": {
    "source": "clock",
    "reading_form": "noun",
    "parameters": []
  },
  "library:ctime": {
    "source": "ctime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "input_pointer"
      }
    ]
  },
  "library:difftime": {
    "source": "difftime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "later",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "earlier",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value"
      }
    ]
  },
  "library:gmtime": {
    "source": "gmtime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "time",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "input_pointer"
      }
    ]
  },
  "library:localtime": {
    "source": "localtime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "time",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "input_pointer"
      }
    ]
  },
  "library:mktime": {
    "source": "mktime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "inout_pointer"
      }
    ]
  },
  "library:strftime": {
    "source": "strftime",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:time": {
    "source": "time",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "result",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:timespec_get": {
    "source": "timespec_get",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "result",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "base",
        "suffix": "ﾉｼﾞｶﾝｷｼﾞｭﾝﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:localeconv": {
    "source": "localeconv",
    "reading_form": "noun",
    "parameters": []
  },
  "library:setlocale": {
    "source": "setlocale",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "category",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "locale",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      }
    ]
  },
  "library:assert": {
    "source": "assert",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:static_assert": {
    "source": "static_assert",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "message",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:raise": {
    "source": "raise",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "signal",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ],
    "statement_nari": {
      "standalone": true
    }
  },
  "library:signal": {
    "source": "signal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "signal",
        "suffix": "ﾉﾄｷ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "handler",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_compare_exchange_strong": {
    "source": "atomic_compare_exchange_strong",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_compare_exchange_strong_explicit": {
    "source": "atomic_compare_exchange_strong_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "success_order",
        "suffix": "ﾉｾｲｺｳｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "failure_order",
        "suffix": "ﾉｼｯﾊﾟｲｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_compare_exchange_weak": {
    "source": "atomic_compare_exchange_weak",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_compare_exchange_weak_explicit": {
    "source": "atomic_compare_exchange_weak_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "success_order",
        "suffix": "ﾉｾｲｺｳｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "failure_order",
        "suffix": "ﾉｼｯﾊﾟｲｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_exchange": {
    "source": "atomic_exchange",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_exchange_explicit": {
    "source": "atomic_exchange_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_add": {
    "source": "atomic_fetch_add",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_add_explicit": {
    "source": "atomic_fetch_add_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_and": {
    "source": "atomic_fetch_and",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_and_explicit": {
    "source": "atomic_fetch_and_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_or": {
    "source": "atomic_fetch_or",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_or_explicit": {
    "source": "atomic_fetch_or_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_sub": {
    "source": "atomic_fetch_sub",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_sub_explicit": {
    "source": "atomic_fetch_sub_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_xor": {
    "source": "atomic_fetch_xor",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_fetch_xor_explicit": {
    "source": "atomic_fetch_xor_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_flag_clear": {
    "source": "atomic_flag_clear",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      }
    ]
  },
  "library:atomic_flag_clear_explicit": {
    "source": "atomic_flag_clear_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_flag_test_and_set": {
    "source": "atomic_flag_test_and_set",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      }
    ]
  },
  "library:atomic_flag_test_and_set_explicit": {
    "source": "atomic_flag_test_and_set_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_init": {
    "source": "atomic_init",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "value",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_is_lock_free": {
    "source": "atomic_is_lock_free",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      }
    ]
  },
  "library:atomic_load": {
    "source": "atomic_load",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      }
    ]
  },
  "library:atomic_load_explicit": {
    "source": "atomic_load_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_store": {
    "source": "atomic_store",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "value",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_store_explicit": {
    "source": "atomic_store_explicit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "object",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "atomic_pointer"
      },
      {
        "name": "value",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:ATOMIC_VAR_INIT": {
    "source": "ATOMIC_VAR_INIT",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "value",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:call_once": {
    "source": "call_once",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "flag",
        "suffix": "ﾉｷﾛｸﾃﾞ",
        "prefix": "",
        "kind": "inout_pointer"
      },
      {
        "name": "function",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:thrd_create": {
    "source": "thrd_create",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "thread",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "start",
        "suffix": "ﾃﾞﾊｼﾞﾒﾃ",
        "prefix": "",
        "kind": "callback"
      },
      {
        "name": "argument",
        "suffix": "ｦﾜﾀｼﾃ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:thrd_current": {
    "source": "thrd_current",
    "reading_form": "noun",
    "parameters": []
  },
  "library:thrd_detach": {
    "source": "thrd_detach",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "thread",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:thrd_equal": {
    "source": "thrd_equal",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "b",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:thrd_exit": {
    "source": "thrd_exit",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "result",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:thrd_join": {
    "source": "thrd_join",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "thread",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "result",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:thrd_sleep": {
    "source": "thrd_sleep",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "duration",
        "suffix": "ﾉｱｲﾀﾞ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "remaining",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer"
      }
    ]
  },
  "library:thrd_yield": {
    "source": "thrd_yield",
    "reading_form": "verb",
    "parameters": [],
    "statement_nari": {
      "standalone": true
    }
  },
  "library:cnd_broadcast": {
    "source": "cnd_broadcast",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer"
      }
    ]
  },
  "library:cnd_destroy": {
    "source": "cnd_destroy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "condition_pointer"
      }
    ]
  },
  "library:cnd_init": {
    "source": "cnd_init",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "condition_pointer"
      }
    ]
  },
  "library:cnd_signal": {
    "source": "cnd_signal",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer"
      }
    ]
  },
  "library:cnd_timedwait": {
    "source": "cnd_timedwait",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer"
      },
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      },
      {
        "name": "deadline",
        "suffix": "ﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:cnd_wait": {
    "source": "cnd_wait",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer"
      },
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      }
    ]
  },
  "library:tss_create": {
    "source": "tss_create",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer"
      },
      {
        "name": "destructor",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tss_delete": {
    "source": "tss_delete",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tss_get": {
    "source": "tss_get",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:tss_set": {
    "source": "tss_set",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "value",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:mtx_destroy": {
    "source": "mtx_destroy",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      }
    ]
  },
  "library:mtx_init": {
    "source": "mtx_init",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      },
      {
        "name": "type",
        "suffix": "ﾉｼｭﾙｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:mtx_lock": {
    "source": "mtx_lock",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      }
    ]
  },
  "library:mtx_timedlock": {
    "source": "mtx_timedlock",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      },
      {
        "name": "deadline",
        "suffix": "ﾏﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:mtx_trylock": {
    "source": "mtx_trylock",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      }
    ]
  },
  "library:mtx_unlock": {
    "source": "mtx_unlock",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer"
      }
    ]
  },
  "library:atomic_signal_fence": {
    "source": "atomic_signal_fence",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atomic_thread_fence": {
    "source": "atomic_thread_fence",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:kill_dependency": {
    "source": "kill_dependency",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "value",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:va_arg": {
    "source": "va_arg",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "list",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout"
      },
      {
        "name": "type",
        "suffix": "ﾄｼﾃ",
        "prefix": "",
        "kind": "type"
      }
    ]
  },
  "library:va_copy": {
    "source": "va_copy",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "inout"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout"
      }
    ]
  },
  "library:va_end": {
    "source": "va_end",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "list",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "inout"
      }
    ]
  },
  "library:va_start": {
    "source": "va_start",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "list",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "inout"
      },
      {
        "name": "last_named_parameter",
        "suffix": "ﾉﾂｷﾞｶﾗ",
        "prefix": "",
        "kind": "identifier"
      }
    ]
  },
  "library:bsearch": {
    "source": "bsearch",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "key",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "array",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "compare",
        "suffix": "ﾃﾞｸﾗﾍﾞﾃ",
        "prefix": "",
        "kind": "callback"
      }
    ]
  },
  "library:qsort": {
    "source": "qsort",
    "reading_form": "verb",
    "parameters": [
      {
        "name": "array",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value"
      },
      {
        "name": "compare",
        "suffix": "ﾃﾞｸﾗﾍﾞﾃ",
        "prefix": "",
        "kind": "callback"
      }
    ]
  },
  "library:_Exit": {
    "source": "_Exit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "status",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:abort": {
    "source": "abort",
    "reading_form": "noun",
    "parameters": [],
    "statement_nari": {
      "standalone": true,
      "argument_count": 0
    }
  },
  "library:at_quick_exit": {
    "source": "at_quick_exit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "function",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:atexit": {
    "source": "atexit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "function",
        "suffix": "",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:exit": {
    "source": "exit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "status",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:getenv": {
    "source": "getenv",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "name",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:quick_exit": {
    "source": "quick_exit",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "status",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "value"
      }
    ]
  },
  "library:system": {
    "source": "system",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "command",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer"
      }
    ]
  },
  "library:wctomb": {
    "source": "wctomb",
    "reading_form": "noun",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value"
      }
    ],
    "conditional_omit": [
      {
        "if_null_argument": 0,
        "omit_supplements_for": [
          1
        ]
      }
    ]
  }
};
