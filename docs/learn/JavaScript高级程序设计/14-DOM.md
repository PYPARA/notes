# 14 DOM
- 理解文档对象模型(DOM)的构成
- 节点类型
- 浏览器兼容性
- MutationObserver 接口

文档对象模型(DOM，Document Object Model)是 HTML 和 XML 文档的编程接口。DOM 表示 由多层节点构成的文档，通过它开发者可以添加、删除和修改页面的各个部分。脱胎于网景和微软早期的动态 HTML(DHTML，Dynamic HTML)，DOM 现在是真正跨平台、语言无关的表示和操作网页的方式。

DOM Level 1 在 1998 年成为 W3C 推荐标准，提供了基本文档结构和查询的接口。本章之所以介绍 DOM，主要因为它与浏览器中的 HTML 网页相关，并且在 JavaScript 中提供了 DOM API。

## 14.1 节点层级
任何 HTML 或 XML 文档都可以用 DOM 表示为一个由节点构成的层级结构。节点分很多类型，每 种类型对应着文档中不同的信息和(或)标记，也都有自己不同的特性、数据和方法，而且与其他类型有某种关系。

document 节点表示每个文档的根节点。在这里，根节点的唯一子节点是`<html>`元素，我们称之 为文档元素(documentElement)。文档元素是文档最外层的元素，所有其他元素都存在于这个元素之内。每个文档只能有一个文档元素。在 HTML 页面中，文档元素始终是`<html>`元素。在 XML 文档中， 则没有这样预定义的元素，任何元素都可能成为文档元素。

HTML 中的每段标记都可以表示为这个树形结构中的一个节点。元素节点表示 HTML 元素，属性节点表示属性，文档类型节点表示文档类型，注释节点表示注释。DOM 中总共有 12 种节点类型，这些类型都继承一种基本类型。

### 14.1.1 Node 类型
DOM Level 1 描述了名为 Node 的接口，这个接口是所有 DOM 节点类型都必须实现的。Node 接口 在 JavaScript 中被实现为 Node 类型，在除 IE 之外的所有浏览器中都可以直接访问这个类型。在 JavaScript 中，所有节点类型都继承 Node 类型，因此所有类型都共享相同的基本属性和方法。

每个节点都有 nodeType 属性，表示该节点的类型。节点类型由定义在 Node 类型上的 12 个数值常量表示:

- Node.ELEMENT_NODE(1)
- Node.ATTRIBUTE_NODE(2)
- Node.TEXT_NODE(3)
- Node.CDATA_SECTION_NODE(4)
- Node.ENTITY_REFERENCE_NODE(5)
- Node.ENTITY_NODE(6)
- Node.PROCESSING_INSTRUCTION_NODE(7) 
- Node.COMMENT_NODE(8)
- Node.DOCUMENT_NODE(9)
- Node.DOCUMENT_TYPE_NODE(10)
- Node.DOCUMENT_FRAGMENT_NODE(11)
- Node.NOTATION_NODE(12)

节点类型可通过与这些常量比较来确定，比如:
```js
if (someNode.nodeType == Node.ELEMENT_NODE){
  alert("Node is an element.");
}
```

这个例子比较了 `someNode.nodeType` 与 `Node.ELEMENT_NODE` 常量。如果两者相等，则意味着 `someNode` 是一个元素节点。

浏览器并不支持所有节点类型。开发者最常用到的是元素节点和文本节点。本章后面会讨论每种节点受支持的程度及其用法。

1. nodeName 与 nodeValue

`nodeName` 与 `nodeValue` 保存着有关节点的信息。这两个属性的值完全取决于节点类型。在使用这两个属性前，最好先检测节点类型，如下所示:
```js
if (someNode.nodeType == 1){
  value = someNode.nodeName; // 会显示元素的标签名
}
```

在这个例子中，先检查了节点是不是元素。如果是，则将其 `nodeName` 的值赋给一个变量。对元素而言，nodeName 始终等于元素的标签名，而 `nodeValue` 则始终为 `null`。

2. 节点关系

文档中的所有节点都与其他节点有关系。这些关系可以形容为家族关系，相当于把文档树比作家谱。 在 HTML 中，`<body>`元素是`<html>`元素的子元素，而`<html>`元素则是`<body>`元素的父元素。`<head>`元素是`<body>`元素的同胞元素，因为它们有共同的父元素`<html>`。

每个节点都有一个 `childNodes` 属性，其中包含一个 `NodeList` `的实例。NodeList` 是一个类数组 对象，用于存储可以按位置存取的有序节点。注意，`NodeList` 并不是 `Array` 的实例，但可以使用中括号访问它的值，而且它也有 `length` 属性。`NodeList` 对象独特的地方在于，它其实是一个对 DOM 结构的查询，因此 DOM 结构的变化会自动地在 `NodeList` 中反映出来。我们通常说 `NodeList` 是实时的活动对象，而不是第一次访问时所获得内容的快照。

下面的例子展示了如何使用中括号或使用 `item()` 方法访问 `NodeList` 中的元素:

```js
let firstChild = someNode.childNodes[0];
let secondChild = someNode.childNodes.item(1);
let count = someNode.childNodes.length;
```

无论是使用中括号还是 item()方法都是可以的，但多数开发者倾向于使用中括号，因为它是一个 类数组对象。注意，length 属性表示那一时刻 NodeList 中节点的数量。使用 Array.prototype. slice()可以像前面介绍 arguments 时一样把 NodeList 对象转换为数组。

```js
let arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
```

当然，使用 ES6 的 Array.from()静态方法，可以替换这种笨拙的方式:

```js
let arrayOfNodes = Array.from(someNode.childNodes);
```

每个节点都有一个 `parentNode` 属性，指向其 DOM 树中的父元素。childNodes 中的所有节点都 有同一个父元素，因此它们的 parentNode 属性都指向同一个节点。此外，`childNodes` 列表中的每个 节点都是同一列表中其他节点的同胞节点。而使用 `previousSibling` 和 `nextSibling` 可以在这个列 表的节点间导航。这个列表中第一个节点的 `previousSibling` 属性是 null，最后一个节点的 `nextSibling` 属性也是 `null`

```js
if (someNode.nextSibling === null){
    alert("Last node in the parent's childNodes list.");
  } else if (someNode.previousSibling === null){
    alert("First node in the parent's childNodes list.");
}
```

注意，如果`childNodes`中只有一个节点，则它的`previousSibling`和`nextSibling`属性都是 `null。`

父节点和它的第一个及最后一个子节点也有专门属性:`firstChild` 和 `lastChild` 分别指向 `childNodes` 中的第一个和最后一个子节点。

3. 操纵节点

因为所有关系指针都是只读的，所以 DOM 又提供了一些操纵节点的方法。最常用的方法是 `appendChild()`，用于在 `childNodes` 列表末尾添加节点。

如果把文档中已经存在的节点传给 `appendChild()`，则这个节点会从之前的位置被转移到新位置。 即使 DOM 树通过各种关系指针维系，一个节点也不会在文档中同时出现在两个或更多个地方。

如果想把节点放到 `childNodes` 中的特定位置而不是末尾，则可以使用 `insertBefore()` 方法。 这个方法接收两个参数:要插入的节点和参照节点。

```js
// 作为最后一个子节点插入
returnedNode = someNode.insertBefore(newNode, null);
alert(newNode == someNode.lastChild); // true
// 作为新的第一个子节点插入
returnedNode = someNode.insertBefore(newNode, someNode.firstChild); 
alert(returnedNode == newNode); // true
alert(newNode == someNode.firstChild); // true
// 插入最后一个子节点前面
returnedNode = someNode.insertBefore(newNode, someNode.lastChild);
alert(newNode == someNode.childNodes[someNode.childNodes.length - 2]); // true
```

`appendChild() `和 `insertBefore()` 在插入节点时不会删除任何已有节点。相对地， `replaceChild()` 方法接收两个参数:要插入的节点和要替换的节点。
要替换的节点会被返回并从文档树中移除，要插入的节点取而代之。

```js
// 替换第一个子节点
let returnedNode = someNode.replaceChild(newNode, someNode.firstChild);

// 替换最后一个子节点
returnedNode = someNode.replaceChild(newNode, someNode.lastChild);
```

使用 `replaceChild()` 插入一个节点后，所有关系指针都会从被替换的节点复制过来。虽然被替换的节点从技术上说仍然被同一个文档所拥有，但文档中已经没有它的位置。

要移除节点而不是替换节点，可以使用 `removeChild()` 方法。这个方法接收一个参数，即要移除的节点。被移除的节点会被返回。

```js
// 删除第一个子节点
let formerFirstChild = someNode.removeChild(someNode.firstChild);
// 删除最后一个子节点
let formerLastChild = someNode.removeChild(someNode.lastChild);
```

4. 其他方法

所有节点类型还共享了两个方法。第一个是 `cloneNode()`，会返回与调用它的节点一模一样的节 点。`cloneNode()` 方法接收一个布尔值参数，表示是否深复制。在传入 `true` 参数时，会进行深复制， 即复制节点及其整个子 DOM 树。如果传入 `false`，则只会复制调用该方法的节点。复制返回的节点属 于文档所有，但尚未指定父节点，所以可称为孤儿节点(orphan)。可以通过 `appendChild()`、 `insertBefore()`或 `replaceChild()`方法把孤儿节点添加到文档中。

::: tip
`cloneNode()` 方法不会复制添加到 DOM 节点的 JavaScript 属性，比如事件处理程 序。这个方法只复制 HTML 属性，以及可选地复制子节点。除此之外则一概不会复制。 IE 在很长时间内会复制事件处理程序，这是一个 bug，所以推荐在复制前先删除事件处 理程序。
:::

`normalize()`。这个方法唯一的任务就是处理文档子树中的文本节 点。由于解析器实现的差异或 DOM 操作等原因，可能会出现并不包含文本的文本节点，或者文本节点之间互为同胞关系。在节点上调用 `normalize()` 方法会检测这个节点的所有后代，从中搜索上述两种情形。如果发现空文本节点，则将其删除;如果两个同胞节点是相邻的，则将其合并为一个文本节点。 这个方法将在本章后面进一步讨论。

### 14.1.2 Document 类型
Document 类型是 JavaScript 中表示文档节点的类型。在浏览器中，文档对象 document 是 HTMLDocument 的实例(HTMLDocument 继承 Document)，表示整个 HTML 页面。document 是 window 对象的属性，因此是一个全局对象。Document 类型的节点有以下特征:

- nodeType 等于 `9`;
- nodeName 值为 `#document`;
- nodeValue 值为 `null`;
- parentNode 值为 `null`;
- ownerDocument 值为 `null`;
- 子节点可以是 `DocumentType`(最多一个)、`Element`(最多一个)、`ProcessingInstruction` 或 `Comment` 类型。

Document 类型可以表示 HTML 页面或其他 XML 文档，但最常用的还是通过 HTMLDocument 的实例取得 `document` `对象。document` 对象可用于获取关于页面的信息以及操纵其外观和底层结构。

1. 文档子节点

虽然 DOM 规范规定 Document 节点的子节点可以是 `DocumentType`、`Element`、`Processing-Instruction` 或 `Comment`，但也提供了两个访问子节点的快捷方式。第一个是 `documentElement` 属 性，始终指向 HTML 页面中的`<html>`元素。虽然 document.childNodes 中始终有`<html>`元素，但使用 `documentElement` 属性可以更快更直接地访问该元素。

作为 `HTMLDocument` 的实例，`document` 对象还有一个 `body` 属性，直接指向`<body>`元素。因为 这个元素是开发者使用最多的元素，所以 `JavaScript` 代码中经常可以看到 `document.body`。

所有主流浏览器都支持 `document.documentElement` 和 `document.body`。`Document` 类型另一种可能的子节点是 DocumentType。`<!doctype>`标签是文档中独立的部分，其信息可以通过 `doctype` 属性(在浏览器中是 `document.doctype`)来访问。

严格来讲出现在`<html>`元素外面的注释也是文档的子节点，它们的类型是 `Comment`。不过， 由于浏览器实现不同，这些注释不一定能被识别，或者表现可能不一致。

一般来说，`appendChild()`、`removeChild()`和 `replaceChild()`方法不会用在 document 对象 上。这是因为文档类型(如果存在)是只读的，而且只能有一个 `Element` 类型的子节点(即`<html>`， 已经存在了)。

2. 文档信息
 
`document` 作为 `HTMLDocument` 的实例，还有一些标准 `Document` 对象上所没有的属性。这些属性提供浏览器所加载网页的信息。其中第一个属性是 `title`，包含`<title>`元素中的文本，通常显示在浏览器窗口或标签页的标题栏。通过这个属性可以读写页面的标题，修改后的标题也会反映在浏览器标题栏上。

接下来要介绍的 3 个属性是 `URL`、`domain` 和 `referrer`。

`URL` 包含当前页面的完整 `URL`(地址栏中的 URL)，`domain` 包含页面的域名，而 `referrer` 包含链接到当前页面的那个页面的 `URL`。如 果当前页面没有来源，则 `referrer` 属性包含空字符串。


因为跨源通信存在安全隐患，所以不同子域的页面间无法通过 `JavaScript` 通信。此时，在每个页面上把 `document.domain` 设置为相同的值，这些页面就可以访问对方的 `JavaScript` 对象了。比如，一个加载自 www.wrox.com 的页面中包含一个内嵌窗格，其中的页面加载自 p2p.wrox.com。这两个页面的 `document.domain` 包含不同的字符串，内部和外部页面相互之间不能 访问对方的 JavaScript 对象。如果每个页面都把 `document.domain` 设置为 wrox.com，那这两个页面 之间就可以通信了。

浏览器对 `domain` 属性还有一个限制，即这个属性一旦放松就不能再收紧。比如，把 `document.domain` 设置为"wrox.com"之后，就不能再将其设置回"p2p.wrox.com"，后者会导致错误

3. 定位元素

使用 DOM 最常见的情形可能就是获取某个或某组元素的引用，然后对它们执行某些操作。 document 对象上暴露了一些方法，可以实现这些操作。`getElementById()`和 `getElementsByTagName()`就是 `Document` 类型提供的两个方法。

`getElementsByTagName()` 这个方法接收一个参数，即要 获取元素的标签名，返回包含零个或多个元素的 `NodeList`。在 HTML 文档中，这个方法返回一个 `HTMLCollection` 对象。考虑到二者都是“实时”列表，`HTMLCollection` 与 `NodeList` 是很相似的。

与 `NodeList` 对象一样，也可以 使用中括号或 `item()` 方法从 `HTMLCollection` 取得特定的元素。

`HTMLCollection` 对象还有一个额外的方法 `namedItem()`，可通过标签的 name 属性取得某一项的引用。对于 `name` 属性的元素，还可以直接使用中括号来获取。
```js
let myImage = images.item(0)
let myImage = images.namedItem("myImage");
let myImage = images["myImage"];
```

对 `HTMLCollection` 对象而言，中括号既可以接收数值索引，也可以接收字符串索引。而在后台， 数值索引会调用 `item()`，字符串索引会调用 `namedItem()`


要取得文档中的所有元素，可以给 `getElementsByTagName()` 传入`*`。在 JavaScript 和 CSS 中，`*` 一般被认为是匹配一切的字符。
```js
let allElements = document.getElementsByTagName("*");
```

::: tip
对于`document.getElementsByTagName()`方法，虽然规范要求区分标签的大小写，但为了最大限度兼容原有 HTML 页面，实际上是不区分大小写的。如果是在 XML 页面(如 XHTML)中使用，那么 `document.getElementsByTagName()`就是区分大小写的。
:::

HTMLDocument类型上定义的获取元素的第三个方法是`document.getElementsByName()`。

一般情况下，还有一个 `document.getElementsByClassName()`

4. 特殊集合

document 对象上还暴露了几个特殊集合，这些集合也都是 HTMLCollection 的实例。这些集合是访问文档中公共部分的快捷方式。

- `document.anchors` 包含文档中所有带 name 属性的`<a>`元素。
- `document.applets` 包含文档中所有`<applet>`元素(因为`<applet>`元素已经不建议使用，所以这个集合已经废弃)。
- `document.forms` 包含文档中所有`<form>`元素(与 `document.getElementsByTagName("form")` 返回的结果相同)。
- `document.images` 包含文档中所有`<img>`元素(与 `document.getElementsByTagName("img")` 返回的结果相同)。
- `document.links` 包含文档中所有带 `href` 属性的`<a>`元素。

这些特殊集合始终存在于 HTMLDocument 对象上，而且与所有 HTMLCollection 对象一样，其内容也会实时更新以符合当前文档的内容。

5. DOM 兼容性检测

由于 DOM 有多个 Level 和多个部分，因此确定浏览器实现了 DOM 的哪些部分是很必要的。 `document.implementation` 属性是一个对象，其中提供了与浏览器 DOM 实现相关的信息和能力。DOM Level 1在`document.implementation`上只定义了一个方法，即`hasFeature()`。这个方法接收两个参数:特性名称和 DOM 版本。如果浏览器支持指定的特性和版本，则 `hasFeature()` 方法返回 `true`

由于实现不一致，因此 `hasFeature()` 的返回值并不可靠。目前这个方法已经被`废弃`，不再建议使用。为了向后兼容，目前主流浏览器仍然支持这个方法，但无论检测什么都一律返回 `true`。

6. 文档写入

document 对象有一个古老的能力，即向网页输出流中写入内容。这个能力对应 4 个方法:`write()`、`writeln()`、`open()`和 `close()` 。
其中，`write()`和 `writeln()`方法都接收一个字符串参数，可以将这个字符串写入网页中。`write()`简单地写入文本，而 `writeln()`还会在字符串末尾追加一个换行符 (\n)。


```html
<!-- "</script>"会匹配最外层的<script>标签，导致页面中 显示出"); -->
<script type="text/javascript">
  document.write("<script type=\"text/javascript\" src=\"file.js\">" + "</script>");
</script>

<script type="text/javascript">
  document.write("<script type=\"text/javascript\" src=\"file.js\">" + "<\/script>");
</script>
```
字符串`"<\/script>"`不会再匹配最外层的`<script>`标签，因此不会在页面中输出额外内容。

::: tip
在页面渲染期间通过 `document.write()` 向文档中输出内容。如果是在页面加 载完之后再调用 `document.write()`，则输出的内容会重写整个页面
:::

`open()` 和 `close()` 方法分别用于打开和关闭网页输出流。在调用 `write()` 和 `writeln()` 时，这两个方法都不是必需的。

::: tip
严格的XHTML文档不支持文档写入。对于内容类型为 `application/xml+xhtml` 的页面，这些方法不起作用。
:::

### 14.1.3 Element类型
除了 `Document` 类型，`Element` 类型就是Web开发中最常用的类型了。`Element` 表示XML或HTML 元素，对外暴露出访问元素标签名、子节点和属性的能力。`Element` 类型的节点具有以下特征:

- nodeType 等于 1;
- nodeName 值为元素的标签名;
- nodeValue 值为 null;
- parentNode 值为 Document 或 Element 对象;
- 子节点可以是 Element、Text、Comment、ProcessingInstruction、CDATASection、EntityReference 类型。

`div.tagName` 实际上返回的是"DIV"而不是 "div"。在 HTML 中，元素标签名始终以全大写表示;在 XML(包括 XHTML)中，标签名始终与源代码中的大小写一致。如果不确定脚本是在 HTML 文档还是 XML 文档中运行，最好将标签名转换为小写形式

```js
if (element.tagName == "div"){ 
  // 不要这样做，可能出错! // do something here
}
if (element.tagName.toLowerCase() == "div"){ 
  // 推荐，适用于所有文档 // 做点什么
}
```

1. HTML元素

所有 HTML 元素都通过 HTMLElement 类型表示，包括其直接实例和间接实例。另外，HTMLElement 直接继承 Element 并增加了一些属性。

- id，元素在文档中的唯一标识符;
- title，包含元素的额外信息，通常以提示条形式展示;
- lang，元素内容的语言代码(很少用);
- dir，语言的书写方向("ltr"表示从左到右，"rtl"表示从右到左，同样很少用);
- className，相当于 class 属性，用于指定元素的 CSS 类(因为 class 是 ECMAScript 关键字，所以不能直接用这个名字)。

所有这些都可以用来获取对应的属性值，也可以用来修改相应的值。

并非所有这些属性的修改都会对页面产生影响。比如，把 id 或 lang 改成其他值对用户是不可见的(假设没有基于这两个属性应用 CSS 样式)，而修改 title 属性则只会在鼠标移到这个元素上时才会反映出来。修改 dir 会导致页面文本立即向左或向右对齐。修改 className 会立即反映应用到新类名的 CSS 样式(如果定义了不同的样式)。

2. 取得属性

每个元素都有零个或多个属性，通常用于为元素或其内容附加更多信息。与属性相关的 DOM 方法主要有 3 个: `getAttribute()`、`setAttribute()` 和 `removeAttribute()`。这些方法主要用于操纵属性，包括在 HTMLElement 类型上定义的属性。

getAttribute()方法也能取得不是 HTML 语言正式属性的自定义属性的值。

```html
<div id="myDiv" my_special_attribute="hello!"></div>
```
```js
let value = div.getAttribute("my_special_attribute");
```
:::tip
注意，属性名不区分大小写，因此"ID"和"id"被认为是同一个属性。另外，根据 HTML5 规范的 要求，自定义属性名应该前缀 `data-` 以方便验证。
:::


通过 DOM 对象访问的属性中有两个返回的值跟使用 getAttribute()取得的值不一样。首先是 style 属性，这个属性用于为元素设定 CSS 样式。在使用 getAttribute()访问 style 属性时，返回的
是 CSS 字符串。而在通过 DOM 对象的属性访问时，style 属性返回的是一个(CSSStyleDeclaration) 7 对象。DOM 对象的 style 属性用于以编程方式读写元素样式，因此不会直接映射为元素中 style 属 性的字符串值。

第二个属性其实是一类，即事件处理程序(或者事件属性)，比如 onclick。在元素上使用事件属 性时(比如 onclick)，属性的值是一段 JavaScript 代码。如果使用 getAttribute()访问事件属性， 则返回的是字符串形式的源代码。而通过 DOM 对象的属性访问事件属性时返回的则是一个 JavaScript 函数(未指定该属性则返回 null)。这是因为 onclick 及其他事件属性是可以接受函数作为值的。

考虑到以上差异，开发者在进行 DOM 编程时通常会放弃使用 `getAttribute()` 而只使用对象属性。 `getAttribute()` 主要用于取得自定义属性的值。

3. 设置属性

与 `getAttribute()` 配套的方法是 `setAttribute()`，这个方法接收两个参数:要设置的属性名和属性的值。如果属性已经存在，则 `setAttribute()` 会以指定的值替换原来的值;如果属性不存在，则 `setAttribute()` 会以指定的值创建该属性。

`setAttribute()` 适用于 HTML 属性，也适用于自定义属性。另外，使用 `setAttribute()` 方法**设置的属性名会规范为小写形式**，因此"ID"会变成"id"。

```js
div.setAttribute("id", "someOtherId");
div.setAttribute("class", "ft");
```

因为元素属性也是 DOM 对象属性，所以直接给 DOM 对象的属性赋值也可以设置元素属性的值，

```js
div.id = "someOtherId";
div.align = "left";
```

最后一个方法` removeAttribute()` 用于从元素中删除属性。这样不单单是清除属性的值，而是会把整个属性完全从元素中去掉。

4. attributes 属性

`Element` 类型是唯一使用 `attributes` 属性的 DOM 节点类型。`attributes` 属性包含一个 `NamedNodeMap` 实例，是一个类似 `NodeList` 的“实时”集合。元素的每个属性都表示为一个 `Attr` 节 点，并保存在这个 `NamedNodeMap` 对象中。