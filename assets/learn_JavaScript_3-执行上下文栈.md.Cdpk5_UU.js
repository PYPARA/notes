import{_ as s,c as a,o as i,a4 as n}from"./chunks/framework.DhcZWzV3.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"learn/JavaScript/3-执行上下文栈.md","filePath":"learn/JavaScript/3-执行上下文栈.md","lastUpdated":1655882254000}'),p={name:"learn/JavaScript/3-执行上下文栈.md"},l=n(`<p>1.变量提升 2.可执行代码。 三种，全局代码、函数代码、eval代码 3. 当执行到一个函数的时候，就会进行准备工作，这里的“准备工作”，让我们用个更专业一点的说法，就叫做&quot;执行上下文(execution context)&quot; JavaScript 引擎创建了执行上下文栈（Execution context stack，ECS）来管理执行上下文</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ECStack </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  globalContext</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fun3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;fun3&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fun2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  fun3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fun1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  fun2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fun1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// fun1()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ECStack.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">fun1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; functionContext);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// fun1中竟然调用了fun2，还要创建fun2的执行上下文</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ECStack.push(&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">fun2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; functionContext);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// 擦，fun2还调用了fun3！</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ECStack.push(&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">fun3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; functionContext);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// fun3执行完毕</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ECStack.pop();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// fun2执行完毕</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ECStack.pop();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// fun1执行完毕</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">ECStack.pop();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext</span></span></code></pre></div><h3 id="参考资料" tabindex="-1">参考资料 <a class="header-anchor" href="#参考资料" aria-label="Permalink to &quot;参考资料&quot;">​</a></h3><p><a href="https://github.com/mqyqingfeng/Blog/issues/4" target="_blank" rel="noreferrer">https://github.com/mqyqingfeng/Blog/issues/4</a></p>`,4),t=[l];function h(k,e,E,c,r,d){return i(),a("div",null,t)}const y=s(p,[["render",h]]);export{o as __pageData,y as default};
