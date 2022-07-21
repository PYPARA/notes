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