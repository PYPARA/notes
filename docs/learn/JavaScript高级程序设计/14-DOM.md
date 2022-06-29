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

- getNamedItem(name)，返回 nodeName 属性等于 name 的节点;
- removeNamedItem(name)，删除 nodeName 属性等于 name 的节点;
- setNamedItem(node)，向列表中添加 node 节点，以其 nodeName 为索引; 
- item(pos)，返回索引位置 pos 处的节点。

`attributes` 属性中的每个节点的 `nodeName` 是对应属性的名字，`nodeValue` 是属性的值。比如， 要取得元素 id 属性的值，可以使用以下代码:

```js
let id = element.attributes.getNamedItem("id").nodeValue;
let id = element.attributes["id"].nodeValue;
// 实测 chrome 中还可以使用
let idObject = element.attributes.id
let name = idObject.name
let value = idObject.value
```

同样，也可以用这种语法设置属性的值，即先取得属性节点，再将其 nodeValue 设置为新值。

`removeNamedItem()` 方法与元素上的 `removeAttribute()` 方法类似，也是删除指定名字的属性。 下面的例子展示了这两个方法唯一的不同之处，就是 `removeNamedItem()`返回表示被删除属性的 `Attr` 节点。

```js
let oldAttr = element.attributes.removeNamedItem("id");
// id=xxx
```

`setNamedItem()`方法很少使用，它接收一个属性节点，然后给元素添加一个新属性

```js
element.attributes.setNamedItem(newAttr);
```

一般来说，因为使用起来更简便，通常开发者更喜欢使用 `getAttribute()`、`removeAttribute()` 和 `setAttribute()` 方法，而不是刚刚介绍的 `NamedNodeMap` 对象的方法。

`attributes` 属性最有用的场景是需要迭代元素上所有属性的时候。这时候往往是要把 DOM 结构 序列化为 XML 或 HTML 字符串。比如，以下代码能够迭代一个元素上的所有属性并以 `attribute1= "value1" attribute2="value2"`的形式生成格式化字符串:

```js
function outputAttributes(element) {
  let pairs = [];
  for (let i = 0, len = element.attributes.length; i < len; ++i) { 
    const attribute = element.attributes[i]; 
    pairs.push(`${attribute.nodeName}="${attribute.nodeValue}"`);
  }
  return pairs.join(" ");
}
```

这个函数使用数组存储每个名/值对，迭代完所有属性后，再将这些名/值对用空格拼接在一起。(这个技术常用于序列化为长字符串。)这个函数中的 for 循环使用 `attributes.length` 属性迭代每个属性，将每个属性的名字和值输出为字符串。不同浏览器返回的 `attributes` 中的属性顺序也可能不一样。HTML 或 XML 代码中属性出现的顺序不一定与 `attributes` 中的顺序一致。

5. 创建元素

可以使用 `document.createElement()` 方法创建新元素。这个方法接收一个参数，即要创建元素的标签名。在 HTML 文档中，标签名是不区分大小写的，而 XML 文档(包括 XHTML)是区分大小写的。

```js
let div = document.createElement("div");
```

使用 `createElement()` 方法创建新元素的同时也会将其 `ownerDocument` 属性设置为 `document`。 此时，可以再为其添加属性、添加更多子元素。

```js
div.id = "myNewDiv";
div.className = "box";
```

在新元素上设置这些属性只会附加信息。因为这个元素还没有添加到文档树，所以不会影响浏览器显示。要把元素添加到文档树，可以使用 `appendChild()`、`insertBefore()`或 `replaceChild()`。 比如，以下代码会把刚才创建的元素添加到文档的`<body>`元素中

6. 元素后代

元素可以拥有任意多个子元素和后代元素，因为元素本身也可以是其他元素的子元素。`childNodes` 属性包含元素所有的子节点，这些子节点可能是其他元素、文本节点、注释或处理指令。不同浏览器在识别这些节点时的表现有明显不同。

要取得某个元素的子节点和其他后代节点，可以使用元素的 `getElementsByTagName()` 方法。在 元素上调用这个方法与在文档上调用是一样的。

```js
let ul = document.getElementById("myList");
let items = ul.getElementsByTagName("li");
```

### 14.1.4 Text 元素

Text 节点由 Text 类型表示，包含按字面解释的纯文本，也可能包含转义后的 HTML 字符，但不含 HTML 代码。Text 类型的节点具有以下特征:

- nodeType 等于 3;
- nodeName 值为"#text";
- nodeValue 值为节点中包含的文本; 
- parentNode 值为 Element 对象; 
- 不支持子节点。

Text 节点中包含的文本可以通过 nodeValue 属性访问，也可以通过 data 属性访问，这两个属性包含相同的值。修改 nodeValue 或 data 的值，也会在另一个属性反映出来。文本节点暴露了以下操作文本的方法:

- appendData(text)，向节点末尾添加文本 text;
- deleteData(offset, count)，从位置 offset 开始删除 count 个字符;
- insertData(offset, text)，在位置 offset 插入 text;
- replaceData(offset, count, text)，用 text 替换从位置 offset 到 offset + count 的文本;
- splitText(offset)，在位置 offset 将当前文本节点拆分为两个文本节点;
- substringData(offset, count)，提取从位置 offset 到 offset + count 的文本。

除了这些方法，还可以通过 `length` 属性获取文本节点中包含的字符数量。这个值等于 `nodeValue.length` 和 `data.length`。

默认情况下，包含文本内容的每个元素最多只能有一个文本节点。

```html
<!-- 没有内容，因此没有文本节点 --> 
<div></div>
<!-- 有空格，因此有一个文本节点 -->
<div> </div>
<!-- 有内容，因此有一个文本节点 -->
<div>Hello World!</div>
```

示例中的第一个`<div>`元素中不包含内容，因此不会产生文本节点。只要开始标签和结束标签之间有内容，就会创建一个文本节点，因此第二个`<div>`元素会有一个文本节点的子节点，虽然它只包含空格。这个文本节点的 nodeValue 就是一个空格。第三个`<div>`元素也有一个文本节点的子节点，其 nodeValue 的值为"Hello World!"。

```js
let textNode = div.firstChild; // 或div.childNodes[0]
// 取得文本节点的引用后，可以像这样来修改它
div.firstChild.nodeValue = "Some other message";
```

只要节点在当前的文档树中，这样的修改就会马上反映出来。修改文本节点还有一点要注意，就是 HTML 或 XML 代码(取决于文档类型)会被转换成实体编码，即小于号、大于号或引号会被转义

```js
// 输出为"Some &lt;strong&gt;other&lt;/strong&gt; message" 
div.firstChild.nodeValue = "Some <strong>other</strong> message";
```

这实际上是在将 HTML 字符串插入 DOM 文档前进行编码的有效方式。

1. 创建文本节点

`document.createTextNode()` 可以用来创建新文本节点，它接收一个参数，即要插入节点的文本。 跟设置已有文本节点的值一样，这些要插入的文本也会应用 HTML 或 XML 编码

```js
let textNode = document.createTextNode("<strong>Hello</strong> world!");
```

创建新文本节点后，其 `ownerDocument` 属性会被设置为 `document`。但在把这个节点添加到文档树之前，我们不会在浏览器中看到它。

一般来说一个元素只包含一个文本子节点。不过，也可以让元素包含多个文本子节点。在将一个文本节点作为另一个文本节点的同胞插入后，两个文本节点的文本之间不会包含空格。

2. 规范化文本节点
   
DOM 文档中的同胞文本节点可能导致困惑，因为一个文本节点足以表示一个文本字符串。同样， DOM 文档中也经常会出现两个相邻文本节点。为此，有一个方法可以合并相邻的文本节点。这个方法叫 `normalize()`，是在 Node 类型中定义的(因此所有类型的节点上都有这个方法)。在包含两个或多 个相邻文本节点的父节点上调用 `normalize()`时，所有同胞文本节点会被合并为一个文本节点，这个文本节点的 `nodeValue` 就等于之前所有同胞节点 `nodeValue` 拼接在一起得到的字符串。

::: tip
浏览器在解析文档时，永远不会创建同胞文本节点。同胞文本节点只会出现在 DOM 脚本生成的文档树中。
:::

3. 拆分文本节点

Text 类型定义了一个与 `normalize()` 相反的方法——`splitText()`。这个方法可以在指定的偏移位置拆分 `nodeValue`，将一个文本节点拆分成两个文本节点。拆分之后，原来的文本节点包含开头到偏移位置前的文本，新文本节点包含剩下的文本。这个方法返回新的文本节点，具有与原来的文本节点相同的 `parentNode`。

### 14.1.5 Comment类型
DOM 中的注释通过 Comment 类型表示。Comment 类型的节点具有以下特征:

- nodeType 等于 `8`;
- nodeName 值为 `#comment`;
- nodeValue 值为注释的内容;
- parentNode 值为 `Document` 或 `Element` 对象; 
- 不支持子节点。

Comment 类型与 Text 类型继承同一个基类(CharacterData)，因此拥有除 splitText() 之外 Text 节点所有的字符串操作方法。与 Text 类型相似，注释的实际内容可以通过 nodeValue 或 data 属性获得。

注释节点可以作为父节点的子节点来访问。

可以使用 `document.createComment()` 方法创建注释节点，参数为注释文本。

显然，注释节点很少通过 JavaScrpit 创建和访问，因为注释几乎不涉及算法逻辑。此外，浏览器不承认结束的`</html>`标签之后的注释。如果要访问注释节点，则必须确定它们是`<html>`元素的后代。

### 14.1.6 CDATASection 类型
CDATASection 类型表示 XML 中特有的 CDATA 区块。CDATASection 类型继承 Text 类型，因此拥有包括 splitText()在内的所有字符串操作方法。CDATASection 类型的节点具有以下特征:


- nodeType 等于 4;
- nodeName 值为 `#cdata-section`;
- nodeValue 值为 CDATA 区块的内容;
- parentNode 值为 Document 或 Element 对象;
- 不支持子节点。

### 14.1.7 DocumentType 类型
DocumentType 类型的节点包含文档的文档类型(doctype)信息，具有以下特征:

- nodeType 等于 10;
- nodeName 值为文档类型的名称;
- nodeValue 值为 null;
- parentNode 值为 Document 对象; 
- 不支持子节点。

DocumentType 对象在 DOM Level 1 中不支持动态创建，只能在解析文档代码时创建。对于支持这个类型的浏览器，DocumentType 对象保存在 document.doctype 属性中。DOM Level 1 规定了 DocumentType 对象的 3 个属性:name、entities 和 notations。其中，name 是文档类型的名称， entities 是这个文档类型描述的实体的 NamedNodeMap，而 notations 是这个文档类型描述的表示法的 NamedNodeMap。因为浏览器中的文档通常是 HTML 或 XHTML 文档类型，所以 entities 和 notations 列表为空。(这个对象只包含行内声明的文档类型。)无论如何，只有 name 属性是有用的。 这个属性包含文档类型的名称，即紧跟在`<!DOCTYPE` 后面的那串文本。

### 14.1.8 DocumentFragment 类型

所有节点类型中，DocumentFragment 类型是唯一一个在标记中没有对应表示的类型。DOM 将 文档片段定义为“轻量级”文档，能够包含和操作节点，却没有完整文档那样额外的消耗。 DocumentFragment 节点具有以下特征:

- nodeType 等于 11;
- nodeName 值为"#document-fragment";
- nodeValue 值为 null;
- parentNode 值为 null;
- 子节点可以是 Element、ProcessingInstruction、Comment、Text、CDATASection 或 EntityReference。

不能直接把文档片段添加到文档。相反，文档片段的作用是充当其他要被添加到文档的节点的仓库。
```js
let fragment = document.createDocumentFragment();
let ul = document.getElementById("myList");
for (let i = 0; i < 3; ++i) { 
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(`Item ${i + 1}`));
  fragment.appendChild(li);
}
ul.appendChild(fragment);
```

### 14.1.9 Attr 类型
元素数据在 DOM 中通过 Attr 类型表示。Attr 类型构造函数和原型在所有浏览器中都可以直接访问。技术上讲，属性是存在于元素 attributes 属性中的节点。Attr 节点具有以下特征:

- nodeType 等于 2;
- nodeName 值为属性名; 
- nodeValue 值为属性值;
- parentNode 值为 null;
- 在 HTML 中不支持子节点;
- 在 XML 中子节点可以是 Text 或 EntityReference。

属性节点尽管是节点，却不被认为是 DOM 文档树的一部分。Attr 节点很少直接被引用，通常开发者更喜欢使用 getAttribute()、removeAttribute()和 setAttribute()方法操作属性。

Attr 对象上有 3 个属性:name、value 和 specified。其中，name 包含属性名(与 nodeName 一样)，value 包含属性值(与 nodeValue 一样)，而 specified 是一个布尔值，表示属性使用的是默认值还是被指定的值。

可以使用 document.createAttribute()方法创建新的 Attr 节点，参数为属性名。

::: tip
将属性作为节点来访问多数情况下并无必要。推荐使用 `getAttribute()`、 `removeAttribute()` 和 `setAttribute()` 方法操作属性，而不是直接操作属性节点。
:::

## 14.2 DOM 编程
很多时候，操作 DOM 是很直观的。通过 HTML 代码能实现的，也一样能通过 JavaScript 实现。但有时候，DOM 也没有看起来那么简单。浏览器能力的参差不齐和各种问题，也会导致 DOM 的某些方面会复杂一些。

### 14.2.1 动态脚本

`<script>`元素用于向网页中插入 JavaScript 代码，可以是 src 属性包含的外部文件，也可以是作为该元素内容的源代码。动态脚本就是在页面初始加载时不存在，之后又通过 DOM 包含的脚本。与对应的 HTML 元素一样，有两种方式通过`<script>`动态为网页添加脚本:引入外部文件和直接插入源代码。

```js
function loadScript(url) {
  let script = document.createElement("script");
  script.src = url;
  document.body.appendChild(script);
}

let script = document.createElement("script"); 
script.text = "function sayHi(){alert('hi');}";
document.body.appendChild(script);

```

### 14.2.2 动态样式
CSS样式在HTML页面中可以通过两个元素加载。`<link>`元素用于包含CSS外部文件，而 `<style>` 元素用于添加嵌入样式。与动态脚本类似，动态样式也是页面初始加载时并不存在，而是在之后才添加到页面中的。

```js
function loadStyles(url){
  // link
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = url;
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(link);

  // style 
  let style = document.createElement("style"); 4 style.type = "text/css";
  try{
    style.appendChild(document.createTextNode(css));
  } catch (ex){
    // IE
    style.styleSheet.cssText = css;
  }
  let head = document.getElementsByTagName("head")[0];
  head.appendChild(style);
}
```

### 14.2.3 操作表格
表格是 HTML 中最复杂的结构之一。通过 DOM 编程创建`<table>`元素，通常要涉及大量标签，包 括表行、表元、表题，等等。

为了方便创建表格，HTML DOM 给`<table>`、`<tbody>`和 `<tr>` 元素添加了一些属性和方法。

`<table>`元素添加了以下属性和方法:

- caption，指向`<caption>`元素的指针(如果存在);
- tBodies，包含`<tbody>`元素的 HTMLCollection;
- tFoot，指向`<tfoot>`元素(如果存在);
- tHead，指向`<thead>`元素(如果存在);
- rows，包含表示所有行的 HTMLCollection;
- createTHead()，创建`<thead>`元素，放到表格中，返回引用;
- createTFoot()，创建`<tfoot>`元素，放到表格中，返回引用;
- createCaption()，创建`<caption>`元素，放到表格中，返回引用; 
- deleteTHead()，删除`<thead>`元素;
- deleteTFoot()，删除`<tfoot>`元素;
- deleteCaption()，删除`<caption>`元素;
- deleteRow(pos)，删除给定位置的行;
- insertRow(pos)，在行集合中给定位置插入一行。

`<tbody>`元素添加了以下属性和方法:

- rows，包含`<tbody>`元素中所有行的 HTMLCollection;
- deleteRow(pos)，删除给定位置的行;
- insertRow(pos)，在行集合中给定位置插入一行，返回该行的引用。

`<tr>`元素添加了以下属性和方法:

- cells，包含`<tr>`元素所有表元的 HTMLCollection;
- deleteCell(pos)，删除给定位置的表元;
- insertCell(pos)，在表元集合给定位置插入一个表元，返回该表元的引用。

### 14.2.4 使用NodeList
理解 NodeList 对象和相关的 `NamedNodeMap`、`HTMLCollection`，是理解 DOM 编程的关键。这 3 个集合类型都是“实时的”，意味着文档结构的变化会实时地在它们身上反映出来，因此它们的值始终代表最新的状态。实际上，NodeList 就是基于 DOM 文档的实时查询。 

下面的代码会导致无穷循环:
```js
let divs = document.getElementsByTagName("div");
for (let i = 0; i < divs.length; ++i){
  let div = document.createElement("div");
  document.body.appendChild(div);
}

for (let div of document.getElementsByTagName("div")){
  let newDiv = document.createElement("div");
  document.body.appendChild(newDiv);
}
```

任何时候要迭代 NodeList，最好再初始化一个变量保存当时查询时的长度，然后用循环变量与这个变量进行比较

```js
let divs = document.getElementsByTagName("div");
for (let i = 0, len = divs.length; i < len; ++i) {
  let div = document.createElement("div");
  document.body.appendChild(div);
}
// 在这个例子中，又初始化了一个保存集合长度的变量 len。因为 len 保存着循环开始时集合的长度， 而这个值不会随集合增大动态增长，所以就可以避免前面例子中出现的无穷循环。
```

另外，如果不想再初始化一个变量，也可以像下面这样反向迭代集合:

```js
let divs = document.getElementsByTagName("div");
for (let i = divs.length - 1; i >= 0; --i) {
  let div = document.createElement("div");
  document.body.appendChild(div);
}
```

一般来说，最好限制操作 NodeList 的次数。因为每次查询都会搜索整个文档，所以最好把查询到 的 NodeList 缓存起来。

## 14.3 MutationObserver 接口
添加到 DOM 规范中的 MutationObserver 接口，可以在 DOM 被修改时异步执行回调。使用 MutationObserver 可以观察整个文档、DOM 树的一部分，或某个元素。此外还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。

::: tip
新引进 `MutationObserver` 接口是为了取代废弃的 `MutationEvent` 。
:::

### 14.3.1 基本用法
`MutationObserver` 的实例要通过调用 `MutationObserver` 构造函数并传入一个回调函数来创建:

```js
let observer = new MutationObserver(() => console.log('DOM was mutated!'));
```

1. observe() 方法
   
新创建的 `MutationObserver` 实例不会关联 DOM 的任何部分。要把这个 `observer` 与 DOM 关 联起来，需要使用 `observe()` 方法。这个方法接收两个必需的参数:要观察其变化的 DOM 节点，以及 一个 `MutationObserverInit` 对象。

`MutationObserverInit` 对象用于控制观察哪些方面的变化，是一个键/值对形式配置选项的字典。 例如，下面的代码会创建一个观察者(observer)并配置它观察`<body>`元素上的属性变化:

```js
let observer = new MutationObserver(() => console.log('<body> attributes changed'));
observer.observe(document.body, { attributes: true });
```

执行以上代码后，`<body>`元素上任何属性发生变化都会被这个 `MutationObserver` 实例发现，然后就会异步执行注册的回调函数。`<body>`元素后代的修改或其他非属性修改都不会触发回调进入任务队列。

2. 回调与 `MutationRecord`

每个回调都会收到一个 `MutationRecord` 实例的数组。`MutationRecord` 实例包含的信息包括发生了什么变化，以及 DOM 的哪一部分受到了影响。因为回调执行之前可能同时发生多个满足观察条件的事件，所以每次执行回调都会传入一个包含按顺序入队的 `MutationRecord` 实例的数组。

连续修改会生成多个 `MutationRecord` 实例，下次回调执行时就会收到包含所有这些实例的数组， 顺序为变化事件发生的顺序。

`MutationRecord` 实例的属性。

- target 被修改影响的目标节点
- type 字符串，表示变化的类型:"attributes"、"characterData"或"childList"
- oldValue 如果在 MutationObserverInit 对象中启用(attributeOldValue 或 characterData OldValue 为 true)，"attributes"或"characterData"的变化事件会设置这个属性为被替代的值 "childList" 类型的变化始终将这个属性设置为 null
- attributeName 对于"attributes"类型的变化，这里保存被修改属性的名字 其他变化事件会将这个属性设置为 null
- attributeNamespace 对于使用了命名空间的"attributes"类型的变化，这里保存被修改属性的名字 其他变化事件会将这个属性设置为 null
- addedNodes 对于"childList"类型的变化，返回包含变化中添加节点的 NodeList 默认为空 NodeList
- removedNodes 对于"childList"类型的变化，返回包含变化中删除节点的 NodeList 默认为空 NodeList
- previousSibling 对于"childList"类型的变化，返回变化节点的前一个同胞 Node 默认为 null
- nextSibling 对于"childList"类型的变化，返回变化节点的后一个同胞 Node 默认为 null

传给回调函数的第二个参数是观察变化的 `MutationObserver` 的实例

```js
let observer = new MutationObserver((mutationRecords, mutationObserver) => console.log(mutationRecords, mutationObserver));
observer.observe(document.body, { attributes: true });
```

3. disconnect() 方法

默认情况下，只要被观察的元素不被垃圾回收，MutationObserver 的回调就会响应 DOM 变化事 件，从而被执行。要提前终止执行回调，可以调用 disconnect() 方法。
```js
let observer = new MutationObserver(() => console.log('<body> attributes changed')); 
observer.observe(document.body, { attributes: true });
document.body.className = 'foo';
observer.disconnect();
document.body.className = 'bar';
//(没有日志输出)
```

要想让已经加入任务队列的回调执行，可以使用 setTimeout()让已经入列的回调执行完毕再调用 disconnect()
```js
let observer = new MutationObserver(() => console.log('<body> attributes changed')); 
observer.observe(document.body, { attributes: true });
document.body.className = 'foo';
setTimeout(() => {
  observer.disconnect();
  document.body.className = 'bar';
}, 0);
// <body> attributes changed
```

4. 复用 `MutationObserver`

多次调用 `observe()` 方法，可以复用一个 `MutationObserver` 对象观察多个不同的目标节点。此时，`MutationRecord` 的 `target` 属性可以标识发生变化事件的目标节点。

```js
let observer = new MutationObserver((mutationRecords) => console.log(mutationRecords.map((x) => x.target)));
// 向页面主体添加两个子节点
let childA = document.createElement('div'),
    childB = document.createElement('span');
document.body.appendChild(childA);
document.body.appendChild(childB);
// 观察两个子节点
observer.observe(childA, { attributes: true }); 
observer.observe(childB, { attributes: true });
// 修改两个子节点的属性 
childA.setAttribute('foo', 'bar'); 
childB.setAttribute('foo', 'bar');
// [<div>, <span>]
```

`disconnect()` 方法是一个“一刀切”的方案，调用它会停止观察所有目标。

5. 重用 `MutationObserver`

调用 `disconnect()` 并不会结束 `MutationObserver` 的生命。还可以重新使用这个观察者，再将它关联到新的目标节点。

### 14.3.2 MutationObserverInit 与观察范围

`MutationObserverInit` 对象用于控制对目标节点的观察范围。粗略地讲，观察者可以观察的事件包括属性变化、文本变化和子节点变化。

下表列出了 `MutationObserverInit` 对象的属性

- subtree 布尔值，表示除了目标节点，是否观察目标节点的子树(后代)，如果是 `false`，则只观察目标节点的变化;如果是 `true`，则观察目标节点及其整个子树，默认为 `false`
- attributes 布尔值，表示是否观察目标节点的属性变化，默认为 `false`
- attributeFilter 字符串数组，表示要观察哪些属性的变化，把这个值设置为 `true` 也会将 `attributes` 的值转换为 `true`，默认为观察所有属性
- attributeOldValue 布尔值，表示 `MutationRecord` 是否记录变化之前的属性值，把这个值设置为 `true` 也会将 `attributes` 的值转换为 `true`，默认为 `false`
- characterData 布尔值，表示修改字符数据是否触发变化事件，默认为 `false`
- characterDataOldValue 布尔值，表示 `MutationRecord` 是否记录变化之前的字符数据，把这个值设置为 `true` 也会将 `characterData` 的值转换为 `true`，默认为 `false`
- childList 布尔值，表示修改目标节点的子节点是否触发变化事件，默认为 `false`

::: tip
在调用`observe()`时，`MutationObserverInit`对象中的`attribute`、`characterData` 和`childList`属性必须至少有一项为`true`(无论是直接设置这几个属性，还是通过设置 `attributeOldValue` 等属性间接导致它们的值转换为 `true`)。否则会抛出错误，因为没有任何变化事件可能触发回调。
:::

1. 观察属性

`MutationObserver` 可以观察节点属性的添加、移除和修改。要为属性变化注册回调，需要在 `MutationObserverInit` 对象中将 `attributes` 属性设置为 `true`

把 `attributes` 设置为 `true` 的默认行为是观察所有属性，但不会在 `MutationRecord` 对象中记 录原来的属性值。如果想观察某个或某几个属性，可以使用`attributeFilter` 属性来设置白名单，即一个属性名字符串数组

```js
let observer = new MutationObserver((mutationRecords) => console.log(mutationRecords));
observer.observe(document.body, { attributeFilter: ['foo'] });
// 添加白名单属性
document.body.setAttribute('foo', 'bar');
// 添加被排除的属性 
document.body.setAttribute('baz', 'qux');
// 只有 foo 属性的变化被记录了
// [MutationRecord]
```

如果想在变化记录中保存属性原来的值，可以将 `attributeOldValue` 属性设置为 true

2. 观察字符数据

`MutationObserver` 可以观察文本节点(如 Text、Comment 或 ProcessingInstruction 节点)中字符的添加、删除和修改。要为字符数据注册回调，需要在 `MutationObserverInit` 对象中将 `characterData` 属性设置为 `true`

将 `characterData` 属性设置为 `true` 的默认行为不会在 `MutationRecord` 对象中记录原来的字符数据。如果想在变化记录中保存原来的字符数据，可以将 `characterDataOldValue` 属性设置为 `true`

3. 观察子节点

`MutationObserver` 可以观察目标节点子节点的添加和移除。要观察子节点，需要在 `MutationObserverInit` 对象中将 `childList` 属性设置为 `true`。

对子节点重新排序(尽管调用一个方法即可实现)会报告两次变化事件，因为从技术上会涉及先移 除和再添加。

4. 观察子树

默认情况下，`MutationObserver` 将观察的范围限定为一个元素及其子节点的变化。可以把观察的范围扩展到这个元素的子树(所有后代节点)，这需要在 `MutationObserverInit` 对象中将 `subtree` 属性设置为 `true`。

有意思的是，被观察子树中的节点被移出子树之后仍然能够触发变化事件。这意味着在子树中的节 点离开该子树后，即使严格来讲该节点已经脱离了原来的子树，但它仍然会触发变化事件。

### 14.3.3 异步回调与记录队列

`MutationObserver` 接口是出于性能考虑而设计的，其核心是异步回调与记录队列模型。为了在 大量变化事件发生时不影响性能，每次变化的信息(由观察者实例决定)会保存在 `MutationRecord` 实例中，然后添加到记录队列。这个队列对每个 `MutationObserver` 实例都是唯一的，是所有 DOM 变化事件的有序列表。

1. 记录队列

每次 `MutationRecord` 被添加到 `MutationObserver` 的记录队列时，仅当之前没有已排期的微任 务回调时(队列中微任务长度为 0)，才会将观察者注册的回调(在初始化 `MutationObserver` 时传入) 作为微任务调度到任务队列上。这样可以保证记录队列的内容不会被回调处理两次。

不过在回调的微任务异步执行期间，有可能又会发生更多变化事件。因此被调用的回调会接收到一 个 `MutationRecord` 实例的数组，顺序为它们进入记录队列的顺序。回调要负责处理这个数组的每一 个实例，因为函数退出之后这些实现就不存在了。回调执行后，这些 `MutationRecord` 就用不着了， 因此记录队列会被清空，其内容会被丢弃。

2. takeRecords() 方法
调用 `MutationObserver` 实例的 `takeRecords()` 方法可以清空记录队列，取出并返回其中的所有 `MutationRecord` 实例。

### 14.3.4 性能、内存与垃圾回收

DOM Level 2 规范中描述的 MutationEvent 定义了一组会在各种 DOM 变化时触发的事件。由于浏览器事件的实现机制，这个接口出现了严重的性能问题。因此，DOM Level 3 规定废弃了这些事件。 MutationObserver 接口就是为替代这些事件而设计的更实用、性能更好的方案。

将变化回调委托给微任务来执行可以保证事件同步触发，同时避免随之而来的混乱。为 MutationObserver 而实现的记录队列，可以保证即使变化事件被爆发式地触发，也不会显著地拖慢浏览器。

无论如何，使用 MutationObserver 仍然不是没有代价的。因此理解什么时候避免出现这种情况 就很重要了。

1. MutationObserver 的引用

MutationObserver 实例与目标节点之间的引用关系是非对称的。MutationObserver 拥有对要观察的目标节点的弱引用。因为是弱引用，所以不会妨碍垃圾回收程序回收目标节点。

然而，目标节点却拥有对 MutationObserver 的强引用。如果目标节点从 DOM 中被移除，随后被垃圾回收，则关联的 MutationObserver 也会被垃圾回收。

2. MutationRecord 的引用

记录队列中的每个 MutationRecord 实例至少包含对已有 DOM 节点的一个引用。如果变化是 childList 类型，则会包含多个节点的引用。记录队列和回调处理的默认行为是耗尽这个队列，处理每个 MutationRecord，然后让它们超出作用域并被垃圾回收。

有时候可能需要保存某个观察者的完整变化记录。保存这些 MutationRecord 实例，也就会保存它们引用的节点，因而会妨碍这些节点被回收。如果需要尽快地释放内存，建议从每个MutationRecord 中抽取出最有用的信息，然后保存到一个新对象中，最后抛弃 MutationRecord。

## 14.4 小结
文档对象模型(DOM，Document Object Model)是语言中立的 HTML 和 XML 文档的 API。DOM Level 1 将 HTML 和 XML 文档定义为一个节点的多层级结构，并暴露出 JavaScript 接口以操作文档的底层结构和外观。

DOM 由一系列节点类型构成，主要包括以下几种。

- Node 是基准节点类型，是文档一个部分的抽象表示，所有其他类型都继承 Node。
- Document 类型表示整个文档，对应树形结构的根节点。在 JavaScript 中，document 对象是 Document 的实例，拥有查询和获取节点的很多方法。
- Element 节点表示文档中所有 HTML 或 XML 元素，可以用来操作它们的内容和属性。
- 其他节点类型分别表示文本内容、注释、文档类型、CDATA 区块和文档片段。

DOM 编程在多数情况下没什么问题，在涉及`<script>`和`<style>`元素时会有一点兼容性问题。因为这些元素分别包含脚本和样式信息，所以浏览器会将它们与其他元素区别对待。

要理解 DOM，最关键的一点是知道影响其性能的问题所在。DOM 操作在 JavaScript 代码中是代价比较高的，NodeList 对象尤其需要注意。NodeList 对象是“实时更新”的，这意味着每次访问它都会执行一次新的查询。考虑到这些问题，实践中要尽量减少 DOM 操作的数量。

MutationObserver 是为代替性能不好的 MutationEvent 而问世的。使用它可以有效精准地监控 DOM 变化，而且 API 也相对简单。