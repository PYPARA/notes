```js
new 
constructor
prototype

js 使用 new 从原型对象生成一个实例对象
new 后面跟着的是 构造函数 constructor
new 缺点 无法共享属性和方法
给构造函数一个 prototype 属性，所有实例对象需要共享的属性和方法，都放在这个对象里面

由于所有的实例对象共享同一个prototype对象，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像"继承"了prototype对象一样。
```


### 参考资料 
http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html