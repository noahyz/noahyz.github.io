import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,o as a,e as l}from"./app-Byep4MDf.js";const i={},e=l(`<h1 id="linux-源码安装mysql" tabindex="-1"><a class="header-anchor" href="#linux-源码安装mysql"><span>linux 源码安装mysql</span></a></h1><h3 id="linux-源码安装mysql-1" tabindex="-1"><a class="header-anchor" href="#linux-源码安装mysql-1"><span>linux 源码安装mysql</span></a></h3><ul><li>mysql各种版本下载网址：<a href="https://downloads.mysql.com/archives/community/" target="_blank" rel="noopener noreferrer">https://downloads.mysql.com/archives/community/</a></li><li>选择自己需要的mysql版本，并且一定要选对linux版本号，看清楚是64位还是32位。</li></ul><ol><li>将安装包解压到指定目录下,先创建目录</li></ol><p><code>mkdir -p /path/myenv</code></p><p><code>tar -xzvf mysql-5.6.28-linux-glibc2.5-x86_64.tar.gz -C /path/myenv/</code><br> 2. 去指定目录下，方便以后操作修改mysql文件夹名字</p><p><code>mv mysql-5.6.28-linux-glibc2.5-x86_64/ mysql5.6</code><br> 3. 可选：创建mysql用户组以及用户</p><p><code>groupadd mysql</code></p><p><code>useradd -r -g mysql mysql</code><br> 4. 可选：设置安装目录的访问权限</p><p><code>chown -R mysql /path/myenv/mysql</code></p><p><code>chgrp -R mysql /path/myenv/mysql</code><br> 5. 配置mysql 环境变量</p><p>在 /etc/profile 文件中添加如下一句，即可永久将mysql添加到环境变量中。</p><p><code>export PATH=/path/myenv/mysql5.6/bin:$PATH</code></p><p>在shell中执行,刷新一下</p><p><code>source /etc/profile</code><br> 6. 然后到了配置mysql的环节，一般mysql的配置文件在/etc/my.cnf中，如果你的系统没有这个文件请创建，如果你想将这个配置文件放在别的地方请自行设置。下面我将介绍一个这个配置文件中的参数意义。有点长，如有必要，请耐心看完。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 客户端设置</span></span>
<span class="line"><span>[client]</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span># 默认情况下，socket文件应为/usr/local/mysql/mysql.socket,所以可以ln -s xx  /tmp/mysql.sock</span></span>
<span class="line"><span>socket = /tmp/mysql.sock </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 服务端设置</span></span>
<span class="line"><span>[mysqld]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 基础信息</span></span>
<span class="line"><span>#Mysql服务的唯一编号 每个mysql服务Id需唯一</span></span>
<span class="line"><span>server-id = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#服务端口号 默认3306</span></span>
<span class="line"><span>port = 3306</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动mysql服务进程的用户</span></span>
<span class="line"><span>user = mysql</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 安装目录相关</span></span>
<span class="line"><span># mysql安装根目录</span></span>
<span class="line"><span>basedir = /path/myenv/mysql5.6</span></span>
<span class="line"><span></span></span>
<span class="line"><span># mysql数据文件所在位置</span></span>
<span class="line"><span>datadir = /path/myenv/mysql5.6/data</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 临时目录 比如load data infile会用到,一般都是使用/tmp</span></span>
<span class="line"><span>tmpdir  = /tmp</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置socke文件地址</span></span>
<span class="line"><span>socket  = /tmp/mysql.sock</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 事务隔离级别，默认为可重复读（REPEATABLE-READ）。（此级别下可能参数很多间隙锁，影响性能，但是修改又影响主从复制及灾难恢复，建议还是修改代码逻辑吧）</span></span>
<span class="line"><span># 隔离级别可选项目：READ-UNCOMMITTED  READ-COMMITTED  REPEATABLE-READ  SERIALIZABLE</span></span>
<span class="line"><span># transaction_isolation = READ-COMMITTED</span></span>
<span class="line"><span>transaction_isolation = REPEATABLE-READ</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 数据库引擎与字符集相关设置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># mysql 5.1 之后，默认引擎就是InnoDB了</span></span>
<span class="line"><span>default_storage_engine = InnoDB</span></span>
<span class="line"><span># 内存临时表默认引擎，默认InnoDB</span></span>
<span class="line"><span>default_tmp_storage_engine = InnoDB</span></span>
<span class="line"><span># mysql 5.7新增特性，磁盘临时表默认引擎，默认InnoDB</span></span>
<span class="line"><span>internal_tmp_disk_storage_engine = InnoDB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#数据库默认字符集,主流字符集支持一些特殊表情符号（特殊表情符占用4个字节）</span></span>
<span class="line"><span>character-set-server = utf8</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#数据库字符集对应一些排序等规则，注意要和character-set-server对应</span></span>
<span class="line"><span>collation-server = utf8_general_ci</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置client连接mysql时的字符集,防止乱码</span></span>
<span class="line"><span># init_connect=&#39;SET NAMES utf8&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 是否对sql语句大小写敏感，默认值为0，1表示不敏感</span></span>
<span class="line"><span>lower_case_table_names = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 数据库连接相关设置</span></span>
<span class="line"><span># 最大连接数，可设最大值16384，一般考虑根据同时在线人数设置一个比较综合的数字，鉴于该数值增大并不太消耗系统资源，建议直接设10000</span></span>
<span class="line"><span># 如果在访问时经常出现Too Many Connections的错误提示，则需要增大该参数值</span></span>
<span class="line"><span>max_connections = 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 默认值100，最大错误连接数，如果有超出该参数值个数的中断错误连接，则该主机将被禁止连接。如需对该主机进行解禁，执行：FLUSH HOST</span></span>
<span class="line"><span># 考虑高并发场景下的容错，建议加大。</span></span>
<span class="line"><span>max_connect_errors = 10000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># MySQL打开的文件描述符限制，默认最小1024;</span></span>
<span class="line"><span># 当open_files_limit没有被配置的时候，比较max_connections*5和ulimit -n的值，哪个大用哪个，</span></span>
<span class="line"><span># 当open_file_limit被配置的时候，比较open_files_limit和max_connections*5的值，哪个大用哪个。</span></span>
<span class="line"><span>open_files_limit = 65535</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 注意：仍然可能出现报错信息Can&#39;t create a new thread；此时观察系统cat /proc/mysql进程号/limits，观察进程ulimit限制情况</span></span>
<span class="line"><span># 过小的话，考虑修改系统配置表，/etc/security/limits.conf和/etc/security/limits.d/90-nproc.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span># MySQL默认的wait_timeout  值为8个小时, interactive_timeout参数需要同时配置才能生效</span></span>
<span class="line"><span># MySQL连接闲置超过一定时间后(单位：秒，此处为1800秒)将会被强行关闭</span></span>
<span class="line"><span>interactive_timeout = 1800 </span></span>
<span class="line"><span>wait_timeout = 1800 </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在MySQL暂时停止响应新请求之前的短时间内多少个请求可以被存在堆栈中 </span></span>
<span class="line"><span># 官方建议back_log = 50 + (max_connections / 5),封顶数为900</span></span>
<span class="line"><span>back_log = 900</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 数据库数据交换设置</span></span>
<span class="line"><span># 该参数限制服务器端，接受的数据包大小，如果有BLOB子段，建议增大此值，避免写入或者更新出错。有BLOB子段，建议改为1024M</span></span>
<span class="line"><span>max_allowed_packet = 128M</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 内存，cache与buffer设置</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 内存临时表的最大值,默认16M，此处设置成128M</span></span>
<span class="line"><span>tmp_table_size = 64M</span></span>
<span class="line"><span># 用户创建的内存表的大小，默认16M，往往和tmp_table_size一起设置，限制用户临师表大小。</span></span>
<span class="line"><span># 超限的话，MySQL就会自动地把它转化为基于磁盘的MyISAM表，存储在指定的tmpdir目录下，增大IO压力，建议内存大，增大该数值。</span></span>
<span class="line"><span>max_heap_table_size = 64M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 表示这个mysql版本是否支持查询缓存。ps：SHOW STATUS LIKE &#39;qcache%&#39;，与缓存相关的状态变量。</span></span>
<span class="line"><span># have_query_cache</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 这个系统变量控制着查询缓存工能的开启的关闭，0时表示关闭，1时表示打开，2表示只要select 中明确指定SQL_CACHE才缓存。</span></span>
<span class="line"><span># 看业务场景决定是否使用缓存，不使用，下面就不用配置了。</span></span>
<span class="line"><span>query_cache_type = 0 </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 默认值1M，优点是查询缓冲可以极大的提高服务器速度, 如果你有大量的相同的查询并且很少修改表。</span></span>
<span class="line"><span># 缺点：在你表经常变化的情况下或者如果你的查询原文每次都不同,查询缓冲也许引起性能下降而不是性能提升。</span></span>
<span class="line"><span>query_cache_size = 64M </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 只有小于此设定值的结果才会被缓冲，保护查询缓冲,防止一个极大的结果集将其他所有的查询结果都覆盖。</span></span>
<span class="line"><span>query_cache_limit = 2M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 每个被缓存的结果集要占用的最小内存,默认值4kb，一般不怎么调整。</span></span>
<span class="line"><span># 如果Qcache_free_blocks值过大，可能是query_cache_min_res_unit值过大，应该调小些</span></span>
<span class="line"><span># query_cache_min_res_unit的估计值：(query_cache_size - Qcache_free_memory) / Qcache_queries_in_cache</span></span>
<span class="line"><span>query_cache_min_res_unit = 4kb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在一个事务中binlog为了记录SQL状态所持有的cache大小</span></span>
<span class="line"><span># 如果你经常使用大的,多声明的事务,你可以增加此值来获取更大的性能.</span></span>
<span class="line"><span># 所有从事务来的状态都将被缓冲在binlog缓冲中然后在提交后一次性写入到binlog中</span></span>
<span class="line"><span># 如果事务比此值大, 会使用磁盘上的临时文件来替代.</span></span>
<span class="line"><span># 此缓冲在每个连接的事务第一次更新状态时被创建</span></span>
<span class="line"><span>binlog_cache_size = 1M</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#*** MyISAM 相关选项</span></span>
<span class="line"><span># 指定索引缓冲区的大小, 为MYISAM数据表开启供线程共享的索引缓存,对INNODB引擎无效。相当影响MyISAM的性能。</span></span>
<span class="line"><span># 不要将其设置大于你可用内存的30%,因为一部分内存同样被OS用来缓冲行数据</span></span>
<span class="line"><span># 甚至在你并不使用MyISAM 表的情况下, 你也需要仍旧设置起 8-64M 内存由于它同样会被内部临时磁盘表使用.</span></span>
<span class="line"><span># 默认值 8M，建议值：对于内存在4GB左右的服务器该参数可设置为256M或384M。注意：该参数值设置的过大反而会是服务器整体效率降低！</span></span>
<span class="line"><span>key_buffer_size = 64M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 为每个扫描MyISAM的线程分配参数设置的内存大小缓冲区。 </span></span>
<span class="line"><span># 默认值128kb，建议值：16G内存建议1M，4G：128kb或者256kb吧</span></span>
<span class="line"><span># 注意，该缓冲区是每个连接独占的，所以总缓冲区大小为 128kb*连接数；极端情况128kb*maxconnectiosns，会超级大，所以要考虑日常平均连接数。</span></span>
<span class="line"><span># 一般不需要太关心该数值，稍微增大就可以了，</span></span>
<span class="line"><span>read_buffer_size = 262144 </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 支持任何存储引擎</span></span>
<span class="line"><span># MySQL的随机读缓冲区大小，适当增大，可以提高性能。</span></span>
<span class="line"><span># 默认值256kb；建议值：得参考连接数，16G内存，有人推荐8M</span></span>
<span class="line"><span># 注意，该缓冲区是每个连接独占的，所以总缓冲区大小为128kb*连接数；极端情况128kb*maxconnectiosns，会超级大，所以要考虑日常平均连接数。</span></span>
<span class="line"><span>read_rnd_buffer_size = 1M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># order by或group by时用到 </span></span>
<span class="line"><span># 支持所有引擎，innodb和myisam有自己的innodb_sort_buffer_size和myisam_sort_buffer_size设置</span></span>
<span class="line"><span># 默认值256kb；建议值：得参考连接数，16G内存，有人推荐8M.</span></span>
<span class="line"><span># 注意，该缓冲区是每个连接独占的，所以总缓冲区大小为 1M*连接数；极端情况1M*maxconnectiosns，会超级大。所以要考虑日常平均连接数。</span></span>
<span class="line"><span>sort_buffer_size = 1M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 此缓冲被使用来优化全联合(full JOINs 不带索引的联合)</span></span>
<span class="line"><span># 类似的联合在极大多数情况下有非常糟糕的性能表现,但是将此值设大能够减轻性能影响.</span></span>
<span class="line"><span># 通过 “Select_full_join” 状态变量查看全联合的数量</span></span>
<span class="line"><span># 注意，该缓冲区是每个连接独占的，所以总缓冲区大小为 1M*连接数；极端情况1M*maxconnectiosns，会超级大。所以要考虑日常平均连接数。</span></span>
<span class="line"><span># 默认值256kb;建议值：16G内存，设置8M.</span></span>
<span class="line"><span>join_buffer_size = 1M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 缓存linux文件描述符信息，加快数据文件打开速度</span></span>
<span class="line"><span># 它影响myisam表的打开关闭，但是不影响innodb表的打开关闭。</span></span>
<span class="line"><span># 默认值2000，建议值：根据状态变量Opened_tables去设定</span></span>
<span class="line"><span>table_open_cache = 2000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 缓存表定义的相关信息，加快读取表信息速度</span></span>
<span class="line"><span># 默认值1400，最大值2000，建议值：基本不改。</span></span>
<span class="line"><span>table_definition_cache = 1400</span></span>
<span class="line"><span># 该参数是myssql 5.6后引入的，目的是提高并发。</span></span>
<span class="line"><span># 默认值1，建议值：cpu核数，并且&lt;=16</span></span>
<span class="line"><span>table_open_cache_instances = 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 当客户端断开之后，服务器处理此客户的线程将会缓存起来以响应下一个客户而不是销毁。可重用，减小了系统开销。</span></span>
<span class="line"><span># 默认值为9，建议值：两种取值方式，方式一，根据物理内存，1G  —&gt; 8；2G  —&gt; 16； 3G  —&gt; 32； &gt;3G  —&gt; 64；</span></span>
<span class="line"><span># 方式二，根据show status like  &#39;threads%&#39;，查看Threads_connected值。</span></span>
<span class="line"><span>thread_cache_size = 16</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 默认值256k,建议值：16/32G内存，512kb，其他一般不改变，如果报错：Thread stack overrun，就增大看看,</span></span>
<span class="line"><span># 注意，每个线程分配内存空间，所以总内存空间。。。你懂得。</span></span>
<span class="line"><span>thread_stack = 512k</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 日志文件相关设置，一般只开启三种日志，错误日志，慢查询日志，二进制日志。普通查询日志不开启。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 普通查询日志，默认值off，不开启</span></span>
<span class="line"><span>general_log = 0</span></span>
<span class="line"><span># 普通查询日志存放地址</span></span>
<span class="line"><span>general_log_file = /path/myenv/mysql5.6/log/mysql-general.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 全局动态变量，默认3，范围：1～3</span></span>
<span class="line"><span># 表示错误日志记录的信息，1：只记录error信息；2：记录error和warnings信息；3：记录error、warnings和普通的notes信息。</span></span>
<span class="line"><span>log_error_verbosity = 2</span></span>
<span class="line"><span># 错误日志文件地址</span></span>
<span class="line"><span>log_error = /path/myenv/mysql5.6/log/mysql-error.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启慢查询</span></span>
<span class="line"><span>slow_query_log = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启慢查询时间，此处为1秒，达到此值才记录数据</span></span>
<span class="line"><span>long_query_time = 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 检索行数达到此数值，才记录慢查询日志中</span></span>
<span class="line"><span>min_examined_row_limit = 100</span></span>
<span class="line"><span></span></span>
<span class="line"><span># mysql 5.6.5新增，用来表示每分钟允许记录到slow log的且未使用索引的SQL语句次数，默认值为0，不限制。</span></span>
<span class="line"><span>log_throttle_queries_not_using_indexes = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 慢查询日志文件地址</span></span>
<span class="line"><span>slow_query_log_file = /path/myenv/mysql5.6/log/mysql-slow.log</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启记录没有使用索引查询语句</span></span>
<span class="line"><span>log-queries-not-using-indexes = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开启二进制日志</span></span>
<span class="line"><span>log_bin = /path/myenv/mysql5.6/log/mysql-bin.log</span></span>
<span class="line"><span># mysql清除过期日志的时间，默认值0，不自动清理，而是使用滚动循环的方式。</span></span>
<span class="line"><span>expire_logs_days = 0</span></span>
<span class="line"><span># 如果二进制日志写入的内容超出给定值，日志就会发生滚动。你不能将该变量设置为大于1GB或小于4096字节。 默认值是1GB。</span></span>
<span class="line"><span>max_binlog_size = 1000M</span></span>
<span class="line"><span># binlog的格式也有三种：STATEMENT，ROW，MIXED。mysql 5.7.7后，默认值从 MIXED 改为 ROW</span></span>
<span class="line"><span># 关于binlog日志格式问题，请查阅网络资料</span></span>
<span class="line"><span>binlog_format = row</span></span>
<span class="line"><span># 默认值N=1，使binlog在每N次binlog写入后与硬盘同步，ps：1最慢</span></span>
<span class="line"><span># sync_binlog = 1 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># innodb选项</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：该参数可以提升扩展性和刷脏页性能。</span></span>
<span class="line"><span># 默认值1，建议值：4-8；并且必须小于innodb_buffer_pool_instances</span></span>
<span class="line"><span>innodb_page_cleaners = 4</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：一般8k和16k中选择，8k的话，cpu消耗小些，selcet效率高一点，一般不用改</span></span>
<span class="line"><span># 默认值：16k；建议值：不改，</span></span>
<span class="line"><span>innodb_page_size = 16384</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：InnoDB使用一个缓冲池来保存索引和原始数据, 不像MyISAM.这里你设置越大,你在存取表里面数据时所需要的磁盘I/O越少.</span></span>
<span class="line"><span># 在一个独立使用的数据库服务器上,你可以设置这个变量到服务器物理内存大小的60%-80%</span></span>
<span class="line"><span># 注意别设置的过大，会导致system的swap空间被占用，导致操作系统变慢，从而减低sql查询的效率</span></span>
<span class="line"><span># 默认值：128M，建议值：物理内存的60%-80%</span></span>
<span class="line"><span>innodb_buffer_pool_size = 512M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明:只有当设置 innodb_buffer_pool_size 值大于1G时才有意义，小于1G，instances默认为1，大于1G，instances默认为8</span></span>
<span class="line"><span># 但是网络上有评价，最佳性能，每个实例至少1G大小。</span></span>
<span class="line"><span># 默认值：1或8，建议值：innodb_buffer_pool_size/innodb_buffer_pool_instances &gt;= 1G</span></span>
<span class="line"><span>innodb_buffer_pool_instances = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：mysql 5.7 新特性，defines the chunk size for online InnoDB buffer pool resizing operations.</span></span>
<span class="line"><span># 实际缓冲区大小必须为innodb_buffer_pool_chunk_size*innodb_buffer_pool_instances*倍数，取略大于innodb_buffer_pool_size</span></span>
<span class="line"><span># 默认值128M，建议值：默认值就好，乱改反而容易出问题，它会影响实际buffer pool大小。</span></span>
<span class="line"><span>innodb_buffer_pool_chunk_size = 128M </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在启动时把热数据加载到内存。默认值为on，不修改</span></span>
<span class="line"><span>innodb_buffer_pool_load_at_startup = 1</span></span>
<span class="line"><span># 在关闭时把热数据dump到本地磁盘。默认值为on，不修改</span></span>
<span class="line"><span>innodb_buffer_pool_dump_at_shutdown = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：影响Innodb缓冲区的刷新算法，建议从小到大配置，直到zero free pages；innodb_lru_scan_depth * innodb_buffer_pool_instances defines the amount of work performed by the page cleaner thread each second.</span></span>
<span class="line"><span># 默认值1024，建议值: 未知</span></span>
<span class="line"><span>innodb_lru_scan_depth = 1024</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：事务等待获取资源等待的最长时间，单位为秒，看具体业务情况，一般默认值就好</span></span>
<span class="line"><span># 默认值：50，建议值：看业务。</span></span>
<span class="line"><span>innodb_lock_wait_timeout = 60</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：设置了Mysql后台任务（例如页刷新和merge dadta from buffer pool）每秒io操作的上限。</span></span>
<span class="line"><span># 默认值：200，建议值：方法一，单盘sata设100，sas10，raid10设200，ssd设2000，fushion-io设50000；方法二，通过测试工具获得磁盘io性能后，设置IOPS数值/2。</span></span>
<span class="line"><span>innodb_io_capacity = 2000</span></span>
<span class="line"><span># 说明：该参数是所有缓冲区线程io操作的总上限。</span></span>
<span class="line"><span># 默认值：innodb_io_capacity的两倍。建议值：例如用iometer测试后的iops数值就好</span></span>
<span class="line"><span>innodb_io_capacity_max = 4000</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：控制着innodb数据文件及redo log的打开、刷写模式，三种模式：fdatasync(默认)，O_DSYNC，O_DIRECT</span></span>
<span class="line"><span># fdatasync：数据文件，buffer pool-&gt;os buffer-&gt;磁盘；日志文件，buffer pool-&gt;os buffer-&gt;磁盘；</span></span>
<span class="line"><span># O_DSYNC：  数据文件，buffer pool-&gt;os buffer-&gt;磁盘；日志文件，buffer pool-&gt;磁盘；</span></span>
<span class="line"><span># O_DIRECT： 数据文件，buffer pool-&gt;磁盘；           日志文件，buffer pool-&gt;os buffer-&gt;磁盘；</span></span>
<span class="line"><span># 默认值为空，建议值：使用SAN或者raid，建议用O_DIRECT，不懂测试的话，默认生产上使用O_DIRECT</span></span>
<span class="line"><span>innodb_flush_method = O_DIRECT</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：mysql5.7之后默认开启，意思是，每张表一个独立表空间。</span></span>
<span class="line"><span># 默认值1，开启</span></span>
<span class="line"><span>innodb_file_per_table = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：The path where InnoDB creates undo tablespaces.通常等于undo log文件的存放目录。</span></span>
<span class="line"><span># 默认值./;自行设置</span></span>
<span class="line"><span>innodb_undo_directory = /path/myenv/mysql5.6/log</span></span>
<span class="line"><span># 说明：The number of undo tablespaces used by InnoDB.等于undo log文件数量。5.7.21后开始弃用</span></span>
<span class="line"><span># 默认值为0，建议默认值就好，不用调整了。</span></span>
<span class="line"><span>innodb_undo_tablespaces = 0</span></span>
<span class="line"><span># 说明：定义undo使用的回滚段数量。5.7.19后弃用</span></span>
<span class="line"><span># 默认值128，建议不动，以后弃用了。</span></span>
<span class="line"><span>innodb_undo_logs = 128</span></span>
<span class="line"><span># 说明：5.7.5后开始使用，在线收缩undo log使用的空间。</span></span>
<span class="line"><span># 默认值：关闭，建议值：开启</span></span>
<span class="line"><span>innodb_undo_log_truncate = 1</span></span>
<span class="line"><span># 说明：结合innodb_undo_log_truncate，实现undo空间收缩功能</span></span>
<span class="line"><span># 默认值：1G，建议值，不改。</span></span>
<span class="line"><span>innodb_max_undo_log_size = 1G</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：重作日志文件的存放目录</span></span>
<span class="line"><span>innodb_log_group_home_dir = /path/myenv/mysql5.6/log</span></span>
<span class="line"><span># 说明：日志文件的大小</span></span>
<span class="line"><span># 默认值:48M,建议值：根据你系统的磁盘空间和日志增长情况调整大小</span></span>
<span class="line"><span>innodb_log_file_size = 128M</span></span>
<span class="line"><span># 说明：日志组中的文件数量，mysql以循环方式写入日志</span></span>
<span class="line"><span># 默认值2，建议值：根据你系统的磁盘空间和日志增长情况调整大小</span></span>
<span class="line"><span>innodb_log_files_in_group = 3</span></span>
<span class="line"><span># 此参数确定些日志文件所用的内存大小，以M为单位。缓冲区更大能提高性能，但意外的故障将会丢失数据。MySQL开发人员建议设置为1－8M之间</span></span>
<span class="line"><span>innodb_log_buffer_size = 16M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：可以控制log从系统buffer刷入磁盘文件的刷新频率，增大可减轻系统负荷</span></span>
<span class="line"><span># 默认值是1；建议值不改。系统性能一般够用。</span></span>
<span class="line"><span>innodb_flush_log_at_timeout = 1</span></span>
<span class="line"><span># 说明：参数可设为0，1，2；</span></span>
<span class="line"><span># 参数0：表示每秒将log buffer内容刷新到系统buffer中，再调用系统flush操作写入磁盘文件。</span></span>
<span class="line"><span># 参数1：表示每次事物提交，将log buffer内容刷新到系统buffer中，再调用系统flush操作写入磁盘文件。</span></span>
<span class="line"><span># 参数2：表示每次事物提交，将log buffer内容刷新到系统buffer中，隔1秒后再调用系统flush操作写入磁盘文件。</span></span>
<span class="line"><span>innodb_flush_log_at_trx_commit = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：限制Innodb能打开的表的数据，如果库里的表特别多的情况，请增加这个。</span></span>
<span class="line"><span># 值默认是2000，建议值：参考数据库表总数再进行调整，一般够用不用调整。</span></span>
<span class="line"><span>innodb_open_files = 8192</span></span>
<span class="line"><span></span></span>
<span class="line"><span># innodb处理io读写的后台并发线程数量，根据cpu核来确认，取值范围：1-64</span></span>
<span class="line"><span># 默认值：4，建议值：与逻辑cpu数量的一半保持一致。</span></span>
<span class="line"><span>innodb_read_io_threads = 4</span></span>
<span class="line"><span>innodb_write_io_threads = 4</span></span>
<span class="line"><span># 默认设置为 0,表示不限制并发数，这里推荐设置为0，更好去发挥CPU多核处理能力，提高并发量</span></span>
<span class="line"><span>innodb_thread_concurrency = 0</span></span>
<span class="line"><span># 默认值为4，建议不变。InnoDB中的清除操作是一类定期回收无用数据的操作。mysql 5.5之后，支持多线程清除操作。</span></span>
<span class="line"><span>innodb_purge_threads = 4 </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：mysql缓冲区分为new blocks和old blocks；此参数表示old blocks占比；</span></span>
<span class="line"><span># 默认值：37，建议值，一般不动</span></span>
<span class="line"><span>innodb_old_blocks_pct = 37</span></span>
<span class="line"><span># 说明：新数据被载入缓冲池，进入old pages链区，当1秒后再次访问，则提升进入new pages链区。</span></span>
<span class="line"><span># 默认值：1000</span></span>
<span class="line"><span>innodb_old_blocks_time=1000</span></span>
<span class="line"><span># 说明：开启异步io，可以提高并发性，默认开启。</span></span>
<span class="line"><span># 默认值为1，建议不动</span></span>
<span class="line"><span>innodb_use_native_aio = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：默认为空，使用data目录，一般不改。</span></span>
<span class="line"><span>innodb_data_home_dir=/path/myenv/mysql5.6/data</span></span>
<span class="line"><span># 说明：Defines the name, size, and attributes of InnoDB system tablespace data files.</span></span>
<span class="line"><span># 默认值，不指定，默认为ibdata1:12M:autoextend</span></span>
<span class="line"><span>innodb_data_file_path = ibdata1:12M:autoextend</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明:设置了InnoDB存储引擎用来存放数据字典信息以及一些内部数据结构的内存空间大小,除非你的数据对象及其多，否则一般默认不改。</span></span>
<span class="line"><span># innodb_additional_mem_pool_size = 16M</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 说明：The crash recovery mode。只有紧急情况需要恢复数据的时候，才改为大于1-6之间数值，含义查下官网。</span></span>
<span class="line"><span># 默认值为0；</span></span>
<span class="line"><span>#innodb_force_recovery = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##########################################################################################################</span></span>
<span class="line"><span># 其他。。。。</span></span>
<span class="line"><span># 参考http://www.kuqin.com/database/20120815/328905.html</span></span>
<span class="line"><span># skip-external-locking</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 禁止MySQL对外部连接进行DNS解析，使用这一选项可以消除MySQL进行DNS解析的时间。</span></span>
<span class="line"><span># 缺点：所有远程主机连接授权都要使用IP地址方式，因为只认得ip地址了。</span></span>
<span class="line"><span># skip_name_resolve = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 默认值为off,timestamp列会自动更新为当前时间，设置为on|1，timestamp列的值就要显式更新</span></span>
<span class="line"><span>explicit_defaults_for_timestamp = 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysqldump]</span></span>
<span class="line"><span># quick选项强制 mysqldump 从服务器查询取得记录直接输出而不是取得所有记录后将它们缓存到内存中</span></span>
<span class="line"><span>quick</span></span>
<span class="line"><span>max_allowed_packet = 16M</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[mysql]</span></span>
<span class="line"><span># mysql命令行工具不使用自动补全功能，建议还是改为</span></span>
<span class="line"><span># no-auto-rehash</span></span>
<span class="line"><span>auto-rehash</span></span>
<span class="line"><span>socket = /tmp/mysql.sock</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>配置mysql服务</li></ol><p>/etc/init.d 下都是用来放服务脚本的，当linux 启动时，会寻找这些目录中的服务脚本，并根据脚本的run level确定不同的启动级别。将mysql.server 放置其下为了可以开机启动。</p><p><code>cp /path/myenv/mysql5.6/support-files/mysql.server /etc/init.d/mysqld</code></p><p>设置mysqld 的权限,可根据自己实际要求设置</p><p><code>chmod 777 /etc/init.d/mysqld</code></p><p>将mysqld添加到系统服务</p><p><code>chkconfig --add mysqld</code></p><p>设置mysqld 为开机自启动</p><p><code>chkconfig --level 2345 mysqld on</code></p><p>增加快捷方式到系统</p><p><code>ln -s /path/myenv/mysql5.6/bin/mysqld /usr/local/mysql/bin/mysqld</code><br> 2. 初始化数据，进入到/path/myenv/mysql5.6/scripts 目录下去执行</p><p><code>./mysql_install_db --verbose --user=root --defaults-file=/etc/my.cnf --basedir=/path/myenv/mysql5.6 --datadir=/path/myenv/mysql5.6/data --pid-file=/path/myenv/mysql5.6/data/mysql.pid --tmpdir=/tmp/</code></p><p>针对以上的命令以及参数进行解释： * mysql_install_db 是一个初始化脚本，运行这个脚本，会初始化mysql的data目录，并且会创建那些系统表，同样也会初始化系统表空间并且关联innodb表与数据结构。<br> * 截止mysql5.6.8版本，在unix平台，mysql_install_db创建一个被命名为 my.cnf 默认的参数文件在base安装目录，而这个my.cnf 是根据 ../mysql5.6/support-files/my-default.cnf 所创建。<br> * 参数中 --user：运行mysqld的系统用户名，通过mysqld创建的文件和目录的归属者将为该用户。--basedir和--datadir：代表mysql的安装目录和数据存放目录。--defaults-file：使用被提供的选项文件，如。etc/my.cnf。--no-defaults：不读取任何选项文件，该选项在mysql_install_db启动时，若因为读取了未知的参数而启动失败时使用。--verbose：verbose模式，打印更多关于这个程序的信息</p><ol start="3"><li>启动mysql，在/mysql5.6/bin目录下</li></ol><p><code>./mysqld_safe --defaults-file=/etc/my.cnf --socket=/tmp/mysql.sock --user=root &amp;</code> * mysql_safe 相比于mysqld 增加了一些安全特性，例如在出现错误时重启服务器并向错误日志文件写入运行时间信息。mysqld_safe 脚本会在启动MYSQL服务器后继续监视其运行情况，并在其死机时重启。<br> * 一些参数的说明请查看：<a href="http://dev.mysql.com/doc/refman/5.6/en/mysqld-safe.html%E3%80%82%E5%9F%BA%E6%9C%AC%E4%B8%8A%E5%8F%82%E6%95%B0%E5%91%BD%E5%90%8D%E5%92%8C%E7%94%A8%E6%B3%95%E5%92%8C%E4%BB%A5%E4%B8%8A%E4%BB%8B%E7%BB%8D%E7%9A%84%E5%A4%A7%E5%90%8C%E5%B0%8F%E5%BC%82%E3%80%82" target="_blank" rel="noopener noreferrer">http://dev.mysql.com/doc/refman/5.6/en/mysqld-safe.html。基本上参数命名和用法和以上介绍的大同小异。</a></p><ol start="4"><li><p>初始化数据库密码 1. 首先在my.cnf 中 [mysqld] 下面增加</p><p><code>skip-grant-tables</code><br> 2. 重启mysqld 服务</p><p><code>service mysqld restart</code>或者<code>systemctl restart mysqld</code><br> 3. 无需密码进入mysql,直接回车，并且使用mysql这个库</p><p><code>mysql -uroot -p</code></p><p><code>use mysql</code><br> 4. 查看user表是否有默认的root用户</p><p><code>select host,user,password from user;</code><br> 5. 如果没有默认root用户,则插入一个；如果有，则修改密码</p><p><code>insert into user (Host,User,Password) values(&#39;localhost&#39;,&#39;root&#39;,password(&#39;1234&#39;));</code></p><p><code>update mysq.user set Password=password(&#39;your_password&#39;) where user=&#39;root&#39; and host=&#39;localhost&#39;;</code><br> 6. 刷新一下</p><p><code>flush privileges;</code><br> 7. 退出mysql，并且删除my.cnf 文件中的 skip-grant-tables。想要不删除，也是ok的，就是你的mysql可以无密码登入，不安全。<br> 8. 重启mysql服务。</p></li><li><p>可选：允许远程访问数据库</p></li></ol><p><code>update user set host = &#39;%&#39; where user = &#39;root&#39;;</code><br> 6. 设置数据库编码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 查看数据库编码</span></span>
<span class="line"><span>show variables like &#39;character%&#39;;</span></span>
<span class="line"><span># 如果不是utf8,修改配置</span></span>
<span class="line"><span>vim /etc/my.cnf</span></span>
<span class="line"><span>[client] 下面添加</span></span>
<span class="line"><span>default-character-set=utf8 </span></span>
<span class="line"><span>[mysqld]下面添加</span></span>
<span class="line"><span>default-character-set=utf8 </span></span>
<span class="line"><span>init_connect=&#39;SET NAMES utf8&#39;</span></span>
<span class="line"><span>重启mysql</span></span>
<span class="line"><span>在查看一遍编码</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上即可完整的安装msyql，mysql各个版本之间有差异，以上操作基于mysql5.6的，如有问题，请看日志。如需沟通，可联系QQ：1251108673</p><p>./mysql_install_db --verbose --user=root --defaults-file=/path/myenv/data/my.cnf --basedir=/path/myenv/mysql --datadir=/path/myenv/mysql/data --pid-file=/path/myenv/data/mysql.pid --tmpdir=/tmp/</p><p>./bin/mysqld_safe --defaults-file=/path/myenv/data/my.cnf --socket=/path/myenv/data/mysql.sock --user=root &amp;</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>grant all privileges on *.* to &#39;test&#39;@&#39;%&#39; identified by &#39;666666&#39;;</span></span>
<span class="line"><span># 只执行这条授权命令，会在授权的同时，创建test用户。</span></span>
<span class="line"><span># test用户，可以从外部连接MySQL（需要输入密码），具备所有权限。</span></span>
<span class="line"><span># test用户，也可以从本地连接MySQL（不能输入密码），只能连接，不具备数据库操作权限。</span></span>
<span class="line"><span> </span></span>
<span class="line"><span># 如果想让test用户，在本地也具备所有权限，且用同样的密码，再授权一次即可。如下：</span></span>
<span class="line"><span>grant all privileges on *.* to &#39;test&#39;@&#39;127.0.0.1&#39; identified by &#39;666666&#39;;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DROP USER user01@%;</p><p>DROP USER <a href="mailto:user01@127.0.0.1" target="_blank" rel="noopener noreferrer">user01@127.0.0.1</a>;</p>`,40),p=[e];function d(c,v){return a(),n("div",null,p)}const u=s(i,[["render",d],["__file","linux_源码安装mysql.html.vue"]]),b=JSON.parse('{"path":"/%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%97%A5%E5%B8%B8%E7%AC%94%E8%AE%B0/linux_%E6%BA%90%E7%A0%81%E5%AE%89%E8%A3%85mysql.html","title":"undefined","lang":"zh-CN","frontmatter":{"title":"undefined","date":"2023-01-19T11:11:41.000Z","tags":["linux"],"description":"linux 源码安装mysql linux 源码安装mysql mysql各种版本下载网址：https://downloads.mysql.com/archives/community/ 选择自己需要的mysql版本，并且一定要选对linux版本号，看清楚是64位还是32位。 将安装包解压到指定目录下,先创建目录 mkdir -p /path/myen...","head":[["meta",{"property":"og:url","content":"https://javabetter.cn/%E6%95%B0%E6%8D%AE%E5%BA%93/%E6%97%A5%E5%B8%B8%E7%AC%94%E8%AE%B0/linux_%E6%BA%90%E7%A0%81%E5%AE%89%E8%A3%85mysql.html"}],["meta",{"property":"og:site_name","content":"张意的博客"}],["meta",{"property":"og:title","content":"undefined"}],["meta",{"property":"og:description","content":"linux 源码安装mysql linux 源码安装mysql mysql各种版本下载网址：https://downloads.mysql.com/archives/community/ 选择自己需要的mysql版本，并且一定要选对linux版本号，看清楚是64位还是32位。 将安装包解压到指定目录下,先创建目录 mkdir -p /path/myen..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"张意"}],["meta",{"property":"article:tag","content":"linux"}],["meta",{"property":"article:published_time","content":"2023-01-19T11:11:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"undefined\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-01-19T11:11:41.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"张意\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":3,"title":"linux 源码安装mysql","slug":"linux-源码安装mysql-1","link":"#linux-源码安装mysql-1","children":[]}],"git":{},"readingTime":{"minutes":19.65,"words":5895},"filePathRelative":"数据库/日常笔记/linux_源码安装mysql.md","localizedDate":"2023年1月19日","excerpt":"\\n<h3>linux 源码安装mysql</h3>\\n<ul>\\n<li>mysql各种版本下载网址：<a href=\\"https://downloads.mysql.com/archives/community/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">https://downloads.mysql.com/archives/community/</a></li>\\n<li>选择自己需要的mysql版本，并且一定要选对linux版本号，看清楚是64位还是32位。</li>\\n</ul>\\n<ol>\\n<li>将安装包解压到指定目录下,先创建目录</li>\\n</ol>","autoDesc":true}');export{u as comp,b as data};
