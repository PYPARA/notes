# HTML中的JavaScript

## script元素

- async:可选。表示应该立即开始下载脚本，但不能阻止其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
- charset:可选。使用 src 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。
- crossorigin:可选。配置相关请求的 CORS(跨源资源共享)设置。默认不使用 CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据 标志，意味着出站请求会包含凭据。
- defer:可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。 在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。
- integrity:可选。允许比对接收到的资源和指定的加密签名以验证子资源完整性(SRI， 12 Subresource Integrity)。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络(CDN，Content Delivery Network)不会提供恶意内容。
- language:废弃。最初用于表示代码块中的脚本语言(如"JavaScript"、"JavaScript 1.2"或"VBScript")。大多数浏览器都会忽略这个属性，不应该再使用它。
- src:可选。表示包含要执行的代码的外部文件。
- type:可选。代替 language，表示代码块中脚本语言的内容类型(也称 MIME 类型)。按照惯 例，这个值始终都是"text/javascript"，尽管"text/javascript"和"text/ecmascript" 都已经废弃了。JavaScript 文件的 MIME 类型通常是"application/x-javascript"，不过给 type 属性这个值有可能导致脚本被忽略。在非 IE 的浏览器中有效的其他值还有 "application/javascript"和"application/ecmascript"。如果这个值是 module，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 import 和 export 关键字。

### 动态加载脚本
```js
let script = document.createElement('script');
script.src = 'gibberish.js';
script.async = false;
document.head.appendChild(script);

// 在把 HTMLElement 元素添加到 DOM 且执行到这段代码之前不会发送请求。默认情况下， 以这种方式创建的<script>元素是以异步方式加载的，相当于添加了 async 属性。不过这样做可能会 有问题，因为所有浏览器都支持 createElement()方法，但不是所有浏览器都支持 async 属性。因此，如果要统一动态脚本的加载行为，可以明确将其设置为同步加载

// 以这种方式获取的资源对浏览器预加载器是不可见的。这会严重影响它们在资源获取队列中的优先 级。根据应用程序的工作方式以及怎么使用，这种方式可能会严重影响性能。要想让预加载器知道这些 动态请求文件的存在，可以在文档头部显式声明它们:
<link rel="preload" href="gibberish.js">
```

## noscript元素
针对早期浏览器不支持 JavaScript 的问题，需要一个页面优雅降级的处理方案。最终，\<noscript> 元素出现，被用于给不支持 JavaScript 的浏览器提供替代内容。虽然如今的浏览器已经 100%支持 JavaScript，但对于禁用 JavaScript 的浏览器来说，这个元素仍然有它的用处。

## 小结
JavaScript 是通过\<script>元素插入到 HTML 页面中的。这个元素可用于把 JavaScript 代码嵌入到 HTML 页面中，跟其他标记混合在一起，也可用于引入保存在外部文件中的 JavaScript。本章的重点可 以总结如下。
- 要包含外部 JavaScript 文件，必须将 src 属性设置为要包含文件的 URL。文件可以跟网页在同 一台服务器上，也可以位于完全不同的域。
- 所有\<script>元素会依照它们在网页中出现的次序被解释。在不使用 defer 和 async 属性的 情况下，包含在\<script>元素中的代码必须严格按次序解释。
- 对不推迟执行的脚本，浏览器必须解释完位于\<script>元素中的代码，然后才能继续渲染页面 的剩余部分。为此，通常应该把\<script>元素放到页面末尾，介于主内容之后及\</body>标签 之前。
- 可以使用 defer 属性把脚本推迟到文档渲染完毕后再执行。推迟的脚本原则上按照它们被列出 的次序执行。
- 可以使用 async 属性表示脚本不需要等待其他脚本，同时也不阻塞文档渲染，即异步加载。异 步脚本不能保证按照它们在页面中出现的次序执行。
- 通过使用\<noscript>元素，可以指定在浏览器不支持脚本时显示的内容。如果浏览器支持并启 用脚本，则\<noscript>元素中的任何内容都不会被渲染。