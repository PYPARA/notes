
# Accustoming Yourself to JavaScript

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
- ✦ Decide which versions of JavaScript your application supports.
- ✦ Be sure that any JavaScript features you use are supported by all environments where your application runs.
- ✦ Always test strict code in environments that perform the strict mode checks.
- ✦ Beware of concatenating scripts that differ in their expectations about strict mode.

## Item 2: Understand JavaScript’s Floating-Point Numbers
all numbers in JavaScript are double-precision floating-point numbers
–9,007,199,254,740,992 (–2 ** 53) to 9,007,199,254,740,992 (2 ** 53)

The bitwise arithmetic operators, however, are special. Rather than operating on their arguments directly as floating-point numbers, they implicitly convert them to 32-bit integers. (To be precise, they are treated as 32-bit, big-endian, two’s complement integers.) 

One useful workaround is to work with integer values wherever possible, since they can be represented without rounding.

### Things to Remember
- ✦ JavaScript numbers are double-precision floating-point numbers.
- ✦ Integers in JavaScript are just a subset of doubles rather than a separate datatype.
- ✦ Bitwise operators treat numbers as if they were 32-bit signed integers.
- ✦ Be aware of limitations of precisions in floating-point arithmetic.

## Item 3: Beware of Implicit Coercions

Since NaN is the only JavaScript value that is treated as unequal to itself, you can always test if a value is NaN by checking it for equality to itself

```js
function isReallyNaN(x) { 
  return x !== x;
}
```

 It’s best to avoid valueOf unless your object really is a numeric abstraction and obj.toString() produces a string representation of obj.valueOf().

 There are exactly seven falsy values: false, 0, -0, "", NaN, null, and undefined.All other values are truthy.


### Things to Remember
- ✦ Type errors can be silently hidden by implicit coercions.
- ✦ The + operator is overloaded to do addition or string concatenation depending on its argument types.
- ✦ Objects are coerced to numbers via valueOf and to strings via toString.
- ✦ Objects with valueOf methods should implement a toString method that provides a string representation of the number produced by valueOf.
- ✦ Use typeof or comparison to undefined rather than truthiness to test for undefined values.

## Item 4: Prefer Primitives to Object Wrappers

### Things to Remember
- ✦ Object wrappers for primitive types do not have the same behavior as their primitive values when compared for equality.
- ✦ Getting and setting properties on primitives implicitly creates object wrappers.

## Item 5: Avoid using == with Mixed Types

### Things to Remember
- ✦ The == operator applies a confusing set of implicit coercions when its arguments are of different types.
- ✦ Use === to make it clear to your readers that your comparison does not involve any implicit coercions.
- ✦ Use your own explicit coercions when comparing values of different types to make your program’s behavior clearer.

## Item 6: Learn the Limits of Semicolon Insertion

### rule of semicolon insertion:
Semicolons are only ever inserted before a } token, after one or more newlines, or at the end of the program input.
Semicolons are only ever inserted when the next input token cannot be parsed.

There are exactly five problematic characters to watch out for: (, [, +, -, and /. Each one of these can act either as an expression operator or as the prefix of a statement, depending on the context.

The other restricted productions are
■ A throw statement
■ A break or continue statement with an explicit label
■ A postfix ++ or -- operator

Semicolons are never inserted as separators in the head of a for loop or as empty statements.

### Things to Remember
- ✦ Semicolons are only ever inferred before a }, at the end of a line, or at the end of a program.
- ✦ Semicolons are only ever inferred when the next token cannot be parsed.
- ✦ Never omit a semicolon before a statement beginning with (, [, +, -, or /.
- ✦ When concatenating scripts, insert semicolons explicitly between scripts.
- ✦ Never put a newline before the argument to return, throw, break, continue, ++, or --.
- ✦ Semicolons are never inferred as separators in the head of a for loop or as empty statements.

## Item 7: Think of Strings As Sequences of 16-Bit Code Units

### Things to Remember
- ✦ JavaScript strings consist of 16-bit code units, not Unicode code points.
- ✦ Unicode code points 216 and above are represented in JavaScript by two code units, known as a surrogate pair.
- ✦ Surrogate pairs throw off string element counts, affecting length, charAt, charCodeAt, and regular expression patterns such as “.”.
- ✦ Use third-party libraries for writing code point-aware string manipulation.
- ✦ Whenever you are using a library that works with strings, con- sult the documentation to see how it handles the full range of code points.