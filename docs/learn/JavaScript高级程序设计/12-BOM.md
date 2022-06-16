# 12 BOM
- 理解 BOM 的核心——window 对象 
- 控制窗口及弹窗
- 通过 location 对象获取页面信息 
- 使用 navigator 对象了解浏览器 
- 通过 history 对象操作浏览器历史

## 12.1  window 对象
BOM 的核心是 window 对象，表示浏览器的实例。window 对象在浏览器中有两重身份，一个是 ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。这意味着网页中定义的所有 对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 parseInt()等全局方法。

### 12.1.1 Global 作用域
因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函数都会变成 window 对象的属性和方法。
如果在这里使用 let 或 const 替代 var，则不会把变量添加给全局对象。

访问未声明的变量会抛出错误，但是可以在 window 对象上查询是否存在可能未声明的变量。
```js
// 报错
aaaaaa
// undefined
window.aaaaaaa
```

### 12.1.2 窗口关系
top 对象始终指向最上层(最外层)窗口，即浏览器窗口本身。而 parent 对象则始终指向当前窗口的父窗口。
还有一个 self 对象，它是终极 window 属性，始终会指向 window。实际上，self 和 window 就 是同一个对象。之所以还要暴露 self，就是为了和 top、parent 保持一致。

### 12.1.3 窗口位置与像素比
现代浏览器提供了 screenLeft 和 screenTop 属性，用于表示窗口相对于屏幕左侧和顶部的位置 ，返回值的单位是 CSS 像素。
可以使用 moveTo()和 moveBy()方法移动窗口。
依浏览器而定，以上方法可能会被部分或全部禁用。

#### 像素比
不同像素密度的屏幕下就会有不同的 缩放系数，以便把物理像素(屏幕实际的分辨率)转换为 CSS 像素(浏览器报告的虚拟分辨率)

举个例子，手机屏幕的物理分辨率可能是 1920×1080，但因为其像素可能非常小，所以浏览器就需 要将其分辨率降为较低的逻辑分辨率，比如 640×320。
window. devicePixelRatio 的值就是 3
这样一来，12 像素(CSS 像素)的文字实际上就会用 36 像素的物理 像素来显示。

### 12.1.4 窗口大小
```js
let pageWidth = window.innerWidth,
    pageHeight = window.innerHeight;
if (typeof pageWidth != "number") { 
  if (document.compatMode == "CSS1Compat"){
  pageWidth = document.documentElement.clientWidth;
  pageHeight = document.documentElement.clientHeight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}
```
先将 pageWidth 和 pageHeight 的值分别设置为 window.innerWidth 和 window. innerHeight。然后，检查 pageWidth 是不是一个数值，如果不是则通过 document.compatMode 来检查页面是否处于标准模式。如果是，则使用 document.documentElement.clientWidth 和 document.documentElement.clientHeight;否则，就使用 document.body.clientWidth 和 document.body.clientHeight。

可以使用 resizeTo()和 resizeBy()方法调整窗口大小。

### 12.1.5 视口位置
度量文档相对于视口滚动距离的属性有两对，返回相等的值:window.pageXoffset/window.scrollX 和 window.pageYoffset/window.scrollY。
可以使用 scroll()、scrollTo()和 scrollBy()方法滚动页面。

```js
// 正常滚动 
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'auto'
});
// 平滑滚动
window.scrollTo({
  left: 100,
  top: 100,
  behavior: 'smooth'
});
```
### 12.1.6 导航与打开新窗口
window.open()方法可以用于导航到指定 URL，也可以用于打开新浏览器窗口。这个方法接收 4 个参数:要加载的 URL、目标窗口、特性字符串和表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值。

如果 window.open()的第二个参数是一个已经存在的窗口或窗格(frame)的名字，则会在对应的 窗口或窗格中打开 URL。

执行这行代码的结果就如同用户点击了一个 href 属性为"http://www.baidu.com"，target 属 性为"topFrame"的链接。如果有一个窗口名叫"topFrame"，则这个窗口就会打开这个 URL;否则就 会打开一个新窗口并将其命名为"topFrame"。第二个参数也可以是一个特殊的窗口名，比如_self、 _parent、_top 或_blank


1. 弹出窗口
如果 window.open()的第二个参数不是已有窗口，则会打开一个新窗口或标签页。第三个参数， 即特性字符串，用于指定新窗口的配置。如果没有传第三个参数，则新窗口(或标签页)会带有所有默 认的浏览器特性(工具栏、地址栏、状态栏等都是默认配置)。如果打开的不是新窗口，则忽略第三个参数。
```js
window.open("http://www.baidu.com/","baiduWindow",
"height=400,width=400,top=10,left=10,resizable=yes");
// 这行代码会打开一个可缩放的新窗口，大小为 400 像素×400 像素，位于离屏幕左边及顶边各 10 像素的位置。
```

window.open()方法返回一个对新建窗口的引用。这个对象与普通 window 对象没有区别，只是为控制新窗口提供了方便。
新创建窗口的 window 对象有一个属性 opener，指向打开它的窗口。
把 opener 设置为 null 表示新打开的标签页不需要与打开它的标签页通信。

2. 安全限制
浏览器对弹出有很多安全限制
浏览器会在用户操作下才允许创建弹窗

3. 弹窗屏蔽程序
如果浏览器内置的弹窗屏蔽程序阻止了弹窗，那么 window.open()很可 能会返回 null。此时，只要检查这个方法的返回值就可以知道弹窗是否被屏蔽了

```js
let blocked = false;
try {
  let wroxWin = window.open("http://www.wrox.com", "_blank")
  if (wroxWin == null){
    blocked = true;
  }
} catch(ex) {
  blocked = true;
}
if (blocked){
  alert("The popup was blocked!");
}
```

### 12.1.7 定时器
JavaScript 在浏览器中是单线程执行的，但允许使用定时器指定在某个时间之后或每隔一段时间就执行相应的代码。setTimeout()用于指定在一定时间后执行某些代码，而 setInterval()用于指定 每隔一段时间执行某些代码。

JavaScript 是单线程的，所以每次 只能执行一段代码。为了调度不同代码的执行，JavaScript 维护了一个任务队列。其中的任务会按照添 加到队列的先后顺序执行。

调用 setTimeout()时，会返回一个表示该超时排期的数值 ID。这个超时 ID 是被排期执行代码的 唯一标识符，可用于取消该任务。要取消等待中的排期任务，可以调用 clearTimeout()方法并传入超时 ID。
只要是在指定时间到达之前调用 clearTimeout()，就可以取消超时任务。在任务执行后再调用 clearTimeout()没有效果。

所有超时执行的代码(函数)都会在全局作用域中的一个匿名函数中运行，因此函 数中的 this 值在非严格模式下始终指向 window，而在严格模式下是 undefined。如果 给 setTimeout()提供了一个箭头函数，那么 this 会保留为定义它时所在的词汇作用域。

setInterval()同样可以接收两个参数:要执行的代码(字符 串或函数)，以及把下一次执行定时代码的任务添加到队列要等待的时间(毫秒)。
间隔时间，指的是向队列添加新任务之前等待的时间。

setInterval()方法也会返回一个循环定时 ID，可以用于在未来某个时间点上取消循环定时。要 取消循环定时，可以调用 clearInterval()并传入定时 ID。

```js
let num = 0, intervalId = null;
let max = 10;
let incrementNumber = function() {
  num++;
  // 如果达到最大值，则取消所有未执行的任务 
  if (num == max) {
    clearInterval(intervalId);
    alert("Done"); 
  }
}
intervalId = setInterval(incrementNumber, 500);

let num = 0;
let max = 10;
let incrementNumber = function() {
  num++;
  // 如果还没有达到最大值，再设置一个超时任务
  if (num < max) {
    setTimeout(incrementNumber, 500);
  } else {
    alert("Done");
  }
}
setTimeout(incrementNumber, 500);

```

注意在使用 setTimeout()时，不一定要记录超时 ID，因为它会在条件满足时自动停止，否则会 自动设置另一个超时任务。这个模式是设置循环任务的推荐做法。setIntervale()在实践中很少会在 生产环境下使用，因为一个任务结束和下一个任务开始之间的时间间隔是无法保证的，有些循环定时任务可能会因此而被跳过。而像前面这个例子中一样使用 setTimeout()则能确保不会出现这种情况。一般来说，最好不要使用 setInterval()。

### 12.1.8 系统对话框

```js
alert('123')

if (confirm("Are you sure?")) {
  alert("I'm so glad you're sure!");
} else {
  alert("I'm sorry to hear you're not sure.");
}

let result = prompt("What is your name? ", "");
if (result !== null) { 7
  alert("Welcome, " + result);
}
```

JavaScript 还可以显示另外两种对话框:find()和 print()。这两种对话框都是异步显示的，即控 11 制权会立即返回给脚本。用户在浏览器菜单上选择“查找”(find)和“打印”(print)时显示的就是这两种对话框。

## 12.2 location对象
location 是最有用的 BOM 对象之一，提供了当前窗口中加载文档的信息，以及通常的导航功能。 这个对象独特的地方在于，它既是 window 的属性，也是 document 的属性。也就是说， window.location 和 document.location 指向同一个对象。

### 12.2.1 查询字符串
获取 search 中的参数
```js
let getQueryStringArgs = function() {
  // 取得没有开头问号的查询字符串
  let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
  // 保存数据的对象 args = {};
  // 把每个参数添加到 args 对象
  for (let item of qs.split("&").map(kv => kv.split("="))) {
    let name = decodeURIComponent(item[0]),
      value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    } 
  }
  return args;
}
```
URLSearchParams
URLSearchParams 提供了一组标准 API 方法，通过它们可以检查和修改查询字符串。给 URLSearchParams 构造函数传入一个查询字符串，就可以创建一个实例。这个实例上暴露了 get()、 set()和 delete()等方法

大多数支持 URLSearchParams 的浏览器也支持将 URLSearchParams 的实例用作可迭代对象

### 12.2.2 操作地址
```js
location.assign("http://www.wrox.com");
```
这行代码会立即启动导航到新 URL 的操作，同时在浏览器历史记录中增加一条记录。如果给 location.href 或 window.location 设置一个 URL，也会以同一个 URL 值调用 assign()方法。
```js
window.location = "http://www.wrox.com";
location.href = "http://www.wrox.com";
```
在这 3 种修改浏览器地址的方法中，设置 location.href 是最常见的。

修改 location 对象的属性也会修改当前加载的页面。其中，hash、search、hostname、pathname 和 port 属性被设置为新值之后都会修改当前 URL
除了 hash 之外，只要修改 location 的一个属性，就会导致页面重新加载新 URL。

在以前面提到的方式修改 URL 之后，浏览器历史记录中就会增加相应的记录。当用户单击“后退” 按钮时，就会导航到前一个页面。如果不希望增加历史记录，可以使用 `replace()`方法。

`reload()`
```js
location.reload(); // 重新加载，可能是从缓存加载 
location.reload(true); // 重新加载，从服务器加载
```
脚本中位于 reload()调用之后的代码可能执行也可能不执行，这取决于网络延迟和系统资源等因 素。为此，最好把 reload()作为最后一行代码。

## 12.3 navigator 对象
navigator 对 象 实 现 了 NavigatorID 、 NavigatorLanguage 、 NavigatorOnLine 、 NavigatorContentUtils 、 NavigatorStorage 、 NavigatorStorageUtils 、 Navigator- ConcurrentHardware、NavigatorPlugins 和 NavigatorUserMedia 接口定义的属性和方法。

navigator 对象的属性通常用于确定浏览器的类型。

### 12.3.1 检测插件
检测浏览器是否安装了某个插件是开发中常见的需求。
- name:插件名称。
- description:插件介绍。
- filename:插件的文件名。
- length:由当前插件处理的 MIME 类型数量。

```js
let hasPlugin = function(name) {
  name = name.toLowerCase();
  for (let plugin of window.navigator.plugins){
    if (plugin.name.toLowerCase().indexOf(name) > -1){
      return true;
    }
  }
  return false;
}
```

### 12.3.2 注册处理程序
现代浏览器支持 navigator 上的(在 HTML5 中定义的)registerProtocolHandler()方法。 这个方法可以把一个网站注册为处理某种特定类型信息应用程序。随着在线 RSS 阅读器和电子邮件客户 端的流行，可以借助这个方法将 Web 应用程序注册为像桌面软件一样的默认应用程序。

## 12.4 screen 对象
window 的另一个属性 screen 对象，是为数不多的几个在编程中很少用的 JavaScript 对象。这个对 象中保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像 素高度。每个浏览器都会在 screen 对象上暴露不同的属性。
availHeight、availLeft、availTop、availWidth、colorDepth、height、left、pixelDepth、top、width、orientation

## 12.5 history 对象
history 对象表示当前窗口首次使用以来用户的导航历史记录。因为 history 是 window 的属性， 所以每个 window 都有自己的 history 对象。出于安全考虑，这个对象不会暴露用户访问过的 URL， 但可以通过它在不知道实际 URL 的情况下前进和后退。

### 12.5.1 导航
go()方法可以在用户历史记录中沿任何方向导航，可以前进也可以后退。这个方法只接收一个参数， 这个参数可以是一个整数，表示前进或后退多少步。负值表示在历史记录中后退(类似点击浏览器的“后 退”按钮)，而正值表示在历史记录中前进(类似点击浏览器的“前进”按钮)。

history 对象还有一个 length 属性，表示历史记录中有多个条目。这个属性反映了历史记录的数 量，包括可以前进和后退的页面。

### 12.5.2 历史状态管理
hashchange 会在页面 URL 的散列变化时被触发，开发者可以在此时执行某些操作。而状态管理 API 则可以让开发者改变浏览器 URL 而不会加载新页面。为此，可以使用 history.pushState()方 法。这个方法接收 3 个参数:一个 state 对象、一个新状态的标题和一个(可选的)相对 URL。
```js
let stateObject = {foo:"bar"};
history.pushState(stateObject, "My title", "baz.html");
```
pushState()方法执行后，状态信息就会被推到历史记录中，浏览器地址栏也会改变以反映新的相 对 URL。

因为 pushState()会创建新的历史记录，所以也会相应地启用“后退”按钮。此时单击“后退” 按钮，就会触发 window 对象上的 popstate 事件。popstate 事件的事件对象有一个 state 属性，其 中包含通过 pushState()第一个参数传入的 state 对象。

```js
window.addEventListener("popstate", (event) => { 
  let state = event.state;
  if (state) { // 第一个页面加载时状态是null
    processState(state);
  }
});
```

可以通过 history.state 获取当前的状态对象，也可以使用 replaceState()并传入与 pushState() 同样的前两个参数来更新状态。更新状态不会创建新历史记录，只会覆盖当前状态。
传给 pushState()和 replaceState()的 state 对象应该只包含可以被序列化的信息。因此， DOM 元素之类并不适合放到状态对象里保存。

## 12.6 小结
浏览器对象模型(BOM，Browser Object Model)是以window对象为基础的，这个对象代表了浏览器窗口和页面可见的区域。window 对象也被复用为 ECMAScript 的 Global 对象，因此所有全局变量和函数都是它的属性，而且所有原生类型的构造函数和普通函数也都从一开始就存在于这个对象之上。本章讨论了 BOM 的以下内容。
- 要引用其他 window 对象，可以使用几个不同的窗口指针。
- 通过 location 对象可以以编程方式操纵浏览器的导航系统。通过设置这个对象上的属性，可以改变浏览器 URL 中的某一部分或全部。
- 使用 replace()方法可以替换浏览器历史记录中当前显示的页面，并导航到新 URL。
- navigator 对象提供关于浏览器的信息。提供的信息类型取决于浏览器，不过有些属性如 userAgent 是所有浏览器都支持的。

BOM 中的另外两个对象也提供了一些功能。screen 对象中保存着客户端显示器的信息。这些信息 通常用于评估浏览网站的设备信息。history 对象提供了操纵浏览器历史记录的能力，开发者可以确定历史记录中包含多少个条目，并以编程方式实现在历史记录中导航，而且也可以修改历史记录。
