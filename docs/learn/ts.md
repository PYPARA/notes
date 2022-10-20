# TypeScript

## Get Started

### interface
```ts
interface User {
  name: string;
  id: number;
}
```

### :TypeName
```ts
const user: User = {
  name: "Hayes",
  id: 0,
};

function getAdminUser(): User {
  //...
}

function deleteUser(user: User) {
  // ...
}
```

### Unions 联合
```ts
type MyBool = true | false;
type LockStates = "locked" | "unlocked";

function getLength(obj: string | string[]) {
  return obj.length;
}
```

### Generics 泛型
```ts
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
declare const backpack: Backpack<string>;
const object = backpack.get();

```

### Structural Type System 结构化的类型系统
1. 结构化的类型系统当中，如果两个对象具有相同的结构，则认为它们是相同类型的。
2. 结构匹配只需要匹配对象字段的子集。
3. 类和对象确定结构的方式没有区别。
4. 如果对象或类具有所有必需的属性，则 TypeScript 将表示是它们匹配的，而不关注其实现细节。

## The Basics

### Static type-checking 静态类型检查
静态类型系统描述了程序运行时值的结构和行为。

像 TypeScript 这样的静态类型检查器会利用类型系统提供的信息，并在事态发展不对劲的时候告知我们。它会在我们执行代码之前首先抛出一个错误。

### Non-exception Failures 非异常失败
目前为止，我们讨论的都是运行时错误 —— JavaScript 运行时告诉我们，它觉得某个地方有异常。

这些异常之所以能够抛出，是因为 ECMAScript 规范 明确规定了针对异常应该表现的行为。


我们需要一个静态类型系统来告诉我们，哪些代码在这个系统中被标记为错误的代码 —— 即使它是不会马上引起错误的“有效” JavaScript 代码。
```ts
// 访问对象上不存在的属性时
const user = {
  name: "Daniel",
  age: 26,
};
user.location;
// Property 'location' does not exist on type '{ name: string; age: number; }'.


// 拼写错误
const announcement = "Hello World!";
 
// 你需要花多久才能注意到拼写错误？
announcement.toLocaleLowercase();
announcement.toLocalLowerCase();
 
// 实际上正确的拼写是这样的……
announcement.toLocaleLowerCase();

// 未调用的函数
function flipCoin() {
  // 应该是 Math.random()
  return Math.random < 0.5;
// Operator '<' cannot be applied to types '() => number' and 'number'.
}

// 基本的逻辑错误
const value = Math.random() < 0.5 ? "a" : "b";
if (value !== "a") {
  // ...
} else if (value === "b") {
// This condition will always return 'false' since the types '"a"' and '"b"' have no overlap.
// 永远无法到达这个分支
}
```

### Types for Tooling 类型工具
TypeScript 在工具层面的作用非常强大，远不止拼写时进行代码补全和错误信息提示。

支持 TypeScript 的编辑器可以通过“快速修复”功能自动修复错误，重构产生易组织的代码。同时，它还具备有效的导航功能，能够让我们跳转到某个变量定义的地方，或者找到对于给定变量的所有引用。

### `tsc`, the TypeScript compiler TypeScript 编译器
```bash
npm install -g typescript
```

```bash
tsc hello.ts
```

hello.js 文件是 tsc 编译或者转换 hello.ts 文件之后输出的纯 JavaScript 文件。

### Emitting with Errors 报错时仍产出文件
报错时, 会发现内容和输入的文件内容是一样的。

这可能有点出乎意料，毕竟 tsc 刚才报错了。但这种结果其实和 TypeScript 的核心原则有关：大多数时候，你比 TypeScript 更了解代码。

对代码进行类型检查，会限制可以运行的程序的种类，因此类型检查器会进行权衡，以确定哪些代码是可以被接受的。

可以开启 `noEmitOnError` 编译选项。阻止报错时产生文件
```bash
tsc --noEmitOnError hello.ts
```

### Explicit Types 显式类型
```ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
```
给 person 和 date 添加类型注解, greet 接受 string 类型的 person，以及 Date 类型的 date

记住，我们并不总是需要显式地进行类型注解。
在很多情况下，即使省略了类型注解，TypeScript 也可以为我们推断出（或者“搞清楚”）类型。
这是一个特性，在类型系统能够正确地进行类型推断的时候，最好不要手动添加类型注解了。

### Erased Types 擦除类型
类型注解并不属于 JavaScript（或者专业上所说的 ECMAScript）的内容，所以没有任何浏览器或者运行时能够直接执行不经处理的 TypeScript 代码。
这也是为什么 TypeScript 首先需要一个编译器 —— 它需要经过编译，才能去除或者转换 TypeScript 独有的代码，从而让这些代码可以在浏览器上运行。

### Downleveling 降级
```ts
`Hello ${person}, today is ${date.toDateString()}!`;
```
被重写为 
```js
"Hello " + person + ", today is " + date.toDateString() + "!";
```

TypeScript 可以将高版本 ECMAScript 的代码重写为类似 ECMAScript3 或者 ECMAScript5 （也就是 ES3 或者 ES5）这样较低版本的代码。

类似这样将更新或者“更高”版本的 ECMAScript 向下降级为更旧或者“更低”版本的代码，就是所谓的降级 Downleveling。

默认情况下，TypeScript 会转化为 ES3 代码，这是一个非常旧的 ECMAScript 版本。我们可以使用 target 选项将代码往较新的 ECMAScript 版本转换。

通过使用 `--target es2015` 参数进行编译，我们可以得到 ECMAScript2015 版本的目标代码，这意味着这些代码能够在支持 ECMAScript2015 的环境中执行。

因此，运行 `tsc --target es2015 hello.ts` 之后，我们会得到如下代码：

```js
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
```

### Strictness 严格性
不同的用户会由于不同的理由去选择使用 TypeScript 的类型检查器。

一些用户寻求的是一种更加松散、可选的开发体验，他们希望类型检查仅作用于部分代码，同时还可享受 TypeScript 提供的功能。

这也是 TypeScript 默认提供的开发体验，类型是可选的，推断会使用最松散的类型，对于潜在的 null/undefined 类型的值也不会进行检查。

就像 tsc 在编译报错的情况下仍然能够正常产出文件一样，这些默认的配置会确保不对你的开发过程造成阻碍。


tsconfig.json 中的 "strict: true" 配置项，可以一次性开启全部严格性设置。但我们也可以单独开启或者关闭某个设置。
在所有这些设置中，尤其需要关注的是 noImplicitAny 和 strictNullChecks。

#### noImplicitAny
前面的某些例子中，TypeScript 没有为我们进行类型推断，这时候变量会采用最宽泛的类型：any。这并不是一件最糟糕的事情 —— 毕竟，使用 any 类型基本就和纯 JavaScript 一样了。

但是，使用 any 通常会和使用 TypeScript 的目的相违背。

你的程序使用越多的类型，那么在验证和工具上你的收益就越多，这意味着在编码的时候你会遇到越少的 bug。

启用 `noImplicitAny` 配置项，在遇到被隐式推断为 any 类型的变量时就会抛出一个错误。

#### strictNullChecks
默认情况下，`null` 和 `undefined` 可以被赋值给其它任意类型。

`strictNullChecks` 配置项让处理 `null` 和 `undefined` 的过程更加明显，让我们不用担心自己是否忘记处理 `null` 和 `undefined`

## Everyday Types 常见类型

- `string`
- `number`
- `boolean`

- Arrays 类似下列表达
  - `number[]`
  - `Array<number>`

- `any`
  - `noImplicitAny` 启用 `noImplicitAny` 配置项，在遇到被隐式推断为 any 类型的变量时就会抛出一个错误。

### Type Annotations on Variables
```ts
let myName: string = "Alice";
```

### Functions

#### Parameter Type Annotations
```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```
#### Return Type Annotations
```ts
function getFavoriteNumber(): number {
  return 26;
}
```

#### Anonymous Functions
When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.
```ts
// No type annotations here, but TypeScript can spot the bug
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
// Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
// Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
```
This process is called *contextual typing* because the context that the function occurred in informed what type it should have.

### Object Types
To define an object type, we simply list its properties and their types.
```ts
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

#### Optional Properties
```ts
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

when you read from an optional property, you’ll have to check for undefined before using it.

```ts
function printName(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!
  console.log(obj.last.toUpperCase());
// Object is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }
 
  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}
```

### Union Types

#### Defining a Union Type
A union type is a type formed from two or more other types, representing values that may be any one of those types.
```ts
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
// Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
```

#### Working with Union Types
TypeScript will only allow you to do things with the union if that thing is valid for every member of the union.
```ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
// Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
}
```

*Narrowing* occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.

```ts
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}

function welcomePeople(x: string[] | string) {
  if (Array.isArray(x)) {
    // Here: 'x' is 'string[]'
    console.log("Hello, " + x.join(" and "));
  } else {
    // Here: 'x' is 'string'
    console.log("Welcome lone traveler " + x);
  }
}
```

### Type Aliases 类型别名
A type alias is exactly that - a name for any type. 
```ts
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });

type ID = number | string;

type UserInputSanitizedString = string;
 
function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}
 
// Create a sanitized input
let userInput = sanitizeInput(getInput());
 
// Can still be re-assigned with a string though
userInput = "new input";
```

### Interfaces 接口
An interface declaration is another way to name an object type:
```ts
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```
类型别名和接口非常相似，在大多数情况下你可以在它们之间自由选择。 几乎所有的 `interface` 功能都可以在 `type` 中使用，关键区别在于不能重新开放类型以添加新的属性，而接口始终是可扩展的。

- 在 TypeScript 4.2 之前，类型别名命名 可能 会出现在错误消息中，有时代替等效的匿名类型（可能需要也可能不需要）。接口在错误消息中将始终被命名。
- 类型别名不能参与 声明合并，但接口可以。
- 接口只能用于 声明对象的形状，不能重命名基本类型.
- 接口名称将 始终 以其原始形式出现 在错误消息中，但 只有 在按名称使用时才会出现。

### Type Assertions
If you’re using `document.getElementById`, TypeScript only knows that this will return some kind of `HTMLElement`, but you might know that your page will always have an `HTMLCanvasElement` with a given ID.
In this situation, you can use a type assertion to specify a more specific type:
```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```
You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:
```tsx
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions
```ts
const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
```

### Literal Types
One way to think about this is to consider how JavaScript comes with different ways to declare a variable. Both `var` and `let` allow for changing what is held inside the variable, and `const` does not. This is reflected in how TypeScript creates types for literals.

```ts
let changingString = "Hello World";
changingString = "Olá Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
  // let changingString: string
 
const constantString = "Hello World";
// Because `constantString` can only represent 1 possible string, it
// has a literal type representation
constantString;
  // const constantString: "Hello World"


let x: "hello" = "hello";
// OK
x = "hello";
// ...
x = "howdy";
  // Type '"howdy"' is not assignable to type '"hello"'.
```

```ts
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
// Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.


// Numeric literal types
function compare(a: string, b: string): -1 | 0 | 1 {
  return a === b ? 0 : a > b ? 1 : -1;
}

// Of course, you can combine these with non-literal types:
interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto");
configure("automatic");
// Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
```

### Literal Inference
When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later.
```ts
const obj = { counter: 0 };
if (someCondition) {
  obj.counter = 1;
}
```
TypeScript doesn’t assume the assignment of 1 to a field which previously had 0 is an error. Another way of saying this is that obj.counter must have the type number, not 0, because types are used to determine both reading and writing behavior.

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
```

`req.method` is inferred to be `string`, not `"GET"`. Because code can be evaluated between the creation of req and the call of handleRequest which could assign a new string like `"GUESS"` to `req.method`, TypeScript considers this code to have an error.

here are two ways to work around this.

1. You can change the inference by adding a type assertion in either location:
```ts
// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
```
2. You can use as const to convert the entire object to be type literals:
```ts
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

The as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like string or number.

### null and undefined

TypeScript has two corresponding types by the same names. How these types behave depends on whether you have the `strictNullChecks` option on.

#### `strictNullChecks` off
With `strictNullChecks` off, values that might be `null` or `undefined` can still be accessed normally, and the values null and undefined can be assigned to a property of any type. 

#### `strictNullChecks` on
With `strictNullChecks` on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value.

Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null:

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

#### Non-null Assertion Operator (Postfix`!`)

TypeScript also has a special syntax for removing `null` and `undefined` from a type without doing any explicit checking. Writing `!` after any expression is effectively a type assertion that the value isn’t `null` or `undefined`

```ts
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

it’s important to only use `!` when you know that the value can’t be `null` or `undefined`.

### Less Common Primitives

#### bigint
```ts
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```

#### symbol

```ts
const firstName = Symbol("name");
const secondName = Symbol("name");
 
if (firstName === secondName) {
  // This condition will always return 'false' since the types 'typeof firstName' and 'typeof secondName' have no overlap.
  // Can't ever happen
}
```
## Narrowing

```ts
// 类型检查会报错
function padLeft(padding: number | string, input: string) {
  return " ".repeat(padding) + input;
// Argument of type 'string | number' is not assignable to parameter of type 'number'.
  // Type 'string' is not assignable to type 'number'.
}
// ts 会根据逻辑，推断当前语句变量最可能的具体类型
// 比如在 if ( typeof padding === "number" ) 中，会推断 padding 是 number
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
            // (parameter) padding: string | number
    return " ".repeat(padding) + input;
                      // (parameter) padding: number
  }
  return padding + input;
        // (parameter) padding: string
}
```
There are a couple of different constructs TypeScript understands for narrowing.

### `typeof` type guards
As we’ve seen, JavaScript supports a `typeof` operator which can give very basic information about the type of values we have at runtime. TypeScript expects this to return a certain set of strings:

- "string"
- "number"
- "bigint"
- "boolean"
- "symbol"
- "undefined"
- "object"
- "function"

In TypeScript, checking against the value returned by `typeof` is a type guard. Because TypeScript encodes how `typeof` operates on different values, it knows about some of its quirks in JavaScript. For example, notice that in the list above, `typeof` doesn’t return the string `null`.
```ts
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      // (parameter) strs: string[] | null
      //   Object is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
```
TypeScript lets us know that strs was only narrowed down to string[] | null instead of just string[].

### Truthiness narrowing
In JavaScript, we can use any expression in conditionals, `&&`s, `||`s, `if` statements, Boolean negations (`!`), and more. As an example, `if` statements don’t expect their condition to always have the type boolean.

```ts
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}
```

In JavaScript, constructs like `if` first “coerce” their conditions to `boolean`s to make sense of them, and then choose their branches depending on whether the result is `true` or `false`. 

- 0
- NaN
- "" (the empty string)
- 0n (the bigint version of zero)
- null
- undefined

all coerce to `false`, and other values get coerced `true`. 

 You can always coerce values to booleans by running them through the Boolean function, or by using the shorter double-Boolean negation. (The latter has the advantage that TypeScript infers a narrow literal boolean type true, while inferring the first as type boolean.)
```ts
// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true,    value: true
```

It’s fairly popular to leverage this behavior, especially for guarding against values like null or undefined. As an example, let’s try using it for our printAll function.

```ts
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

