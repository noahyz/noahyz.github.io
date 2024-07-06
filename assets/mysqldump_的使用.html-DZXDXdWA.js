import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,o as n,e as l}from"./app-Byep4MDf.js";const e={},i=l(`<h2 id="mysqldump-的使用" tabindex="-1"><a class="header-anchor" href="#mysqldump-的使用"><span>mysqldump 的使用</span></a></h2><p>d1. 导出所有数据库</p><p>mysqldump -uroot -proot  --all-databases &gt; /tmp/all.sql</p><p>2.导出db1、db2 两个数据库的所有数据</p><p>mysqldump -uroot -proot --databases db1 db2 &gt; /tmp/db.sql</p><p>3.导出db中的a1、a2表</p><p>mysqldump -uroot -proot --databases db --tables a1 a2 &gt; /tmp/tables.sql</p><p>4.条件导出，导出db中表a1中id=1的数据</p><p>mysqldump -uroot -proot --databases db --tables a1 --where=&#39;id=1&#39; &gt; /tmp/table.sql</p><p>字段是字符串，并且导出的sql中不包含 drop、create</p><p>mysqldump -uroot -proot --no-create-info  --databases db --tables a1 --where=&quot;&quot; &gt;  /tmp/a1.sql</p><p>5.只导出表结构不导出数据</p><p>mysqldump -uroot -proot --no-data --databases db &gt; /tmp/db.sql</p><p>参考博文：<a href="https://www.cnblogs.com/chenmh/p/5300370.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/chenmh/p/5300370.html</a></p><p><a href="https://blog.csdn.net/xiaoborui20110806/article/details/8013898" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/xiaoborui20110806/article/details/8013898</a></p><p><a href="https://developer.aliyun.com/article/528464" target="_blank" rel="noopener noreferrer">https://developer.aliyun.com/article/528464</a></p><p><a href="https://cloud.tencent.com/developer/article/1404119" target="_blank" rel="noopener noreferrer">https://cloud.tencent.com/developer/article/1404119</a></p><p><a href="https://blog.51cto.com/qiangsh/2176252" target="_blank" rel="noopener noreferrer">https://blog.51cto.com/qiangsh/2176252</a></p><p><a href="https://blog.csdn.net/demonson/article/details/87936096" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/demonson/article/details/87936096</a></p><hr><p>mysqldump 是数据库导出数据中使用非常频繁的一个工具。操作数据库一定要学会这个工具。</p><p>不带参数的 mysqldump 导出，导出文本内容大概为：数据库创建判断语句 -&gt; 删除表 -&gt; 创建表 -&gt; 锁表 -&gt; 禁用索引 -&gt; 插入数据 -&gt; 启用索引 -&gt; 解锁表。如果是大量的数据需要导出，锁表是一件非常危险的事情，尤其是在线上生产环境，锁表可能会导致出故障。</p><ol><li>导出所有数据库</li></ol><p>该命令会导出包括系统数据库在内的所有数据库</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --all-databases &gt; tmp.sql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="2"><li>导出 db1、db2两个数据库的所有数据</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --databases db1 db2 &gt; tmp.sql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="3"><li>导出db1库中表 a1、a2</li></ol><p>注意导出指定表只能针对一个数据库进行导出，且导出表的导出文本中没有创建数据库的判断语句，只有删除表-创建表-导出数据。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --databases db1 --tables a1 a2 &gt; tmp.sql</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="4"><li>加条件导出，导出db1库a1表中 id=1 的数据，如果多个表的条件相同可以一次性导出多个表。</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span># 字段是整形</span></span>
<span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --databases db1 --tables a1 --where=&#39;id=1&#39; &gt; tmp.log</span></span>
<span class="line"><span># 字段是字符串，并且导出的sql中不包含 drop table, create table 语句</span></span>
<span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --no-create-info --databases db1 --tables a1 --where=&quot;&quot; &gt; tmp.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>生成新的 binlog 文件，导出数据之后生成一个新的 binlog 文件</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --databases db1 -F &gt; tmp.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="6"><li>只导出结构不导出数据</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --no-data --databases db1 &gt; tmp.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="7"><li>服务器之间的传导数据，数据库必须存在，-C 参数可以启用压缩传递</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump --host=xxx -Pxxx -uxxx -pxxx -C --databases db1 | mysql --host=xxx -Pxxx -uxxx -pxxx db1</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="8"><li>--opt 等同于 --add-drop-table, --add-locks, --create-options, --quick, --extended-insert, --lock-tables, --set-charset, --disable-keys 该选项默认开启, 可以用--skip-opt禁用。</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --all-databases --opt</span></span>
<span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --all-databases --skip-opt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="9"><li>保证导出的一致性状态--single-transaction</li></ol><p>该选项在导出数据之前提交一个BEGIN SQL语句，BEGIN 不会阻塞任何应用程序且能保证导出时数据库的一致性状态。它只适用于多版本存储引擎（它不显示加锁通过判断版本来对比数据），仅InnoDB。本选项和--lock-tables 选项是互斥的，因为LOCK TABLES 会使任何挂起的事务隐含提交。要想导出大表的话，应结合使用--quick 选项。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>--quick, -q</span></span>
<span class="line"><span>不缓冲查询，直接导出到标准输出。默认为打开状态，使用--skip-quick取消该选项。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="10"><li>--lock-tables, -l</li></ol><p>开始导出前，锁定所有表。用READ LOCAL锁定表以允许MyISAM表并行插入。对于支持事务的表例如InnoDB和BDB，--single-transaction是一个更好的选择，因为它根本不需要锁定表。</p><p>请注意当导出多个数据库时，--lock-tables分别为每个数据库锁定表。因此，该选项不能保证导出文件中的表在数据库之间的逻辑一致性。不同数据库表的导出状态可以完全不同。</p><ol start="11"><li>导出存储过程和自定义函数--routines, -R</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx --all-databses --routines</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="12"><li>压缩备份</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>压缩备份</span></span>
<span class="line"><span>mysqldump -hxxx -Pxxx -uxxx -pxxx -q -Q --set-gtid-purged=OFF --default-character-set=utf8 --hex-blob --skip-lock-tables --databases db1 2&gt;./err.log | gzip &gt;./result.sql.gz</span></span>
<span class="line"><span>还原</span></span>
<span class="line"><span>gunzip -c result.sql.gz | mysql -hxxx -Pxxx -uxxx -pxxx --default-character-set=utf8 db1 1&gt;./db1.log 2&gt;err.log</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="13"><li>导出触发器。--triggers</li></ol><p>导出触发器。该选项默认启用，用--skip-triggers禁用它。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --triggers</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ol start="14"><li>常用选项</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>--no-create-db，  ---取消创建数据库sql(默认存在)</span></span>
<span class="line"><span>--no-create-info，---取消创建表sql(默认存在)</span></span>
<span class="line"><span>--no-data         ---不导出数据(默认导出)</span></span>
<span class="line"><span>--add-drop-database ---增加删除数据库sql（默认不存在）</span></span>
<span class="line"><span>--skip-add-drop-table  ---取消每个数据表创建之前添加drop数据表语句(默认每个表之前存在drop语句)</span></span>
<span class="line"><span>--skip-add-locks       ---取消在每个表导出之前增加LOCK TABLES（默认存在锁）</span></span>
<span class="line"><span>--skip-comments        ---注释信息(默认存在)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="15"><li>所有参数</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#24292e;--shiki-dark:#abb2bf;--shiki-light-bg:#fff;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes github-light one-dark-pro vp-code"><code><span class="line"><span>--all-databases  , -A</span></span>
<span class="line"><span>导出全部数据库。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases</span></span>
<span class="line"><span>--all-tablespaces  , -Y</span></span>
<span class="line"><span>导出全部表空间。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --all-tablespaces</span></span>
<span class="line"><span>--no-tablespaces  , -y</span></span>
<span class="line"><span>不导出任何表空间信息。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --no-tablespaces</span></span>
<span class="line"><span>--add-drop-database</span></span>
<span class="line"><span>每个数据库创建之前添加drop数据库语句。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --add-drop-database</span></span>
<span class="line"><span>--add-drop-table</span></span>
<span class="line"><span>每个数据表创建之前添加drop数据表语句。(默认为打开状态，使用--skip-add-drop-table取消选项)</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases  (默认添加drop语句)</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases –skip-add-drop-table  (取消drop语句)</span></span>
<span class="line"><span>--add-locks</span></span>
<span class="line"><span>在每个表导出之前增加LOCK TABLES并且之后UNLOCK  TABLE。(默认为打开状态，使用--skip-add-locks取消选项)</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases  (默认添加LOCK语句)</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases –skip-add-locks   (取消LOCK语句)</span></span>
<span class="line"><span>--allow-keywords</span></span>
<span class="line"><span>允许创建是关键词的列名字。这由表名前缀于每个列名做到。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --allow-keywords</span></span>
<span class="line"><span>--apply-slave-statements</span></span>
<span class="line"><span>在&#39;CHANGE MASTER&#39;前添加&#39;STOP SLAVE&#39;，并且在导出的最后添加&#39;START SLAVE&#39;。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --apply-slave-statements</span></span>
<span class="line"><span>--character-sets-dir</span></span>
<span class="line"><span>字符集文件的目录</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases  --character-sets-dir=/usr/local/mysql/share/mysql/charsets</span></span>
<span class="line"><span>--comments</span></span>
<span class="line"><span>附加注释信息。默认为打开，可以用--skip-comments取消</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases  (默认记录注释)</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --skip-comments   (取消注释)</span></span>
<span class="line"><span>--compatible</span></span>
<span class="line"><span>导出的数据将和其它数据库或旧版本的MySQL 相兼容。值可以为ansi、mysql323、mysql40、postgresql、oracle、mssql、db2、maxdb、no_key_options、no_tables_options、no_field_options等，</span></span>
<span class="line"><span>要使用几个值，用逗号将它们隔开。它并不保证能完全兼容，而是尽量兼容。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --compatible=ansi</span></span>
<span class="line"><span>--compact</span></span>
<span class="line"><span>导出更少的输出信息(用于调试)。去掉注释和头尾等结构。可以使用选项：--skip-add-drop-table  --skip-add-locks --skip-comments --skip-disable-keys</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --compact</span></span>
<span class="line"><span>--complete-insert,  -c</span></span>
<span class="line"><span>使用完整的insert语句(包含列名称)。这么做能提高插入效率，但是可能会受到max_allowed_packet参数的影响而导致插入失败。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --complete-insert</span></span>
<span class="line"><span>--compress, -C</span></span>
<span class="line"><span>在客户端和服务器之间启用压缩传递所有信息</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --compress</span></span>
<span class="line"><span>--create-options,  -a</span></span>
<span class="line"><span>在CREATE TABLE语句中包括所有MySQL特性选项。(默认为打开状态)</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases</span></span>
<span class="line"><span>--databases,  -B</span></span>
<span class="line"><span>导出几个数据库。参数后面所有名字参量都被看作数据库名。</span></span>
<span class="line"><span>mysqldump  -uroot -p --databases test mysql</span></span>
<span class="line"><span>--debug</span></span>
<span class="line"><span>输出debug信息，用于调试。默认值为：d:t,/tmp/mysqldump.trace</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --debug</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --debug=” d:t,/tmp/debug.trace”</span></span>
<span class="line"><span>--debug-check</span></span>
<span class="line"><span>检查内存和打开文件使用说明并退出。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --debug-check</span></span>
<span class="line"><span>--debug-info</span></span>
<span class="line"><span>输出调试信息并退出</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --debug-info</span></span>
<span class="line"><span>--default-character-set</span></span>
<span class="line"><span>设置默认字符集，默认值为utf8</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --default-character-set=utf8</span></span>
<span class="line"><span>--delayed-insert</span></span>
<span class="line"><span>采用延时插入方式（INSERT DELAYED）导出数据</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --delayed-insert</span></span>
<span class="line"><span>--delete-master-logs</span></span>
<span class="line"><span>master备份后删除日志. 这个参数将自动激活--master-data。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --delete-master-logs</span></span>
<span class="line"><span>--disable-keys</span></span>
<span class="line"><span>对于每个表，用/*!40000 ALTER TABLE tbl_name DISABLE KEYS */;和/*!40000 ALTER TABLE tbl_name ENABLE KEYS */;语句引用INSERT语句。这样可以更快地导入dump出来的文件，因为它是在插入所有行后创建索引的。该选项只适合MyISAM表，默认为打开状态。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases </span></span>
<span class="line"><span>--dump-slave</span></span>
<span class="line"><span>该选项将主的binlog位置和文件名追加到导出数据的文件中(show slave status)。设置为1时，将会以CHANGE MASTER命令输出到数据文件；设置为2时，会在change前加上注释。该选项将会打开--lock-all-tables，除非--single-transaction被指定。该选项会自动关闭--lock-tables选项。默认值为0。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --dump-slave=1</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --dump-slave=2</span></span>
<span class="line"><span>--master-data</span></span>
<span class="line"><span>该选项将当前服务器的binlog的位置和文件名追加到输出文件中(show master status)。如果为1，将会输出CHANGE MASTER 命令；如果为2，输出的CHANGE  MASTER命令前添加注释信息。该选项将打开--lock-all-tables 选项，除非--single-transaction也被指定（在这种情况下，全局读锁在开始导出时获得很短的时间；其他内容参考下面的--single-transaction选项）。该选项自动关闭--lock-tables选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --master-data=1;</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --master-data=2;</span></span>
<span class="line"><span>--events, -E</span></span>
<span class="line"><span>导出事件。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --events</span></span>
<span class="line"><span>--extended-insert,  -e</span></span>
<span class="line"><span>使用具有多个VALUES列的INSERT语法。这样使导出文件更小，并加速导入时的速度。默认为打开状态，使用--skip-extended-insert取消选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases--skip-extended-insert   (取消选项)</span></span>
<span class="line"><span>--fields-terminated-by</span></span>
<span class="line"><span>导出文件中忽略给定字段。与--tab选项一起使用，不能用于--databases和--all-databases选项</span></span>
<span class="line"><span>mysqldump  -uroot -p test test --tab=”/home/mysql” --fields-terminated-by=”#”</span></span>
<span class="line"><span>--fields-enclosed-by</span></span>
<span class="line"><span>输出文件中的各个字段用给定字符包裹。与--tab选项一起使用，不能用于--databases和--all-databases选项</span></span>
<span class="line"><span>mysqldump  -uroot -p test test --tab=”/home/mysql” --fields-enclosed-by=”#”</span></span>
<span class="line"><span>--fields-optionally-enclosed-by</span></span>
<span class="line"><span>输出文件中的各个字段用给定字符选择性包裹。与--tab选项一起使用，不能用于--databases和--all-databases选项</span></span>
<span class="line"><span>mysqldump  -uroot -p test test --tab=”/home/mysql”  --fields-enclosed-by=”#” --fields-optionally-enclosed-by  =”#”</span></span>
<span class="line"><span>--fields-escaped-by</span></span>
<span class="line"><span>输出文件中的各个字段忽略给定字符。与--tab选项一起使用，不能用于--databases和--all-databases选项</span></span>
<span class="line"><span>mysqldump  -uroot -p mysql user --tab=”/home/mysql” --fields-escaped-by=”#”</span></span>
<span class="line"><span>--flush-logs</span></span>
<span class="line"><span>开始导出之前刷新日志。</span></span>
<span class="line"><span>请注意：假如一次导出多个数据库(使用选项--databases或者--all-databases)，将会逐个数据库刷新日志。除使用--lock-all-tables或者--master-data外。在这种情况下，日志将会被刷新一次，相应的所以表同时被锁定。因此，如果打算同时导出和刷新日志应该使用--lock-all-tables 或者--master-data 和--flush-logs。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --flush-logs</span></span>
<span class="line"><span>--flush-privileges</span></span>
<span class="line"><span>在导出mysql数据库之后，发出一条FLUSH  PRIVILEGES 语句。为了正确恢复，该选项应该用于导出mysql数据库和依赖mysql数据库数据的任何时候。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --flush-privileges</span></span>
<span class="line"><span>--force</span></span>
<span class="line"><span>在导出过程中忽略出现的SQL错误。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --force</span></span>
<span class="line"><span>--help</span></span>
<span class="line"><span>显示帮助信息并退出。</span></span>
<span class="line"><span>mysqldump  --help</span></span>
<span class="line"><span>--hex-blob</span></span>
<span class="line"><span>使用十六进制格式导出二进制字符串字段。如果有二进制数据就必须使用该选项。影响到的字段类型有BINARY、VARBINARY、BLOB。</span></span>
<span class="line"><span>mysqldump  -uroot -p --all-databases --hex-blob</span></span>
<span class="line"><span>--host, -h</span></span>
<span class="line"><span>需要导出的主机信息</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases</span></span>
<span class="line"><span>--ignore-table</span></span>
<span class="line"><span>不导出指定表。指定忽略多个表时，需要重复多次，每次一个表。每个表必须同时指定数据库和表名。例如：--ignore-table=database.table1 --ignore-table=database.table2 ……</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --ignore-table=mysql.user</span></span>
<span class="line"><span>--include-master-host-port</span></span>
<span class="line"><span>在--dump-slave产生的&#39;CHANGE  MASTER TO..&#39;语句中增加&#39;MASTER_HOST=&lt;host&gt;，MASTER_PORT=&lt;port&gt;&#39;  </span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --include-master-host-port</span></span>
<span class="line"><span>--insert-ignore</span></span>
<span class="line"><span>在插入行时使用INSERT IGNORE语句.</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --insert-ignore</span></span>
<span class="line"><span>--lines-terminated-by</span></span>
<span class="line"><span>输出文件的每行用给定字符串划分。与--tab选项一起使用，不能用于--databases和--all-databases选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost test test --tab=”/tmp/mysql”  --lines-terminated-by=”##”</span></span>
<span class="line"><span>--lock-all-tables,  -x</span></span>
<span class="line"><span>提交请求锁定所有数据库中的所有表，以保证数据的一致性。这是一个全局读锁，并且自动关闭--single-transaction 和--lock-tables 选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --lock-all-tables</span></span>
<span class="line"><span>--lock-tables,  -l</span></span>
<span class="line"><span>开始导出前，锁定所有表。用READ  LOCAL锁定表以允许MyISAM表并行插入。对于支持事务的表例如InnoDB和BDB，--single-transaction是一个更好的选择，因为它根本不需要锁定表。</span></span>
<span class="line"><span>请注意当导出多个数据库时，--lock-tables分别为每个数据库锁定表。因此，该选项不能保证导出文件中的表在数据库之间的逻辑一致性。不同数据库表的导出状态可以完全不同。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --lock-tables</span></span>
<span class="line"><span>--log-error</span></span>
<span class="line"><span>附加警告和错误信息到给定文件</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases  --log-error=/tmp/mysqldump_error_log.err</span></span>
<span class="line"><span>--max_allowed_packet</span></span>
<span class="line"><span>服务器发送和接受的最大包长度。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --max_allowed_packet=10240</span></span>
<span class="line"><span>--net_buffer_length</span></span>
<span class="line"><span>TCP/IP和socket连接的缓存大小。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --net_buffer_length=1024</span></span>
<span class="line"><span>--no-autocommit</span></span>
<span class="line"><span>使用autocommit/commit 语句包裹表。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --no-autocommit</span></span>
<span class="line"><span>--no-create-db,  -n</span></span>
<span class="line"><span>只导出数据，而不添加CREATE DATABASE 语句。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --no-create-db</span></span>
<span class="line"><span>--no-create-info,  -t</span></span>
<span class="line"><span>只导出数据，而不添加CREATE TABLE 语句。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --no-create-info</span></span>
<span class="line"><span>--no-data, -d</span></span>
<span class="line"><span>不导出任何数据，只导出数据库表结构。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --no-data</span></span>
<span class="line"><span>--no-set-names,  -N</span></span>
<span class="line"><span>等同于--skip-set-charset</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --no-set-names</span></span>
<span class="line"><span>--opt</span></span>
<span class="line"><span>等同于--add-drop-table,  --add-locks, --create-options, --quick, --extended-insert, --lock-tables,  --set-charset, --disable-keys 该选项默认开启,  可以用--skip-opt禁用.</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --opt</span></span>
<span class="line"><span>--order-by-primary</span></span>
<span class="line"><span>如果存在主键，或者第一个唯一键，对每个表的记录进行排序。在导出MyISAM表到InnoDB表时有效，但会使得导出工作花费很长时间。 </span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --order-by-primary</span></span>
<span class="line"><span>--password, -p</span></span>
<span class="line"><span>连接数据库密码</span></span>
<span class="line"><span>--pipe(windows系统可用)</span></span>
<span class="line"><span>使用命名管道连接mysql</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --pipe</span></span>
<span class="line"><span>--port, -P</span></span>
<span class="line"><span>连接数据库端口号</span></span>
<span class="line"><span>--protocol</span></span>
<span class="line"><span>使用的连接协议，包括：tcp, socket, pipe, memory.</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --protocol=tcp</span></span>
<span class="line"><span>--quick, -q</span></span>
<span class="line"><span>不缓冲查询，直接导出到标准输出。默认为打开状态，使用--skip-quick取消该选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases </span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --skip-quick</span></span>
<span class="line"><span>--quote-names,-Q</span></span>
<span class="line"><span>使用（\`）引起表和列名。默认为打开状态，使用--skip-quote-names取消该选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --skip-quote-names</span></span>
<span class="line"><span>--replace</span></span>
<span class="line"><span>使用REPLACE INTO 取代INSERT INTO.</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --replace</span></span>
<span class="line"><span>--result-file,  -r</span></span>
<span class="line"><span>直接输出到指定文件中。该选项应该用在使用回车换行对（\\\\r\\\\n）换行的系统上（例如：DOS，Windows）。该选项确保只有一行被使用。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --result-file=/tmp/mysqldump_result_file.txt</span></span>
<span class="line"><span>--routines, -R</span></span>
<span class="line"><span>导出存储过程以及自定义函数。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --routines</span></span>
<span class="line"><span>--set-charset</span></span>
<span class="line"><span>添加&#39;SET NAMES  default_character_set&#39;到输出文件。默认为打开状态，使用--skip-set-charset关闭选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases </span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --skip-set-charset</span></span>
<span class="line"><span>--single-transaction</span></span>
<span class="line"><span>该选项在导出数据之前提交一个BEGIN SQL语句，BEGIN 不会阻塞任何应用程序且能保证导出时数据库的一致性状态。它只适用于多版本存储引擎，仅InnoDB。本选项和--lock-tables 选项是互斥的，因为LOCK  TABLES 会使任何挂起的事务隐含提交。要想导出大表的话，应结合使用--quick 选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --single-transaction</span></span>
<span class="line"><span>--dump-date</span></span>
<span class="line"><span>将导出时间添加到输出文件中。默认为打开状态，使用--skip-dump-date关闭选项。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --skip-dump-date</span></span>
<span class="line"><span>--skip-opt</span></span>
<span class="line"><span>禁用–opt选项.</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --skip-opt</span></span>
<span class="line"><span>--socket,-S</span></span>
<span class="line"><span>指定连接mysql的socket文件位置，默认路径/tmp/mysql.sock</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --socket=/tmp/mysqld.sock</span></span>
<span class="line"><span>--tab,-T</span></span>
<span class="line"><span>为每个表在给定路径创建tab分割的文本文件。注意：仅仅用于mysqldump和mysqld服务器运行在相同机器上。注意使用--tab不能指定--databases参数</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost test test --tab=&quot;/home/mysql&quot;</span></span>
<span class="line"><span>--tables</span></span>
<span class="line"><span>覆盖--databases (-B)参数，指定需要导出的表名，在后面的版本会使用table取代tables。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --databases test --tables test</span></span>
<span class="line"><span>--triggers</span></span>
<span class="line"><span>导出触发器。该选项默认启用，用--skip-triggers禁用它。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --triggers</span></span>
<span class="line"><span>--tz-utc</span></span>
<span class="line"><span>在导出顶部设置时区TIME_ZONE=&#39;+00:00&#39; ，以保证在不同时区导出的TIMESTAMP 数据或者数据被移动其他时区时的正确性。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --tz-utc</span></span>
<span class="line"><span>--user, -u</span></span>
<span class="line"><span>指定连接的用户名。</span></span>
<span class="line"><span>--verbose, --v</span></span>
<span class="line"><span>输出多种平台信息。</span></span>
<span class="line"><span>--version, -V</span></span>
<span class="line"><span>输出mysqldump版本信息并退出</span></span>
<span class="line"><span>--where, -w</span></span>
<span class="line"><span>只转储给定的WHERE条件选择的记录。请注意如果条件包含命令解释符专用空格或字符，一定要将条件引用起来。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --where=” user=’root’”</span></span>
<span class="line"><span>--xml, -X</span></span>
<span class="line"><span>导出XML格式.</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --xml</span></span>
<span class="line"><span>--plugin_dir</span></span>
<span class="line"><span>客户端插件的目录，用于兼容不同的插件版本。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --plugin_dir=”/usr/local/lib/plugin”</span></span>
<span class="line"><span>--default_auth</span></span>
<span class="line"><span>客户端插件默认使用权限。</span></span>
<span class="line"><span>mysqldump  -uroot -p --host=localhost --all-databases --default-auth=”/usr/local/lib/plugin/&lt;PLUGIN&gt;”</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,57),p=[i];function d(t,c){return n(),a("div",null,p)}const m=s(e,[["render",d],["__file","mysqldump_的使用.html.vue"]]),u=JSON.parse('{"path":"/%E6%95%B0%E6%8D%AE%E5%BA%93/release/mysqldump_%E7%9A%84%E4%BD%BF%E7%94%A8.html","title":"mysqldump使用","lang":"zh-CN","frontmatter":{"title":"mysqldump使用","date":"2021-03-07T20:19:17.000Z","categories":["数据库"],"tags":["mysqldump"],"description":"mysqldump 的使用 d1. 导出所有数据库 mysqldump -uroot -proot --all-databases > /tmp/all.sql 2.导出db1、db2 两个数据库的所有数据 mysqldump -uroot -proot --databases db1 db2 > /tmp/db.sql 3.导出db中的a1、a2表 ...","head":[["meta",{"property":"og:url","content":"https://javabetter.cn/%E6%95%B0%E6%8D%AE%E5%BA%93/release/mysqldump_%E7%9A%84%E4%BD%BF%E7%94%A8.html"}],["meta",{"property":"og:site_name","content":"张意的博客"}],["meta",{"property":"og:title","content":"mysqldump使用"}],["meta",{"property":"og:description","content":"mysqldump 的使用 d1. 导出所有数据库 mysqldump -uroot -proot --all-databases > /tmp/all.sql 2.导出db1、db2 两个数据库的所有数据 mysqldump -uroot -proot --databases db1 db2 > /tmp/db.sql 3.导出db中的a1、a2表 ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:author","content":"张意"}],["meta",{"property":"article:tag","content":"mysqldump"}],["meta",{"property":"article:published_time","content":"2021-03-07T20:19:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysqldump使用\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-03-07T20:19:17.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"张意\\",\\"url\\":\\"/about-the-author/\\"}]}"]]},"headers":[{"level":2,"title":"mysqldump 的使用","slug":"mysqldump-的使用","link":"#mysqldump-的使用","children":[]}],"git":{},"readingTime":{"minutes":14.57,"words":4371},"filePathRelative":"数据库/release/mysqldump_的使用.md","localizedDate":"2021年3月8日","excerpt":"<h2>mysqldump 的使用</h2>\\n<p>d1. 导出所有数据库</p>\\n<p>mysqldump -uroot -proot&nbsp; --all-databases &gt; /tmp/all.sql</p>\\n<p>2.导出db1、db2 两个数据库的所有数据</p>\\n<p>mysqldump -uroot -proot --databases db1 db2 &gt; /tmp/db.sql</p>\\n<p>3.导出db中的a1、a2表</p>\\n<p>mysqldump -uroot -proot --databases db --tables a1 a2 &gt; /tmp/tables.sql</p>","autoDesc":true}');export{m as comp,u as data};
