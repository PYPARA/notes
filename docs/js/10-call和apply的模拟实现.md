## call
call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

```js
Function.prototype.call2 = function (context) {
  var context = context || window;
  context.fn = this;

  var args = [];
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args +')');

  delete context.fn
  return result;
}

// 
this是需要调用的函数，context是被指定为this的对象
利用 context.fn = this，然后执行，可以执行函数并将函数的this指定为传入的 context
执行完后 delete context.fn

由于 context 可能为 null ，所以有 
var context = context || window;

由于call函数还可以给定参数来执行函数，传入的参数是第二个到最后一个参数 ，利用 Arguments 来取
var args = [];
for(var i = 1, len = arguments.length; i < len; i++) {
  args.push('arguments[' + i + ']');
}
执行后args为 
["arguments[1]", "arguments[2]", "arguments[3]"]

var result = eval('context.fn(' + args +')');
args 会自动调用 Array.toString() 

由于 函数是可以有返回值的，所以需要 return result
```

## apply
```js
// 相比于call，apply是的参数是单个数组
Function.prototype.apply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  }
  else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}
```

### 参考资料
https://github.com/mqyqingfeng/Blog/issues/11