## new
new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象类型之一


```js
function objectFactory() {

  var obj = new Object(),//从Object.prototype上克隆一个对象

  Constructor = [].shift.call(arguments);//取得外部传入的构造器

  var F=function() {};
  F.prototype= Constructor.prototype;
  obj = new F();//指向正确的原型

  var ret = Constructor.apply(obj, arguments);//借用外部传入的构造器给obj设置属性

  return typeof ret === 'object' ? ret : obj;//确保构造器总是返回一个对象

};
```



### 参考资料
https://github.com/mqyqingfeng/Blog/issues/13