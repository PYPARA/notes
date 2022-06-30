# 聊聊CSS中的层叠相关概念

转载自：<https://zhuanlan.zhihu.com/p/41516699>  @大漠

## 最近在纠结程序语言和设计语言中的一些概念，整到层叠上下文和图层相关的事情，然后发现自己对于CSS中的层叠相关的知识并没有自己想象中那样理解的透彻。因此花了一段时间重新梳理了一下相关的知识。

如果想要理解清楚CSS中的层叠相关的知识点，我们就很有必要先了解一些重要的概念：

- 文档流（Normal Flow）
- 格式化上下文（Formatting Context）
- 层叠上下文（Stacking Context）
- 层叠水平（Stacking Level）
- 层叠顺序（Stacking Order）

## 文档流

在CSS中，**文档流**是一个很基础也是很重要的一个概念。很多时候她被称为Document Flow，但在CSS的标准被称为Normal Flow，即**普通流**或**常规流**。大家更喜欢称之为**文档流**。那么CSS的文档流是怎么一回事呢？

在HTML中任何一个元素其实就是一个**对象**，也是一个盒子。在默认情况下它是按照出现的先后顺序来排列，而这个排列的顺序就是文档流。

文档流是元素在Web页面上的一种呈现方式。所有的HTML元素都是块盒子（Block Boxes，块级元素）或行内框（Inline Boxes，行内元素）。当浏览器开始渲染HTML文档时，它从窗口的顶端开始，经过整个文档内容的过程中，分配元素需要的空间。除非文档的尺寸被CSS规则限定，否则浏览器垂直扩展文档来容纳全部的内容。每个新的块级元素渲染为新行。行内元素则按照顺序被水平渲染直到当前行遇到边界，然后换到下一行垂直渲染。

如果你读过CSS相关的规范，不难发现这样的过程包括了块格式化([BFC：Block formatting context](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/visuren.html%23block-formatting))、行内格式化（[IFC：Inline formatting context](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/visuren.html%23inline-formatting)）、相对定位（[Relative positioning](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/visuren.html%23relative-positioning)）和[Run-in Boxes的定位](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/visuren.html%23run-in)。

事实上，在普通文档流中的盒子属于一种[格式化上下文](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/css-display-3/%23formatting-context)（Formatting Context）,大家较为熟悉的就是[块格式化上下文](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/visuren.html%23block-formatting)（Block formatting context）和[行内格式化上下文](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/visuren.html%23inline-formatting)（Inline formatting context）。不过有一点面要注意，它们只能是其中一者，但不能同时属于两者。言外之意，任何被渲染的HTML元素都是一个盒子（Box），这些盒子不是块盒子就是行内盒子。即使是未被任何元素包裹的文本，根据不同的情况，也会属于匿名的块盒子或行内盒子。

综合上面的描述，也可以理解格式化上下文对元素盒子做了一定的范围的限制，其实就是类似有一个`width`和`height`做了限制一样。如果从这方面来理解的话，普通流就是这样的一个过程：

- 在对应的块格式化上下文中，块级元素按照其在HTML源码中出现的顺序，在其容器盒子里从左上角开始，从上到下垂直地依次分配空间层叠（Stack），并且独占一行，边界紧贴父盒子边缘。两相邻元素间的距离由`margin`属性决定，在同一个块格式化上下文中的垂直边界将被[重叠（Collapse margins）](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/box.html%23collapsing-margins)。除非创建一个新的块格式化上下文，否则块级元素的宽度不受浮动元素的影响。
- 在对应的行内格式化上下文中，行内元素从容器的顶端开始，一个接一个地水平排列。

扯了这么多，如果简单的描述就是：**如何排列HTML元素而已**。拿个块格式化上下文的普通文档流来举例，就像下面这样：

```html
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
```

对应的效果如下：



![img](https://pic3.zhimg.com/80/v2-6af5e6aae0505b0068b9ffd7cdd6249e_hd.jpg)



上例中看到的文档流就是一个普通的文档流，也是一个正常的普通文档流。

在CSS中也可以通过`float`或者`position:absolute`两种方法让元素脱离文档流。而这两者的表现实际上非常相似。简单的可以理解为**部分无视和完全无视的区别**：

> 使用`float`脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在周围(可以说是部分无视)。而对于使用`position:absolute`脱离文档流的元素，其他盒子与其他盒子内的文本都会无视它(可以说是完全无视)。

## 格式化上下文

在介绍文档流的一节中，多次提到了格式化上下文这个概念。那么格式化上下文指的又是什么呢？

> 格式化上下文指的是初始元素定义的环境。

其主要包含两个要点，一个是**元素定义的环境**，另一个是**初始化**。

在CSS中，元素定义的环境有两种，也就是前面提到：块格式化上下文和行内格式化上下文。这两种上下文定义了在CSS中元素所处的环境，格式化则表明了在这个环境中，元素处理此环境中应当被初始化。用一句话来描述就是：

> **元素在此环境中应当如何排版布局等**。

块格式化上下文其实也是大家常常称为的**BFC**，指的是Web页面的可视化CSS渲染的一部分，是布局过程中生成块级盒子的区域，也是浮动元素与其他元素的交互限定区域。

下列方式会创建块格式化上下文：

- 根元素或包含根元素的元素
- 浮动元素（元素的 `float` 不是 `none`）
- 绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 `display` 为 `inline-block`）
- 表格单元格（元素的 `display`为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 `display` 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 `display`为 `table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`（分别是HTML `table`、`row`、`tbody`、`thead`、`tfoot`的默认属性）或 `inline-table`）
- `overflow` 值不为 `visible` 的块元素
- `display` 值为 `flow-root` 的元素
- `contain` 值为 `layout`、`content`或 `strict` 的元素
- 弹性元素（`display`为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（`display`为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 `column-count` 或 `column-width` 不为 `auto`，包括 `column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

创建了块格式化上下文的元素中的所有内容都会被包含到该BFC中。

BFC是一个比较抽象的概念。如果要彻底的讲述清楚，那么可以用几篇的篇幅来阐述，如果你想深纠的话，建议你花一些时间阅读以下这些文章：

- [BFC相关教程 @w3cplus](http://link.zhihu.com/?target=https%3A//www.w3cplus.com/blog/tags/389.html)
- [Understanding Block Formatting Contexts in CSS](http://link.zhihu.com/?target=https%3A//www.sitepoint.com/understanding-block-formatting-contexts-in-css/)
- [关于CSS-BFC深入理解](http://link.zhihu.com/?target=https%3A//juejin.im/post/5909db2fda2f60005d2093db)
- [CSS：BFC 最熟悉的陌生人](http://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000011211625)
- [CSS之BFC详解](http://link.zhihu.com/?target=https%3A//www.html-js.com/article/1866)
- [CSS: The block formatting context](http://link.zhihu.com/?target=https%3A//maxdesign.com.au/jobs/sample-block-formatting-context/index.htm)
- [Block Formatting Contexts](http://link.zhihu.com/?target=https%3A//www.cssmojo.com/block-formatting-contexts/)
- [CSS 盒模型、解决方案、BFC 原理讲解](http://link.zhihu.com/?target=https%3A//www.lovebxm.com/2017/08/27/css-box/)
- [CSS深入理解流体特性和BFC特性下多栏自适应布局](http://link.zhihu.com/?target=https%3A//www.zhangxinxu.com/wordpress/%3Fp%3D4588)
- [关于对CSS中BFC的理解](http://link.zhihu.com/?target=https%3A//www.thinktxt.com/web-front/2017/02/18/css-bfc-layout-model.html)

相对于块格式化上下文，在行内格式化上下文中，盒子( Boxes )一个接一个地水平排列，起点是包含块的顶部。 水平方向上的 `margin`，`border` 和 `padding` 在盒子之间得到保留。 盒子在垂直方向上可以以不同的方式对齐：它们的顶部或底部对齐，或根据其中文字的基线对齐。 包含那些框的长方形区域，会形成一行，叫做行框。

> 在CSS中，对于行框这样的东东涉及的页就更多了。这里不做过多的阐述。感兴趣的同学，自己可以阅读相关规范深究。

## 三维空间

平时我们从设备终端看到的HTML文档都是一个平面的，事实上HTML文档中的元素却是存在于三个维度中。除了大家熟悉的平面画布中的`x`轴和`y`轴，还有控制第三维度的`z`轴。



![img](https://pic2.zhimg.com/80/v2-d0edcdfc7eee4b850c22d2691c8784b1_hd.jpg)



其中`x`轴通常用来表示水平位置，`y`轴来表示垂直位置，`z`轴表示屏幕内外方向上的位置。



![img](https://pic2.zhimg.com/80/v2-20144bbd75ba793f0e68ba3857f3e1c9_hd.jpg)



对于`x`和`y`轴我们很易于理解，一个向右，一个向下。但对于`z`轴，理解起来就较为费力。在CSS中要确定沿着`z`轴排列元素，表示的是用户与屏幕的这条看不见的垂直线：



![img](https://pic3.zhimg.com/80/v2-aae8bc3f7cd6b7408da5bb29a2f8bdc2_hd.jpg)



从正常流的一节中我们可以知道，如果元素不脱离文档流，或者不通过其他CSS的规则来改变初始化的格式化上下文环境，元素盒子是不可能会有层叠在一起的。但我们使用`float`或`position:absolute`时可以让元素脱离文档流。那么问题来了：

- 当一个设置了`z-index`值的定位元素与常规文档流中的元素相互重叠的时候，谁会被置于上方？
- 当定位元素与浮动元素相互重叠的时候，谁会被置于上方？
- 当定位元素被嵌套在其他定位元素中时会发生什么？

要回答这些问题，我们需要进一步地理解`z-index`是如何工作的，尤其是层叠上下文，以及层叠次序这些概念。

## 层叠上下文

上一节提到过，网页及其每个元素都有一个坐标系统。该系统包括一个三维`z`轴，其中的元素是**层叠（Stacked）**的。`z`轴的方向指向查看者，`x`轴指向屏幕的右边，`y`轴指向屏幕的底部。



![img](https://pic4.zhimg.com/80/v2-46bea3ba07b65adfd97d1569b90037ef_hd.jpg)



通常，浏览器会按照CSS规范中指定的特定顺序放置元素：

> 在DOM树中最先出现的元素被放在首位，之后出现的元素被放在前面的元素之上。但它并不总是那么简单。只有当页面上的所有元素是自然流才起作用。也就是说，当没有元素在流中的位置被改变或者已经脱离文档流，才起作用。

CSS中有两种方式影响元素的流和位置的方法：

- 使用`position`属性定位元素。除了默认的`static`值外的元素被称为定位元素
- 通过使用`float`属性浮动元素来改变元素的流

事实上，每个HTML元素都属于一个层叠上下文。给定层叠上下文中的每个定位元素都具有一个整数的层叠层级，具有更大堆栈级别的元素盒子总是在具有较低堆栈级别的盒子的前面（上面）。盒子可能具有负层叠级别。层叠上下文中具有相同堆栈级别的框根据文档树出现的顺序层叠在一起。

文档中的层叠上下文由满足以下任意一个条件的元素形成：

- 根元素 (HTML)
- `z-index` 值不为 `auto` 的 绝对/相对定位
- `position` 值为 `fixed`或`sticky`
- 一个 `z-index` 值不为 `auto` 的 Flex 项目 (Flex item)，即：父元素 `display: flex|inline-flex`
- `opacity` 属性值小于 `1` 的元素
- `transform` 属性值不为 `none`的元素
- `mix-blend-mode` 属性值不为 `normal` 的元素
- `filter`、`perspective`、`clip-path`、`mask`、`mask-image`、`mask-border`、`motion-path`值不为 `none` 的元素
- `perspective` 值不为 `none` 的元素
- `isolation` 属性被设置为 `isolate` 的元素
- 在 `will-change` 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值
- `-webkit-overflow-scrolling` 属性被设置 `touch`的元素

而且每个网页都有一个默认的层叠上下文。这个层叠上下文的根源就是`html`元素。`html`元素中的一切都被置于这个默认的层叠上下文的一个层叠层上。理解起来有点怪。那么先来看一个图：



![img](https://pic1.zhimg.com/80/v2-6975667b2985910c68bed42cb3bb9ba8_hd.jpg)



层叠上下文1 (Stacking Context 1)是由文档根元素形成的。 层叠上下文2和3 (Stacking Context 2, 3) 都是层叠上下文1 (Stacking Context 1) 上的层叠层。 他们各自也都形成了新的层叠上下文，其中包含着新的层叠层。

这样是不是有点理解，如果没有，也不要紧，先把这个概念放下，先来理解另外两个概念：**层叠水平**和**层叠顺序**。

## 叠层水平

@张鑫旭 老湿在《[深入理解CSS中的层叠上下文和层叠顺序](http://link.zhihu.com/?target=https%3A//www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)》一文中把叠层水平描述的非常表象又易于理解。我就直接做为搬运工，把这部分内容搬过来占为己用了。

层叠水平（Stacking Level）决定了同一个层叠上下文中元素在`z`轴上的显示顺序。`Level`这个词很容易让我们联想到我们真正世界中的三六九等、论资排辈。在真实世界中，每个人都是独立的个体，包括双胞胎，有差异就有区分。例如，又胞胎虽然长得很像，但实际上，出生的时间还是有先后顺序的，先出生的那个就大（大哥或大姐）。网页中的元素也是如此，页面中的每个元素都是独立的个体，他们一定是会有一个类似排名排序的情况存在。而这个排名排序、论资排辈就是我们这里所说的**层叠水平**。层叠上下文元素的层叠水平可以理解为官员的职级，一品两品，县长省长之类；对于普通元素，这个嘛...你自己随意理解。

于是，显而易见，所有的元素都有层叠水平，包括层叠上下文元素，层叠上下文元素的层叠水平可以理解为官员的职级，一品两品，县长省长之类。然后，对于普通元素的层叠水平，我们的探讨仅仅局限在当前层叠上下文元素中。为什么呢？因为否则没有意义。

这么理解吧~ 上面提过元素具有层叠上下文好比当官，大家都知道的，这当官的家里都有丫鬟啊保镖啊管家啊什么的。所谓打狗看主人，A官员家里的管家和B官员家里的管家做PK实际上是没有意义的，因为他们牛不牛逼完全由他们的主子决定的。一人得道鸡犬升天，你说这和珅家里的管家和七侠镇娄知县县令家里的管家有可比性吗？李总理的秘书是不是分分钟灭了你村支部书记的秘书（如果有）。

翻译成术语就是：

> 普通元素的层叠水平优先由层叠上下文决定，因此，层叠水平的比较只有在当前层叠上下文元素中才有意义。

需要注意的是，诸位千万不要把**层叠水平和CSS的z-index属性混为一谈**。没错，某些情况下`z-index`确实可以影响层叠水平，但是，只限于定位元素以及Flex盒子的孩子元素；而层叠水平所有的元素都存在。

## 层叠顺序

在HTML文档中，默认情况之下有一个自然层叠顺序（Natural Stacing Order），即元素在`z`轴上的顺序。它是由许多因素决定的。比如下面这个列表，它显示了元素盒子放入层叠顺序上下文的顺序，从层叠的底部开始，共有七种层叠等级：

- **背景和边框**：形成层叠上下文的元素的背景和边框。 层叠上下文中的最低等级。
- **负z-index值**：层叠上下文内有着负z-index值的子元素。
- **块级盒**：文档流中非行内非定位子元素。
- **浮动盒**：非定位浮动元素。
- **行内盒**：文档流中行内级别非定位子元素。
- **z-index: 0**：定位元素。 这些元素形成了新的层叠上下文。
- **正z-index值**：定位元素。 层叠上下文中的最高等级。



![img](https://pic4.zhimg.com/80/v2-8b87d14d2d96401d33f01e49479109a3_hd.jpg)



这七个层叠等级构成了层叠次序的规则。 在层叠等级七上的元素会比在等级一至六上的元素显示地更上方（更靠近观察者）。 可以结合w3help中的一张图来帮助我们更好的理解这七个层叠等级：



![img](https://pic1.zhimg.com/80/v2-52469579956b97b6b7ac6894e1ab4e28_hd.jpg)



其实对于层叠顺序规则还是较为复杂的。

当页面包含浮动元素、绝对定位的元素、固定定位的元素或相对定位的元素（元素从正常位置偏移一定量）以及内联元素时，浏览器会以不同的方式显示它们（放置它们）。元素从最靠近查看者的地方排列到最远的地方，如下所示：

- 定位元素按源代码中的外观顺序排列。源代码中的最新内容最接近查看者
- 内联元素（比如文本和图像）是流入和非定位（它们的位置是静态的）
- 非浮动元素按照源代码中外观的顺序排列
- 非定位和非浮动块级元素
- 根元素`html`是全局层叠上下文的根，包含页面上的所有元素

这就是浏览器在呈现页面上的元素时应用的默认层叠顺序。



![img](https://pic4.zhimg.com/80/v2-7225a0d2da491733d8c9dfa1d181e363_hd.jpg)



如果你想要更改定位元素在`z`轴上的渲染顺序，可以使用`z-index`属性。例如，你有两个绝对定位的元素，它们在某个点上重叠，并且你希望其中一个元素显示在另一个元素的前面，即使它在源代码中出现在它之前，你也可以使用`z-index`属性来实现这一点。

此时需要注意的第一件重要的事情是，`z-index`属性只适用于定位元素。所以，即使为元素提供`z-index`的值将其置于其他元素之前，`z-index`也不会对元素产生影响，除非它被定位；也就是说，除非它具有除`static`之外的`position`值。

因此，如果所有定位的元素具有`z-index`的索引值，则将元素从最靠近查看者排列到最远的位置，如下所示：

- 具有正值的`z-index`的定位元素。较高的值更接近屏幕。然后，按照它们出现在源代码中的顺序排列
- 定位元素的`z-index:0`或`z-index: auto;`
- 内联元素（如文本和图像）是流中的和非定位的（它们的位置是静态的）
- 源代码中出现顺序的非定位浮动元素
- 非定位和非浮动块级元素
- 具有负值的`z-index`的定位元素。较低的`z-index`索引值更近。然后按照它们在源代码中出现的顺序
- 根元素`html`是全局层叠上下文的根，包含页面上的所有元素



![img](https://pic4.zhimg.com/80/v2-c56387120ab9905bba2caa4e65e2407f_hd.jpg)



当我们在定位元素上设置`z-index`值时，它指定该元素在它所属的层叠顺序上下文中的顺序，并且它将根据上述步骤在屏幕上渲染。

但是，当我们设置元素的`z-index`时会发生另一件事。获取除默认值`auto`之外的`z-index`值的元素实际上为其所有定位的后代元素创建层叠上下文。我们之前提到过，每个层叠上下文都有一个根元素，它包含其中的所有元素。当你将`z-index`属性应用于这个元素时，它将在其包含的下下文中指定元素的`z`轴顺序，并且还将创建以该元素为根的新层叠顺序上下文。

> 一个具有值为`z-index:auto`的定位元素被视为创建了新的堆叠顺序上下文，但任何实际创建新层叠顺序上下文的定位后代和后代被视为父层叠顺序上下文的一部分，而不是新的层叠顺序上下文。

当一个元素成为一个新的层叠顺序上下文时，它所定位的后代元素将会按照我们前面提到的元素本身的规则在其中进行层叠渲染。因此，如果我们再次重写渲染过程，它会是这样的：

- 具有正值`z-index`的定位元素组成的层叠顺序上下文。较高的值更接近屏幕。然后按照它们在源代码中出现的顺序呈现
- 定位元素的`z-index: 0`或`z-index: auto`
- 内联元素（比如文本和图像）是流中的和非定位的（它们的位置是静态的）
- 非浮动元素按照源代码中外观的顺序排列
- 非定位和非浮动块级元素
- 具有负值`z-index`的定位元素组成的层叠顺序上下文。较低的`z-index`的值更接近屏幕。然后按照它们在源代码中出现的顺序呈现
- 根元素`html`是全局层叠上下文的根，包含页面上所有元素

因此，当我们使用`z-index`属性来确定其层叠顺序中定位元素的顺序时，我们还创建了“原子（Atomic）”层叠顺序上下文，其中每个元素成为其所有定位后代的层叠顺序上下文。

## 可视化理解层叠上下文

前面涉及的都是一些概念和理论。或许很多同学觉得这些概念很枯燥，难于理解。其实我们可以把这些概念结合到实际生活中来理解。比如[@codrops](http://link.zhihu.com/?target=https%3A//twitter.com/codrops)在《[CSS Reference: z-index](https://zhuanlan.zhihu.com/p/%3Ccode%3E//tympa%3C/code%3Enus.net/codrops/css_reference/z-index/)》文中举的汉堡相关的示例。

你可以将构成层叠的元素视为你小时候可能玩过的积木。这些积木是一堆不同颜色的圆形木块，你可以把它们堆在一起。



![img](https://pic3.zhimg.com/80/v2-1c80b3df515aa96ac8ff5712032920ca_hd.jpg)



> 一个木制的堆叠塔。彩色的圆形积木类似于层叠环境中的元素。木塔（方形的基座）是包含彩色圆形积木的层叠环境。

现在，想象一下两座塔紧挨在一起，每个塔上都有一堆圆圈，彼此紧挨着。这两个塔类似于页面上的两个定位元素，每个元素都为其后代形成一个层叠上下文。



![img](https://pic4.zhimg.com/80/v2-440ceb48dd72b2911282ae11cbb355cf_hd.jpg)



> 每个堆叠塔代表一堆积木的堆叠环境。

当两个层叠上下文重叠时，它会变得更复杂（但并不困难）。为了理解层叠上下文重叠时会发生什么，可以想想一个汉堡包三明治。

每个汉堡包都含有堆叠在一起的食物（奶酪、西红柿、洋葱，如果你不是素食者的话，可能是肉）。每个汉堡包代表其内部食物切片的堆叠环境。在第二个旁边的另一个汉堡包也是其内部切片的层叠上下文。现在，想象一下把两个汉堡放在一起。顶部的两个汉堡代表页面上重叠的两个定位元素。通过将两个汉堡包堆叠在一起，你实际上已经给了一个比底部更高的层叠顺序。

你可以想象，上汉堡里的食物片不能比上汉堡里的食物片高 —— 它们被限制在它们的叠加环境中，并且无论它们的`z-index`指数有多高，都将保持在它的边界内。



![img](https://pic4.zhimg.com/80/v2-db7f5e0f7ddbb10054ed523f29da07a3_hd.jpg)



下图展示了一个生活中真实的层叠上下文的例子。它由几个重叠的层组成。每一层都是堆放书和其他东西的上下文。从底层第二层的书总是放在上层内容下面。除非对层进行更改或重新定位（经定不同的`z`轴的值），否则总是如此。



![img](https://pic3.zhimg.com/80/v2-c7cd1829f1ad344cdae9682d580ba2de_hd.jpg)



层叠上下文A的内容可以放在另一个层叠上下文B的内容前面的唯一方法是，给A一个大于B的`z-index`值，当然，它们的前提是有一个相同层叠上下文的环境。

我们要讲的最后一个可视化示例可能描述元素在页面上绘制方式的最好例子之一。

网页实际上就像一幅油画画布。浏览器按照一定的顺序绘制画布上的元素，就像画家在画布上绘制对象一样。从最远处开始，再到最近的。下面的绘制先用`Mr.Z`来描述：

> 如果你根据“画家算法”来思考，即物体被画在一个场景上的前后顺序，那么层叠上下文就像一幅画中的一幅画。首先，你要按照正确的顺序把所有的东西都画在后面，然后当你要画它的父上下文时，把整个结果贴在它所属的地方。

层叠算法在每个原子层叠上下文中都与在全局根（`html`）上下文中一样。

构成层叠上下文的元素的背景和边框总是落在上下文中的所有元素后面。

我们到目前为止所提到的要点可以从CSS规范中归纳为以下几点：

- 渲染树在画布上绘制的顺序是按照层叠上下文来描述的。层叠上下文可以包含进一步的层叠上下文。从父层叠上下文的角度来看，层叠上下文是原子的；其他层叠上下文中的边框可能不会位置任何边框之间
- 每个盒子属于一个层叠上下文。在给定的层叠上下文中，每个定位盒子都有一个整数的层叠级别，它在`z`轴上的位置相对于同一层叠上下文中的其他层叠级别。具有较高层叠级别的盒子总是在具有较低层叠级别的盒子前面格式化。盒子可能有负的层叠级别。在层叠上下文中，具有相同层叠级别的盒子按照文档树顺序从后到前堆叠
- 根元素形成了层叠上下文。其他层叠上下文是由任何定位元素（包括相对定位的元素）生成的，其计算值为`z-index`，而不是`auto`。层叠上下文不一定与包含块相关。

## 总结

对于众多CSSer来说，阅读CSS的规范和理解相关的概念都是枯燥无味的。而且很多同学理解一些概念都比较吃力。比如这篇文章中提到的相关概念： **文档流（Normal Flow）**、**格式化上下文（Formatting Context）**、**层叠上下文（Stacking Context）**、**层叠水平（Stacking Level）**和 **层叠顺序（Stacking Order）**。

虽然这些概念是CSS的基础，但很多同学都一直不愿去触碰，因为它们看起来简单，事实上还是较为复杂的。如查我们花一定的时间理解了这些概念，能帮助我们更好的理解CSS中其他相关的概念和知识点，特别是`z-index`的运用。

文章过于理论化，有理解不透彻或不对之处，欢迎大神拍正。

## 扩展阅读

- [CSS Visual Formatting Model](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS2/visuren.html%23z-index)
- [Elaborate Description of Stacking Contexts – W3C](http://link.zhihu.com/?target=https%3A//www.w3.org/TR/CSS21/zindex.html)
- [Detailed Look at Stacking in CSS](http://link.zhihu.com/?target=https%3A//timkadlec.com/2008/01/detailed-look-at-stacking-in-css/)
- [A Detailed Look At The z-index CSS Property](http://link.zhihu.com/?target=https%3A//www.im%3Ccode%3Epressiv%3C/code%3Eewebs.com/a-detailed-look-at-the-z-index-css-property/)
- ref="[https://coding.smashingmagazine.com/2009/09/15/the-z-index-css-property-a-comprehensive-look/](http://link.zhihu.com/?target=https%3A//coding.smashingmagazine.com/2009/09/15/the-z-index-css-property-a-comprehensive-look/)">The z-index Property – A Comprehensive Look
- [What No One Told You About The z-index Property](http://link.zhihu.com/?target=https%3A//philipwalton.com/articles/what-no-one-told-you-about-z-index/)
- `="https://www.vanseodesign.com/css/css-stack-z-index/">z-index And The CSS Stack: Which Element Displays First?`
- href="[https://webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892](http://link.zhihu.com/?target=https%3A//webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892)">关于z-index 那些你不知道的事
- `="https://vanseodesign.com/css/css-stack-z-index/">z-index And The CSS Stack: Which Element Displays First?`
- ref="[https://www.smashingmagazine.com/2009/09/the-z-index-css-property-a-comprehensive-look/](http://link.zhihu.com/?target=https%3A//www.smashingmagazine.com/2009/09/the-z-index-css-property-a-comprehensive-look/)">The z-index CSS Property: A Comprehensive Look
- [CSS Reference: z-index](https://zhuanlan.zhihu.com/p/%3Ccode%3E//tympa%3C/code%3Enus.net/codrops/css_reference/z-index/)
- `="https://www.w3cplus.com/css/how-z-index-works.html">z-index 的工作原理`
- `="https://www.w3cplus.com/css/3d-transform-and-z-index.html">z-index 和 transform`
- [深入理解CSS中的层叠上下文和层叠顺序](http://link.zhihu.com/?target=https%3A//www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)
- [深入理解 CSS 属性 z-index](https://zhuanlan.zhihu.com/p/htt%3Ccode%3Eps://zh%3C/code%3Euanlan.zhihu.com/p/33984503)

