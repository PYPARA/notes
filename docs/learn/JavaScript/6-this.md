当 JavaScript 代码执行一段可执行代码(executable code)时，会创建对应的执行上下文(execution context)
每个执行上下文，都有三个重要属性：
- 变量对象(Variable object，VO)
- 作用域链(Scope chain)
- this

## this
```js
var obj = {
  a: 1, 
  b: function(){
    console.log(this);
  }
}
1、作为对象调用时，指向该对象 obj.b(); // 指向obj
2、作为函数调用, var b = obj.b; b(); // 指向全局window
3、作为构造函数调用 var b = new Fun(); // this指向当前实例对象
4、作为call与apply调用 obj.b.apply(object, []); // this指向当前的object
```


### 参考资料
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
https://github.com/mqyqingfeng/Blog/issues/7