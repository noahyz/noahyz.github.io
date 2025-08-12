import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o as l}from"./app-D1zlwylF.js";const e="/assets/%E6%9C%BA%E6%A2%B0%E7%A1%AC%E7%9B%98%E7%A4%BA%E6%84%8F%E5%9B%BE-Df15Kr-s.png",p="/assets/%E7%A1%AC%E7%9B%98%E6%8E%A7%E5%88%B6%E5%99%A8%E4%B8%BB%E8%A6%81%E7%AB%AF%E5%8F%A3%E5%AF%84%E5%AD%98%E5%99%A8-AyP5R3OH.png",d="/assets/device%E5%AF%84%E5%AD%98%E5%99%A8-DQeiBgZP.png",c="/assets/status%E5%AF%84%E5%AD%98%E5%99%A8-rt31CxrI.png",v={};function r(t,s){return l(),a("div",null,s[0]||(s[0]=[i('<h2 id="操作硬盘" tabindex="-1"><a class="header-anchor" href="#操作硬盘"><span>操作硬盘</span></a></h2><p>如下为机械硬盘</p><figure><img src="'+e+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="一、硬盘相关概念" tabindex="-1"><a class="header-anchor" href="#一、硬盘相关概念"><span>一、硬盘相关概念</span></a></h3><p>CPU 通过 IO 接口与硬盘通信，针对硬盘的 IO 接口是“硬盘控制器”。硬盘控制器和硬盘是连接在一起的，是专门驱动硬盘设备的模块电路。这种接口也称为集成设备电路（Integrated Drive Electronics，IDE）。后来，又将此接口使用的技术规范归纳成全球硬盘标准，于是产生了 ATA（Advanced Technology Attachment）。硬盘串行接口称为（Serial ATA，SATA），硬盘并行接口称为（Parallel ATA，PATA）。</p><p>PATA 接口的线缆称为 IDE 线，一个 IDE 线上可以挂两块硬盘，一个是主盘（Master）、一个从盘（Slave）。现代的主盘和从盘之间的区别不明显了。主板上提供两个 IDE 插槽，分别位 IDE0 和 IDE1。支持 4 块 IDE（PATA）硬盘。</p><p>按照 ATA 标准，这两个插槽称为“通道”，IDE0 称为 Primary 通道，IDE1 称为 Secondary 通道。也就是说，每个通道上分别有主盘和从盘。</p><p>让硬盘工作，需要通过读写硬盘控制器的端口，端口就是位于 IO 控制器上的寄存器，此处就是硬盘控制器上的寄存器。</p><p>如下是硬盘控制器主要端口寄存器：</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>端口分为两种，<code>Command Block registers</code> 用于向硬盘驱动器写入命令字或者从硬盘控制器获取硬盘状态。<code>Control Block registers</code> 用于控制硬盘工作状态。</p><p>下面重点介绍下 <code>Command Block registers</code> 组的寄存器。</p><ul><li>端口是按照通道给出的，一个通道上有主、从两块硬盘。想要操作某通道上的某块硬盘，需要通过寄存器指定。device 寄存器的第4 位用于指定通道上的主、从硬盘，0 位主盘，1 位从盘。</li><li>data 寄存器（16 位）负责管理数据，作用是读取或者写入数据。 <ul><li>在读硬盘时，硬盘准备好数据后，硬盘控制器便将其放在内部的缓冲区中，不断读此寄存器便是读出缓冲区中的全部数据。</li><li>在写硬盘时，我们要把数据源源不断的输送到此端口，数据被存入缓冲区里，硬盘控制器发现这个缓冲区中有数据了，便将此处的数据写入相应的扇区。</li></ul></li><li>err / features 寄存器（8 位），他两是一个寄存器。 <ul><li>在读取硬盘时，称为 err 寄存器，失败时有用，里面会记录失败的信息。</li><li>在写硬盘时，称为 features 寄存器，有些命令需要指定额外参数，这些参数就写在 feature 寄存器中。</li></ul></li><li>sector count 寄存器（8 位），用来指定待读取或待写入的扇区数。硬盘每完成一个扇区，就会将此寄存器的值减 1。如果中间失败了，此寄存器中值是尚未操作的扇区。8 位最大值为 255，如果指定为 0，表示要操作 256 个扇区。</li></ul><p>LBA（Logical Block Address）是一种逻辑上为扇区编址的方法，全称为逻辑块地址。LBA 有两种，一种是 LBA28，有 28 位，最大支持 <code>pow(2, 28) </code> 个扇区，每个扇区 512 字节，最大支持 128 GB。另外一种是 LBA48，有 48 位，最大支持 <code>pow(2, 48)</code> 个扇区，最大支持 128 PB。我们采用 LBA28 模式。</p><p>LBA 寄存器，有 LBA low、LBA mid、LBA high 三个，都是 8 位宽度的。分别存储 LBA 28 位地址的 <code>0 - 7</code> 位、<code>8 - 15</code> 位、<code>16 - 23</code> 位。剩余的 4 位使用 device 寄存器。</p><ul><li><p>device 寄存器（8 位），低 4 位（0 - 3 位）存储 LBA 地址的低 <code>24 - 27</code> 位。第 4 位指定通道上的主盘或从盘，0代表主盘，1 代表从盘。第 6 位用来设置是否启用 LBA 方式，1 代表启用 LBA 模式，0 代表启用 CHS 模式。另外的第 5 位和第 7 位固定为 1，称为 MBS 位，不用管。</p><img src="'+d+'" style="zoom:50%;"></li><li><p>status 寄存器（8 位），用在在读硬盘时，表示硬盘的状态信息。</p><ul><li>第 0 位是 ERR 位，如果此位为 1，表示出错，具体原因可见 err 寄存器。</li><li>第 3 位是 data request 位，如果此位为 1，表示硬盘已经把数据准备好了，主机现在可以把数据读取出来。</li><li>第 6 位是 DRDY 位，表示硬盘就绪，此位是在对硬盘诊断时用的，表示硬盘检测正常，可以继续执行一些命令</li><li>第 7 位是 BSY 位，表示硬盘是否繁忙，如果为 1 表示硬盘正忙着</li><li>其他位都无效，不用关注</li></ul><img src="'+c+`" style="zoom:50%;"></li><li><p>command 寄存器（8 位），command 寄存器和 status 寄存器是同一个寄存器。command 用在写硬盘时，用来存储让硬盘执行的命令，只要把命令写进此寄存器，硬盘就开始工作了。如下主要使用的三个命令</p><ul><li>identify：0xEC，即硬盘识别</li><li>read sector：0x20，即读扇区</li><li>write sector：0x30，即写扇区</li></ul><p>其中 identify 命令是获取硬盘的信息，用于获取硬盘的参数，此命令的返回结果是以字为单位。如下是返回信息：</p><ul><li>字偏移量（10 - 19）：硬盘序列号，长度为 20 的字符串</li><li>字偏移量（27 - 46）：硬盘型号，长度为 40 的字符串</li><li>字偏移量（60 - 61）：可供用户使用的扇区数，长度为 2 的整型</li></ul></li></ul><h3 id="二、操作硬盘的方法" tabindex="-1"><a class="header-anchor" href="#二、操作硬盘的方法"><span>二、操作硬盘的方法</span></a></h3><p>最主要的顺序是 command 寄存器一定得是最后写，因为一旦 command 寄存器被写入后，硬盘就开始工作了。如下我们约定一个顺序：</p><ol><li>先选择通道，往该通道的 sector count 寄存器中写入待操作的扇区数</li><li>往该通道上的三个 LBA 寄存器写入扇区起始地址的低 24 位</li><li>往 device 寄存器中写入 LBA 地址的 <code>24 - 27</code> 位，并置第 6 位为 1，使其为 LBA 模式，设置第 4 位，选择操作的硬盘（master 硬盘或 slave 硬盘）</li><li>往该通道上的 command 寄存器写入操作命令</li><li>读取该通道上的 status 寄存器，判断硬盘工作是否完成</li><li>如果以上步骤是读硬盘，进入下一个步骤。否则，完工</li><li>即那个硬盘数据读出</li></ol><p>硬盘工作完成，他已经准备好了数据，获取的方式如下几种：</p><ul><li>无条件传送方式</li><li>查询传送方式</li><li>中断传送方式</li><li>直接存储器存取方式（DMA）</li><li>I/O 处理机传送方式</li></ul><p>第一种无条件传送方式，数据源设备一定是随时准备好了数据，CPU 随时取、随时拿都没有问题，如寄存器、内存等设备，CPU 取数据不用提前打招呼</p><p>第二种查询传送方式，也称为 PIO 或程序 IO（ Programming Input/Output Model ）。传输前由程序先去检测设备的状态。数据源设备在一定条件下才能传送数据。CPU 需要数据时，先去检查该设备的状态，如果状态为准备好了，才能获取数据。硬盘中有 status 寄存器，存储了工作状态。这类数据通常是低速设备。这种方式需要 CPU 不断查询设备状态，只有最后一次的查询才是有意义的，效率低。</p><p>第三种中断传送方式，也称为中断驱动 IO。当数据源设备准备好数据后，通过发中断来通知 CPU 来拿数据。但中断方式下的 CPU 需要通过压栈来保护现场，还要执行传输指令，最后还要恢复现场。因此还有更高效的方案。</p><p>第四种直接存储器存取方式（DMA），不让 CPU 参与传输，完全由数据源设备和内存直接传输，CPU 直接从内存中拿数据即可。DMA 是由硬件实现，需要 DMA 控制才可以。此方式中，在数据输入之后或输出之前还是有一部分工作要由 CPU 来完成，如数据交换、组合、校验等。</p><p>第五种 IO 处理机传送方式，又引入了新的硬件：IO 处理机。专门用于处理 IO，也是一种处理器，只不过用的是另一套擅长 IO 的指令系统，随时可以处理数据。有了 IO 处理机的帮助，CPU 甚至可以不知道有传输这回事。</p><p>我们当前的系统使用第 2 、3 种方式来学习。</p><h3 id="三、让-mbr-使用硬盘" tabindex="-1"><a class="header-anchor" href="#三、让-mbr-使用硬盘"><span>三、让 MBR 使用硬盘</span></a></h3><p>使用 <code>xchg bx, bx</code> 进行 bochs 下断点调试</p><p>首先来看看头文件：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>; loader 和 kernel</span></span>
<span class="line"><span>LOADER_BASE_ADDR equ 0x900</span></span>
<span class="line"><span>LOADER_START_SECTOR equ 0x2</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下是 <code>mbr.s</code> 的实现：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>%include &quot;boot.inc&quot;</span></span>
<span class="line"><span>SECTION MBR vstart=0x7c00</span></span>
<span class="line"><span>mov ax, cs</span></span>
<span class="line"><span>mov ds, ax</span></span>
<span class="line"><span>mov es, ax</span></span>
<span class="line"><span>mov ss, ax</span></span>
<span class="line"><span>mov fs, ax</span></span>
<span class="line"><span>mov sp, 0x7c00</span></span>
<span class="line"><span>mov ax, 0xb800</span></span>
<span class="line"><span>mov gs, ax </span></span>
<span class="line"><span></span></span>
<span class="line"><span>; 清屏</span></span>
<span class="line"><span>mov ax, 0x600</span></span>
<span class="line"><span>mov bx, 0x700</span></span>
<span class="line"><span>mov cx, 0</span></span>
<span class="line"><span>mov dx, 0x184f</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int 0x10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; 操作显存</span></span>
<span class="line"><span>mov byte [gs:0x00], &#39;I&#39;</span></span>
<span class="line"><span>mov byte [gs:0x01], 0x9F</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x02], &#39; &#39;</span></span>
<span class="line"><span>mov byte [gs:0x03], 0x9F</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x04], &#39;M&#39;</span></span>
<span class="line"><span>mov byte [gs:0x05], 0x9F</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x06], &#39;B&#39;</span></span>
<span class="line"><span>mov byte [gs:0x07], 0x9F</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x08], &#39;R&#39;</span></span>
<span class="line"><span>mov byte [gs:0x09], 0x9F</span></span>
<span class="line"><span></span></span>
<span class="line"><span>xchg bx, bx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>; 起始扇区 LBA 地址</span></span>
<span class="line"><span>mov eax, LOADER_START_SECTOR</span></span>
<span class="line"><span>; 写入的地址</span></span>
<span class="line"><span>mov bx, LOADER_BASE_ADDR</span></span>
<span class="line"><span>; 待读入的扇区数</span></span>
<span class="line"><span>mov cx, 1</span></span>
<span class="line"><span>; 读取程序的起始部分</span></span>
<span class="line"><span>call rd_disk_m_16</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jmp LOADER_BASE_ADDR</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>; 读取硬盘的 N 个扇区</span></span>
<span class="line"><span>rd_disk_m_16:</span></span>
<span class="line"><span>    ; 备份 eax</span></span>
<span class="line"><span>    mov esi, eax</span></span>
<span class="line"><span>    ; 备份 cx</span></span>
<span class="line"><span>    mov di, cx</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; 如下为读写硬盘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; 第一步：设置要读取的扇区数</span></span>
<span class="line"><span>    mov dx, 0x1f2</span></span>
<span class="line"><span>    mov al, cl </span></span>
<span class="line"><span>    out dx, al   ; 设置要读取的扇区数</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mov eax, esi  ; 恢复 ax</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    ; 第二步：将 LBA 地址存入 0x1f3 - 0x1f6</span></span>
<span class="line"><span>    ; LBA 地址 7 - 0 位写入端口 0x1f3</span></span>
<span class="line"><span>    mov dx, 0x1f3</span></span>
<span class="line"><span>    out dx, al </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; LBA 地址 15 - 8 位写入端口 0x1f4</span></span>
<span class="line"><span>    mov cl, 8</span></span>
<span class="line"><span>    shr eax, cl</span></span>
<span class="line"><span>    mov dx, 0x1f4 </span></span>
<span class="line"><span>    out dx, al </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; LBA 地址 23 - 16 位写入端口 0x1f5</span></span>
<span class="line"><span>    shr eax, cl </span></span>
<span class="line"><span>    mov dx, 0x1f5</span></span>
<span class="line"><span>    out dx, al </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; LBA 地址 27 - 24 位写入端口 0x1f6</span></span>
<span class="line"><span>    ; 要使用 device 寄存器</span></span>
<span class="line"><span>    shr eax, cl </span></span>
<span class="line"><span>    and al, 0x0f  ; 只使用 al 的低 4 位用于 LBA 地址的 27 - 24 位</span></span>
<span class="line"><span>    ; 设置 device 寄存器的 7 - 4 位</span></span>
<span class="line"><span>    ; 第 5 、7 位固定为 1，第 6 位表示寻址模式，LBA:1, CHS:0</span></span>
<span class="line"><span>    ; 第 4 位表示主盘(0)还是从盘(0)</span></span>
<span class="line"><span>    or al, 0xe0</span></span>
<span class="line"><span>    mov dx, 0x1f6</span></span>
<span class="line"><span>    out dx, al </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; 第三步：向 0x1f7 端口写入读命令，0x20</span></span>
<span class="line"><span>    mov dx, 0x1f7</span></span>
<span class="line"><span>    mov al, 0x20</span></span>
<span class="line"><span>    out dx, al</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; 第四步：检测硬盘状态</span></span>
<span class="line"><span>    .not_ready:</span></span>
<span class="line"><span>    		; 空操作，为了增加延时</span></span>
<span class="line"><span>        nop</span></span>
<span class="line"><span>        ; 从 0x1f7 端口读信息，读到 al 寄存器中</span></span>
<span class="line"><span>        ; 0x1f7 端口在读的时候，对应的 status 寄存器中，第 3 位为 1 表示准备好数据，可以输出，第 7 位为 1 表示磁盘正忙</span></span>
<span class="line"><span>        in al, dx </span></span>
<span class="line"><span>        and al, 0x88</span></span>
<span class="line"><span>        cmp al, 0x08</span></span>
<span class="line"><span>        ; jnz 检测前一个操作的结果，如果非 0，则跳转</span></span>
<span class="line"><span>        jnz .not_ready</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    ; 第 5 步：从 0x1f0 端口读数据</span></span>
<span class="line"><span>    ; di 中是备份的 cx，也就是要读取的扇区数</span></span>
<span class="line"><span>    mov ax, di </span></span>
<span class="line"><span>    ; 一个扇区有 512 字节，所以读入一个字，需要 (di * 512 / 2) 次</span></span>
<span class="line"><span>    mov dx, 256</span></span>
<span class="line"><span>    ; mul 指令将源操作数和 ax 寄存器中值相乘，结果保存在 dx:ax 寄存器中</span></span>
<span class="line"><span>    mul dx </span></span>
<span class="line"><span>    mov cx, ax </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    mov dx, 0x1f0 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>    .go_on_read:</span></span>
<span class="line"><span>        in ax, dx </span></span>
<span class="line"><span>        ; 每次从 data 寄存器中读 2 字节，写到 bx 寄存器指向的内存；写一次给 bx 指向的位置加 2</span></span>
<span class="line"><span>        mov [bx], ax </span></span>
<span class="line"><span>        add bx, 2</span></span>
<span class="line"><span>        loop .go_on_read</span></span>
<span class="line"><span>        ret</span></span>
<span class="line"><span></span></span>
<span class="line"><span>times 510-($-$$) db 0</span></span>
<span class="line"><span>db 0x55, 0xaa</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如下是 <code>loader.s</code> 的实现：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>%include &quot;boot.inc&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>section loader vstart=LOADER_BASE_ADDR</span></span>
<span class="line"><span>mov ax, 0xb810</span></span>
<span class="line"><span>mov gs, ax </span></span>
<span class="line"><span></span></span>
<span class="line"><span>; 操作显存</span></span>
<span class="line"><span>mov byte [gs:0x00], &#39;2&#39;</span></span>
<span class="line"><span>mov byte [gs:0x01], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x02], &#39; &#39;</span></span>
<span class="line"><span>mov byte [gs:0x03], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x04], &#39;L&#39;</span></span>
<span class="line"><span>mov byte [gs:0x05], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x06], &#39;O&#39;</span></span>
<span class="line"><span>mov byte [gs:0x07], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x08], &#39;A&#39;</span></span>
<span class="line"><span>mov byte [gs:0x09], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x0a], &#39;D&#39;</span></span>
<span class="line"><span>mov byte [gs:0x0b], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x0c], &#39;E&#39;</span></span>
<span class="line"><span>mov byte [gs:0x0d], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mov byte [gs:0x0e], &#39;R&#39;</span></span>
<span class="line"><span>mov byte [gs:0x0f], 0xA4</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jmp $</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 bochs 的配置：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>megs: 32</span></span>
<span class="line"><span></span></span>
<span class="line"><span>romimage: file=&quot;/usr/local/share/bochs/BIOS-bochs-latest&quot;</span></span>
<span class="line"><span>vgaromimage: file=&quot;/usr/local/share/bochs/VGABIOS-lgpl-latest&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>boot: disk</span></span>
<span class="line"><span></span></span>
<span class="line"><span>log: bochs.out</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 增加此项，允许下断点调试</span></span>
<span class="line"><span>magic_break: enabled=1</span></span>
<span class="line"><span>display_library: x, options=&quot;gui_debug&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>mouse: enabled=0</span></span>
<span class="line"><span># keyboard: type=mf, serial_delay=250, paste_delay=100000, user_shortcut=none</span></span>
<span class="line"><span># map=/usr/local/share/bochs/keymaps/x11-pc-us.map</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ata0: enabled=1, ioaddr1=0x1f0, ioaddr2=0x3f0, irq=14</span></span>
<span class="line"><span>ata0-master: type=disk, path=&quot;a.img&quot;, mode=flat, cylinders=121, heads=16, spt=63</span></span>
<span class="line"><span></span></span>
<span class="line"><span># gdbstub: enabled=1, port=1234, text_base=0, data_base=0, bss_base=0</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后是编译调试：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>nasm -o mbr.bin mbr.s</span></span>
<span class="line"><span>nasm -o loader.bin loader.s</span></span>
<span class="line"><span>dd if=mbr.bin of=a.img bs=512 count=1 conv=notrunc</span></span>
<span class="line"><span>dd if=loader.bin of=a.img bs=512 count=1 seek=2 conv=notrunc</span></span>
<span class="line"><span>bochs -q -f bochsrc_01.txt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于代码中的一些重要的部分解释如下：</p><ul><li>我们为什么需要备份 eax 寄存器呢？因为 al 在 out 指令中会用到</li><li>包括 cx 寄存器也需要备份，因为 cx 一般用在循环时</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 硬盘的配置</span></span>
<span class="line"><span>ata0: enabled=1, ioaddr1=0x1f0, ioaddr2=0x3f0, irq=14</span></span>
<span class="line"><span>ata0-master: type=disk, path=&quot;a.img&quot;, mode=flat, cylinders=121, heads=16, spt=63</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上是硬盘的配置，我们的虚拟硬盘属于 ata0，是 Primary 通道，所以 sector count 寄存器是由 0x1f2 端口来访问。ata0-master 表明 <code>a.img</code> 是主盘。</p>`,43)]))}const u=n(v,[["render",r],["__file","5.操作硬盘.html.vue"]]),o=JSON.parse('{"path":"/%E6%8A%80%E6%9C%AF%E4%B8%93%E9%A2%98/%E6%89%8B%E5%86%99%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/6.%E7%A1%AC%E7%9B%98/5.%E6%93%8D%E4%BD%9C%E7%A1%AC%E7%9B%98.html","title":"4.操作硬盘","lang":"zh-CN","frontmatter":{"title":"4.操作硬盘","description":"操作硬盘 如下为机械硬盘 一、硬盘相关概念 CPU 通过 IO 接口与硬盘通信，针对硬盘的 IO 接口是“硬盘控制器”。硬盘控制器和硬盘是连接在一起的，是专门驱动硬盘设备的模块电路。这种接口也称为集成设备电路（Integrated Drive Electronics，IDE）。后来，又将此接口使用的技术规范归纳成全球硬盘标准，于是产生了 ATA（Adv...","head":[["meta",{"property":"og:url","content":"https://noahyz.github.io/%E6%8A%80%E6%9C%AF%E4%B8%93%E9%A2%98/%E6%89%8B%E5%86%99%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/6.%E7%A1%AC%E7%9B%98/5.%E6%93%8D%E4%BD%9C%E7%A1%AC%E7%9B%98.html"}],["meta",{"property":"og:site_name","content":"noahyz的博客"}],["meta",{"property":"og:title","content":"4.操作硬盘"}],["meta",{"property":"og:description","content":"操作硬盘 如下为机械硬盘 一、硬盘相关概念 CPU 通过 IO 接口与硬盘通信，针对硬盘的 IO 接口是“硬盘控制器”。硬盘控制器和硬盘是连接在一起的，是专门驱动硬盘设备的模块电路。这种接口也称为集成设备电路（Integrated Drive Electronics，IDE）。后来，又将此接口使用的技术规范归纳成全球硬盘标准，于是产生了 ATA（Adv..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"noahyz"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"4.操作硬盘\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"noahyz\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":2,"title":"操作硬盘","slug":"操作硬盘","link":"#操作硬盘","children":[{"level":3,"title":"一、硬盘相关概念","slug":"一、硬盘相关概念","link":"#一、硬盘相关概念","children":[]},{"level":3,"title":"二、操作硬盘的方法","slug":"二、操作硬盘的方法","link":"#二、操作硬盘的方法","children":[]},{"level":3,"title":"三、让 MBR 使用硬盘","slug":"三、让-mbr-使用硬盘","link":"#三、让-mbr-使用硬盘","children":[]}]}],"git":{},"readingTime":{"minutes":10.83,"words":3248},"filePathRelative":"技术专题/手写操作系统/6.硬盘/5.操作硬盘.md","excerpt":"<h2>操作硬盘</h2>\\n<p>如下为机械硬盘</p>\\n<figure><figcaption></figcaption></figure>\\n<h3>一、硬盘相关概念</h3>\\n<p>CPU 通过 IO 接口与硬盘通信，针对硬盘的 IO 接口是“硬盘控制器”。硬盘控制器和硬盘是连接在一起的，是专门驱动硬盘设备的模块电路。这种接口也称为集成设备电路（Integrated Drive Electronics，IDE）。后来，又将此接口使用的技术规范归纳成全球硬盘标准，于是产生了 ATA（Advanced Technology Attachment）。硬盘串行接口称为（Serial ATA，SATA），硬盘并行接口称为（Parallel ATA，PATA）。</p>","autoDesc":true}');export{u as comp,o as data};
