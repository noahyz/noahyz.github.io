import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-D1zlwylF.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="代码分支预测优化" tabindex="-1"><a class="header-anchor" href="#代码分支预测优化"><span>代码分支预测优化</span></a></h2><p>我们的代码中，<code>if/else</code> 代码编译后，一个分支的汇编代码紧随前面的代码，而另一个分支的汇编代码需要使用 JMP 指令跳转才能访问到。很明显，通过 JMP 访问需要更多的时间。</p><p>在复杂程序中，有很多的 <code>if/else</code> 语句，又或者是有频繁调用且有 <code>if/else</code> 语句的函数，每秒被调用几万次。通常程序员在分支预测方面做的很糟糕，编译器又不能精准的预测每一个分支，这是 JMP 指令产生的时间浪费就会很大。</p><h3 id="一、likely-和-unlikely" tabindex="-1"><a class="header-anchor" href="#一、likely-和-unlikely"><span>一、likely 和 unlikely</span></a></h3><p>Linux 内核代码中，在条件判断语句中有很多 <code>likely()</code> 和 <code>unlikely()</code> 的调用。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>#define likely(x)       __builtin_expect(!!(x), 1)</span></span>
<span class="line"><span>#define unlikely(x)     __builtin_expect(!!(x), 0)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>__builtin_expect</code> 的主要作用是帮助编译器判断条件跳转的预期值，避免因执行 jmp 跳转指令造成时间浪费。如下举例：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#define likely(x)    __builtin_expect(!!(x), 1)</span></span>
<span class="line"><span>#define unlikely(x)  __builtin_expect(!!(x), 0)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main(int argc, char *argv[]) {</span></span>
<span class="line"><span>   int a;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   /* 获取输入参数值（编译器不能进行优化） */</span></span>
<span class="line"><span>   a = atoi (argv[1]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   if (unlikely (a == 2))</span></span>
<span class="line"><span>      a++;</span></span>
<span class="line"><span>   else</span></span>
<span class="line"><span>      a--;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   printf (&quot;%d\\n&quot;, a);</span></span>
<span class="line"><span>   return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code>gcc -O2</code> 进行编译，然后使用 <code>objdump -S</code> 反汇编，查看汇编代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>080483b0 &lt;main&gt;:</span></span>
<span class="line"><span> //             开头</span></span>
<span class="line"><span> 80483b0:       55                      push   %ebp</span></span>
<span class="line"><span> 80483b1:       89 e5                   mov    %esp,%ebp</span></span>
<span class="line"><span> 80483b3:       50                      push   %eax</span></span>
<span class="line"><span> 80483b4:       50                      push   %eax</span></span>
<span class="line"><span> 80483b5:       83 e4 f0                and    $0xfffffff0,%esp</span></span>
<span class="line"><span> //             调用atoi()</span></span>
<span class="line"><span> 80483b8:       8b 45 08                mov    0x8(%ebp),%eax</span></span>
<span class="line"><span> 80483bb:       83 ec 1c                sub    $0x1c,%esp</span></span>
<span class="line"><span> 80483be:       8b 48 04                mov    0x4(%eax),%ecx</span></span>
<span class="line"><span> 80483c1:       51                      push   %ecx</span></span>
<span class="line"><span> 80483c2:       e8 1d ff ff ff          call   80482e4 &lt;atoi@plt&gt;</span></span>
<span class="line"><span> 80483c7:       83 c4 10                add    $0x10,%esp</span></span>
<span class="line"><span> //             把输入值与2进行比较，即执行：“a == 2”</span></span>
<span class="line"><span> 80483ca:       83 f8 02                cmp    $0x2,%eax</span></span>
<span class="line"><span> //             --------------------------------------------------------</span></span>
<span class="line"><span> //             如果&#39;a&#39; 等于 2 (程序里面认为不太可能), 则跳转,</span></span>
<span class="line"><span> //             否则继续执行, 从而不破坏CPU的指令执行顺序.</span></span>
<span class="line"><span> //             --------------------------------------------------------</span></span>
<span class="line"><span> 80483cd:       74 12                   je     80483e1 &lt;main+0x31&gt;</span></span>
<span class="line"><span> 80483cf:       48                      dec    %eax</span></span>
<span class="line"><span> //             调用printf</span></span>
<span class="line"><span> 80483d0:       52                      push   %edx</span></span>
<span class="line"><span> 80483d1:       52                      push   %edx</span></span>
<span class="line"><span> 80483d2:       50                      push   %eax</span></span>
<span class="line"><span> 80483d3:       68 c8 84 04 08          push   $0x80484c8</span></span>
<span class="line"><span> 80483d8:       e8 f7 fe ff ff          call   80482d4 &lt;printf@plt&gt;</span></span>
<span class="line"><span> //             返回0并退出.</span></span>
<span class="line"><span> 80483dd:       31 c0                   xor    %eax,%eax</span></span>
<span class="line"><span> 80483df:       c9                      leave</span></span>
<span class="line"><span> 80483e0:       c3                      ret</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的程序中，用 <code>likely()</code> 替换其中的 <code>unlikely()</code> ，重新编译，再来看它的汇编代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>080483b0 &lt;main&gt;:</span></span>
<span class="line"><span> //             开头</span></span>
<span class="line"><span> 80483b0:       55                      push   %ebp</span></span>
<span class="line"><span> 80483b1:       89 e5                   mov    %esp,%ebp</span></span>
<span class="line"><span> 80483b3:       50                      push   %eax</span></span>
<span class="line"><span> 80483b4:       50                      push   %eax</span></span>
<span class="line"><span> 80483b5:       83 e4 f0                and    $0xfffffff0,%esp</span></span>
<span class="line"><span> //             调用atoi()</span></span>
<span class="line"><span> 80483b8:       8b 45 08                mov    0x8(%ebp),%eax</span></span>
<span class="line"><span> 80483bb:       83 ec 1c                sub    $0x1c,%esp</span></span>
<span class="line"><span> 80483be:       8b 48 04                mov    0x4(%eax),%ecx</span></span>
<span class="line"><span> 80483c1:       51                      push   %ecx</span></span>
<span class="line"><span> 80483c2:       e8 1d ff ff ff          call   80482e4 &lt;atoi@plt&gt;</span></span>
<span class="line"><span> 80483c7:       83 c4 10                add    $0x10,%esp</span></span>
<span class="line"><span> //             --------------------------------------------------</span></span>
<span class="line"><span> //             如果&#39;a&#39; 等于 2 (程序认为很有可能), 则不跳转，继续执行，</span></span>
<span class="line"><span> //             这样就不破坏CPU的指令执行顺序. </span></span>
<span class="line"><span> //             只有当 a != 2 时才会发生跳转, 而这种情况，程序认为是不太可能的.</span></span>
<span class="line"><span> //             ---------------------------------------------------</span></span>
<span class="line"><span> 80483ca:       83 f8 02                cmp    $0x2,%eax</span></span>
<span class="line"><span> 80483cd:       75 13                   jne    80483e2 &lt;main+0x32&gt;</span></span>
<span class="line"><span> //             a++ 指令的优化</span></span>
<span class="line"><span> 80483cf:       b0 03                   mov    $0x3,%al</span></span>
<span class="line"><span> //             调用printf()</span></span>
<span class="line"><span> 80483d1:       52                      push   %edx</span></span>
<span class="line"><span> 80483d2:       52                      push   %edx</span></span>
<span class="line"><span> 80483d3:       50                      push   %eax</span></span>
<span class="line"><span> 80483d4:       68 c8 84 04 08          push   $0x80484c8</span></span>
<span class="line"><span> 80483d9:       e8 f6 fe ff ff          call   80482d4 &lt;printf@plt&gt;</span></span>
<span class="line"><span> //             返回0并退出.</span></span>
<span class="line"><span> 80483de:       31 c0                   xor    %eax,%eax</span></span>
<span class="line"><span> 80483e0:       c9                      leave</span></span>
<span class="line"><span> 80483e1:       c3                      ret</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，在代码中使用 <code>likely()</code> 和 <code>unlikely()</code> 可以在一定程度上提高代码运行效率。</p>`,13)]))}const r=n(l,[["render",p],["__file","11.分支预测优化.html.vue"]]),v=JSON.parse('{"path":"/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/c__%E8%AF%AD%E8%A8%80/%E7%BC%96%E7%A0%81%E6%8A%80%E5%B7%A7/11.%E5%88%86%E6%94%AF%E9%A2%84%E6%B5%8B%E4%BC%98%E5%8C%96.html","title":"11.分支预测优化","lang":"zh-CN","frontmatter":{"title":"11.分支预测优化","date":"2023-01-19T11:11:41.000Z","tags":["linux"],"description":"代码分支预测优化 我们的代码中，if/else 代码编译后，一个分支的汇编代码紧随前面的代码，而另一个分支的汇编代码需要使用 JMP 指令跳转才能访问到。很明显，通过 JMP 访问需要更多的时间。 在复杂程序中，有很多的 if/else 语句，又或者是有频繁调用且有 if/else 语句的函数，每秒被调用几万次。通常程序员在分支预测方面做的很糟糕，编译...","head":[["meta",{"property":"og:url","content":"https://noahyz.github.io/%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/c__%E8%AF%AD%E8%A8%80/%E7%BC%96%E7%A0%81%E6%8A%80%E5%B7%A7/11.%E5%88%86%E6%94%AF%E9%A2%84%E6%B5%8B%E4%BC%98%E5%8C%96.html"}],["meta",{"property":"og:site_name","content":"noahyz的博客"}],["meta",{"property":"og:title","content":"11.分支预测优化"}],["meta",{"property":"og:description","content":"代码分支预测优化 我们的代码中，if/else 代码编译后，一个分支的汇编代码紧随前面的代码，而另一个分支的汇编代码需要使用 JMP 指令跳转才能访问到。很明显，通过 JMP 访问需要更多的时间。 在复杂程序中，有很多的 if/else 语句，又或者是有频繁调用且有 if/else 语句的函数，每秒被调用几万次。通常程序员在分支预测方面做的很糟糕，编译..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"noahyz"}],["meta",{"property":"article:tag","content":"linux"}],["meta",{"property":"article:published_time","content":"2023-01-19T11:11:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"11.分支预测优化\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-19T11:11:41.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"noahyz\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":2,"title":"代码分支预测优化","slug":"代码分支预测优化","link":"#代码分支预测优化","children":[{"level":3,"title":"一、likely 和 unlikely","slug":"一、likely-和-unlikely","link":"#一、likely-和-unlikely","children":[]}]}],"git":{},"readingTime":{"minutes":2.77,"words":832},"filePathRelative":"编程语言/c++语言/编码技巧/11.分支预测优化.md","localizedDate":"2023年1月19日","excerpt":"<h2>代码分支预测优化</h2>\\n<p>我们的代码中，<code>if/else</code> 代码编译后，一个分支的汇编代码紧随前面的代码，而另一个分支的汇编代码需要使用 JMP 指令跳转才能访问到。很明显，通过 JMP 访问需要更多的时间。</p>\\n<p>在复杂程序中，有很多的 <code>if/else</code> 语句，又或者是有频繁调用且有 <code>if/else</code> 语句的函数，每秒被调用几万次。通常程序员在分支预测方面做的很糟糕，编译器又不能精准的预测每一个分支，这是 JMP 指令产生的时间浪费就会很大。</p>\\n<h3>一、likely 和 unlikely</h3>","autoDesc":true}');export{r as comp,v as data};
