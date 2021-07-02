
## Item 1: Know Which JavaScript You Are Using

JavaScript标准化意义重大, ECMAScript
一份 JavaScript 代码可能运行在各种设备、各种环境中，不同环境的 JavaScript 引擎实现可能不一样，ECMAScript 能规范不同实现

`"use strict";`作为一个没有副作用的语句，用于规范代码只使用标准化的语句，可用于 js 头部，和函数内部开头
但是会出现一个难题，当需要把不同js代码打包起来发布的时候、`"use strict";`可能会作用于不在计划范围内的部分，甚至不作用(不在js顶部或函数顶部声明无效)。
### Never concatenate strict files and nonstrict files.
### Concatenate files by wrapping their bodies in immediately invoked function expressions.

`immediately invoked function expressions` `IIFEs`

### Write your files so that they behave the same in either mode.
The simplest way to structure your code for maximum compatibility is to write for strict mode but explicitly wrap the contents of all your code in functions that enable strict mode locally.

### Things to Remember
✦ Decide which versions of JavaScript your application supports.
✦ Be sure that any JavaScript features you use are supported by all environments where your application runs.
✦ Always test strict code in environments that perform the strict mode checks.
✦ Beware of concatenating scripts that differ in their expectations about strict mode.

## Item 2: Understand JavaScript’s Floating-Point Numbers
all numbers in JavaScript are double-precision floating-point numbers
–9,007,199,254,740,992 (–2 ** 53) to 9,007,199,254,740,992 (2 ** 53)

The bitwise arithmetic operators, however, are special. Rather than operating on their arguments directly as floating-point numbers, they implicitly convert them to 32-bit integers. (To be precise, they are treated as 32-bit, big-endian, two’s complement integers.) 