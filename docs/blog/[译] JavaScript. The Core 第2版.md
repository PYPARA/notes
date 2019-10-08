# [译] JavaScript. The Core: 第2版

##### 原文地址： http://dmitrysoshnikov.com/ecmascript/javascript-the-core-2nd-edition/

这是 JavaScript. The Core 综述讲稿的第二个版本，讲解了ECMAScript 编程语言及其运行时系统的核心组件。



**适合读者**：有经验的工程师，专家。



1. [Object](#object)
2. [Prototype](#prototype)
3. [Class](#class)
4. [Execution context](#execution-context)
5. [Environment](#environment)
6. [Closure](#closure)
7. [This](#this)
8. [Realm](#realm)
9. [Job](#job)
10. [Agent](#agent)

在本文的第一个版本中，涵盖了 JS 语言的通用特性。大部分是对ES3规范的概念讲解，以及一些ES5和ES6(ES2015)中比较合适的改变。

从ES2015开始，规范修改了一些核心组件的描述和结构，引入了新的模块等等。所有，本文将关注于新的概念和更新的术语，但是仍然保留着各个规范中最基础的JS结构。

本文涵盖了ES2017+运行时系统。



**注:** 最新版本的 [ECMAScript 规范](https://tc39.github.io/ecma262/) 可以在TC-39网站上找到。



我们首先来讨论对象(Object)，对象是JavaScript语言的基础。



## [Object](#object)

ECMAScript 是门面向对象的语言，它基于原型，对象是它的核心概念。

**定义. 1: 对象(Object):** 对象是属性的集合, 他有一个原型对象（*single prototype object*）.原型是一个对象 或者 `null` 值。



首先我们来举一个对象的例子，一个对象的原型(prototype)被对象内部属性 `[[Prototype]]` 引用，并且通过`__proto__`暴露个用户级别的代码。 

对于如下代码：

```javascript
let point = {
  x: 10,
  y: 20,
};
```

`point`对象拥有2个显示的自有属性和一个隐式 的`__proto__`属性，`__proto__`属性是`point`对象的原型的一个引用。

![Figure 1. A basic object with a prototype.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/js-object.png)



**注:** 对象也可以存储*symbol*。有关symbol的更多信息，请参考[这份文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)。



原型对象通过动态调度（ *dynamic dispatch*） 机制来实现继承。让我们来研究一下原型链的概念，详细的

看看这个机制。



## [Prototype](#prototype)

每个对象（object）创建时（created），都会接收它的原型（*prototype*），如果原型没有显式的设置，对象接收默认原型作为其继承对象。



**定义. 2: 原型（Prototype）:** 原型是用于实现 *基于原型继承*  的委托对象。

原型可以显示的利用 `__proto__` 属性或者`Object.create` 方法设置。

```javascript
// Base object.
let point = {
  x: 10,
  y: 20,
};
 
// Inherit from `point` object.
let point3D = {
  z: 30,
  __proto__: point,
};
 
console.log(
  point3D.x, // 10, inherited
  point3D.y, // 20, inherited
  point3D.z  // 30, own
);
```

**注：**默认情况下，对象以`Object.prototype`作为其继承对象。

任何对象都可以成为另一个对象的原型，而且原型对象可以拥有自己的原型。如果原型有一个非空引用的原型，这被称作原型链（*prototype chain*）。



**定义. 3: 原型链（Prototype chain）:** *原型链（prototype chain）* 是用于实现 *继承* 和 *共享属性* 的一条 *有限* 的对象链。

![Figure 2. A prototype chain.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/prototype-chain.png)

规则十分简单:如果一个属性在对象本身中找不到, 就会尝试去它的原型中 *解析（resolve）* ;原型中没有，会去原型的原型中解析，直到真个原型链被找完。

从技术上讲，这种机制被称为 *动态调度（dynamic dispatch）* or *委托 （delegation）*.



**定义. 4: 委托（Delegation）:** 一种用于解析在继承链中一个属性的机制。这个过程发生在运行时，所以也叫做 **动态调度（dynamic dispatch）**。

**注:** 于  *静态调度（static dispatch）* 形成对比，*静态调度（static dispatch）*会在编译时解析引用, *动态调度（dynamic dispatch）* 在运行时解析引用。

并且，当一个属性最终在原型链中没有找到，就会返回`undefined` 值。

```JavaScript
// An "empty" object.
let empty = {};
 
console.log(
 
  // function, from default prototype
  empty.toString,
   
  // undefined
  empty.x,
 
);
```

正如我所见, 一个默认的对象永远都不会为空— 它常常会从 `Object.prototype`继承一些东西. 创建一个 *无原型对象（prototype-less dictionary）*, 必须显示的设置原型为 `null`:

```javascript
// Doesn't inherit from anything.
let dict = Object.create(null);
 
console.log(dict.toString); // undefined
```

动态调度（ *dynamic dispatch*）机制允许继承链的完全可变性*（full mutability）* ， 提供改变委托对象的能力。

```javascript
let protoA = {x: 10};
let protoB = {x: 20};
 
// Same as `let objectC = {__proto__: protoA};`:
let objectC = Object.create(protoA);
console.log(objectC.x); // 10
 
// Change the delegate:
Object.setPrototypeOf(objectC, protoB);
console.log(objectC.x); // 20
```

**注:** 尽管如今 `__proto__` 属性已经标准化了，并且更容易进行解释， 但在实践中对原型操作更倾向于使用API，比如 `Object.create`, `Object.getPrototypeOf`,
`Object.setPrototypeOf`,以及类似 `Reflect` 模块。

在 `Object.prototype`的例子当中, 我们看到同样的原型可以在多个对象中共享。在这个原则的下，ECMAScript实现了基于类的继承  *（class-based inheritance）* 。 我们来看看例子，看看在JS中类是个什么概念。

## [Class](#class)

当多个对象共享相同的初始化状态和行为的时候，它们就形成一个类(*classification*)。

**定义. 5: 类(Class):** 一个类是形式化抽象概念的集合，指定了其对象的初始化状态和行为。

假设我们需要多个对象，它们继承自同一个原型，我们可以先创建一个原型，然后在新创建对象时继承它：

```javascript
// Generic prototype for all letters.
//字母的通用原型
let letter = {
  getNumber() {
    return this.number;
  }
};
 
let a = {number: 1, __proto__: letter};
let b = {number: 2, __proto__: letter};
// ...
let z = {number: 26, __proto__: letter};
 
console.log(
  a.getNumber(), // 1
  b.getNumber(), // 2
  z.getNumber(), // 26
);
```

我们可以从下图看到这些关系：

![Figure 3. A shared prototype.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/shared-prototype.png)

然后，这样显然是非常的不方便的。 而类这个概念正好是用于这种用途的，类 作为一种语法糖 (*syntactic sugar*) (即 一个在语义上做同样的事，但有更好语法形式的结构)，它允许以更方便的模式构建多个对象：

```javascript
class Letter {
  constructor(number) {
    this.number = number;
  }
 
  getNumber() {
    return this.number;
  }
}
 
let a = new Letter(1);
let b = new Letter(2);
// ...
let z = new Letter(26);
 
console.log(
  a.getNumber(), // 1
  b.getNumber(), // 2
  z.getNumber(), // 26
);
```

**注:** 在ECMAScript 中，基于类的继承(*class-based inheritance*) 是在基于原型代理基础上实现的( *prototype-based delegation*)。

**注:** 类 *“class”* 只是一个理论上的概念(*theoretical abstraction*)。从技术上讲，它可以像Java或者C++那样，用静态调度实现 (*static dispatch*) ，也可以像JavaScript，Python，Ruby等用动态调度实现(委托) (*dynamic dispatch (delegation)*) 。



技术上讲，一个类  (class)被表示为一对*“constructor function(构造函数) + prototype(原型)”* 。因此，构造函数在创建对象的同时，会自动的为新创建的实例设置原型  (*prototype* )。原型存储`<ConstructorFunction>.prototype` 属性中。

**定义. 6: 构造函数(Constructor):** 构造函数是一个用于创建实例并且自动设置实例原型的函数。

可以显式的使用构造函数。在类Class这个概念引入之前，JS程序员过去也没有更好的替代品(我们依旧可以在网上看到很多这种遗留代码：

```javascript
function Letter(number) {
  this.number = number;
}
 
Letter.prototype.getNumber = function() {
  return this.number;
};
 
let a = new Letter(1);
let b = new Letter(2);
// ...
let z = new Letter(26);
 
console.log(
  a.getNumber(), // 1
  b.getNumber(), // 2
  z.getNumber(), // 26
);
```

而且，虽然创建单层构造函数非常方便，但从父类继承这种模式需要很多的样本代码。目前这种样本代码作为实现细节是隐藏的，而这正是JavaScript在创建类时背后所发生的事。 

**注:** *构造函数(constructor functions)* 只是基于类的继承的实现细节。

让我们来看看对象和他们类之间的关系：

![Figure 4. A constructor and objects relationship.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/js-constructor.png)

上图表明，每一个对象都有一个相关的原型。甚至构造函数(类)`Letter` 也有自己的原型`Function.prototype`。注意,  `Letter.prototype` 是`Letter`实例的原型，也就是`a`、`b`和`z`的原型。

**注:** 任何对象的实际原型都是 `__proto__`引用。 而构造函数的显式 `prototype` 属性只是对它实例原型的引用； 在实例上它依旧被 `__proto__`.引用。详情 [这里](http://dmitrysoshnikov.com/ecmascript/chapter-7-2-oop-ecmascript-implementation/#explicit-codeprototypecode-and-implicit-codeprototypecode-properties).

你可以在这篇文章[ES3. 7.1 OOP: The general theory](http://dmitrysoshnikov.com/ecmascript/chapter-7-1-oop-general-theory/)中找到详细的关于通用OPP概念的讨论 (包含基于类、基于原型等的详细描述)。

现在，我们理解了ECMAScript对象之间的基本关系，让我们更深入的看看JS运行时系统(*runtime system*)。我们会发现，几乎所有的东西都可以表示为对象。

## [Execution context](#execution-context)

为了执行JS代码，并且跟踪运行时求值，ECMAScript 规范定义了执行上下文 (*execution context*)的概念。 逻辑上讲，执行上下文是用栈来维护的(栈是执行上下文栈的简写)，栈和调用栈*call-stack*这个通用概念有关。 

**定义. 7: 执行上下文(Execution context:)** 执行上下文是用于跟踪运行时代码求值的一个规范设备。

ECMAScript 代码有几种类型：全局代码 *global code*，函数代码 *function code*, eval代码*evalcode*, 和模块代码 *module code*；每种代码都是在它的执行上下文中求值。不同代码类型以及对应的对象可能会影响执行上下文的结构；比如， *generator functions* 函数在上下文中保存 *generator object* 。

下面我们来考虑一下这个递归调用：

```javascript
function recursive(flag) {
 
  // Exit condition.
  if (flag === 2) {
    return;
  }
 
  // Call recursively.
  recursive(++flag);
}
 
// Go.
recursive(0);
```

当函数被调用的时候，创建一个新的执行上下文(*new execution context*)。,并且压入执行上下文栈中—— 这时，它变成一个激活的执行上下文，当函数返回，它的上下文从上下文栈中弹出。

调用另一个上下文的上下文被称作调用者 *caller*。被调用的上下文称之为被调用者 *callee*。在我们的例子当中， `recursive` 函数同时扮演两个角色，既是调用者，也是被调用者。

**定义. 8: 执行上下文栈(Execution context stack):** 执行上下文栈是一种 LIFO 数据结构(后进先出)，用于维护控制流程和执行顺序。

比如下面我们有一个*“压入-弹出(push-pop)”* 变动图：

![Figure 5. An execution context stack.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/execution-stack.png)

我们可以看出，全局上下文( *global context*) 一直都在栈的最底部，它比任何执行上下文都创建得早。

你可以在 [对应的章节](http://dmitrysoshnikov.com/ecmascript/chapter-1-execution-contexts/)找到更多关于执行上下文的细节。

通常，上下文中的代码会运行到结束，然而正如我们之前提到的，有些对象，例如生成器 *generators*，可能会违反栈 LIFO (后进先出)的顺序。 一个 生成器函数generator可能会挂起它的执行上下文 并在结束前让其从执行上下文栈中删除，直到generator 再次被激活，它的执行上下文恢复，压入执行上下文栈中：

```javascript
function *gen() {
  yield 1;
  return 2;
}
 
let g = gen();
 
console.log(
  g.next().value, // 1
  g.next().value, // 2
);
```

The `yield` 语句将值返回给调用者，并对执行上下文栈做POP操作，当第二个`next` 调用的时候，同样的执行上下文被压入栈中恢复，这样的执行上下文可能比它的调用者存在时间更长，这个违反了 LIFO 数据结构(后进先出)。

**注:**你可以在这个[文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)中阅读更多有关生成器generators 和迭代器iterators 的资料。

我们现在来讨论执行上下文中重要的部分；特别是我们应该看到ECMAScript运行时如何管理变量存储以及嵌套代码产生的作用域。这是语法环境  *lexical environments*通常的概念，它在JS中用于存储数据，并且用闭包( *closures*)的机制解决  函数参数问题(*“Funarg problem”*) 。

## [Environment](#environment)

每个执行上下文都一个对应的语法环境 *lexical environment*。

**Def. 9:语法环境(Lexical environment):** 语法环境是用于定义上下文中标识符和其值关联关系的数据结构。每个语法环境都有一个可选的父环境(*optional parent environment*)的引用。

所以环境就是定义在作用域中变量、函数、类的仓库 (*storage*) 。

技术上讲，环境是一个由环境记录(*environment record*)[一个将标识符映射到值的存储表]和对父的引用(可以为 `null`)组成的对(*pair*)。

例如下面代码：

```javascript
let x = 10;
let y = 20;
 
function foo(z) {
  let x = 100;
  return x + y + z;
}
 
foo(30); // 150
```

全局上下文和`foo`函数执行上下文的环境结构看起来就像下面一样：

![Figure 6. An environment chain.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/environment-chain.png)

从逻辑上讲，我让我们想起了上面讨论过的原型链( *prototype chain*) 。而且标识符解析(*identifiers resolution*)的规则是很相似的：如果一个变量在自己的环境中找不到，就会试着去父环境、父环境的父环境中找，以此类推，直到找完整个环境链。

**定义. 10: 标识符解析(Identifier resolution）:** 在环境链中解析变量(绑定)的过程。一个无法解析变量的会导致`ReferenceError`。

这解释了为什么变量 `x` 被解析成 `100`而不是 `10` ——因为`x`直接在 `foo`自身环境中找到；为什么可以访问参数  `z` ——因为它也是只存储在激活环境中 (*activation environment*)；为什么我们还可以访问变量  `y`——因为可以在父环境中找到它。

和原型类似，一个父环境可以被几个子环境共享；比如，两个全局函数共享同一个全局环境。

**注:** 你可以在[这里](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/)查看有关语法环境的详细信息。

环境记录根据类型而有所不同。这里有对象环境记录和声明式环境记录。 在声明式记录之上，还有函数环境记录和模板记录。，每种的记录都有特定的属性。然而，标识符解析的通用机制对于所有环境都是通用的，并且不依赖于记录的类型。

一个对象环境记录的例子可以是全局环境记录。这个记录也有关联的绑定对象，该对象会存储一下来自于记录的属性，不会存储来自其他记录的属性，反之亦然。绑定对象也可以被提供为  `this` 值。

```javascript
// Legacy variables using `var`.
var x = 10;
 
// Modern variables using `let`.
let y = 20;
 
// Both are added to the environment record:
console.log(
  x, // 10
  y, // 20
);
 
// But only `x` is added to the "binding object".
// The binding object of the global environment
// is the global object, and equals to `this`:
 
console.log(
  this.x, // 10
  this.y, // undefined!
);
 
// Binding object can store a name which is not
// added to the environment record, since it's
// not a valid identifier:
 
this['not valid ID'] = 30;
 
console.log(
  this['not valid ID'], // 30
);
```

这个可以使用下图来描述：

![Figure 7. A binding object.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/env-binding-object.png)

注意，绑定对象是用于覆盖旧式结构，例如`var`声明和`with`语句， 这种结构也它的对象作为绑定对象。 这些环境被表示为这种简单的对象是有历史原因的。现代的环境模型更加优秀，但是我们不能将绑定当做属性来访问了。

我们已经看到了环境如何通过父链接相关联。现在，我们来看看环境如何比创建它的上下文存在时间更长。这是闭包机制的基础。

## [Closure](#closure)

在ECMAScrip中，函数是一等公民。这个概念是函数式编程的基础，而JavaScript是支持函数式编程的。

**定义. 11: 一等函数(First-class function):** 一个可以作为普通数据的函数，可以存储为变量，作为参数传递，或者作为另一个函数的返回值返回。

与一等函数概念相关的是 [“Funarg问题”](https://en.wikipedia.org/wiki/Funarg_problem)  (或者 *“函数式实参问题”*)。这个问题是在函数必须处理自由变量的时候出现的。

**定义. 12: 自由变量(Free variable):**一个既不是参数，又不是这个函数的本地变量的变量。 

让我们来看一个 Funarg 问题， 来看看ECMAScript是如何解决这个问题的。

考虑如下的代码片段：

```javascript
let x = 10;
 
function foo() {
  console.log(x);
}
 
function bar(funArg) {
  let x = 20;
  funArg(); // 10, not 20!
}
 
// Pass `foo` as an argument to `bar`.
bar(foo);
```

对于函数 `foo`，变量 `x` 就是自由变量。当 `foo`函数被激活的时候(通过`funArg`参数) — 在哪里解析 `x` 的绑定呢? 是从创建函数的外层作用域，还是从调用者作用域，还是从函数调用的地方？正如我们所见，调用者  `bar`函数也提供了 `x`的绑定 ，值为 `20`.

上面描述的例子被称为**向下funarg问题**( **downwards funarg problem**)，即判断绑定的正确环境的歧义性：它应该是创建时的环境，还是调用时的环境？ 

这个问题通过达成使用静态作用域来解决，静态作用域是创建时的作用域。

**定义. 13: 静态作用域(Static scope):** 当一个语言通过查找源代码，就可以判断绑定在哪个环境中解析，这个语言就实现了静态作用域。

静态作用域又称为语法作用域，这也是语法环境T(*lexical environments*)这个词的由来。

从技术上讲，静态作用域是通过捕获函数创建时所在的环境来实现的。

**注:** 你可以在 [本文](https://codeburst.io/js-scope-static-dynamic-and-runtime-augmented-5abfee6223fe)阅读有关静态和动态作用域的知识。

在我们的例子中，`foo`函数捕获的是全局环境：

![Figure 8. A closure.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/closure.png)



我们可以看到，一个环境引用一个函数，函数有引用回该环境。

**定义. 14: 闭包(Closure):** 闭包是一个函数捕获它定义时环境。这个环境用于标识符解析。

**注:** 一个函数在一个新的激活环境中被调用，这个环境存储了本地变量和参数。这个激活环境的父环境被设置为该环节的闭合环境，从而有了语法作用域的语义。

Funarg 问题的第二种类型被称为 **向上Funarg问题(upwards funarg problem)**。这里唯一的区别就是捕获的环境比创建它的上下文存在更久。

我们来看一个例子：

```javascript
function foo() {
  let x = 10;
   
  // Closure, capturing environment of `foo`.
  function bar() {
    return x;
  }
 
  // Upward funarg.
  return bar;
}
 
let x = 20;
 
// Call to `foo` returns `bar` closure.
let bar = foo();
 
bar(); // 10, not 20!
```

同样的，从技术上讲，它与捕获定义环境的确切机制没有什么不同。在这种情况下，如果没有闭包，`foo`的激活环境将会被销毁。但是当我们捕获了它，它就不会被释放，会保留下来以支持静态作用域语义。 

经常性的会有闭包不完整的理解 —— 开发者通常认为闭包只是与向上Funarg 问题有关(实际上它确实更有意义)。然而，正如我们所见，向上和向下Funarg 问题的技术机制是完全相同，它就是静态作用域的机制。

如我们上面提到的，与原型类似，同一个父环境可以在几个闭包之间共享。这样就可以访问和修改共享的数据了：

```javascript
function createCounter() {
  let count = 0;
 
  return {
    increment() { count++; return count; },
    decrement() { count--; return count; },
  };
}
 
let counter = createCounter();
 
console.log(
  counter.increment(), // 1
  counter.decrement(), // 0
  counter.increment(), // 1
);
```

因为两个闭包 `increment` 和 `decrement`都是在包含 `count`变量的作用域中创建的，因此他们共享这个父作用域。也就是说，捕获总是通过引用发生的，对整个父环境的引用被存储下来了。

我们可以从下图中看到：

![Figure 9. A closure.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/shared-environment.png)



一些语言会通过值捕获，给捕获的变量创建一个副本，并且不允许通过这修改父作用域的值。不过，在JavaScript中，再说一次，它总是对父作用域的引用。

**注:** JS引擎的实现可能会优化这部操作，并不会捕获整个环境，只捕获需要使用的自由变量，然后依旧在父作用域中维护可变数据的不变量。

你可以在 [对应的章节](http://dmitrysoshnikov.com/ecmascript/chapter-6-closures/)中找到有关闭包和funarg问题的详细讨论。

所以所有标识符都是静态作用域的。不过，在ECMAScript中有一个值是动态作用域的，它就是`this`。

## [This](#this)

 `this`值是一个特殊的对象，它是动态并且隐式的传递给代码的上下文。我们可以把它看成一个隐式的额外参数，可以访问但无法修改。

 `this`的用途是为了多个对象执行相同的代码。 

**定义. 15: This:** 一个隐式的上下文对象，可以从一个执行上下文的代码中访问，从而在多个对象中应用相同的代码。

主要的使用案例是基于类的OOP。一个实例方法(在原型中定义的)存在于例子中，但是在该类的所有实例中共享。

```javascript
class Point {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }
 
  getX() {
    return this._x;
  }
 
  getY() {
    return this._y;
  }
}
 
let p1 = new Point(1, 2);
let p2 = new Point(3, 4);
 
// Can access `getX`, and `getY` from
// both instances (they are passed as `this`).
 
console.log(
  p1.getX(), // 1
  p2.getX(), // 3
);
```

当 `getX`方法被激活时，一个存储本地变量和参数的新的环境被创建。此外，函数环境记录得到 `[[ThisValue]]` ，它是动态的决定方法是如何调用的。当  `p1`调用时， `this` 值就是 `p1`，而第二种情况就是 `p2`。

`this` 的另一个应用是通用接口函数，可以用在 *mixins* 或者 *traits*中。

在下面的例子中， `Movable` 接口包含通用函数 `move`，它期望mixin的用户来实现  `_x`和`_y` 属性：

```javascript
// Generic Movable interface (mixin).
let Movable = {
 
  /**
   * This function is generic, and works with any
   * object, which provides `_x`, and `_y` properties,
   * regardless of the class of this object.
   */
  move(x, y) {
    this._x = x;
    this._y = y;
  },
};
 
let p1 = new Point(1, 2);
 
// Make `p1` movable.
Object.assign(p1, Movable);
 
// Can access `move` method.
p1.move(100, 200);
 
console.log(p1.getX()); // 100
```

作为替代方案，mixin还可以用于原型级别上而不是上面那样在每个实例上。

为了展示 `this` 值的动态性质，考虑下面这个例子，我们留给读者作为一个练习解决： 

```javascript
function foo() {
  return this;
}
 
let bar = {
  foo,
 
  baz() {
    return this;
  },
};
 
// `foo`
console.log(
  foo(),       // global or undefined
 
  bar.foo(),   // bar
  (bar.foo)(), // bar
 
  (bar.foo = bar.foo)(), // global
);
 
// `bar.baz`
console.log(bar.baz()); // bar
 
let savedBaz = bar.baz;
console.log(savedBaz()); // global
```

因为当`foo`在一个特定的调用中，只能通过查看`foo`函数的源代码，我们无法说出`this`的值是什么，所以我们说`this`的值是动态作用域。

**注:** 在 [对应的章节](http://dmitrysoshnikov.com/ecmascript/chapter-3-this/)你可以看到如何判断`this`值的详细的解释，以及上面的代码为什么会按照那样的方式工作。

 **箭头函数(arrow functions)** 的 `this`值是特殊的：它的 `this` 值是词法的(静态的)，而不是动态的。即它的函数环境记录不会提供`this`值，而是来自于父环境的。

```js
var x = 10;
 
let foo = {
  x: 20,
 
  // Dynamic `this`.
  bar() {
    return this.x;
  },
 
  // Lexical `this`.
  baz: () => this.x,
 
  qux() {
    // Lexical this within the invocation.
    let arrow = () => this.x;
 
    return arrow();
  },
};
 
console.log(
  foo.bar(), // 20, from `foo`
  foo.baz(), // 10, from global
  foo.qux(), // 20, from `foo` and arrow
);
```

正如我说的那样，在全局上下文中，`this`是全局对象(全局环境记录绑定的对象)。以前只有一个全局对象。而在现在的规范中，可能有多个全局对象，这些全局对象是代码域(*code realms*)的一部分。下面我们讨论一下这种结构。

## [Realm](#realm)

在求值之前，所有的ECMAScript代码都必须与一个域关联。从技术上来讲，域只是给一个上下文提供全局环境。

**定义. 16: 域(Realm):** 代码域是一个封装了单独全局环境的对象。

当一个执行上下文被创建的时候，就会与一个特定的代码域关联起来，这个代码域为上下文提供全局环境。而且这种关联将保持不变。

**注:** 域在浏览器环境中一个直接等价物就是`iframe`元素，该元素恰好提供一个自定义的全局环境。在Node.js中，接近于 [vm 模块](https://nodejs.org/api/vm.html)的沙箱。

当前版本的规范并没有创建域的能力，不过可以通过实现隐式的创建。现在已经有一个[提案](https://github.com/tc39/proposal-realms/)，要暴露这个API给用户级代码。

从逻辑上讲，栈中的每个上下文总有与它关联的域：

![Figure 10. A context and realm association.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/context-realm.png)

让我们来看看使用`vm`模块的各个域的例子：

```javascript
const vm = require('vm');
 
// First realm, and its global:
const realm1 = vm.createContext({x: 10, console});
 
// Second realm, and its global:
const realm2 = vm.createContext({x: 20, console});
 
// Code to execute:
const code = `console.log(x);`;
 
vm.runInContext(code, realm1); // 10
vm.runInContext(code, realm2); // 20
```

现在我更接近于ECMAScript 运行时更大的蓝图了，不过，我们依旧需要看看代码的入口点，以及初始化过程。这是由作业(*jobs*)和作业队列( *job queues*)机制管理的。

## [Job](#job)

有些操作可以被推迟，并在执行上下文栈上有可用点时执行。

**定义. 17:作业( Job):** 作业是一种抽象的操作，它在没有其他ECMAScript 计算进行时启动一个ECMAScript 计算。

作业在作业队列(**job queues**)中排队，在当前版本的规范中，有两种作业队列，**ScriptJobs**和 **PromiseJobs**。

在 *ScriptJobs* 队列中，初始作业是我们程序的主入口点 — 加载和求值的初始脚本：创建了一个域，创建了一个全局上下文并与域关联在一起，压入栈中，执行全局代码。

注意， *ScriptJobs*队列，脚本(*scripts*)和模块( *modules*)都管理。

而且这个上下文可以执行其他上下文，或者排队其他作业。一个可以引发排队的作业的例子就是 *promise*。

当没有正在运行的执行上下文并且执行上下文栈是空的时候，ECMAScript 实现会从作业队列中移除第一个挂起的作业，创建执行上下文然后执行。

**注:** 作业队列通常被事件循环(**“Event loop”**)来处理，ECMAScript 标准并没有指定事件循环，而是将它留给浏览器实现，不过，我们可以在这找到一个演示实例 — [here](https://gist.github.com/DmitrySoshnikov/26e54990e7df8c3ae7e6e149c87883e4)。

例子：

```javascript
// Enqueue a new promise on the PromiseJobs queue.
new Promise(resolve => setTimeout(() => resolve(10), 0))
  .then(value => console.log(value));
 
// This log is executed earlier, since it's still a
// running context, and job cannot start executing first
console.log(20);
 
// Output: 20, 10
```

**注:** 你可以阅读[文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)来了解更多关于promises的知识。

async函数( **\*async functions***)可以等待promises，所有他们也可以排队promise作业： 

```javascript
async function later() {
  return await Promise.resolve(10);
}
 
(async () => {
  let data = await later();
  console.log(data); // 10
})();
 
// Also happens earlier, since async execution
// is queued on the PromiseJobs queue.
console.log(20);
 
// Output: 20, 10
```

**注:** 在[这里](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)阅读更多关于async函数的知识。

现在我们已经离JS领域的最终蓝图很近了。我们将看到我们所讨论过的这些组件的主要负责人( *main owners*) ，代理( *Agents*)。

## [Agent](#agent)

并发(*concurrency*)和并行( *parallelism*) 在ECMAScript 用代理模式(*Agent pattern*)实现。代理模式很接近于参与者模式([Actor pattern](https://en.wikipedia.org/wiki/Actor_model)) ——一个带有消息传递(*message-passing*)风格通讯的轻量级进程。

**定义. 18: 代理(Agent):** 代理是封装了执行上下文栈、一组作业队列，以及代码域的一个概念。

依赖代理的实现可以在同一个线程上运行，或者单独的线程。浏览器环境的`Worker`代理是代理概念的一个例子。

代理之间的状态是相互隔离的，可以通过发送消息进行通讯。有些数据可以在代理之间共享，例如 `SharedArrayBuffer`。代理还可以形成代理集群。

在下面的例子中， `index.html`调用 `agent-smith.js` worker，传递共享的内存块： 

```javascript
// In the `index.html`:
 
// Shared data between this agent, and another worker.
let sharedHeap = new SharedArrayBuffer(16);
 
// Our view of the data.
let heapArray = new Int32Array(sharedHeap);
 
// Create a new agent (worker).
let agentSmith = new Worker('agent-smith.js');
 
agentSmith.onmessage = (message) => {
  // Agent sends the index of the data it modified.
  let modifiedIndex = message.data;
 
  // Check the data is modified:
  console.log(heapArray[modifiedIndex]); // 100
};
 
// Send the shared data to the agent.
agentSmith.postMessage(sharedHeap);
```

worker的代码：

```javascript
// agent-smith.js
 
/**
 * Receive shared array buffer in this worker.
 */
onmessage = (message) => {
  // Worker's view of the shared data.
  let heapArray = new Int32Array(message.data);
 
  let indexToModify = 1;
  heapArray[indexToModify] = 100;
 
  // Send the index as a message back.
  postMessage(indexToModify);
};
```

你可以在这个 [gist](https://gist.github.com/DmitrySoshnikov/b75a2dbcdb60b18fd9f05b595135dc82)中找到例子完整的代码。

(注意，如果你要在本地运行这个例子，需要在 Firefox上运行，因为Chrome基于安全的原因不允许从本地文件加载web workers。)

所以，下面是ECMAScript 运行时的概念图：

![Figure 11. ECMAScript runtime.](http://dmitrysoshnikov.com/wp-content/uploads/2017/11/agents-1.png)

这就是ECMAScript 引擎背后发生的事情！

现在，我们已经进入尾声。这是我们在一篇综述文字中讲解有关JS核心的所有信息了。正如我们提到的，JS代码可以被分组要模块(*modules*)中 ，对象的属性可以通过 `Proxy` 对象进行跟踪，等等——可以在JavaScript语言的各种文档中找到很多用户级的细节信息。

这里，我们试图表示一个ECMAScript 程序本身的逻辑结构，并且希望澄清这些细节。如果你有任何疑问、建议或者反馈——我们很乐意在评论中讨论它们。

感谢 帮助解释这片文章的 TC-39 的代表和规范的编辑者，有关的讨论可以在这个 [Twitter thread](https://twitter.com/DmitrySoshnikov/status/930507793047592960)中找到。

祝你学习ECMAScript顺利！

**Written by:** Dmitry Soshnikov
**Published on:** November 14th, 2017