// Argument and statement policies; recognition remains binding-based.
export const CALL_PROFILES={
  "library:abs": {
    "source": "abs",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:div": {
    "source": "div",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:labs": {
    "source": "labs",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ldiv": {
    "source": "ldiv",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:llabs": {
    "source": "llabs",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lldiv": {
    "source": "lldiv",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:INT16_C": {
    "source": "INT16_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:INT32_C": {
    "source": "INT32_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:INT64_C": {
    "source": "INT64_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:INT8_C": {
    "source": "INT8_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:INTMAX_C": {
    "source": "INTMAX_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:UINT16_C": {
    "source": "UINT16_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:UINT32_C": {
    "source": "UINT32_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:UINT64_C": {
    "source": "UINT64_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:UINT8_C": {
    "source": "UINT8_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:UINTMAX_C": {
    "source": "UINTMAX_C",
    "parameters": [
      {
        "name": "literal",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:imaxabs": {
    "source": "imaxabs",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:imaxdiv": {
    "source": "imaxdiv",
    "parameters": [
      {
        "name": "numerator",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "denominator",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:longjmp": {
    "source": "longjmp",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "input_buffer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "value",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:setjmp": {
    "source": "setjmp",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_buffer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fprintf": {
    "source": "fprintf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "printf",
    "wide": false
  },
  "library:fscanf": {
    "source": "fscanf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": false
  },
  "printf": {
    "source": "printf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "printf",
    "wide": false
  },
  "library:scanf": {
    "source": "scanf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "scanf",
    "wide": false
  },
  "library:snprintf": {
    "source": "snprintf",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 2,
    "format_mode": "printf",
    "wide": false
  },
  "library:sprintf": {
    "source": "sprintf",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "printf",
    "wide": false
  },
  "library:sscanf": {
    "source": "sscanf",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": false
  },
  "library:vfprintf": {
    "source": "vfprintf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vfscanf": {
    "source": "vfscanf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vprintf": {
    "source": "vprintf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vscanf": {
    "source": "vscanf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vsnprintf": {
    "source": "vsnprintf",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 2,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vsprintf": {
    "source": "vsprintf",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:vsscanf": {
    "source": "vsscanf",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": false
  },
  "library:clearerr": {
    "source": "clearerr",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:feof": {
    "source": "feof",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ferror": {
    "source": "ferror",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fflush": {
    "source": "fflush",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fgetc": {
    "source": "fgetc",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fgets": {
    "source": "fgets",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fputc": {
    "source": "fputc",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fputs": {
    "source": "fputs",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fread": {
    "source": "fread",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fwrite": {
    "source": "fwrite",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:getc": {
    "source": "getc",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:getchar": {
    "source": "getchar",
    "parameters": [],
    "statement_nari": {
      "standalone": true,
      "simple_assignment": true,
      "argument_count": 0
    }
  },
  "library:perror": {
    "source": "perror",
    "parameters": [
      {
        "name": "prefix",
        "suffix": "ｦｿｴﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:putc": {
    "source": "putc",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:putchar": {
    "source": "putchar",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:puts": {
    "source": "puts",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:setbuf": {
    "source": "setbuf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:setvbuf": {
    "source": "setvbuf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "buffer",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾀﾒﾎｳｼｷﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ungetc": {
    "source": "ungetc",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fclose": {
    "source": "fclose",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fopen": {
    "source": "fopen",
    "parameters": [
      {
        "name": "filename",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾓｰﾄﾞﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:freopen": {
    "source": "freopen",
    "parameters": [
      {
        "name": "filename",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾓｰﾄﾞﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:remove": {
    "source": "remove",
    "parameters": [
      {
        "name": "filename",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:rename": {
    "source": "rename",
    "parameters": [
      {
        "name": "old_name",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "new_name",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tmpfile": {
    "source": "tmpfile",
    "parameters": []
  },
  "library:tmpnam": {
    "source": "tmpnam",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fgetpos": {
    "source": "fgetpos",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "position",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fseek": {
    "source": "fseek",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "offset",
        "suffix": "ﾀﾞｹ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "origin",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fsetpos": {
    "source": "fsetpos",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "position",
        "suffix": "ﾉｲﾁｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ftell": {
    "source": "ftell",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:rewind": {
    "source": "rewind",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:aligned_alloc": {
    "source": "aligned_alloc",
    "parameters": [
      {
        "name": "alignment",
        "suffix": "ﾊﾞｲﾄﾉﾊｲﾁﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:calloc": {
    "source": "calloc",
    "parameters": [
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:free": {
    "source": "free",
    "parameters": [
      {
        "name": "pointer",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:malloc": {
    "source": "malloc",
    "parameters": [
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:realloc": {
    "source": "realloc",
    "parameters": [
      {
        "name": "pointer",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:alignas": {
    "source": "alignas",
    "parameters": [
      {
        "name": "alignment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "type_or_constant",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:alignof": {
    "source": "alignof",
    "parameters": [
      {
        "name": "type",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "type",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "postfix": true
  },
  "library:offsetof": {
    "source": "offsetof",
    "parameters": [
      {
        "name": "type",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "type",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "member",
        "suffix": "ﾏﾃﾞ",
        "prefix": "",
        "kind": "member_designator",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ],
    "postfix": true
  },
  "library:atof": {
    "source": "atof",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atoi": {
    "source": "atoi",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atol": {
    "source": "atol",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atoll": {
    "source": "atoll",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mblen": {
    "source": "mblen",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mbtowc": {
    "source": "mbtowc",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtof": {
    "source": "strtof",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtol": {
    "source": "strtol",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtold": {
    "source": "strtold",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtoll": {
    "source": "strtoll",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtoul": {
    "source": "strtoul",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtoull": {
    "source": "strtoull",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstombs": {
    "source": "wcstombs",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:memchr": {
    "source": "memchr",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:memcmp": {
    "source": "memcmp",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:memcpy": {
    "source": "memcpy",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:memmove": {
    "source": "memmove",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:memset": {
    "source": "memset",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strcat": {
    "source": "strcat",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strchr": {
    "source": "strchr",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strcmp": {
    "source": "strcmp",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strcoll": {
    "source": "strcoll",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strcpy": {
    "source": "strcpy",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strcspn": {
    "source": "strcspn",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strerror": {
    "source": "strerror",
    "parameters": [
      {
        "name": "error_number",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strlen": {
    "source": "strlen",
    "parameters": [
      {
        "name": "text",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strncat": {
    "source": "strncat",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strncmp": {
    "source": "strncmp",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strncpy": {
    "source": "strncpy",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾊﾞｲﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strpbrk": {
    "source": "strpbrk",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "set",
        "suffix": "ﾉｲｽﾞﾚｶｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strrchr": {
    "source": "strrchr",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strspn": {
    "source": "strspn",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strstr": {
    "source": "strstr",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "needle",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtok": {
    "source": "strtok",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "delimiters",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strxfrm": {
    "source": "strxfrm",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾊﾞｲﾄﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isalnum": {
    "source": "isalnum",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isalpha": {
    "source": "isalpha",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isblank": {
    "source": "isblank",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iscntrl": {
    "source": "iscntrl",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isdigit": {
    "source": "isdigit",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isgraph": {
    "source": "isgraph",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:islower": {
    "source": "islower",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isprint": {
    "source": "isprint",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ispunct": {
    "source": "ispunct",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isspace": {
    "source": "isspace",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isupper": {
    "source": "isupper",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswalnum": {
    "source": "iswalnum",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswalpha": {
    "source": "iswalpha",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswblank": {
    "source": "iswblank",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswcntrl": {
    "source": "iswcntrl",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswctype": {
    "source": "iswctype",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｶﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "classification",
        "suffix": "ｶ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswdigit": {
    "source": "iswdigit",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswgraph": {
    "source": "iswgraph",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswlower": {
    "source": "iswlower",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswprint": {
    "source": "iswprint",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswpunct": {
    "source": "iswpunct",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswspace": {
    "source": "iswspace",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswupper": {
    "source": "iswupper",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:iswxdigit": {
    "source": "iswxdigit",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isxdigit": {
    "source": "isxdigit",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tolower": {
    "source": "tolower",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:toupper": {
    "source": "toupper",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:towctrans": {
    "source": "towctrans",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "transformation",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:towlower": {
    "source": "towlower",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:towupper": {
    "source": "towupper",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wctrans": {
    "source": "wctrans",
    "parameters": [
      {
        "name": "name",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wctype": {
    "source": "wctype",
    "parameters": [
      {
        "name": "name",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:btowc": {
    "source": "btowc",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mbrlen": {
    "source": "mbrlen",
    "parameters": [
      {
        "name": "source",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "state",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mbsrtowcs": {
    "source": "mbsrtowcs",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source_pointer",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:c16rtomb": {
    "source": "c16rtomb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fgetws": {
    "source": "fgetws",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fputwc": {
    "source": "fputwc",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fputws": {
    "source": "fputws",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fwide": {
    "source": "fwide",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "mode",
        "suffix": "ﾉﾑｷｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fwprintf": {
    "source": "fwprintf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "printf",
    "wide": true
  },
  "library:fwscanf": {
    "source": "fwscanf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": true
  },
  "library:getwc": {
    "source": "getwc",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:getwchar": {
    "source": "getwchar",
    "parameters": []
  },
  "library:putwc": {
    "source": "putwc",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:putwchar": {
    "source": "putwchar",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:swprintf": {
    "source": "swprintf",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 2,
    "format_mode": "printf",
    "wide": true
  },
  "library:swscanf": {
    "source": "swscanf",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 1,
    "format_mode": "scanf",
    "wide": true
  },
  "library:ungetwc": {
    "source": "ungetwc",
    "parameters": [
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:vfwprintf": {
    "source": "vfwprintf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vfwscanf": {
    "source": "vfwscanf",
    "parameters": [
      {
        "name": "stream",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "stream",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vswprintf": {
    "source": "vswprintf",
    "parameters": [
      {
        "name": "buffer",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 2,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vswscanf": {
    "source": "vswscanf",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 1,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vwprintf": {
    "source": "vwprintf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": true
  },
  "library:vwscanf": {
    "source": "vwscanf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "arguments",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "va_list",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": false,
    "format_index": 0,
    "format_mode": "va_list",
    "wide": true
  },
  "library:wprintf": {
    "source": "wprintf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "printf",
    "wide": true
  },
  "library:wscanf": {
    "source": "wscanf",
    "parameters": [
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "format",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "variadic": true,
    "format_index": 0,
    "format_mode": "scanf",
    "wide": true
  },
  "library:wcscat": {
    "source": "wcscat",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcschr": {
    "source": "wcschr",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcscmp": {
    "source": "wcscmp",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcscoll": {
    "source": "wcscoll",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcscpy": {
    "source": "wcscpy",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcscspn": {
    "source": "wcscspn",
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsftime": {
    "source": "wcsftime",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcslen": {
    "source": "wcslen",
    "parameters": [
      {
        "name": "text",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsncat": {
    "source": "wcsncat",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsncmp": {
    "source": "wcsncmp",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsncpy": {
    "source": "wcsncpy",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcspbrk": {
    "source": "wcspbrk",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "set",
        "suffix": "ﾉｲｽﾞﾚｶｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsrchr": {
    "source": "wcsrchr",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsrtombs": {
    "source": "wcsrtombs",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source_pointer",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾊﾞｲﾄﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "optional_inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
    "parameters": [
      {
        "name": "text",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "set",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsstr": {
    "source": "wcsstr",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "needle",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstod": {
    "source": "wcstod",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstof": {
    "source": "wcstof",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstok": {
    "source": "wcstok",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "delimiters",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "state_pointer",
        "suffix": "ﾉｷﾛｸﾃﾞ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstol": {
    "source": "wcstol",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstold": {
    "source": "wcstold",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstoll": {
    "source": "wcstoll",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstoul": {
    "source": "wcstoul",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstoull": {
    "source": "wcstoull",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcsxfrm": {
    "source": "wcsxfrm",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾃﾞｶﾓｼﾞﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wmemchr": {
    "source": "wmemchr",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wmemcmp": {
    "source": "wmemcmp",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "limit",
        "suffix": "ﾃﾞｶﾓｼﾞﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wmemcpy": {
    "source": "wmemcpy",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wmemmove": {
    "source": "wmemmove",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wmemset": {
    "source": "wmemset",
    "parameters": [
      {
        "name": "memory",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ﾃﾞｶﾓｼﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtoimax": {
    "source": "strtoimax",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strtoumax": {
    "source": "strtoumax",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstoimax": {
    "source": "wcstoimax",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wcstoumax": {
    "source": "wcstoumax",
    "parameters": [
      {
        "name": "text",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "end",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｷｽｳｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:rand": {
    "source": "rand",
    "parameters": []
  },
  "library:srand": {
    "source": "srand",
    "parameters": [
      {
        "name": "seed",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:acos": {
    "source": "acos",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:acosf": {
    "source": "acosf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:acosh": {
    "source": "acosh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:acoshf": {
    "source": "acoshf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:acoshl": {
    "source": "acoshl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:acosl": {
    "source": "acosl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:asin": {
    "source": "asin",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:asinf": {
    "source": "asinf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:asinh": {
    "source": "asinh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:asinhf": {
    "source": "asinhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:asinhl": {
    "source": "asinhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:asinl": {
    "source": "asinl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atan": {
    "source": "atan",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atan2": {
    "source": "atan2",
    "parameters": [
      {
        "name": "y",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atan2f": {
    "source": "atan2f",
    "parameters": [
      {
        "name": "y",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atan2l": {
    "source": "atan2l",
    "parameters": [
      {
        "name": "y",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atanf": {
    "source": "atanf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atanh": {
    "source": "atanh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atanhf": {
    "source": "atanhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atanhl": {
    "source": "atanhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atanl": {
    "source": "atanl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cbrt": {
    "source": "cbrt",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cbrtf": {
    "source": "cbrtf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cbrtl": {
    "source": "cbrtl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:copysign": {
    "source": "copysign",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉﾌｺﾞｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:copysignf": {
    "source": "copysignf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉﾌｺﾞｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:copysignl": {
    "source": "copysignl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉﾌｺﾞｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cos": {
    "source": "cos",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cosf": {
    "source": "cosf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cosh": {
    "source": "cosh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:coshf": {
    "source": "coshf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:coshl": {
    "source": "coshl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cosl": {
    "source": "cosl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:erf": {
    "source": "erf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:erfc": {
    "source": "erfc",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:erfcf": {
    "source": "erfcf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:erfcl": {
    "source": "erfcl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:erff": {
    "source": "erff",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:erfl": {
    "source": "erfl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:exp": {
    "source": "exp",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:exp2": {
    "source": "exp2",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:exp2f": {
    "source": "exp2f",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:exp2l": {
    "source": "exp2l",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:expf": {
    "source": "expf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:expl": {
    "source": "expl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:expm1": {
    "source": "expm1",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:expm1f": {
    "source": "expm1f",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:expm1l": {
    "source": "expm1l",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fabs": {
    "source": "fabs",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fabsf": {
    "source": "fabsf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fabsl": {
    "source": "fabsl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fdim": {
    "source": "fdim",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fdimf": {
    "source": "fdimf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fdiml": {
    "source": "fdiml",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fma": {
    "source": "fma",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉｾｷﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "z",
        "suffix": "ｦﾀｼﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmaf": {
    "source": "fmaf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉｾｷﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "z",
        "suffix": "ｦﾀｼﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmal": {
    "source": "fmal",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉｾｷﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "z",
        "suffix": "ｦﾀｼﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmax": {
    "source": "fmax",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmaxf": {
    "source": "fmaxf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmaxl": {
    "source": "fmaxl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmin": {
    "source": "fmin",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fminf": {
    "source": "fminf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fminl": {
    "source": "fminl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmod": {
    "source": "fmod",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmodf": {
    "source": "fmodf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fmodl": {
    "source": "fmodl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:frexp": {
    "source": "frexp",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:frexpf": {
    "source": "frexpf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:frexpl": {
    "source": "frexpl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:hypot": {
    "source": "hypot",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:hypotf": {
    "source": "hypotf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:hypotl": {
    "source": "hypotl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ilogb": {
    "source": "ilogb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ilogbf": {
    "source": "ilogbf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ilogbl": {
    "source": "ilogbl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ldexp": {
    "source": "ldexp",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ldexpf": {
    "source": "ldexpf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ldexpl": {
    "source": "ldexpl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lgamma": {
    "source": "lgamma",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lgammaf": {
    "source": "lgammaf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lgammal": {
    "source": "lgammal",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log": {
    "source": "log",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log10": {
    "source": "log10",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log10f": {
    "source": "log10f",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log10l": {
    "source": "log10l",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log1p": {
    "source": "log1p",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log1pf": {
    "source": "log1pf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log1pl": {
    "source": "log1pl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log2": {
    "source": "log2",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log2f": {
    "source": "log2f",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:log2l": {
    "source": "log2l",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:logb": {
    "source": "logb",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:logbf": {
    "source": "logbf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:logbl": {
    "source": "logbl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:logf": {
    "source": "logf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:logl": {
    "source": "logl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:modf": {
    "source": "modf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "integer_part",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:modff": {
    "source": "modff",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "integer_part",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:modfl": {
    "source": "modfl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "integer_part",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nan": {
    "source": "nan",
    "parameters": [
      {
        "name": "tag",
        "suffix": "ﾉｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nanf": {
    "source": "nanf",
    "parameters": [
      {
        "name": "tag",
        "suffix": "ﾉｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nanl": {
    "source": "nanl",
    "parameters": [
      {
        "name": "tag",
        "suffix": "ﾉｼﾃｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nextafter": {
    "source": "nextafter",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nextafterf": {
    "source": "nextafterf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nextafterl": {
    "source": "nextafterl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nexttoward": {
    "source": "nexttoward",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nexttowardf": {
    "source": "nexttowardf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nexttowardl": {
    "source": "nexttowardl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "direction",
        "suffix": "ﾉﾎｳｺｳﾍ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:pow": {
    "source": "pow",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:powf": {
    "source": "powf",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:powl": {
    "source": "powl",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:remainder": {
    "source": "remainder",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:remainderf": {
    "source": "remainderf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:remainderl": {
    "source": "remainderl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾀ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:remquo": {
    "source": "remquo",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "quotient_bits",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:remquof": {
    "source": "remquof",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "quotient_bits",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:remquol": {
    "source": "remquol",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ﾃﾞﾜｯﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "quotient_bits",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:scalbln": {
    "source": "scalbln",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:scalblnf": {
    "source": "scalblnf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:scalblnl": {
    "source": "scalblnl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:scalbn": {
    "source": "scalbn",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:scalbnf": {
    "source": "scalbnf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:scalbnl": {
    "source": "scalbnl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sin": {
    "source": "sin",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sinf": {
    "source": "sinf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sinh": {
    "source": "sinh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sinhf": {
    "source": "sinhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sinhl": {
    "source": "sinhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sinl": {
    "source": "sinl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sqrt": {
    "source": "sqrt",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sqrtf": {
    "source": "sqrtf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:sqrtl": {
    "source": "sqrtl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tan": {
    "source": "tan",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tanf": {
    "source": "tanf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tanh": {
    "source": "tanh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tanhf": {
    "source": "tanhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tanhl": {
    "source": "tanhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tanl": {
    "source": "tanl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tgamma": {
    "source": "tgamma",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tgammaf": {
    "source": "tgammaf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tgammal": {
    "source": "tgammal",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ceil": {
    "source": "ceil",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:ceilf": {
    "source": "ceilf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:ceill": {
    "source": "ceill",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:floor": {
    "source": "floor",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:floorf": {
    "source": "floorf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:floorl": {
    "source": "floorl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:llrint": {
    "source": "llrint",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:llrintf": {
    "source": "llrintf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:llrintl": {
    "source": "llrintl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:llround": {
    "source": "llround",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:llroundf": {
    "source": "llroundf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:llroundl": {
    "source": "llroundl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lrint": {
    "source": "lrint",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lrintf": {
    "source": "lrintf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lrintl": {
    "source": "lrintl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lround": {
    "source": "lround",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lroundf": {
    "source": "lroundf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:lroundl": {
    "source": "lroundl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:nearbyint": {
    "source": "nearbyint",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:nearbyintf": {
    "source": "nearbyintf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:nearbyintl": {
    "source": "nearbyintl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ],
    "notes": "操作の対象をｦで補う。"
  },
  "library:rint": {
    "source": "rint",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:rintf": {
    "source": "rintf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:rintl": {
    "source": "rintl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:round": {
    "source": "round",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ]
  },
  "library:roundf": {
    "source": "roundf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ]
  },
  "library:roundl": {
    "source": "roundl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "omit_if_function_call"
      }
    ]
  },
  "library:trunc": {
    "source": "trunc",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:truncf": {
    "source": "truncf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:truncl": {
    "source": "truncl",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:feclearexcept": {
    "source": "feclearexcept",
    "parameters": [
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fegetenv": {
    "source": "fegetenv",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fegetexceptflag": {
    "source": "fegetexceptflag",
    "parameters": [
      {
        "name": "flags",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exceptions",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fegetround": {
    "source": "fegetround",
    "parameters": []
  },
  "library:feholdexcept": {
    "source": "feholdexcept",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:feraiseexcept": {
    "source": "feraiseexcept",
    "parameters": [
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fesetenv": {
    "source": "fesetenv",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾉﾅｲﾖｳﾆ",
        "prefix": "",
        "kind": "input_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fesetexceptflag": {
    "source": "fesetexceptflag",
    "parameters": [
      {
        "name": "flags",
        "suffix": "ﾉﾅｲﾖｳﾆ",
        "prefix": "",
        "kind": "input_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fesetround": {
    "source": "fesetround",
    "parameters": [
      {
        "name": "mode",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fetestexcept": {
    "source": "fetestexcept",
    "parameters": [
      {
        "name": "exceptions",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:feupdateenv": {
    "source": "feupdateenv",
    "parameters": [
      {
        "name": "environment",
        "suffix": "ﾉﾅｲﾖｳﾆ",
        "prefix": "",
        "kind": "input_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:fpclassify": {
    "source": "fpclassify",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isfinite": {
    "source": "isfinite",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isgreater": {
    "source": "isgreater",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isgreaterequal": {
    "source": "isgreaterequal",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isinf": {
    "source": "isinf",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isless": {
    "source": "isless",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:islessequal": {
    "source": "islessequal",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:islessgreater": {
    "source": "islessgreater",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isnan": {
    "source": "isnan",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isnormal": {
    "source": "isnormal",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:isunordered": {
    "source": "isunordered",
    "parameters": [
      {
        "name": "x",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "y",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:signbit": {
    "source": "signbit",
    "parameters": [
      {
        "name": "x",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cabs": {
    "source": "cabs",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cabsf": {
    "source": "cabsf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cabsl": {
    "source": "cabsl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cacos": {
    "source": "cacos",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cacosf": {
    "source": "cacosf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cacosh": {
    "source": "cacosh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cacoshf": {
    "source": "cacoshf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cacoshl": {
    "source": "cacoshl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cacosl": {
    "source": "cacosl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:carg": {
    "source": "carg",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cargf": {
    "source": "cargf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cargl": {
    "source": "cargl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:casin": {
    "source": "casin",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:casinf": {
    "source": "casinf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:casinh": {
    "source": "casinh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:casinhf": {
    "source": "casinhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:casinhl": {
    "source": "casinhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:casinl": {
    "source": "casinl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:catan": {
    "source": "catan",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:catanf": {
    "source": "catanf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:catanh": {
    "source": "catanh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:catanhf": {
    "source": "catanhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:catanhl": {
    "source": "catanhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:catanl": {
    "source": "catanl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ccos": {
    "source": "ccos",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ccosf": {
    "source": "ccosf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ccosh": {
    "source": "ccosh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ccoshf": {
    "source": "ccoshf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ccoshl": {
    "source": "ccoshl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ccosl": {
    "source": "ccosl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cexp": {
    "source": "cexp",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cexpf": {
    "source": "cexpf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cexpl": {
    "source": "cexpl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cimag": {
    "source": "cimag",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cimagf": {
    "source": "cimagf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cimagl": {
    "source": "cimagl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:clog": {
    "source": "clog",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:clogf": {
    "source": "clogf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:clogl": {
    "source": "clogl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:conj": {
    "source": "conj",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:conjf": {
    "source": "conjf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:conjl": {
    "source": "conjl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cpow": {
    "source": "cpow",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cpowf": {
    "source": "cpowf",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cpowl": {
    "source": "cpowl",
    "parameters": [
      {
        "name": "base",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "exponent",
        "suffix": "ｼﾞｮｳ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cproj": {
    "source": "cproj",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cprojf": {
    "source": "cprojf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cprojl": {
    "source": "cprojl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:creal": {
    "source": "creal",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:crealf": {
    "source": "crealf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:creall": {
    "source": "creall",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csin": {
    "source": "csin",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csinf": {
    "source": "csinf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csinh": {
    "source": "csinh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csinhf": {
    "source": "csinhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csinhl": {
    "source": "csinhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csinl": {
    "source": "csinl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csqrt": {
    "source": "csqrt",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csqrtf": {
    "source": "csqrtf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:csqrtl": {
    "source": "csqrtl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ctan": {
    "source": "ctan",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ctanf": {
    "source": "ctanf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ctanh": {
    "source": "ctanh",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ctanhf": {
    "source": "ctanhf",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ctanhl": {
    "source": "ctanhl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ctanl": {
    "source": "ctanl",
    "parameters": [
      {
        "name": "x",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:CMPLX": {
    "source": "CMPLX",
    "parameters": [
      {
        "name": "real",
        "suffix": "ｦｼﾞﾂﾌﾞﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "imaginary",
        "suffix": "ｦｷｮﾌﾞﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:CMPLXF": {
    "source": "CMPLXF",
    "parameters": [
      {
        "name": "real",
        "suffix": "ｦｼﾞﾂﾌﾞﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "imaginary",
        "suffix": "ｦｷｮﾌﾞﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:CMPLXL": {
    "source": "CMPLXL",
    "parameters": [
      {
        "name": "real",
        "suffix": "ｦｼﾞﾂﾌﾞﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "imaginary",
        "suffix": "ｦｷｮﾌﾞﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:asctime": {
    "source": "asctime",
    "parameters": [
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:clock": {
    "source": "clock",
    "parameters": []
  },
  "library:ctime": {
    "source": "ctime",
    "parameters": [
      {
        "name": "time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "input_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:difftime": {
    "source": "difftime",
    "parameters": [
      {
        "name": "later",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "earlier",
        "suffix": "",
        "prefix": "ﾋｸ",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:gmtime": {
    "source": "gmtime",
    "parameters": [
      {
        "name": "time",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "input_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:localtime": {
    "source": "localtime",
    "parameters": [
      {
        "name": "time",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "input_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mktime": {
    "source": "mktime",
    "parameters": [
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:strftime": {
    "source": "strftime",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "capacity",
        "suffix": "ﾉﾖｳﾘｮｳﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "format",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "broken_down_time",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:time": {
    "source": "time",
    "parameters": [
      {
        "name": "result",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:timespec_get": {
    "source": "timespec_get",
    "parameters": [
      {
        "name": "result",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "base",
        "suffix": "ﾉｼﾞｶﾝｷｼﾞｭﾝﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:localeconv": {
    "source": "localeconv",
    "parameters": []
  },
  "library:setlocale": {
    "source": "setlocale",
    "parameters": [
      {
        "name": "category",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "locale",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:assert": {
    "source": "assert",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:static_assert": {
    "source": "static_assert",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "message",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:raise": {
    "source": "raise",
    "parameters": [
      {
        "name": "signal",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ],
    "statement_nari": {
      "standalone": true
    }
  },
  "library:signal": {
    "source": "signal",
    "parameters": [
      {
        "name": "signal",
        "suffix": "ﾉﾄｷ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "handler",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_compare_exchange_strong": {
    "source": "atomic_compare_exchange_strong",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_compare_exchange_strong_explicit": {
    "source": "atomic_compare_exchange_strong_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "success_order",
        "suffix": "ﾉｾｲｺｳｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "failure_order",
        "suffix": "ﾉｼｯﾊﾟｲｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_compare_exchange_weak": {
    "source": "atomic_compare_exchange_weak",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_compare_exchange_weak_explicit": {
    "source": "atomic_compare_exchange_weak_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "expected",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "desired",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "success_order",
        "suffix": "ﾉｾｲｺｳｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "failure_order",
        "suffix": "ﾉｼｯﾊﾟｲｼﾞﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_exchange": {
    "source": "atomic_exchange",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_exchange_explicit": {
    "source": "atomic_exchange_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_add": {
    "source": "atomic_fetch_add",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_add_explicit": {
    "source": "atomic_fetch_add_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_and": {
    "source": "atomic_fetch_and",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_and_explicit": {
    "source": "atomic_fetch_and_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_or": {
    "source": "atomic_fetch_or",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_or_explicit": {
    "source": "atomic_fetch_or_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_sub": {
    "source": "atomic_fetch_sub",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_sub_explicit": {
    "source": "atomic_fetch_sub_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_xor": {
    "source": "atomic_fetch_xor",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_fetch_xor_explicit": {
    "source": "atomic_fetch_xor_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "operand",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_flag_clear": {
    "source": "atomic_flag_clear",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_flag_clear_explicit": {
    "source": "atomic_flag_clear_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_flag_test_and_set": {
    "source": "atomic_flag_test_and_set",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_flag_test_and_set_explicit": {
    "source": "atomic_flag_test_and_set_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_init": {
    "source": "atomic_init",
    "parameters": [
      {
        "name": "object",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "value",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_is_lock_free": {
    "source": "atomic_is_lock_free",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_load": {
    "source": "atomic_load",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_load_explicit": {
    "source": "atomic_load_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_store": {
    "source": "atomic_store",
    "parameters": [
      {
        "name": "object",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "value",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_store_explicit": {
    "source": "atomic_store_explicit",
    "parameters": [
      {
        "name": "object",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "atomic_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "value",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:ATOMIC_VAR_INIT": {
    "source": "ATOMIC_VAR_INIT",
    "parameters": [
      {
        "name": "value",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:call_once": {
    "source": "call_once",
    "parameters": [
      {
        "name": "flag",
        "suffix": "ﾉｷﾛｸﾃﾞ",
        "prefix": "",
        "kind": "inout_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "function",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:thrd_create": {
    "source": "thrd_create",
    "parameters": [
      {
        "name": "thread",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "start",
        "suffix": "ﾃﾞﾊｼﾞﾒﾃ",
        "prefix": "",
        "kind": "callback",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "argument",
        "suffix": "ｦﾜﾀｼﾃ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:thrd_current": {
    "source": "thrd_current",
    "parameters": []
  },
  "library:thrd_detach": {
    "source": "thrd_detach",
    "parameters": [
      {
        "name": "thread",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:thrd_equal": {
    "source": "thrd_equal",
    "parameters": [
      {
        "name": "a",
        "suffix": "ﾄ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "b",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:thrd_exit": {
    "source": "thrd_exit",
    "parameters": [
      {
        "name": "result",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:thrd_join": {
    "source": "thrd_join",
    "parameters": [
      {
        "name": "thread",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "result",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:thrd_sleep": {
    "source": "thrd_sleep",
    "parameters": [
      {
        "name": "duration",
        "suffix": "ﾉｱｲﾀﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "remaining",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:thrd_yield": {
    "source": "thrd_yield",
    "parameters": [],
    "statement_nari": {
      "standalone": true
    }
  },
  "library:cnd_broadcast": {
    "source": "cnd_broadcast",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cnd_destroy": {
    "source": "cnd_destroy",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "condition_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cnd_init": {
    "source": "cnd_init",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "condition_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cnd_signal": {
    "source": "cnd_signal",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cnd_timedwait": {
    "source": "cnd_timedwait",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "deadline",
        "suffix": "ﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:cnd_wait": {
    "source": "cnd_wait",
    "parameters": [
      {
        "name": "condition",
        "suffix": "ﾃﾞ",
        "prefix": "",
        "kind": "condition_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tss_create": {
    "source": "tss_create",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "output_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "destructor",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tss_delete": {
    "source": "tss_delete",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tss_get": {
    "source": "tss_get",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:tss_set": {
    "source": "tss_set",
    "parameters": [
      {
        "name": "key",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "value",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mtx_destroy": {
    "source": "mtx_destroy",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mtx_init": {
    "source": "mtx_init",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "type",
        "suffix": "ﾉｼｭﾙｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mtx_lock": {
    "source": "mtx_lock",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mtx_timedlock": {
    "source": "mtx_timedlock",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "deadline",
        "suffix": "ﾏﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mtx_trylock": {
    "source": "mtx_trylock",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:mtx_unlock": {
    "source": "mtx_unlock",
    "parameters": [
      {
        "name": "mutex",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "mutex_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_signal_fence": {
    "source": "atomic_signal_fence",
    "parameters": [
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atomic_thread_fence": {
    "source": "atomic_thread_fence",
    "parameters": [
      {
        "name": "order",
        "suffix": "ﾉｼﾞｭﾝｼﾞｮﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:kill_dependency": {
    "source": "kill_dependency",
    "parameters": [
      {
        "name": "value",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:va_arg": {
    "source": "va_arg",
    "parameters": [
      {
        "name": "list",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "type",
        "suffix": "ﾄｼﾃ",
        "prefix": "",
        "kind": "type",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:va_copy": {
    "source": "va_copy",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "inout",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "source",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "inout",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:va_end": {
    "source": "va_end",
    "parameters": [
      {
        "name": "list",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "inout",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:va_start": {
    "source": "va_start",
    "parameters": [
      {
        "name": "list",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "inout",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "last_named_parameter",
        "suffix": "ﾉﾂｷﾞｶﾗ",
        "prefix": "",
        "kind": "identifier",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:bsearch": {
    "source": "bsearch",
    "parameters": [
      {
        "name": "key",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "array",
        "suffix": "ｶﾗ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "compare",
        "suffix": "ﾃﾞｸﾗﾍﾞﾃ",
        "prefix": "",
        "kind": "callback",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:qsort": {
    "source": "qsort",
    "parameters": [
      {
        "name": "array",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "count",
        "suffix": "ｺ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "size",
        "suffix": "ﾊﾞｲﾄｽﾞﾂ",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      },
      {
        "name": "compare",
        "suffix": "ﾃﾞｸﾗﾍﾞﾃ",
        "prefix": "",
        "kind": "callback",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:_Exit": {
    "source": "_Exit",
    "parameters": [
      {
        "name": "status",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:abort": {
    "source": "abort",
    "parameters": [],
    "statement_nari": {
      "standalone": true,
      "argument_count": 0
    }
  },
  "library:at_quick_exit": {
    "source": "at_quick_exit",
    "parameters": [
      {
        "name": "function",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:atexit": {
    "source": "atexit",
    "parameters": [
      {
        "name": "function",
        "suffix": "",
        "prefix": "",
        "kind": "value",
        "provenance": "conversation_confirmed",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:exit": {
    "source": "exit",
    "parameters": [
      {
        "name": "status",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:getenv": {
    "source": "getenv",
    "parameters": [
      {
        "name": "name",
        "suffix": "ﾉ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:quick_exit": {
    "source": "quick_exit",
    "parameters": [
      {
        "name": "status",
        "suffix": "ﾉｼﾞｮｳﾀｲﾃﾞ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:system": {
    "source": "system",
    "parameters": [
      {
        "name": "command",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      }
    ]
  },
  "library:wctomb": {
    "source": "wctomb",
    "parameters": [
      {
        "name": "destination",
        "suffix": "ﾆ",
        "prefix": "",
        "kind": "optional_pointer",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
      },
      {
        "name": "character",
        "suffix": "ｦ",
        "prefix": "",
        "kind": "value",
        "provenance": "delegated_design",
        "nested_suffix": "preserve"
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
