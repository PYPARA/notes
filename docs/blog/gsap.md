# 基于 GSAP 的前端动画
<script setup>
 const css = document.createElement('style')
    css.type = 'text/css'
    css.appendChild(
      document.createTextNode(
        ` .VPNav, .VPSidebar {
            display: none;
          }
          #VPContent {
            padding: 0;
          }
          .VPDoc.has-aside .content-container {
            max-width: none !important;
          }
          .VPDoc .aside {
            display: none !important;
          }
        `
      )
    )
    document.head.appendChild(css)
</script>

## GSAP 简介

## 基础用法 gsap.to()
<iframe height="500" style="width: 100%;" scrolling="no" title="gsap.to() Basic Usage"
  src="https://codepen.io/GreenSock/embed/PoYjyNj?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy"
  allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/PoYjyNj">
    gsap.to() Basic Usage</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 2D/3D 运动
<iframe height="500" style="width: 100%;" scrolling="no" title="Multiple 2D and 3D Transforms - GSAP 3"
  src="https://codepen.io/GreenSock/embed/KKPqbXq?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy"
  allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/KKPqbXq">
    Multiple 2D and 3D Transforms - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## gsap.from()
<iframe height="300" style="width: 100%;" scrolling="no" title="gsap.from() tween - GSAP 3"
  src="https://codepen.io/GreenSock/embed/OJLgroR?default-tab=html%2Cresult&editable=true" frameborder="no" loading="lazy"
  allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/OJLgroR">
    gsap.from() tween - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 渐变曲线
<iframe height="1000" style="width: 100%;" scrolling="no" title="GSAP Starter Template" src="https://codepen.io/pypara/embed/LYrEmbM?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pypara/pen/LYrEmbM">
  GSAP Starter Template</a> by Pypara (<a href="https://codepen.io/pypara">@pypara</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<iframe height="600" style="width: 100%;" scrolling="no" title="CustomEase Demo Explorer - GSAP 3" src="https://codepen.io/GreenSock/embed/NWKLVda?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/NWKLVda">
  CustomEase Demo Explorer - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>


## 交错
<iframe height="300" style="width: 100%;" scrolling="no" title="Simple stagger demo - GSAP 3" src="https://codepen.io/GreenSock/embed/RwbZaZK?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/RwbZaZK">
  Simple stagger demo - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<iframe height="600" style="width: 100%;" scrolling="no" title="GSAP 3 Stagger demo" src="https://codepen.io/GreenSock/embed/qBWjOMK?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/qBWjOMK">
  GSAP 3 Stagger demo</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 回调
<iframe height="600" style="width: 100%;" scrolling="no" title="Callbacks and parameters - GSAP 3" src="https://codepen.io/GreenSock/embed/MWgoLgq?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/MWgoLgq">
  Callbacks and parameters - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 控制
<iframe height="300" style="width: 100%;" scrolling="no" title="Basic Control Methods - GSAP 3" src="https://codepen.io/GreenSock/embed/OJLgdyg?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/OJLgdyg">
  Basic Control Methods - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 时间线
<iframe height="600" style="width: 100%;" scrolling="no" title="Timeline: position parameter - GSAP 3" src="https://codepen.io/GreenSock/embed/mdbworK?default-tab=js%2Cresult&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/mdbworK">
  Timeline: position parameter - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 图像变换
<iframe height="500" style="width: 100%;" scrolling="no" title="MorphSVG - sequence - GSAP 3" src="https://codepen.io/GreenSock/embed/yLBERwy?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/yLBERwy">
  MorphSVG - sequence - GSAP 3</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 拖动
<iframe height="800" style="width: 100%;" scrolling="no" title="Draggable &quot;Toss&quot; Demo" src="https://codepen.io/pypara/embed/yLEyEYx?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pypara/pen/yLEyEYx">
  Draggable &quot;Toss&quot; Demo</a> by Pypara (<a href="https://codepen.io/pypara">@pypara</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<iframe height="800" style="width: 100%;" scrolling="no" title="Fancy list and page transition" src="https://codepen.io/pypara/embed/OJxwgwz?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/pypara/pen/OJxwgwz">
  Fancy list and page transition</a> by Pypara (<a href="https://codepen.io/pypara">@pypara</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 滚动监听
<iframe height="800" style="width: 100%;" scrolling="no" title="Airplanes." src="https://codepen.io/ste-vg/embed/GRooLza?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ste-vg/pen/GRooLza">
  Airplanes.</a> by Steve Gardner (<a href="https://codepen.io/ste-vg">@ste-vg</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<iframe height="800" style="width: 100%;" scrolling="no" title="Personal page with gsap ScrollTrigger" src="https://codepen.io/ismamz/embed/qBbXaJM?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ismamz/pen/qBbXaJM">
  Personal page with gsap ScrollTrigger</a> by Ismael Martínez (<a href="https://codepen.io/ismamz">@ismamz</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<iframe height="800" style="width: 100%;" scrolling="no" title="Parallax scroll animation" src="https://codepen.io/isladjan/embed/abdyPBw?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/isladjan/pen/abdyPBw">
  Parallax scroll animation</a> by isladjan (<a href="https://codepen.io/isladjan">@isladjan</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 状态转换 Flip
<iframe height="500" style="width: 100%;" scrolling="no" title="Grid items view with Flip Plugin" src="https://codepen.io/GreenSock/embed/JjXqMZK?default-tab=result&editable=true" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/GreenSock/pen/JjXqMZK">
  Grid items view with Flip Plugin</a> by GreenSock (<a href="https://codepen.io/GreenSock">@GreenSock</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>