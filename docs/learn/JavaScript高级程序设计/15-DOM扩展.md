# 15 DOM扩展
- 理解 Selectors API
- 使用 HTML5 DOM 扩展

尽管 DOM API 已经相当不错，但仍然不断有标准或专有的扩展出现，以支持更多功能。2008 年以前，大部分浏览器对 DOM 的扩展是专有的。此后，W3C 开始着手将这些已成为事实标准的专有扩展编制成正式规范。

基于以上背景，诞生了描述 DOM 扩展的两个标准:Selectors API 与 HTML5。这两个标准体现了社区需求和标准化某些手段及 API 的愿景。另外还有较小的 Element Traversal 规范，增加了一些 DOM 属性。 专有扩展虽然还有，但这两个规范(特别是 HTML5)已经涵盖其中大部分。本章也会讨论专有扩展。

## 15.1 Selectors API
JavaScript 库中最流行的一种能力就是根据 CSS 选择符的模式匹配 DOM 元素。比如，jQuery 就完全 以 CSS 选择符查询 DOM 获取元素引用，而不是使用 getElementById()和 getElementsByTagName()。

Selectors API(参见 W3C 网站上的 Selectors API Level 1)是 W3C 推荐标准，规定了浏览器原生支 持的 CSS 查询 API。支持这一特性的所有 JavaScript 库都会实现一个基本的 CSS 解析器，然后使用已有 的 DOM 方法搜索文档并匹配目标节点。虽然库开发者在不断改进其性能，但 JavaScript 代码能做到的 毕竟有限。通过浏览器原生支持这个 API，解析和遍历 DOM 树可以通过底层编译语言实现，性能也有 了数量级的提升。

Selectors API Level 1 的核心是两个方法:`querySelector()`和 `querySelectorAll()`。在兼容浏 览器中，Document 类型和 Element 类型的实例上都会暴露这两个方法。

Selectors API Level 2 规范在 Element 类型上新增了更多方法，比如 `matches()`、`find()`和 `findAll()`。不过，目前还没有浏览器实现或宣称实现 `find()` 和 `findAll()`。

### 15.1.1 querySelector()
`querySelector()` 方法接收 CSS 选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配项则返回 `null`。

在 Document 上使用 `querySelector()` 方法时，会从文档元素开始搜索;在 Element 上使用 `querySelector()` 方法时，则只会从当前元素的后代中查询。

用于查询模式的 CSS 选择符可繁可简，依需求而定。如果选择符有语法错误或碰到不支持的选择符， 则 `querySelector()` 方法会抛出错误。

### 15.1.2 querySelectorAll()
`querySelectorAll()`方法跟 `querySelector()`一样，也接收一个用于查询的参数，但它会返回所有匹配的节点，而不止一个。这个方法返回的是一个 `NodeList` 的静态实例。

`querySelectorAll()`返回的 `NodeList` 实例一个属性和方法都不缺，但它是一个静态的“快照”，而非“实时”的查询。这样的底层实现避免了使用 `NodeList` 对象可能造成的性 能问题。

以有效 CSS 选择符调用 `querySelectorAll()` 都会返回 `NodeList`，无论匹配多少个元素都可以。 如果没有匹配项，则返回空的 `NodeList` 实例。

与`querySelector()`一样，`querySelectorAll()`也可以在`Document`、`DocumentFragment`和 `Element` 类型上使用。

```js
// 取得 ID 为"myDiv"的<div>元素中的所有<em>元素
let ems = document.getElementById("myDiv").querySelectorAll("em");
// 取得所有类名中包含"selected"的元素
let selecteds = document.querySelectorAll(".selected");
// 取得所有是<p>元素子元素的<strong>元素
let strongs = document.querySelectorAll("p strong");
```

返回的 NodeList 对象可以通过 for-of 循环、item()方法或中括号语法取得个别元素。

```js
let strongElements = document.querySelectorAll("p strong");
// 以下 3 个循环的效果一样
for (let strong of strongElements) {
  strong.className = "important";
}
for (let i = 0; i < strongElements.length; ++i) {
  strongElements.item(i).className = "important";
}
for (let i = 0; i < strongElements.length; ++i) {
  strongElements[i].className = "important";
}
```

与 `querySelector()` 方法一样，如果选择符有语法错误或碰到不支持的选择符，则 `querySelector- All()` 方法会抛出错误。

### 15.1.3 matches()
`matches()`方法(在规范草案中称为 `matchesSelector()`)接收一个 CSS 选择符参数，如果元素 匹配则该选择符返回 `true`，否则返回 `false`。

```js
if (document.body.matches("body.page1")){
  // true
}
```

使用这个方法可以方便地检测某个元素会不会被 `querySelector()`或 `querySelectorAll()`方法返回。所有主流浏览器都支持 `matches()`。

## 15.2 元素遍历
IE9 之前的版本不会把元素间的空格当成空白节点，而其他浏览器则会。这样就导致了 `childNodes` 和 `firstChild` 等属性上的差异。为了弥补这个差异，同时不影响 DOM 规范，W3C 通过新的 Element Traversal 规范定义了一组新属性。

Element Traversal API 为 DOM 元素添加了 5 个属性:

- childElementCount，返回子元素数量(不包含文本节点和注释);
- firstElementChild，指向第一个 Element 类型的子元素(Element 版 firstChild);
- lastElementChild，指向最后一个 Element 类型的子元素(Element 版 lastChild); 
- previousElementSibling，指向前一个 Element 类型的同胞元素 (Element 版 previousSibling);
- nextElementSibling，指向后一个 Element 类型的同胞元素(Element 版 nextSibling)。

## 15.3 HTML 5
HTML5 代表着与以前的 HTML 截然不同的方向。在所有以前的 HTML 规范中，从未出现过描述 JavaScript 接口的情形，HTML 就是一个纯标记语言。JavaScript 绑定的事，一概交给 DOM 规范去定义。

然而，HTML5 规范却包含了与标记相关的大量 JavaScript API 定义。其中有的 API 与 DOM 重合， 定义了浏览器应该提供的 DOM 扩展。

:::tip
因为 HTML5 覆盖的范围极其广泛，所以本节主要讨论其影响所有 DOM 节点的部分。HTML5 的其他部分将在本书后面的相关章节中再讨论。
:::

### 15.3.1 CSS 类扩展
自 HTML4 被广泛采用以来，Web 开发中一个主要的变化是 class 属性用得越来越多，其用处是为元素添加样式以及语义信息。自然地，JavaScript 与 CSS 类的交互就增多了，包括动态修改类名，以及根据给定的一个或一组类名查询元素，等等。为了适应开发者和他们对 class 属性的认可，HTML5 增加了一些特性以方便使用 CSS 类。

1. getElementsByClassName()
  
`getElementsByClassName()`是 HTML5 新增的最受欢迎的一个方法，暴露在 document 对象和所有 HTML 元素上。 这个方法脱胎于基于原有 DOM 特性实现该功能的 JavaScript 库，提供了性能高好的原生实现。

`getElementsByClassName()`方法接收一个参数，即包含一个或多个类名的字符串，返回类名中包含相应类的元素的 `NodeList`。如果提供了多个类名，则顺序无关紧要。

这个方法只会返回以调用它的对象为根元素的子树中所有匹配的元素。在 document 上调用 getElementsByClassName()返回文档中所有匹配的元素，而在特定元素上调用 getElementsByClassName()则返回该元素后代中匹配的元素。

如果要给包含特定类(而不是特定 ID 或标签)的元素添加事件处理程序，使用这个方法会很方便。 不过要记住，因为返回值是 NodeList，所以使用这个方法会遇到跟使用 getElementsByTagName()和其他返回 NodeList 对象的 DOM 方法同样的问题。

::: tip
与 `querySelectorAll()` 的一个区别是， `getElementsByClassName()` 在html内容改变时，已经获得的值会自动发生变化。而 `querySelectorAll()` 是一个静态的“快照”，而非“实时”的查询。
:::

2. classList 属性

要操作类名，可以通过 `className` 属性实现添加、删除和替换。但 `className` 是一个字符串， 所以每次操作之后都需要重新设置这个值才能生效，即使只改动了部分字符串也一样。

HTML5 通过给所有元素增加 `classList` 属性为这些操作提供了更简单也更安全的实现方式。 `classList` 是一个新的集合类型 DOMTokenList 的实例。与其他 DOM 集合类型一样，DOMTokenList 也有 length 属性表示自己包含多少项，也可以通过 item() 或中括号取得个别的元素。此外，DOMTokenList 还增加了以下方法。

- add(value)，向类名列表中添加指定的字符串值 value。如果这个值已经存在，则什么也不做。 
- contains(value)，返回布尔值，表示给定的 value 是否存在。
- remove(value)，从类名列表中删除指定的字符串值 value。
- toggle(value)，如果类名列表中已经存在指定的 value，则删除;如果不存在，则添加。

添加了 `classList` 属性之后，除非是完全删除或完全重写元素的 `class` 属性，否则 `className` 属性就用不到了。

### 15.3.2 焦点管理

HTML5 增加了辅助 DOM 焦点管理的功能。首先是 `document.activeElement`，始终包含当前拥有焦点的 DOM 元素。页面加载时，可以通过用户输入(按 Tab 键或代码中使用 `focus()`方法)让某个元素自动获得焦点。


默认情况下，`document.activeElement` 在页面刚加载完之后会设置为 `document.body`。而在 页面完全加载之前，`document.activeElement` 的值为 `null`。

其次是 `document.hasFocus()` 方法，该方法返回布尔值，表示文档是否拥有焦点。

第一个方法可以用来查询文档，确定哪个元素拥有焦点，第二个方法可以查询文档是否获得了焦点， 而这对于保证 Web 应用程序的无障碍使用是非常重要的。

### 15.3.3 HTMLDocument扩展
HTML5 扩展了 HTMLDocument 类型，增加了更多功能。与其他 HTML5 定义的 DOM 扩展一样，这些变化同样基于所有浏览器事实上都已经支持的专有扩展。为此，即使这些扩展的标准化相对较晚，很多浏览器也早就实现了相应的功能。

1. readyState 属性

document.readyState 属性有三个可能的值:

- loading，表示文档正在加载;
- complete，表示文档加载完成。
- interactive 文档已被解析，"正在加载"状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载。

2. compatMode 属性

指示浏览器当前处于什么渲染模式。

标准模式下 document.compatMode 的值是"CSS1Compat"，而在混杂模式下， document.compatMode 的值是"BackCompat"

3. head 属性

指向文档的`<head>`元素。

### 15.3.4 字符集属性

HTML5 增加了几个与文档字符集有关的新属性。其中，`characterSet` 属性表示文档实际使用的字符集，也可以用来指定新字符集。这个属性的默认值是"UTF-16"，但可以通过`<meta>`元素或响应头，以及新增的 `characterSet` 属性来修改。

::: tip
MDN 上是 只读属性返回当前文档的字符编码。实际试试也是只读，并且默认值不确定。
:::

### 15.3.5 自定义数据属性
HTML5 允许给元素指定非标准的属性，但要使用前缀 `data-` 以便告诉浏览器，这些属性既不包含与渲染有关的信息，也不包含元素的语义信息。除了前缀，自定义属性对命名是没有限制的，`data-` 后面跟什么都可以。

定义了自定义数据属性后，可以通过元素的 `dataset` 属性来访问。`dataset` 属性是一个 `DOMStringMap` 的实例，包含一组键/值对映射。元素的每个 `data-name` 属性在 `dataset` 中都可以通过 `data-` 后面的字符串作为键来访问。

### 15.3.6 插入标记
DOM 虽然已经为操纵节点提供了很多 API，但向文档中一次性插入大量 HTML 时还是比较麻烦。 相比先创建一堆节点，再把它们以正确的顺序连接起来，直接插入一个 HTML 字符串要简单(快速) 得多。HTML5 已经通过以下 DOM 扩展将这种能力标准化了。

1. innerHTML 属性

在读取 innerHTML 属性时，会返回元素所有后代的 HTML 字符串，包括元素、注释和文本节点。 而在写入 innerHTML 时，则会根据提供的字符串值以新的 DOM 子树替代元素中原来包含的所有节点。

在写入模式下，赋给 innerHTML 属性的值会被解析为 DOM 子树，并替代元素之前的所有节点。 因为所赋的值默认为 HTML，所以其中的所有标签都会以浏览器处理 HTML 的方式转换为元素

2. 旧 IE 中的 innerHTML

在所有现代浏览器中，通过 innerHTML 插入的`<script>`标签是不会执行的。而在 IE8 及之前的版 本中，只要这样插入的`<script>`元素指定了 defer 属性，且`<script>`之前是“受控元素”(scoped element)，那就是可以执行的。`<script>`元素与`<style>`或注释一样，都是“非受控元素”(NoScope element)，也就是在页面上看不到它们。IE 会把 innerHTML 中从非受控元素开始的内容都删掉，

3. outerHTML 属性

读取 `outerHTML` 属性时，会返回调用它的元素(及所有后代元素)的 HTML 字符串。在写入 `outerHTML` 属性时，调用它的元素会被传入的 HTML 字符串经解释之后生成的 DOM 子树取代。

4. insertAdjacentHTML()与 insertAdjacentText()

关于插入标签的最后两个新增方法是 `insertAdjacentHTML()` 和 `insertAdjacentText()`。这两 个方法最早源自 IE，它们都接收两个参数:要插入标记的位置和要插入的 HTML 或文本。

第一个参数必须是下列值中的一个:

- "beforebegin"，插入当前元素前面，作为前一个同胞节点;
- "afterbegin"，插入当前元素内部，作为新的子节点或放在第一个子节点前面;
- "beforeend"，插入当前元素内部，作为新的子节点或放在最后一个子节点后面;
- "afterend"，插入当前元素后面，作为下一个同胞节点。

注意这几个值是不区分大小写的。第二个参数会作为 HTML 字符串解析(与 `innerHTML` 和 `outerHTML` 相同)或者作为纯文本解析(与 `innerText` 和 `outerText` 相同)。如果是 HTML，则会在解析出错时抛出错误。

5. 内存与性能问题

使用本节介绍的方法替换子节点可能在浏览器(特别是 IE)中导致内存问题。比如，如果被移除的子树元素中之前有关联的事件处理程序或其他 `JavaScript` 对象(作为元素的属性)，那它们之间的绑定关系会滞留在内存中。如果这种替换操作频繁发生，页面的内存占用就会持续攀升。在使用 `innerHTML`、 `outerHTML` 和 `insertAdjacentHTML()`之前，最好手动删除要被替换的元素上关联的事件处理程序和 `JavaScript` 对象。

使用这些属性当然有其方便之处，特别是 `innerHTML`。一般来讲，插入大量的新 `HTML` 使用 `innerHTML` 比使用多次 DOM 操作创建节点再插入来得更便捷。这是因为 HTML 解析器会解析设置给 `innerHTML`(或 `outerHTML`)的值。解析器在浏览器中是底层代码(通常是 C++代码)，比 `JavaScript` 快得多。不过，`HTML` 解析器的构建与解构也不是没有代价，因此最好限制使用 `innerHTML` 和 `outerHTML` 的次数。

6. 跨站点脚本

尽管 `innerHTML` 不会执行自己创建的`<script>`标签，但仍然向恶意用户暴露了很大的攻击面，因 为通过它可以毫不费力地创建元素并执行 `onclick` 之类的属性。

如果页面中要使用用户提供的信息，则不建议使用 `innerHTML`。与使用 `innerHTML` 获得的方便相比，防止 XSS 攻击更让人头疼。

此时一定要隔离要插入的数据，在插入页面前必须毫不犹豫地使用相关的库对它们进行转义。

### 15.3.7 scrollIntoView()
DOM 规范中没有涉及的一个问题是如何滚动页面中的某个区域。为填充这方面的缺失，不同浏览器实现了不同的控制滚动的方式。在所有这些专有方法中，HTML5 选择了标准化 `scrollIntoView()`。

`scrollIntoView()`方法存在于所有 HTML 元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。这个方法的参数如下:

- alignToTop 是一个布尔值。
  - true:窗口滚动后元素的顶部与视口顶部对齐。
  - false:窗口滚动后元素的底部与视口底部对齐。
- scrollIntoViewOptions 是一个选项对象。
  - behavior:定义过渡动画，可取的值为"smooth"和"auto"，默认为"auto"。
  - block:定义垂直方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为 "start"。
  - inline:定义水平方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为 "nearest"。
- 不传参数等同于 alignToTop 为 true。

这个方法可以用来在页面上发生某个事件时引起用户关注。把焦点设置到一个元素上也会导致浏览器将元素滚动到可见位置。

## 15.4 专有扩展
尽管所有浏览器厂商都理解遵循标准的重要性，但它们也都有为弥补功能缺失而为 DOM 添加专有扩展的历史。虽然这表面上看是一件坏事，但专有扩展也为开发者提供了很多重要功能，而这些功能后来则有可能被标准化，比如进入 HTML5。

除了已经标准化的，各家浏览器还有很多未被标准化的专有扩展。这并不意味着它们将来不会被纳入标准，只不过在本书编写时，它们还只是由部分浏览器专有和采用。

### 15.4.1 children 属性
IE9 之前的版本与其他浏览器在处理空白文本节点上的差异导致了 children 属性的出现。children 属性是一个 HTMLCollection，只包含元素的 Element 类型的子节点。如果元素的子节点类型全部是元素类型，那 children 和 childNodes 中包含的节点应该是一样的。

```js
let childCount = element.children.length;
let firstChild = element.children[0];
```

### 15.4.2 contains() 方法
DOM 编程中经常需要确定一个元素是不是另一个元素的后代。IE 首先引入了 `contains()` 方法，让开发者可以在不遍历 DOM 的情况下获取这个信息。 `contains()` 方法应该在要搜索的祖先元素上调用，参数是待确定的目标节点。

如果目标节点是被搜索节点的后代，`contains()` 返回 `true`，否则返回 `false`。

```js
console.log(document.documentElement.contains(document.body)); // true
```

另外，使用 DOM Level 3 的 `compareDocumentPosition()` 方法也可以确定节点间的关系。

### 15.4.3 插入标记
HTML5 将 IE 发明的 `innerHTML` 和 `outerHTML` 纳入了标准，但还有两个属性没有入选。这两个剩下的属性是 `innerText` 和 `outerText`。

1. innerText 属性

`innerText` 属性对应元素中包含的所有文本内容，无论文本在子树中哪个层级。在用于读取值时，`innerText` 会按照深度优先的顺序将子树中所有文本节点的值拼接起来。在用于写入值时，`innerText` 会移除元素的所有后代并插入一个包含该值的文本节点。

注意不同浏览器对待空格的方式不同，因此格式化之后的字符串可能包含也可能不包含原始 HTML 代码中的缩进。

设置 `innerText` 会移除元素之前所有的后代节点，完全改变 DOM 子树。此外，设置 innerText 也会编码出现在字符串中的 HTML 语法字符(小于号、大于号、引号及和号)。

因为设置 `innerText` 只能在容器元素中生成一个文本节点，所以为了保证一定是文本节点，就必 须进行 HTML 编码。innerText 属性可以用于去除 HTML 标签。通过将 `innerText` 设置为等于 `innerText`，可以去除所有 HTML 标签而只剩文本。

::: tip
Firefox45(2016年3月发布)以前的版本中只支持`textContent`属性，与`innerText` 的区别是返回的文本中也会返回行内样式或脚本代码。`innerText` 目前已经得到所有浏览器支持，应该作为取得和设置文本内容的首选方法使用。
:::

2. outerText 属性

`outerText` 与 `innerText` 是类似的，只不过作用范围包含调用它的节点。要读取文本值时，`outerText` 与 `innerText` 实际上会返回同样的内容。但在写入文本值时，`outerText` 就大不相同了。 写入文本值时，`outerText` 不止会移除所有后代节点，而是会替换整个元素。

本质上，这相当于用新的文本节点替代 `outerText` 所在的元素。此时，原来的元素会与文档脱离关系，因此也无法访问。

`outerText` 是一个非标准的属性，而且也没有被标准化的前景。因此，不推荐依赖这个属性实现重要的操作。除 Firefox 之外所有主流浏览器都支持 `outerText`。

### 15.4.4 滚动
滚动是 HTML5 之前 DOM 标准没有涉及的领域。虽然 HTML5 把 `scrollIntoView()` 标准化了，但不同浏览器中仍然有其他专有方法。比如，`scrollIntoViewIfNeeded()` 作为 HTMLElement 类型的扩展可以在所有元素上调用。`scrollIntoViewIfNeeded(alingCenter)` 会在元素不可见的情况下，将其滚动到窗口或包含窗口中，使其可见;如果已经在视口中可见，则这个方法什么也不做。如果将可选的参数 `alingCenter` 设置为 true，则浏览器会尝试将其放在视口中央。Safari、 Chrome 和 Opera 实现了这个方法。

考虑到 `scrollIntoView()` 是唯一一个所有浏览器都支持的方法，所以只用它就可以了。

## 15.5 小结
虽然 DOM 规定了与 XML 和 HTML 文档交互的核心 API，但其他几个规范也定义了对 DOM 的扩展。很多扩展都基于之前的已成为事实标准的专有特性标准化而来。本章主要介绍了以下 3 个规范。

- Selectors API 为基于 CSS 选择符获取 DOM 元素定义了几个方法:`querySelector()`、 `querySelectorAll()` 和 `matches()`。
- Element Traversal 在 DOM 元素上定义了额外的属性，以方便对 DOM 元素进行遍历。这个需求是因浏览器处理元素间空格的差异而产生的。
- HTML5 为标准 DOM 提供了大量扩展。其中包括对 `innerHTML` 属性等事实标准进行了标准化， 还有焦点管理、字符集、滚动等特性。

DOM 扩展的数量总体还不大，但随着 Web 技术的发展一定会越来越多。浏览器仍然没有停止对专有扩展的探索，如果出现成功的扩展，那么就可能成为事实标准，或者最终被整合到未来的标准中。

