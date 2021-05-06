## new 
1. 让实例可以访问到私有属性；
2. 让实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性；
3. 构造函数返回的最后结果是引用数据类型。

```js
function _new(ctor, ...args) {
  if(typeof ctor !== 'function') {
    throw 'ctor must be a function';
  }
  let obj = new Object();
  obj.__proto__ = Object.create(ctor.prototype);
  let res = ctor.apply(obj,  [...args]);

  let isObject = typeof res === 'object' && res !== null;
  let isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
};
```

## apply 
