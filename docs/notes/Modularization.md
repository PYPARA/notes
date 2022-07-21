# 模块化

## Reference
https://zhuanlan.zhihu.com/p/467991875

## Commonjs
NodeJS 是 CommonJS 规范的主要实践者，它有四个重要的环境变量为模块化的实现提供支持：`module`、`exports`、`require`、`global`。实际使用时，用 `module.exports` 定义当前模块对外输出的接口（不推荐直接用 `exports` ），用 `require` 加载模块。

```js
// 定义模块math.js
function add(a, b) {
  return a + b;
}
// 需要向外暴露的函数、变量
module.exports = {
  add: add
}

// 或者
exports.add = function(a, b){
  return a + b;
}

/** 必须加./路径，不加的话只会去node_modules文件找 **/
// 引用自定义的模块时，参数包含路径，可省略.js
var math = require('./math');
math.add(2, 5);

// 引用核心模块时，不需要带路径
var http = require('http');
http.createService(...).listen(3000);
```

CommonJS 用同步的方式加载模块。在服务端，模块文件都存放在本地磁盘，读取非常快，所以这样做不会有问题。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载。

### `exports` 和 `module.exports` 区别

`exports`：对于本身来讲是一个变量（对象），它不是 `module` 的引用，它是{}的引用，它指向 `module.exports` 的 {} 模块。只能使用`.`语法向外暴露变量。

`module.exports`：module是一个变量，指向一块内存，`exports` 是 `module` 中的一个属性，存储在内存中，然后 `exports` 属性指向{}模块。既可以使用`.`语法，也可以使用=直接赋值。

- `module.exports` 初始值为一个空对象 {}
- `exports` 是指向的 `module.exports` 的引用
- `require()` 返回的是 `module.exports` 而不是 `exports`

## AMD 和 require.js
AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

require.js 实现 AMD 规范的模块化：用 `require.config()` 指定引用路径等，用 `definde()` 定义模块，用 `require()` 加载模块。

首先我们需要引入 `require.js` 文件和一个入口文件 `main.js`。`main.js` 中配置 `require.config()` 并规定项目中用到的基础模块。

```js
/** 网页中引入require.js及main.js **/
<script src="js/require.js" data-main="js/main"></script>

/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```

引用模块的时候，我们将模块名放在 [] 中作为 `reqiure()` 的第一参数；如果我们定义的模块本身也依赖其他模块,那就需要将它们放在 [] 中作为 `define()` 的第一参数。

```js
// 定义math.js模块
define(function () {
  var basicNum = 0;
  var add = function (x, y) {
    return x + y;
  };
  return {
    add: add,
    basicNum :basicNum
  };
});

// 定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})

// 引用模块，将模块放在[]内
require(['jquery', 'math'],function($, math){
  var sum = math.add(10,20);
  $("#sum").html(sum);
});
```

## CMD 和 sea.js
AMD 的实现者 require.js 在申明依赖的模块时，会在第一时间加载并执行模块内的代码
```js
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
  // 等于在最前面声明并初始化了要用到的所有模块
  if (false) {
    // 即便没用到某个模块 b，但 b 还是提前执行了。**这就CMD要优化的地方**
    b.foo()
  } 
});
```

CMD 是另一种 js 模块化方案，它与 AMD 很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD 推崇依赖就近、延迟执行。此规范其实是在sea.js推广过程中产生的。
```js
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
  // 等于在最前面声明并初始化了要用到的所有模块
  a.doSomething();
  if (false) {
    // 即便没用到某个模块 b，但 b 还是提前执行了
    b.doSomething()
  } 
});

/** CMD写法 **/
define(function(require, exports, module) {
  var a = require('./a'); //在需要时申明
  a.doSomething();
  if (false) {
      var b = require('./b');
      b.doSomething();
  }
});

/** sea.js **/
// 定义模块 math.js
define(function(require, exports, module) {
  var $ = require('jquery.js');
  var add = function(a,b){
      return a+b;
  }
  exports.add = add;
});

// 加载模块
seajs.use(['math.js'], function(math){
  var sum = math.add(1+2);
});
```

## UMD（Universal Module Definition - 通用模块定义）
UMD 是 AMD 和 CommonJS的一个糅合。AMD 是浏览器优先，异步加载；CommonJS 是服务器优先，同步加载。

既然要通用，怎么办呢？那就先判断是否支持 `node.js` 的模块，存在就使用 `node.js` ；再判断是否支持 AMD（`define`是否存在），存在则使用 AMD 的方式加载。这就是所谓的UMD。

```js
((root, factory) => {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    //CommonJS
    var $ = requie('jquery');
    module.exports = factory($);
  } else {
    //都不是，浏览器全局定义
    root.testModule = factory(root.jQuery);
  }
})(this, ($) => {
  //do something...  这里是真正的函数体
});
```

## ES6 Module
ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。其模块功能主要由两个命令构成：`export` 和 `import`。`export` 命令用于规定模块的对外接口，`import` 命令用于输入其他模块提供的功能。

```js
/** 定义模块 math.js **/
var total = 0;
var add = function (a, b) {
  return a + b;
};
export { total, add };

/** 引用模块 **/
import { total, add } from './math';
function test(ele) {
  ele.textContent = add(99 + total);
}
```

ES6还提供了export default命令，为模块指定默认输出，对应的import语句不需要使用大括号
```js
/** export default **/
// 定义输出
export default { basicNum, add };

//引入
import math from './math';
function test(ele) {
  ele.textContent = math.add(99 + math.basicNum);
}
```

ES6 的模块不是对象，`import` 命令会被 JavaScript 引擎静态分析，在编译时就引入模块代码，而不是在代码运行时加载，所以无法实现条件加载。也正因为这个，使得静态分析成为可能。

ES6 模块的特征：

- 严格模式：ES6 的模块自动采用严格模式
- `import` `read-only`特性： `import` 的属性是只读的，不能赋值，类似于 `const` 的特性
- `export/import` 提升： `import/export` 必须位于模块顶级，不能位于作用域内；其次对于模块内的 `import/export` 会提升到模块顶部，这是在编译阶段完成的

ES6 模块与 CommonJS 模块的差异：
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
  - CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
  - ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的import有点像 Unix 系统的“符号连接”，原始值变了，import加载的值也会跟着变。因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。

2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
  - 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
  - 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。模块内部引用的变化，会反应在外部。