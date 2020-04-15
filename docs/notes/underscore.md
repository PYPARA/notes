## underscore 

### https://github.com/mqyqingfeng/Blog/issues/56
```js
// 声明root
// 兼容浏览器 webworker node node-vm 微信小程序 
var root = (typeof self == 'object' && self.self == self && self) ||
           (typeof global == 'object' && global.global == global && global) ||
           this ||
           {};

// 函数也是对象，兼容面向对象的写法
var _ = function() {}

root._ = _;
```

