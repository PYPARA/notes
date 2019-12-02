# Vue源码笔记

## [Flow](#Flow)



### [Flow](#Flow)

Flow 是 facebook 出品的 JavaScript 静态类型检查⼯具，有助于减少隐蔽bug的产生。

- [类型推断](#类型推断)  ：通过变量的使⽤上下⽂来推断出变量类型，然后根据这些推断来检查类型。
- [类型注释](#类型注释)  ：事先注释好我们期待的类型，Flow 会基于这些注释来判断。

#### [类型推断](#类型推断)

它不需要任何代码修改即可进⾏类型检查，最⼩化开发者的⼯作量。它不会强制你改变开发习惯，因
为它会⾃动推断出变量的类型。这就是所谓的类型推断，Flow 最重要的特性之⼀。

```javascript
/*@flow*/``
function split(str) {
	return str.split(' ')
}
split(11)
```



#### [类型注释](#类型注释)

类型注释是以冒号 : 开头，可以在函数参数，返回值，变量声明中使⽤。

```javascript
/*@flow*/
function add(x: number, y: number): number {
	return x + y
}
add('Hello', 11)
```

数组：

```javascript
/*@flow*/
var arr: Array<number> = [1, 2, 3]
arr.push('Hello')
```

类和对象:

```javascript
/*@flow*/
class Bar {
    x: string; // x 是字符串
    y: string | number; // y 可以是字符串或者数字
    z: boolean;
    constructor(x: string, y: string | number) {
        this.x = x
        this.y = y
        this.z = false
    }
}

var bar: Bar = new Bar('hello', 4)

var obj: { a: string, b: number, c: Array<string>, d: Bar } = {
    a: 'hello',
    b: 11,
    c: ['hello', 'world'],
    d: new Bar('hello', 3)
}
```

Null:

```javascript
/*@flow*/
var foo: ?string = null
```

## [Vue.js 源码⽬录设计](#Vue.js 源码⽬录设计)

```
src
├── compiler # 编译相关
├── core # 核⼼代码
├── platforms # 不同平台的⽀持
├── server # 服务端渲染
├── sfc # .vue ⽂件解析
├── shared # 共享代码
```

