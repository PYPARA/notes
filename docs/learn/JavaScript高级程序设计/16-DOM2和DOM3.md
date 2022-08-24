# 16 DOM2 和 DOM3
- DOM2 到 DOM3 的变化 
- 操作样式的 DOM API 
- DOM 遍历与范围

DOM1(DOM Level 1)主要定义了 HTML 和 XML 文档的底层结构。DOM2(DOM Level 2)和 DOM3(DOM Level 3)在这些结构之上加入更多交互能力，提供了更高级的 XML 特性。实际上，DOM2 和 DOM3 是按照模块化的思路来制定标准的，每个模块之间有一定关联，但分别针对某个 DOM 子集。

这些模式如下所示。

- DOM Core:在 DOM1 核心部分的基础上，为节点增加方法和属性。
- DOM Views:定义基于样式信息的不同视图。
- DOM Events:定义通过事件实现 DOM 文档交互。
- DOM Style:定义以编程方式访问和修改 CSS 样式的接口。
- DOM Traversal and Range:新增遍历 DOM 文档及选择文档内容的接口。
- DOM HTML:在 DOM1 HTML 部分的基础上，增加属性、方法和新接口。
- DOM Mutation Observers:定义基于 DOM 变化触发回调的接口。这个模块是 DOM4 级模块，用于取代 Mutation Events。

## 16.1 DOM 的演进
DOM2 和 DOM3 Core 模块的目标是扩展 DOM API，满足 XML 的所有需求并提供更好的错误处理 和特性检测。很大程度上，这意味着支持 XML 命名空间的概念。DOM2 Core 没有新增任何类型，仅仅 在 DOM1 Core 基础上增加了一些方法和属性。DOM3 Core 则除了增强原有类型，也新增了一些新类型。

类似地，DOM View 和 HTML 模块也丰富了 DOM 接口，定义了新的属性和方法。

### 16.1.1 XML 命名空间
XML 命名空间可以实现在一个格式规范的文档中混用不同的 XML 语言，而不必担心元素命名冲 17 突。严格来讲，XML 命名空间在 XHTML 中才支持，HTML 并不支持。

命名空间是使用 xmlns 指定的。XHTML 的命名空间是`http://www.w3.org/1999/xhtml`，应该包含在任何格式规范的 XHTML 页面的 `<html>` 元素中

```html
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Example XHTML page</title>
  </head>
  <body>
    Hello world!
  </body>
</html>
```

对这个例子来说，所有元素都默认属于 XHTML 命名空间。可以使用 xmlns 给命名空间创建一个前缀，格式为“xmlns: 前缀”

```html
<xhtml:html xmlns:xhtml="http://www.w3.org/1999/xhtml"> <xhtml:head>
    <xhtml:title>Example XHTML page</xhtml:title>
  </xhtml:head>
  <xhtml:body>
    Hello world!
  </xhtml:body>
</xhtml:html>
```

#### 1. Node 的变化
在 DOM2 中，Node 类型包含以下特定于命名空间的属性:

- `localName`，不包含命名空间前缀的节点名;
- `namespaceURI`，节点的命名空间 URL，如果未指定则为 `null`;
- `prefix`，命名空间前缀，如果未指定则为 `null`。

DOM3 进一步增加了如下与命名空间相关的方法:

- `isDefaultNamespace(namespaceURI)`，返回布尔值，表示 `namespaceURI` 是否为节点的默认命名空间;
- `lookupNamespaceURI(prefix)`，返回给定 `prefix` 的命名空间 `URI`;
- `lookupPrefix(namespaceURI)`，返回给定 `namespaceURI` 的前缀。

#### 2. Document 的变化
DOM2 在 Document 类型上新增了如下命名空间特定的方法:

- `createElementNS(namespaceURI, tagName)`，以给定的标签名 `tagName` 创建指定命名空间 `namespaceURI` 的一个新元素;
- `createAttributeNS(namespaceURI, attributeName)`，以给定的属性名 `attributeName` 创建指定命名空间 `namespaceURI` 的一个新属性; 
- `getElementsByTagNameNS(namespaceURI, tagName)`，返回指定命名空间 `namespaceURI` 中所有标签名为 `tagName` 的元素的 `NodeList`。

#### 3. Element 的变化
DOM2 Core 对 Element 类型的更新主要集中在对属性的操作上。下面是新增的方法:

- `getAttributeNS(namespaceURI, localName)`，取得指定命名空间 `namespaceURI` 中名为 `localName` 的属性;
- `getAttributeNodeNS(namespaceURI, localName)`，取得指定命名空间 `namespaceURI` 中名为 `localName` 的属性节点;
- `getElementsByTagNameNS(namespaceURI, tagName)`，取得指定命名空间 `namespaceURI` 中标签名为 `tagName` 的元素的 `NodeList`;
- `hasAttributeNS(namespaceURI, localName)`，返回布尔值，表示元素中是否有命名空间 `namespaceURI` 下名为 `localName` 的属性(注意，DOM2 Core 也添加不带命名空间的 `hasAttribute()` 方法);
- `removeAttributeNS(namespaceURI, localName)`，删除指定命名空间 `namespaceURI` 中名为 `localName` 的属性;
- `setAttributeNS(namespaceURI, qualifiedName, value)`，设置指定命名空间 `namespaceURI` 中名为 `qualifiedName` 的属性为 `value`;
- `setAttributeNodeNS(attNode)`，为元素设置(添加)包含命名空间信息的属性节点 `attNode`。

#### 4. NamedNodeMap 的变化
`NamedNodeMap` 也增加了以下处理命名空间的方法。因为 `NamedNodeMap` 主要表示属性，所以这些方法大都适用于属性:

- `getNamedItemNS(namespaceURI, localName)`，取得指定命名空间 `namespaceURI` 中名为 `localName` 的项;
- `removeNamedItemNS(namespaceURI, localName)`，删除指定命名空间 `namespaceURI` 中 名为 `localName` 的项;
- `setNamedItemNS(node)`，为元素设置(添加)包含命名空间信息的节点。


### 16.1.2 其他变化
除命名空间相关的变化，DOM2 Core 还对 DOM 的其他部分做了一些更新。这些变化与 XML 命名空间无关，主要关注 DOM API 的完整性与可靠性。

#### 1. DocumentType 的变化
`DocumentType` 新增了 3 个属性:`publicId`、`systemId` 和 `internalSubset`。`publicId`、 `systemId` 属性表示文档类型声明中有效但无法使用 DOM1 API 访问的数据。

#### 2. Document 的变化
`Document` 类型的更新中唯一跟命名空间无关的方法是 `importNode()`。这个方法的目的是从其他文档获取一个节点并导入到新文档，以便将其插入新文档。每个节点都有一个 `ownerDocument` 属性， 表示所属文档。如果调用 `appendChild()` 方法时传入节点的 `ownerDocument` 不是指向当前文档，则 会发生错误。而调用 `importNode()` 导入其他文档的节点会返回一个新节点，这个新节点的 `ownerDocument` 属性是正确的。

`importNode()` 方法跟 `cloneNode()` 方法类似，同样接收两个参数:要复制的节点和表示是否同时复制子树的布尔值，返回结果是适合在当前文档中使用的新节点。
```js
let newNode = document.importNode(oldNode, true); // 导入节点及所有后代 
document.body.appendChild(newNode);
```

DOM2 View 给 `Document` 类型增加了新属性 `defaultView`，是一个指向拥有当前文档的窗口(或窗格`<frame>`)的指针。这个规范中并没有明确视图何时可用，因此这是添加的唯一一个属性。`defaultView` 属性得到了除 IE8 及更早版本之外所有浏览器的支持。IE8 及更早版本支持等价的 `parentWindow` 属性， Opera 也支持这个属性。

除了上面这一个方法和一个属性，DOM2 Core 还针对 `document.implementation` 对象增加了两 个新方法: `createDocumentType()` 和 `createDocument()`。前者用于创建 `DocumentType` 类型的新节点，接收 3 个参数:文档类型名称、`publicId` 和 `systemId`。

已有文档的文档类型不可更改，因此 `createDocumentType()` 只在创建新文档时才会用到，而创建新文档要使用 `createDocument()` 方法。`createDocument()` 接收 3 个参数:文档元素的 `namespaceURI`、文档元素的标签名和文档类型。

DOM2 HTML 模块也为 `document.implamentation` 对象添加了 `createHTMLDocument()` 方法。 使用这个方法可以创建一个完整的 `HTML` 文档，包含`<html>`、`<head>`、`<title>`和`<body>`元素。这个 方法只接收一个参数，即新创建文档的标题(放到`<title>`元素中)，返回一个新的 `HTML` 文档。

`reateHTMLDocument() `方法创建的对象是 `HTMLDocument` 类型的实例，因此包括该类型所有相关的方法和属性，包括 `title` 和 `body` 属性。

#### 3. Node 的变化
DOM3 新增了两个用于比较节点的方法: `isSameNode()` 和 `isEqualNode()`。这两个方法都接收一个节点参数，如果这个节点与参考节点相同或相等，则返回 `true`。节点相同，意味着引用同一个对象;节点相等，意味着节点类型相同，拥有相等的属性(`nodeName`、`nodeValue` 等)，而且 `attributes` 和 `childNodes` 也相等(即同样的位置包含相等的值)。

DOM3 也增加了给 DOM 节点附加额外数据的方法。`setUserData()` 方法接收 3 个参数:键、值、 处理函数，用于给节点追加数据。

#### 4. 内嵌窗格的变化
DOM2 HTML 给 HTMLIFrameElement(即`<iframe>`，内嵌窗格)类型新增了一个属性，叫 `contentDocument`。这个属性包含代表子内嵌窗格中内容的 `document` 对象的指针。

`contentDocument` 属性是 `Document` 的实例，拥有所有文档属性和方法，因此可以像使用其他 HTML 文档一样使用它。还有一个属性 `contentWindow`，返回相应窗格的 `window` 对象，这个对象上 有一个 `document` 属性。所有现代浏览器都支持 `contentDocument` 和 `contentWindow` 属性。

## 16.2 样式
HTML 中的样式有 3 种定义方式:外部样式表(通过`<link>`元素)、文档样式表(使用`<style>`元素)和元素特定样式(使用 `style` 属性)。DOM2 `Style` 为这 3 种应用样式的机制都提供了 API。

### 16.2.1 存取元素样式
任何支持 `style` 属性的 `HTML` 元素在 `JavaScript` 中都会有一个对应的 `style` 属性。这个 `style` 属性是 `CSSStyleDeclaration` 类型的实例，其中包含通过 `HTML` `style` 属性为元素设置的所有样式信
息，***但不包含通过层叠机制从文档样式和外部样式中继承来的样式***。`HTML` `style` 属性中的 `CSS` 属性 在 `JavaScript` `style` 对象中都有对应的属性。因为 `CSS` 属性名使用连字符表示法(用连字符分隔两个单词，如 `background-image`)，所以在 `JavaScript` 中这些属性必须转换为驼峰大小写形式(如 `backgroundImage`)。

大多数属性名会这样直接转换过来。但有一个 CSS 属性名不能直接转换，它就是 `float`。因为 `float` 是 `JavaScript` 的保留字，所以不能用作属性名。DOM2 Style 规定它在 `style` 对象中对应的属性 应该是 `cssFloat`。

通过 `style` 属性设置的值也可以通过 `style` 对象获取。

如果元素上没有 `style` 属性，则 `style` 对象包含所有可能的 `CSS` 属性的空值。

#### 1. DOM 样式属性和方法
DOM2 Style 规范也在 `style` 对象上定义了一些属性和方法。这些属性和方法提供了元素 `style` 属性的信息并支持修改

- `cssText`，包含 `style` 属性中的 `CSS` 代码。
- `length`，应用给元素的 `CSS `属性数量。
- `parentRule`，表示 `CSS` 信息的 `CSSRule` 对象(下一节会讨论 `CSSRule` 类型)。
- `getPropertyCSSValue(propertyName)`，返回包含 `CSS` 属性 `propertyName` 值的 `CSSValue` 对象(已废弃)。
- `getPropertyPriority(propertyName)`，如果 CSS 属性 `propertyName` 使用了`!important` 则返回`"important"`，否则返回空字符串。
- `getPropertyValue(propertyName)`，返回属性 `propertyName` 的字符串值。
- `item(index)`，返回索引为 `index` 的 `CSS` 属性名。
- `removeProperty(propertyName)`，从样式中删除 `CSS` 属性 `propertyName。`
- `setProperty(propertyName, value, priority)`，设置 `CSS` 属性 `propertyName` 的值为 `value`，`priority `是`"important"`或空字符串。

通过 `cssText` 属性可以存取样式的 `CSS` 代码。在读模式下，`cssText` 返回 `style` 属性 `CSS` 代码在浏览器内部的表示。在写模式下，给 `cssText` 赋值会重写整个 `style` 属性的值，意味着之前通过 `style` 属性设置的属性都会丢失。比如，如果一个元素通过 `style` 属性设置了边框，而赋给 `cssText` 属性的值不包含边框，则元素的边框会消失。

#### 2. 计算样式
`style` 对象中包含支持 `style` 属性的元素为这个属性设置的样式信息，但不包含从其他样式表层叠继承的同样影响该元素的样式信息。DOM2 Style 在 `document.defaultView` 上增加了 `getComputedStyle()` 方法。这个方法接收两个参数:要取得计算样式的元素和伪元素字符串(如":after")。如果不需要查 询伪元素，则第二个参数可以传 `null`。`getComputedStyle()` 方法返回一个 `CSSStyleDeclaration` 对象(与 `style` 属性的类型一样)，包含元素的计算样式。

关于计算样式要记住一点，在所有浏览器中计算样式都是只读的，不能修改 `getComputedStyle()` 方法返回的对象。而且，计算样式还包含浏览器内部样式表中的信息。因此有默认值的 CSS 属性会出现 在计算样式里。例如，`visibility` 属性在所有浏览器中都有默认值，但这个值因实现而不同。

### 16.2.2 操作样式表
`CSSStyleSheet` 类型表示 `CSS` 样式表，包括使用`<link>`元素和通过`<style>`元素定义的样式表。 注意，这两个元素本身分别是 `HTMLLinkElement` 和 `HTMLStyleElement`。`CSSStyleSheet` 类型是一个通用样式表类型，可以表示以任何方式在 `HTML` 中定义的样式表。另外，元素特定的类型允许修改 `HTML` 属性，而 `CSSStyleSheet` 类型的实例则是一个只读对象(只有一个属性例外)。

`CSSStyleSheet` 类型继承 `StyleSheet`，后者可用作非 `CSS` 样式表的基类。以下是 `CSSStyleSheet` 从 `StyleSheet` 继承的属性。

- `disabled`，布尔值，表示样式表是否被禁用了(这个属性是可读写的，因此将它设置为 `true` 会禁用样式表)。
- `href`，如果是使用 `<link>` 包含的样式表，则返回样式表的 URL，否则返回 null。
- `media`，样式表支持的媒体类型集合，这个集合有一个 length 属性和一个 `item()` 方法，跟所 有 DOM 集合一样。同样跟所有 DOM 集合一样，也可以使用中括号访问集合中特定的项。如果样式表可用于所有媒体，则返回空列表。
- `ownerNode`，指向拥有当前样式表的节点，在 HTML 中要么是`<link>`元素要么是`<style>`元素(在 XML 中可以是处理指令)。如果当前样式表是通过 `@import` 被包含在另一个样式表中，则这 个属性值为 `null`。
- `parentStyleSheet`，如果当前样式表是通过 `@import` 被包含在另一个样式表中，则这个属性 指向导入它的样式表。
- `title`，`ownerNode` 的 `title` 属性。
- `type`，字符串，表示样式表的类型。对 `CSS` 样式表来说，就是 `"text/css"`。

上述属性里除了 `disabled`，其他属性都是只读的。除了上面继承的属性，`CSSStyleSheet` 类型还支持以下属性和方法。

- `cssRules`，当前样式表包含的样式规则的集合。
- `ownerRule`，如果样式表是使用 `@import` 导入的，则指向导入规则;否则为 `null`。
- `deleteRule(index)`，在指定位置删除 `cssRules` 中的规则。
- `insertRule(rule, index)`，在指定位置向 `cssRules` 中插入规则。

通过 `<link>` 或 `<style>` 元素也可以直接获取 `CSSStyleSheet` 对象。DOM 在这两个元素上暴露了 `sheet` 属性，其中包含对应的 `CSSStyleSheet` 对象。

#### 1. CSS 规则
`CSSRule` 类型表示样式表中的一条规则。这个类型也是一个通用基类，很多类型都继承它，但其中最常用的是表示样式信息的 `CSSStyleRule`(其他 `CSS` 规则还有`@import`、`@font-face`、`@page` 和 `@charset` 等，不过这些规则很少需要使用脚本来操作)。以下是 `CSSStyleRule` 对象上可用的属性。

- `cssText`，返回整条规则的文本。这里的文本可能与样式表中实际的文本不一样，因为浏览器内部处理样式表的方式也不一样。Safari 始终会把所有字母都转换为小写。
- `parentRule`，如果这条规则被其他规则(如`@media`)包含，则指向包含规则，否则就是 `null`。
- `parentStyleSheet`，包含当前规则的样式表。
- `selectorText`，返回规则的选择符文本。这里的文本可能与样式表中实际的文本不一样，因为浏览器内部处理样式表的方式也不一样。这个属性在 Firefox、Safari、Chrome 和 IE 中是只读的，在 Opera 中是可以修改的。
- `style`，返回 `CSSStyleDeclaration` 对象，可以设置和获取当前规则中的样式。
- `type`，数值常量，表示规则类型。对于样式规则，它始终为 1。

#### 2. 创建规则
DOM 规定，可以使用 `insertRule()` 方法向样式表中添加新规则。这个方法接收两个参数:规则的文本和表示插入位置的索引值。

虽然可以这样添加规则，但随着要维护的规则增多，很快就会变得非常麻烦。这时候，更好的方式 是使用动态样式加载技术。

#### 3. 删除规则
支持从样式表中删除规则的 DOM 方法是 `deleteRule()`，它接收一个参数:要删除规则的索引。

与添加规则一样，删除规则并不是 Web 开发中常见的做法。考虑到可能影响 CSS 层叠的效果，删除规则时要慎重。

### 16.2.3 元素尺寸
本节介绍的属性和方法并不是 DOM2 Style 规范中定义的，但与 HTML 元素的样式有关。DOM 一直缺乏页面中元素实际尺寸的规定。IE 率先增加了一些属性，向开发者暴露元素的尺寸信息。这些属性现在已经得到所有主流浏览器支持。

#### 1. 偏移尺寸
第一组属性涉及偏移尺寸(offset dimensions)，包含元素在屏幕上占用的所有视觉空间。元素在页 面上的视觉空间由其高度和宽度决定，包括所有内边距、滚动条和边框(但不包含外边距)。以下 4 个属性用于取得元素的偏移尺寸。

- `offsetHeight`，元素在垂直方向上占用的像素尺寸，包括它的高度、水平滚动条高度(如果可见)和上、下边框的高度。
- `offsetLeft`，元素左边框外侧距离包含元素左边框内侧的像素数。
- `offsetTop`，元素上边框外侧距离包含元素上边框内侧的像素数。
- `offsetWidth`，元素在水平方向上占用的像素尺寸，包括它的宽度、垂直滚动条宽度(如果可见)和左、右边框的宽度。

其中，`offsetLeft` 和 `offsetTop` 是相对于包含元素的，包含元素保存在 `offsetParent` 属性中。`offsetParent` 不一定是 `parentNode`。比如，`<td>`元素的 `offsetParent` 是作为其祖先的 `<table>` 元素，因为`<table>` 是节点层级中第一个提供尺寸的元素。

要确定一个元素在页面中的偏移量，可以把它的 `offsetLeft` 和 `offsetTop` 属性分别与 `offsetParent` 的相同属性相加，一直加到根元素。
```js
function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent; 27
  }
  return actualLeft;
}

function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
}
  return actualTop;
}
```

这两个函数使用 `offsetParent` 在 DOM 树中逐级上溯，将每一级的偏移属性相加，最终得到元 素的实际偏移量。对于使用 CSS 布局的简单页面，这两个函数是很精确的。而对于使用表格和内嵌窗 格的页面布局，它们返回的值会因浏览器不同而有所差异，因为浏览器实现这些元素的方式不同。一 般来说，包含在 `<div>` 元素中所有元素都以 `<body>` 为其 `offsetParent`，因此 `getElementleft()` 和 `getElementTop()` 返回的值与 `offsetLeft` 和 `offsetTop` 返回的值相同。

#### 2. 客户端尺寸
元素的客户端尺寸(client dimensions)包含元素内容及其内边距所占用的空间。客户端尺寸只有两 个相关属性:`clientWidth` 和 `clientHeight`。其中，`clientWidth` 是内容区宽度加左、右内边距宽度，`clientHeight` 是内容区高度加上、下内边距高度。

客户端尺寸实际上就是元素内部的空间，因此不包含滚动条占用的空间。这两个属性最常用于确定 浏览器视口尺寸，即检测 `document.documentElement` 的 `clientWidth` 和 `clientHeight`。这两个 属性表示视口`(<html>`或`<body>`元素)的尺寸。

#### 3. 滚动尺寸
最后一组尺寸是滚动尺寸(scroll dimensions)，提供了元素内容滚动距离的信息。有些元素，比如 `<html>` 无须任何代码就可以自动滚动，而其他元素则需要使用 `CSS` 的 `overflow` 属性令其滚动。

- `scrollHeight`，没有滚动条出现时，元素内容的总高度。
- `scrollLeft`，内容区左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置。 
- `scrollTop`，内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置。 
- `scrollWidth`，没有滚动条出现时，元素内容的总宽度。

`scrollWidth` 和 `scrollHeight` 可以用来确定给定元素内容的实际尺寸。例如，`<html>` 元素是浏览器中滚动视口的元素。因此，`document.documentElement.scrollHeight` 就是整个页面垂直方向的总高度。

`scrollWidth` 和 `scrollHeight` 与 `clientWidth` 和 `clientHeight` 之间的关系在不需要滚动的文档上是分不清的。如果文档尺寸超过视口尺寸，则在所有主流浏览器中这两对属性都不相等， `scrollWidth` 和 `scollHeight` 等于文档内容的宽度，而 `clientWidth` 和 `clientHeight` 等于视口的大小。

`scrollLeft` 和 `scrollTop` 属性可以用于确定当前元素滚动的位置，或者用于设置它们的滚动位置。元素在未滚动时，这两个属性都等于 `0`。如果元素在垂直方向上滚动，则 `scrollTop` 会大于 `0`， 表示元素顶部不可见区域的高度。如果元素在水平方向上滚动，则 `scrollLeft` 会大于 `0`，表示元素左侧不可见区域的宽度。因为这两个属性也是可写的，所以把它们都设置为 `0` 就可以重置元素的滚动位置。

#### 4. 确定元素尺寸
浏览器在每个元素上都暴露了 `getBoundingClientRect()` 方法，返回一个 `DOMRect` 对象，包含 6 个属性:`left`、`top`、`right`、`bottom`、`height` 和 `width`。这些属性给出了元素在页面中相对于视口的位置。

## 16.3 遍历
DOM2 Traversal and Range 模块定义了两个类型用于辅助顺序遍历 DOM 结构。这两个类型 —— `NodeIterator` 和 `TreeWalker` ——从某个起点开始执行对 DOM 结构的深度优先遍历。

DOM 遍历是对 DOM 结构的深度优先遍历，至少允许朝两个方向移动(取决于类型)。 遍历以给定节点为根，不能在 DOM 中向上超越这个根节点。

### 16.3.1 NodeIterator
`NodeIterator` 类型是两个类型中比较简单的，可以通过 `document.createNodeIterator()` 方法创建其实例。这个方法接收以下 4 个参数。

- `root`，作为遍历根节点的节点。
- `whatToShow`，数值代码，表示应该访问哪些节点。
- `filter`，`NodeFilter` 对象或函数，表示是否接收或跳过特定节点。
- `entityReferenceExpansion`，布尔值，表示是否扩展实体引用。这个参数在 HTML 文档中没有效果，因为实体引用永远不扩展。

`whatToShow` 参数是一个位掩码，通过应用一个或多个过滤器来指定访问哪些节点。这个参数对应的常量是在 `NodeFilter` 类型中定义的。

- `NodeFilter.SHOW_ALL`，所有节点。
- `NodeFilter.SHOW_ELEMENT`，元素节点。
- `NodeFilter.SHOW_ATTRIBUTE`，属性节点。由于 DOM 的结构，因此实际上用不上。
- `NodeFilter.SHOW_TEXT`，文本节点。
- `NodeFilter.SHOW_CDATA_SECTION`，CData 区块节点。不是在 HTML 页面中使用的。
- `NodeFilter.SHOW_ENTITY_REFERENCE`，实体引用节点。不是在 HTML 页面中使用的。
- `NodeFilter.SHOW_ENTITY`，实体节点。不是在 HTML 页面中使用的。
- `NodeFilter.SHOW_PROCESSING_INSTRUCTION`，处理指令节点。不是在 HTML 页面中使用的。  NodeFilter.SHOW_COMMENT，注释节点。
- `NodeFilter.SHOW_DOCUMENT`，文档节点。
- `NodeFilter.SHOW_DOCUMENT_TYPE`，文档类型节点。
- `NodeFilter.SHOW_DOCUMENT_FRAGMENT`，文档片段节点。不是在 HTML 页面中使用的。
- `NodeFilter.SHOW_NOTATION`，记号节点。不是在 HTML 页面中使用的。

这些值除了 `NodeFilter.SHOW_ALL` 之外，都可以组合使用。

```js
let whatToShow = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT;
```

`createNodeIterator()` 方法的 `filter` 参数可以用来指定自定义 `NodeFilter` 对象，或者一个 作为节点过滤器的函数。`NodeFilter` 对象只有一个方法 `acceptNode()`，如果给定节点应该访问就返 回 `NodeFilter`.`FILTER_ACCEPT`，否则返回 `NodeFilter.FILTER_SKIP`。因为 `NodeFilter` 是一个 抽象类型，所以不可能创建它的实例。只要创建一个包含 `acceptNode()` 的对象，然后把它传给 `createNodeIterator()` 就可以了。以下代码定义了只接收`<p>`元素的节点过滤器对象:

```js
let filter = {
  acceptNode(node) {
    return node.tagName.toLowerCase() == "p" ?
      NodeFilter.FILTER_ACCEPT :
      NodeFilter.FILTER_SKIP;
  } 
};
let iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT, filter, false);
```

`filter` 参数还可以是一个函数，与 `acceptNode()` 的形式一样

```js
let filter = function(node) {
  return node.tagName.toLowerCase() == "p" ?
    NodeFilter.FILTER_ACCEPT :
    NodeFilter.FILTER_SKIP;
};
let iterator = document.createNodeIterator(root, NodeFilter.SHOW_ELEMENT, filter, false);
```

通常，`JavaScript` 会使用这种形式，因为更简单也更像普通 `JavaScript` 代码。如果不需要指定过滤器，则可以给这个参数传入 `null`。

要创建一个简单的遍历所有节点的 `NodeIterator`，可以使用以下代码:

```js
let iterator = document.createNodeIterator(document, NodeFilter.SHOW_ALL, null, false);
```

`NodeIterator` 的两个主要方法是 `nextNode()` 和 `previousNode()`。`nextNode()` 方法在 DOM 子树中以深度优先方式进前一步，而 previousNode()则是在遍历中后退一步。创建 NodeIterator 对象的时候，会有一个内部指针指向根节点，因此第一次调用 nextNode()返回的是根节点。当遍历到 达 DOM 树最后一个节点时，nextNode()返回 null。previousNode()方法也是类似的。当遍历到达 DOM 树最后一个节点时，调用 previousNode()返回遍历的根节点后，再次调用也会返回 `null`。

### 16.3.2 TreeWalker
`TreeWalker` 是 `NodeIterator` 的高级版。除了包含同样的 `nextNode()`、`previousNode()` 方法， `TreeWalker` 还添加了如下在 `DOM` 结构中向不同方向遍历的方法。
- `parentNode()`，遍历到当前节点的父节点。
- `firstChild()`，遍历到当前节点的第一个子节点。
- `lastChild()`，遍历到当前节点的最后一个子节点。
- `nextSibling()`，遍历到当前节点的下一个同胞节点。
- `previousSibling()`，遍历到当前节点的上一个同胞节点。

`TreeWalker` 对象要调用 `document.createTreeWalker()` 方法来创建，这个方法接收与 `document.createNodeIterator()` 同样的参数:作为遍历起点的根节点、要查看的节点类型、节点 过滤器和一个表示是否扩展实体引用的布尔值。因为两者很类似，所以 `TreeWalker` 通常可以取代 `NodeIterator`。

不同的是，节点过滤器(`filter`)除了可以返回 `NodeFilter.FILTER_ACCEPT` 和 `NodeFilter`. `FILTER_SKIP`，还可以返回 `NodeFilter.FILTER_REJECT`。在使用 `NodeIterator` `时，NodeFilter`. `FILTER_SKIP` 和`NodeFilter.FILTER_REJECT` 是一样的。但在使用 `TreeWalker` 时，`NodeFilter.FILTER_SKIP` 表示跳过节点，访问子树中的下一个节点，而 `NodeFilter.FILTER_REJECT` 则表示跳过该节点以及该节点的整个子树。

`TreeWalker` 类型也有一个名为 `currentNode` 的属性，表示遍历过程中上一次返回的节点(无论使用的是哪个遍历方法)。可以通过修改这个属性来影响接下来遍历的起点。
```js
let node = walker.nextNode();
console.log(node === walker.currentNode); // true
walker.currentNode = document.body; // 修改起点
```

相比于 `NodeIterator`，`TreeWalker` 类型为遍历 DOM 提供了更大的灵活性。

## 16.4 范围
为了支持对页面更细致的控制，DOM2 Traversal and Range 模块定义了范围接口。范围可用于在文档中选择内容，而不用考虑节点之间的界限。(选择在后台发生，用户是看不到的。)范围在常规 DOM 操作的粒度不够时可以发挥作用。

DOM2 在 Document 类型上定义了一个 `createRange()` 方法，暴露在 `document` 对象上。使用这个方法可以创建一个 DOM 范围对象

与节点类似，这个新创建的范围对象是与创建它的文档关联的，不能在其他文档中使用。然后可以 使用这个范围在后台选择文档特定的部分。创建范围并指定它的位置之后，可以对范围的内容执行一些 操作，从而实现对底层 DOM 树更精细的控制。

每个范围都是 `Range` 类型的实例，拥有相应的属性和方法。

- `startContainer`，范围起点所在的节点(选区中第一个子节点的父节点)。
- `startOffset`，范围起点在 `startContainer` 中的偏移量。如果 `startContainer` 是文本节 点、注释节点或 CData 区块节点，则 `startOffset` 指范围起点之前跳过的字符数;否则，表示范围中第一个节点的索引。
- `endContainer`，范围终点所在的节点(选区中最后一个子节点的父节点)。
- `endOffset`，范围起点在 `startContainer` 中的偏移量(与 `startOffset` 中偏移量的含义相同)。
- `commonAncestorContainer`，文档中以 `startContainer` 和 `endContainer` 为后代的最深的节点。

### 16.4.2 简单选择
通过范围选择文档中某个部分最简单的方式，就是使用 `selectNode()` 或 `selectNodeContents()` 方法。这两个方法都接收一个节点作为参数，并将该节点的信息添加到调用它的范围。`selectNode()` 方法选择整个节点，包括其后代节点，而 `selectNodeContents()` 只选择节点的后代。

调用 `selectNode()` 时，`startContainer`、`endContainer` 和 `commonAncestorContainer` 都等于传入节点的父节点。

在调用 `selectNodeContents()` 时，`startContainer`、`endContainer` 和 `commonAncestorContainer `属性就是传入的节点。

在像上面这样选定节点或节点后代之后，还可以在范围上调用相应的方法，实现对范围中选区的更精细控制。

- `setStartBefore(refNode)`，把范围的起点设置到 `refNode` 之前，从而让 `refNode` 成为选区的第一个子节点。`startContainer` 属性被设置为 `refNode.parentNode`，而 `startOffset` 属性被设置为 `refNode` 在其父节点 `childNodes` 集合中的索引。
- `setStartAfter(refNode)`，把范围的起点设置到 `refNode` 之后，从而将 `refNode` 排除在选区之外，让其下一个同胞节点成为选区的第一个子节点。`startContainer` 属性被设置为 `refNode.parentNode`，`startOffset` 属性被设置为 `refNode` 在其父节点 `childNodes` 集合中的索引加 1。
- `setEndBefore(refNode)`，把范围的终点设置到 `refNode` 之前，从而将 `refNode` 排除在选区之外、让其上一个同胞节点成为选区的最后一个子节点。`endContainer` 属性被设置为 `refNode`. `parentNode`，`endOffset` 属性被设置为 `refNode` 在其父节点 `childNodes` 集合中的索引。
- `setEndAfter(refNode)`，把范围的终点设置到 `refNode` 之后，从而让 `refNode` 成为选区的 最后一个子节点。e`ndContainer` 属性被设置为 `refNode.parentNode`，`endOffset` 属性被设置为 `refNode` 在其父节点 `childNodes` 集合中的索引加 1。

调用这些方法时，所有属性都会自动重新赋值。不过，为了实现复杂的选区，也可以直接修改这些属性的值。

### 16.4.3 复杂选择
要创建复杂的范围，需要使用 `setStart()` 和 `setEnd()` 方法。这两个方法都接收两个参数: 参照节点和偏移量。对 `setStart()` 来说，参照节点会成为 `startContainer`，而偏移量会赋值给 `startOffset`。
对 setEnd()而言，参照节点会成为 `endContainer`，而偏移量会赋值给 `endOffset`。