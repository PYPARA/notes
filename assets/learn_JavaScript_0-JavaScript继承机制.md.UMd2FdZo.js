import{_ as a,c as s,o as i,a4 as n}from"./chunks/framework.DhcZWzV3.js";const E=JSON.parse('{"title":"JavaScript继承机制","description":"","frontmatter":{},"headers":[],"relativePath":"learn/JavaScript/0-JavaScript继承机制.md","filePath":"learn/JavaScript/0-JavaScript继承机制.md","lastUpdated":1655882254000}'),t={name:"learn/JavaScript/0-JavaScript继承机制.md"},e=n(`<h1 id="javascript继承机制" tabindex="-1">JavaScript继承机制 <a class="header-anchor" href="#javascript继承机制" aria-label="Permalink to &quot;JavaScript继承机制&quot;">​</a></h1><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">constructor</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">prototype</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">js 使用 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 从原型对象生成一个实例对象</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 后面跟着的是 构造函数 constructor</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">new</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 缺点 无法共享属性和方法</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">给构造函数一个 prototype 属性，所有实例对象需要共享的属性和方法，都放在这个对象里面</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">由于所有的实例对象共享同一个prototype对象，那么从外界看起来，prototype对象就好像是实例对象的原型，而实例对象则好像</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;继承&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">了prototype对象一样。</span></span></code></pre></div><h2 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h2><p><a href="http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html" target="_blank" rel="noreferrer">http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html</a></p>`,4),p=[e];function l(r,h,c,o,k,d){return i(),s("div",null,p)}const g=a(t,[["render",l]]);export{E as __pageData,g as default};
