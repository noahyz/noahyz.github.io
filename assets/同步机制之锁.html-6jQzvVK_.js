import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as e,o as i}from"./app-D1zlwylF.js";const l={};function p(t,s){return i(),a("div",null,s[0]||(s[0]=[e(`<p>我们的锁使用 信号量来实现。信号量包括两个操作</p><ul><li>增加操作：将信号量的值加 1，唤醒在此信号量上等待的线程</li><li>减少操作：判断信号量是否大于 0。若信号量大于 0，则将信号量减一；若信号量等于 0，当前线程将自己阻塞，以在此信号量上等待</li></ul><p>线程的阻塞是线程自己发出的动作，也就是线程自己阻塞自己，并不是被别人阻塞的，阻塞是线程主动的行为。已阻塞的线程是由别人来唤醒的，唤醒是被动的。</p><p>注意，线程阻塞时，线程的时间片还没用完，在唤醒之后，线程会继续在剩余时间片内运行，调度器不会为他充满时间片。</p><h3 id="一、线程阻塞" tabindex="-1"><a class="header-anchor" href="#一、线程阻塞"><span>一、线程阻塞</span></a></h3><p>线程主动阻塞，等待被唤醒。给此线程设置非就绪状态，让调度器无法再调度他，也就是当前线程不能再被加到就绪队列中。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>void thread_block(enum task_status stat) {</span></span>
<span class="line"><span>    // 只有 stat 取如下三种状态才不会被调度</span></span>
<span class="line"><span>    ASSERT(((stat == TASK_BLOCKED) || (stat == TASK_WAITING) || (stat == TASK_HANGING)));</span></span>
<span class="line"><span>    enum intr_status old_status = intr_disable();</span></span>
<span class="line"><span>    struct task_struct* cur_thread = running_thread();</span></span>
<span class="line"><span>    // 置其状态为 stat</span></span>
<span class="line"><span>    cur_thread-&gt;status = stat;</span></span>
<span class="line"><span>    // 将当前线程换下处理器，由于不会将此线程加入到就绪队列，所以不会被调度</span></span>
<span class="line"><span>    schedule();</span></span>
<span class="line"><span>    // 待当前线程被解除阻塞后才继续运行下面的 intr_set_status</span></span>
<span class="line"><span>    intr_set_status(old_status);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将某线程解除阻塞，也就是唤醒某线程</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>void thread_unblock(struct task_struct* pthread) {</span></span>
<span class="line"><span>    enum intr_status old_status = intr_disable();</span></span>
<span class="line"><span>    ASSERT(((pthread-&gt;status == TASK_BLOCKED) || (pthread-&gt;status == TASK_WAITING)</span></span>
<span class="line"><span>        || (pthread-&gt;status == TASK_HANGING)));</span></span>
<span class="line"><span>    if (pthread-&gt;status != TASK_READY) {</span></span>
<span class="line"><span>        // ASSERT 是调试阶段用的，运行阶段我们用 PANIC 返回错误信息</span></span>
<span class="line"><span>        ASSERT(!elem_find(&amp;thread_ready_list, &amp;pthread-&gt;general_tag));</span></span>
<span class="line"><span>        if (elem_find(&amp;thread_ready_list, &amp;pthread-&gt;general_tag)) {</span></span>
<span class="line"><span>            PANIC(&quot;thread_unlock: blocked thread in ready_list\\n&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 放到队列的最前面，让他尽快得到调度</span></span>
<span class="line"><span>        list_push(&amp;thread_ready_list, &amp;pthread-&gt;general_tag);</span></span>
<span class="line"><span>        pthread-&gt;status = TASK_READY;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    intr_set_status(old_status);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="二、锁的实现" tabindex="-1"><a class="header-anchor" href="#二、锁的实现"><span>二、锁的实现</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>struct semaphore {</span></span>
<span class="line"><span>    // 信号量值</span></span>
<span class="line"><span>    uint8_t value;</span></span>
<span class="line"><span>    // 保存在此信号量上阻塞的线程</span></span>
<span class="line"><span>    struct list waiters;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>信号量的结构体，waiters 用来记录在此信号量上等待（阻塞）的所有线程。</p><p>注意：信号量仅仅是一个编程理念，是个程序设计结构，只要具备信号量初值和等待线程这两个必要元素即可。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>struct lock {</span></span>
<span class="line"><span>    // 锁的持有者</span></span>
<span class="line"><span>    struct task_struct* holder;</span></span>
<span class="line"><span>    // 用二元信号量实现锁</span></span>
<span class="line"><span>    struct semaphore sem;</span></span>
<span class="line"><span>    // 锁的持有者重复申请锁的次数</span></span>
<span class="line"><span>    // 用于规避重复申请锁的情况</span></span>
<span class="line"><span>    uint32_t holder_repeat_nr;</span></span>
<span class="line"><span>};</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>holder 成员表示锁的持有者，即那个线程成功申请了锁。</p><p>成员 holder_repeat_nr 用来累积锁的持有者重复申请锁的次数，释放锁的时候会参考此变量的值。原因是一般情况下我们应该在进入临界区之前加锁，但有时候可能加锁之后，再次重复加锁。这样可能会释放两次，造成错误，因此释放锁时根据 holder_repeat_nr 此值来执行具体动作。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>// 初始化信号量</span></span>
<span class="line"><span>void sema_init(struct semaphore *psema, uint8_t value) {</span></span>
<span class="line"><span>    psema-&gt;value = value;</span></span>
<span class="line"><span>    list_init(&amp;psema-&gt;waiters);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 初始化锁</span></span>
<span class="line"><span>void lock_init(struct lock *plock) {</span></span>
<span class="line"><span>    plock-&gt;holder = NULL;</span></span>
<span class="line"><span>    plock-&gt;holder_repeat_nr = 0;</span></span>
<span class="line"><span>    // 信号量初值设置为 1，也即二元信号量</span></span>
<span class="line"><span>    sema_init(&amp;plock-&gt;sem, 1);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上是信号量的初始化过程。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>// 信号量的 down 操作</span></span>
<span class="line"><span>void sema_down(struct semaphore *psema) {</span></span>
<span class="line"><span>    // 关中断来保证原子操作</span></span>
<span class="line"><span>    enum intr_status old_status = intr_disable();</span></span>
<span class="line"><span>    // 如果信号量值为 0，表示已经被别人持有</span></span>
<span class="line"><span>    for (; psema-&gt;value == 0;) {</span></span>
<span class="line"><span>        ASSERT(!elem_find(&amp;psema-&gt;waiters, &amp;running_thread()-&gt;general_tag));</span></span>
<span class="line"><span>        // 当前线程不应该已经在信号量的 waiters 队列中</span></span>
<span class="line"><span>        if (elem_find(&amp;psema-&gt;waiters, &amp;running_thread()-&gt;general_tag)) {</span></span>
<span class="line"><span>            PANIC(&quot;sema down: thread blocked has been in waiters_list\\n&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 若信号量的值等于 0，则当前线程把自己加入该锁的等待队列，然后阻塞自己</span></span>
<span class="line"><span>        list_append(&amp;psema-&gt;waiters, &amp;running_thread()-&gt;general_tag);</span></span>
<span class="line"><span>        // 阻塞当前线程，直到被唤醒</span></span>
<span class="line"><span>        thread_block(TASK_BLOCKED);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    // 若 value 为 1 或被唤醒后，即获取到了锁</span></span>
<span class="line"><span>    psema-&gt;value--;</span></span>
<span class="line"><span>    ASSERT(psema-&gt;value == 0);</span></span>
<span class="line"><span>    // 恢复之前的中断状态</span></span>
<span class="line"><span>    intr_set_status(old_status);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，在判断信号量是否为 0 时，使用的是循环的方式。因为锁本身是公共的资源，大家也要通过竞争的方式去获得，因此想要获得锁的线程不止一个，当阻塞的线程被唤醒后，也不一定能获得资源，只是再次获取了去竞争锁的机会，所以判断信号量的值最好使用循环方式，而非 if 方式。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>// 信号量的 up 操作</span></span>
<span class="line"><span>void sema_up(struct semaphore *psema) {</span></span>
<span class="line"><span>    // 关中断，保证原子操作</span></span>
<span class="line"><span>    enum intr_status old_status = intr_disable();</span></span>
<span class="line"><span>    ASSERT(psema-&gt;value == 0);</span></span>
<span class="line"><span>    if (!list_empty(&amp;psema-&gt;waiters)) {</span></span>
<span class="line"><span>        // 唤醒一个被阻塞的线程</span></span>
<span class="line"><span>        // 所谓的唤醒只不过是将阻塞中的线程加入到阻塞队列，将来可以参与调度</span></span>
<span class="line"><span>        // 而且当前是关中断的状态，所以调度器并不会被触发，所以 psema-&gt;value++ 是安全的</span></span>
<span class="line"><span>        struct task_struct* thread_blocked = elem2entry(struct task_struct, general_tag, list_pop(&amp;psema-&gt;waiters));</span></span>
<span class="line"><span>        thread_unblock(thread_blocked);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    psema-&gt;value++;</span></span>
<span class="line"><span>    ASSERT(psema-&gt;value == 1);</span></span>
<span class="line"><span>    // 恢复之前的中断状态</span></span>
<span class="line"><span>    intr_set_status(old_status);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，所谓的唤醒并不是指马上就运行，而是重新加入就绪队列，将来可以参与调度，运行是将来的事儿。而且是在关中断的情况下，所以调度器并不会被触发。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>void lock_acquire(struct lock* plock) {</span></span>
<span class="line"><span>    // 注意重复获取锁的情况</span></span>
<span class="line"><span>    if (plock-&gt;holder != running_thread()) {</span></span>
<span class="line"><span>        sema_down(&amp;plock-&gt;sem);</span></span>
<span class="line"><span>        plock-&gt;holder = running_thread();</span></span>
<span class="line"><span>        ASSERT(plock-&gt;holder_repeat_nr == 0);</span></span>
<span class="line"><span>        plock-&gt;holder_repeat_nr = 1;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>        plock-&gt;holder_repeat_nr++;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void lock_release(struct lock* plock) {</span></span>
<span class="line"><span>    ASSERT(plock-&gt;holder == running_thread());</span></span>
<span class="line"><span>    if (plock-&gt;holder_repeat_nr &gt; 1) {</span></span>
<span class="line"><span>        plock-&gt;holder_repeat_nr--;</span></span>
<span class="line"><span>        return;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    ASSERT(plock-&gt;holder_repeat_nr == 1);</span></span>
<span class="line"><span>    // 必须放在 sema_up 操作之前</span></span>
<span class="line"><span>    // 这里是未关中断的状态，因此需要先给结构赋值，再进行 sema_up 操作</span></span>
<span class="line"><span>    // 如果先进行 sema_up 操作，然后被调度器换下 CPU，其他线程给 plock 结构赋值了</span></span>
<span class="line"><span>    // 此线程被唤醒后又更改了 plock 结构，就会导致错误</span></span>
<span class="line"><span>    plock-&gt;holder = NULL;</span></span>
<span class="line"><span>    plock-&gt;holder_repeat_nr = 0;</span></span>
<span class="line"><span>    sema_up(&amp;plock-&gt;sem);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后封装好加锁和解锁函数。临界区是关中断的。</p>`,24)]))}const c=n(l,[["render",p],["__file","同步机制之锁.html.vue"]]),v=JSON.parse('{"path":"/%E6%8A%80%E6%9C%AF%E4%B8%93%E9%A2%98/%E6%89%8B%E5%86%99%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/9.%E5%85%B6%E4%BB%96/%E5%90%8C%E6%AD%A5%E6%9C%BA%E5%88%B6%E4%B9%8B%E9%94%81.html","title":"同步机制---锁","lang":"zh-CN","frontmatter":{"title":"同步机制---锁","description":"我们的锁使用 信号量来实现。信号量包括两个操作 增加操作：将信号量的值加 1，唤醒在此信号量上等待的线程 减少操作：判断信号量是否大于 0。若信号量大于 0，则将信号量减一；若信号量等于 0，当前线程将自己阻塞，以在此信号量上等待 线程的阻塞是线程自己发出的动作，也就是线程自己阻塞自己，并不是被别人阻塞的，阻塞是线程主动的行为。已阻塞的线程是由别人来唤...","head":[["meta",{"property":"og:url","content":"https://noahyz.github.io/%E6%8A%80%E6%9C%AF%E4%B8%93%E9%A2%98/%E6%89%8B%E5%86%99%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/9.%E5%85%B6%E4%BB%96/%E5%90%8C%E6%AD%A5%E6%9C%BA%E5%88%B6%E4%B9%8B%E9%94%81.html"}],["meta",{"property":"og:site_name","content":"noahyz的博客"}],["meta",{"property":"og:title","content":"同步机制---锁"}],["meta",{"property":"og:description","content":"我们的锁使用 信号量来实现。信号量包括两个操作 增加操作：将信号量的值加 1，唤醒在此信号量上等待的线程 减少操作：判断信号量是否大于 0。若信号量大于 0，则将信号量减一；若信号量等于 0，当前线程将自己阻塞，以在此信号量上等待 线程的阻塞是线程自己发出的动作，也就是线程自己阻塞自己，并不是被别人阻塞的，阻塞是线程主动的行为。已阻塞的线程是由别人来唤..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"noahyz"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"同步机制---锁\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"noahyz\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":3,"title":"一、线程阻塞","slug":"一、线程阻塞","link":"#一、线程阻塞","children":[]},{"level":3,"title":"二、锁的实现","slug":"二、锁的实现","link":"#二、锁的实现","children":[]}],"git":{},"readingTime":{"minutes":5,"words":1499},"filePathRelative":"技术专题/手写操作系统/9.其他/同步机制之锁.md","excerpt":"<p>我们的锁使用 信号量来实现。信号量包括两个操作</p>\\n<ul>\\n<li>增加操作：将信号量的值加 1，唤醒在此信号量上等待的线程</li>\\n<li>减少操作：判断信号量是否大于 0。若信号量大于 0，则将信号量减一；若信号量等于 0，当前线程将自己阻塞，以在此信号量上等待</li>\\n</ul>\\n<p>线程的阻塞是线程自己发出的动作，也就是线程自己阻塞自己，并不是被别人阻塞的，阻塞是线程主动的行为。已阻塞的线程是由别人来唤醒的，唤醒是被动的。</p>\\n<p>注意，线程阻塞时，线程的时间片还没用完，在唤醒之后，线程会继续在剩余时间片内运行，调度器不会为他充满时间片。</p>\\n<h3>一、线程阻塞</h3>","autoDesc":true}');export{c as comp,v as data};
