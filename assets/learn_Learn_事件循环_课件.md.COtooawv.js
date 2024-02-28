import{_ as i,c as s,o as a,a4 as l}from"./chunks/framework.DhcZWzV3.js";const c=JSON.parse('{"title":"事件循环","description":"","frontmatter":{},"headers":[],"relativePath":"learn/Learn/事件循环/课件.md","filePath":"learn/Learn/事件循环/课件.md","lastUpdated":1675924431000}'),t={name:"learn/Learn/事件循环/课件.md"},p=l(`<h1 id="事件循环" tabindex="-1">事件循环 <a class="header-anchor" href="#事件循环" aria-label="Permalink to &quot;事件循环&quot;">​</a></h1><h2 id="浏览器的进程模型" tabindex="-1">浏览器的进程模型 <a class="header-anchor" href="#浏览器的进程模型" aria-label="Permalink to &quot;浏览器的进程模型&quot;">​</a></h2><h3 id="何为进程" tabindex="-1">何为进程？ <a class="header-anchor" href="#何为进程" aria-label="Permalink to &quot;何为进程？&quot;">​</a></h3><p>程序运行需要有它自己专属的内存空间，可以把这块内存空间简单的理解为进程</p><img src="http://mdrs.yuanjin.tech/img/202208092057573.png" alt="image-20220809205743532" style="zoom:50%;"><p>每个应用至少有一个进程，进程之间相互独立，即使要通信，也需要双方同意。</p><h3 id="何为线程" tabindex="-1">何为线程？ <a class="header-anchor" href="#何为线程" aria-label="Permalink to &quot;何为线程？&quot;">​</a></h3><p>有了进程后，就可以运行程序的代码了。</p><p>运行代码的「人」称之为「线程」。</p><p>一个进程至少有一个线程，所以在进程开启后会自动创建一个线程来运行代码，该线程称之为主线程。</p><p>如果程序需要同时执行多块代码，主线程就会启动更多的线程来执行代码，所以一个进程中可以包含多个线程。</p><p><img src="http://mdrs.yuanjin.tech/img/202208092108499.png" alt="image-20220809210859457"></p><h3 id="浏览器有哪些进程和线程" tabindex="-1">浏览器有哪些进程和线程？ <a class="header-anchor" href="#浏览器有哪些进程和线程" aria-label="Permalink to &quot;浏览器有哪些进程和线程？&quot;">​</a></h3><p><strong>浏览器是一个多进程多线程的应用程序</strong></p><p>浏览器内部工作极其复杂。</p><p>为了避免相互影响，为了减少连环崩溃的几率，当启动浏览器后，它会自动启动多个进程。</p><p><img src="http://mdrs.yuanjin.tech/img/202208092131410.png" alt="image-20220809213152371"></p><blockquote><p>可以在浏览器的任务管理器中查看当前的所有进程</p></blockquote><p>其中，最主要的进程有：</p><ol><li><p>浏览器进程</p><p>主要负责界面显示、用户交互、子进程管理等。浏览器进程内部会启动多个线程处理不同的任务。</p></li><li><p>网络进程</p><p>负责加载网络资源。网络进程内部会启动多个线程来处理不同的网络任务。</p></li><li><p><strong>渲染进程</strong>（本节课重点讲解的进程）</p><p>渲染进程启动后，会开启一个<strong>渲染主线程</strong>，主线程负责执行 HTML、CSS、JS 代码。</p><p>默认情况下，浏览器会为每个标签页开启一个新的渲染进程，以保证不同的标签页之间不相互影响。</p><blockquote><p>将来该默认模式可能会有所改变，有兴趣的同学可参见<a href="https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md#Modes-and-Availability" target="_blank" rel="noreferrer">chrome官方说明文档</a></p></blockquote></li></ol><h2 id="渲染主线程是如何工作的" tabindex="-1">渲染主线程是如何工作的？ <a class="header-anchor" href="#渲染主线程是如何工作的" aria-label="Permalink to &quot;渲染主线程是如何工作的？&quot;">​</a></h2><p>渲染主线程是浏览器中最繁忙的线程，需要它处理的任务包括但不限于：</p><ul><li>解析 HTML</li><li>解析 CSS</li><li>计算样式</li><li>布局</li><li>处理图层</li><li>每秒把页面画 60 次</li><li>执行全局 JS 代码</li><li>执行事件处理函数</li><li>执行计时器的回调函数</li><li>......</li></ul><blockquote><p>思考题：为什么渲染进程不适用多个线程来处理这些事情？</p></blockquote><p>要处理这么多的任务，主线程遇到了一个前所未有的难题：如何调度任务？</p><p>比如：</p><ul><li>我正在执行一个 JS 函数，执行到一半的时候用户点击了按钮，我该立即去执行点击事件的处理函数吗？</li><li>我正在执行一个 JS 函数，执行到一半的时候某个计时器到达了时间，我该立即去执行它的回调吗？</li><li>浏览器进程通知我“用户点击了按钮”，与此同时，某个计时器也到达了时间，我应该处理哪一个呢？</li><li>......</li></ul><p>渲染主线程想出了一个绝妙的主意来处理这个问题：排队</p><p><img src="http://mdrs.yuanjin.tech/img/202208092230847.png" alt="image-20220809223027806"></p><ol><li>在最开始的时候，渲染主线程会进入一个无限循环</li><li>每一次循环会检查消息队列中是否有任务存在。如果有，就取出第一个任务执行，执行完一个后进入下一次循环；如果没有，则进入休眠状态。</li><li>其他所有线程（包括其他进程的线程）可以随时向消息队列添加任务。新任务会加到消息队列的末尾。在添加新任务时，如果主线程是休眠状态，则会将其唤醒以继续循环拿取任务</li></ol><p>这样一来，就可以让每个任务有条不紊的、持续的进行下去了。</p><p><strong>整个过程，被称之为事件循环（消息循环）</strong></p><h2 id="若干解释" tabindex="-1">若干解释 <a class="header-anchor" href="#若干解释" aria-label="Permalink to &quot;若干解释&quot;">​</a></h2><h3 id="何为异步" tabindex="-1">何为异步？ <a class="header-anchor" href="#何为异步" aria-label="Permalink to &quot;何为异步？&quot;">​</a></h3><p>代码在执行过程中，会遇到一些无法立即处理的任务，比如：</p><ul><li>计时完成后需要执行的任务 —— <code>setTimeout</code>、<code>setInterval</code></li><li>网络通信完成后需要执行的任务 -- <code>XHR</code>、<code>Fetch</code></li><li>用户操作后需要执行的任务 -- <code>addEventListener</code></li></ul><p>如果让渲染主线程等待这些任务的时机达到，就会导致主线程长期处于「阻塞」的状态，从而导致浏览器「卡死」</p><p><img src="http://mdrs.yuanjin.tech/img/202208101043348.png" alt="image-20220810104344296"></p><p><strong>渲染主线程承担着极其重要的工作，无论如何都不能阻塞！</strong></p><p>因此，浏览器选择<strong>异步</strong>来解决这个问题</p><p><img src="http://mdrs.yuanjin.tech/img/202208101048899.png" alt="image-20220810104858857"></p><p>使用异步的方式，<strong>渲染主线程永不阻塞</strong></p><blockquote><p>面试题：如何理解 JS 的异步？</p><p>参考答案：</p><p>JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。</p><p>而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。</p><p>如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。</p><p>所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。</p><p>在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。</p></blockquote><h3 id="js为何会阻碍渲染" tabindex="-1">JS为何会阻碍渲染？ <a class="header-anchor" href="#js为何会阻碍渲染" aria-label="Permalink to &quot;JS为何会阻碍渲染？&quot;">​</a></h3><p>先看代码</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Mr.Yuan is awesome!&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">h1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;change&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">button</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> h1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;h1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> btn </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">querySelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;button&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 死循环指定的时间</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> delay</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">duration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> start </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Date.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (Date.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">now</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> start </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> duration) {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  btn.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onclick</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    h1.textContent </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;袁老师很帅！&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    delay</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>点击按钮后，会发生什么呢？</p><p>&lt;见具体演示&gt;</p><h3 id="任务有优先级吗" tabindex="-1">任务有优先级吗？ <a class="header-anchor" href="#任务有优先级吗" aria-label="Permalink to &quot;任务有优先级吗？&quot;">​</a></h3><p>任务没有优先级，在消息队列中先进先出</p><p>但<strong>消息队列是有优先级的</strong></p><p>根据 W3C 的最新解释:</p><ul><li>每个任务都有一个任务类型，同一个类型的任务必须在一个队列，不同类型的任务可以分属于不同的队列。 在一次事件循环中，浏览器可以根据实际情况从不同的队列中取出任务执行。</li><li>浏览器必须准备好一个微队列，微队列中的任务优先所有其他任务执行 <a href="https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint" target="_blank" rel="noreferrer">https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint</a></li></ul><blockquote><p>随着浏览器的复杂度急剧提升，W3C 不再使用宏队列的说法</p></blockquote><p>在目前 chrome 的实现中，至少包含了下面的队列：</p><ul><li>延时队列：用于存放计时器到达后的回调任务，优先级「中」</li><li>交互队列：用于存放用户操作后产生的事件处理任务，优先级「高」</li><li>微队列：用户存放需要最快执行的任务，优先级「最高」</li></ul><blockquote><p>添加任务到微队列的主要方式主要是使用 Promise、MutationObserver</p><p>例如：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 立即把一个函数添加到微队列</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">().</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(函数)</span></span></code></pre></div></blockquote><blockquote><p>浏览器还有很多其他的队列，由于和我们开发关系不大，不作考虑</p></blockquote><blockquote><p>面试题：阐述一下 JS 的事件循环</p><p>参考答案：</p><p>事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。</p><p>在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。</p><p>过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。</p><p>根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。</p></blockquote><blockquote><p>面试题：JS 中的计时器能做到精确计时吗？为什么？</p><p>参考答案：</p><p>不行，因为：</p><ol><li>计算机硬件没有原子钟，无法做到精确计时</li><li>操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就携带了这些偏差</li><li>按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差</li><li>受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差</li></ol></blockquote>`,60),n=[p];function h(e,k,r,o,d,E){return a(),s("div",null,n)}const y=i(t,[["render",h]]);export{c as __pageData,y as default};
