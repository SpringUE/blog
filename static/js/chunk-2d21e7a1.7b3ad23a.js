(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e7a1"],{d670:function(n,e,a){"use strict";a.r(e);var r=a("f2bf");const d={class:"blog-doc-component"},t=Object(r["p"])('<p></p><h2 id="rang-ni-xiang-shu-zu-yi-yang-cao-zuo-treeshu-jie-gou" tabindex="-1"><a class="header-anchor" href="#rang-ni-xiang-shu-zu-yi-yang-cao-zuo-treeshu-jie-gou">¶</a> 让你像数组一样操作Tree树结构</h2><p>可以这么说，小到一个生命体，大到整个宇宙，世间万物皆是树。 现实生活中最常见的树的例子是家谱，或是公司的组织架构图。</p><p><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9hc2sucWNsb3VkaW1nLmNvbS9odHRwLXNhdmUveWVoZS0xNDM2ODI2L3c5aGJ6aTJ4cWoucG5n?x-oss-process=image/format,png#pic_center" alt="在这里插入图片描述"></p><p>树是一种非顺序数据结构，一种分层数据的抽象模型，它对于存储需要快速查找的数据非常有用。 一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部的第一个 节点）以及零个或多个子节点。 JS里面没有像Array一样直接的一个Tree对象，也没有处理Tree的函数，比如：遍历、查找、插入、删除等等，因此我们得自己造轮子</p><h3 id="1-each" tabindex="-1"><a class="header-anchor" href="#1-each">¶</a> 1、each</h3><p>就像Array数组一样，遍历是其他很多的操作的前提，Tree也是一样 while循环栈方式遍历，类似Array.forEach</p><pre><code class="language-javascript">/**\n * 遍历树结构方法(while循环栈)\n * @param {Object|Array}  data  传入的数据\n * @param {function} handler 回调函数，处理每个节点，参数为当前节点对象，返回false会终止遍历\n * @param {String} mode 广度优先搜索/深度优先搜索(wide,deep)，默认：广度优先\n */\neach: function (data, handler, mode) {\n    var stack = [].concat(data);\n    var node, children, handleRes;\n\n    while (stack.length) {\n        node = stack.shift();\n        children = node.children\n        handleRes = handler &amp;&amp; handler(node);\n\n        if (handleRes === false) break;\n        if (Array.isArray(children)) {\n            mode == &#39;deep&#39; ?\n                [].unshift.apply(stack, children) :\n                [].push.apply(stack, children);\n        }\n    }\n}\n</code></pre><p>递归+栈配合方式遍历：</p><pre><code class="language-javascript">/**\n * 遍历树结构方法(递归+栈配合)\n * @param {Object|Array}  data  传入的数据\n * @param {function} handler 回调函数，处理每个节点，参数为当前节点对象，返回false会终止遍历\n * @param {String} mode 广度优先/深度优先(wide,deep)，默认：广度优先\n */\neachRecursive: function (data, handler, mode) {\n    var stack = [], index = -1, next, isBreak;\n    var isDeepMode = mode === &#39;deep&#39;;\n    var recursive = function (data) {\n        var node, nodes = [].concat(data), children;\n\n        for (var i = 0; i &lt; nodes.length; i++) {\n            node = nodes[i]\n            children = node.children || []\n            isBreak = handler.call(node, node)\n\n            if (isBreak === false) break\n            if (children.length) {\n                [].push.apply(stack, children)\n                isDeepMode &amp;&amp; recursive(children)\n            }\n\n            index++\n        }\n\n        next = stack[index]\n        if (isBreak !== false &amp;&amp; !isDeepMode &amp;&amp; next) recursive(next)\n    }\n\n    recursive(data)\n}\n</code></pre><p>​特点：</p><p>支持一个或多个顶点 支持中断 支持广度/深度优先</p><h3 id="2-map" tabindex="-1"><a class="header-anchor" href="#2-map">¶</a> 2、map</h3><p>遍历树并返回新的tree方法，利用递归进行遍历，类似Array.map</p><pre><code class="language-javascript">/**\n * 遍历树并返回新的tree方法，利用递归进行遍历\n * @param {Object|Array}  data  传入的数据\n * @param {function} handler 处理函数，入参为当前节点\n * @return {Object|Array} 新的tree数据\n */\nmap: function (data, handler) {\n    var stack = [].concat(data);\n    var getNodes = (data, handler) =&gt; {\n        return data.map(v =&gt; {\n            let node = handler.call(data, v)\n\n            if (Array.isArray(v.children) &amp;&amp; v.children.length) {\n                node.children = getNodes(v.children, handler)\n            }\n\n            return node\n        })\n    }\n\n    return getNodes(stack, handler)\n}\n</code></pre><h3 id="3-find" tabindex="-1"><a class="header-anchor" href="#3-find">¶</a> 3、find</h3><p>查找树并返回结果方法，类似Array.find</p><pre><code class="language-javascript">/**\n * 查找树并返回结果方法，类似Array.find\n * @param {Object|Array}  data  传入的数据\n * @param {function} handler 处理函数，入参为当前节点\n * @return {Object} node节点或null\n */\nfind: function (data, handler) {\n    var result = null\n\n    this.each(data, node =&gt; {\n        if (handler.call(data, node)) {\n            result = node\n            return false\n        }\n    })\n\n    return result\n}\n</code></pre><h3 id="4-filter" tabindex="-1"><a class="header-anchor" href="#4-filter">¶</a> 4、filter</h3><p>过滤树节点方法，类似Array.filter</p><pre><code class="language-javascript">/**\n * 过滤树节点方法，类似Array.filter\n * @param {Object|Array}  data  传入的数据\n * @param {function} handler 处理函数，入参为当前节点\n * @return {Object} node节点\n */\nfilter: function (data, handler) {\n    var result = [], handleRes\n\n    this.each(data, node =&gt; {\n        handleRes = handler.call(data, node)\n        if (handleRes === false) return false\n        if (handleRes) result.push(node)\n    })\n\n    return result\n}\n</code></pre><h3 id="5-some" tabindex="-1"><a class="header-anchor" href="#5-some">¶</a> 5、some</h3><p>匹配某一个节点并返回匹配结果的方法，类似Array.some</p><pre><code class="language-javascript">/**\n * 匹配某一个节点并返回匹配结果的方法，类似Array.some\n * @param {Object|Array}  data  传入的数据\n * @param {function} handler 处理函数，入参为当前节点\n * @return {Object} Boolean\n */\nsome: function (data, handler) {\n    var result = false\n\n    this.each(data, node =&gt; {\n        if (handler.call(data, node)) {\n            result = true\n            return false\n        }\n    })\n\n    return result\n}\n</code></pre><h3 id="6-every" tabindex="-1"><a class="header-anchor" href="#6-every">¶</a> 6、every</h3><p>匹配每一个节点并返回匹配结果的方法，类似Array.every</p><pre><code class="language-javascript">/**\n * 匹配每一个节点并返回匹配结果的方法，类似Array.every\n * @param {Object|Array}  data  传入的数据\n * @param {function} handler 处理函数，入参为当前节点\n * @return {Object} Boolean\n */\nevery: function (data, handler) {\n    var result = true\n\n    this.each(data, node =&gt; {\n        if (!handler.call(data, node)) {\n            result = false\n            return false\n        }\n    })\n\n    return result\n}\n</code></pre><h3 id="7-flat" tabindex="-1"><a class="header-anchor" href="#7-flat">¶</a> 7、flat</h3><p>树的扁平化方法(树 --&gt; 数组)，不改变原数据，返回新的数组</p><pre><code class="language-javascript">/**\n * 树的扁平化方法(树 --&gt; 数组)，不改变原数据，返回新的数组\n * @param {Object} data 传入的数据\n * @param {String} mode 广度优先搜索/深度优先搜索，默认：广度优先(wide,deep)\n * @param {function} callback 回调函数，处理每个节点，参数为当前节点对象\n * @return {Array} result 新的数组\n */\nflat: function (data, callback, mode) {\n    var result = [];\n    var handleNode = function (node, children) {\n        callback &amp;&amp; callback.apply(node, [node, children]);\n        result.push(node);\n    }\n\n    this.each(data, handleNode, mode);\n    return result;\n}\n</code></pre><h3 id="8-reduce" tabindex="-1"><a class="header-anchor" href="#8-reduce">¶</a> 8、reduce</h3><p>树累加器，改变原数据</p><pre><code class="language-javascript">/**\n * 树累加器，改变原数据\n * @param {Array|Object} data 数组或对象\n * @param {Object} fields 键值对的对象，键：在data新建的键名，值：data里的字段值\n */\nreduce: function (data, fieldsObj, callback) {\n    if (!fieldsObj) return data;\n\n    var handleNode = function (node, children) {\n        // 累加当前节点\n        for (var key in fieldsObj) {\n            node[key] = node[key] || [];\n            node[key].push(node[fieldsObj[key]]);\n        }\n\n        // 回调处理\n        // callback &amp;&amp; callback(node, children\n        callback &amp;&amp; callback.apply(this, arguments);\n\n        // 累加children\n        children &amp;&amp; children.length &amp;&amp; children.forEach(function (item) {\n            for (var key in fieldsObj) {\n                item[key] = [].concat(node[key]);\n            }\n        });\n    };\n\n    this.each(data, handleNode);\n}\n</code></pre><h3 id="9-completer" tabindex="-1"><a class="header-anchor" href="#9-completer">¶</a> 9、completer</h3><p>补全父级链方法，传入任意节点，通过已有的数据查找并发回包括所有父级的集合</p><pre><code class="language-javascript">/**\n * 补全父级链方法，传入任意节点，通过已有的数据查找并发回包括所有父级的集合\n * @param {Array} nodes 节点id数组\n * @param {Array} data 原始数据（未转换tree）\n * @return {Array} result 包括所有父级的集合\n */\ncompleter: function (nodeIds, data) {\n    if (!data) return [];\n    if (!Array.isArray(nodeIds) || !nodeIds.length) return [];\n\n    var result = [];\n    var resultMap = {};\n    var dataMap = data.reduce((total, curr) =&gt; {\n        total[curr.id] = curr\n        return total\n    }, {})\n    var getNode = function (id) {\n        var node = dataMap[id];\n\n        if (!node || resultMap[id]) return\n\n        resultMap[id] = 1;\n        result.push(node);\n        getNode(node.parentId);\n    };\n\n    // 生成结果\n    nodeIds.forEach(function (id) {\n        getNode(id);\n    });\n\n    return result;\n}\n</code></pre><h3 id="10-append" tabindex="-1"><a class="header-anchor" href="#10-append">¶</a> 10、append</h3><p>插入节点方法，传入任意节点ID，在其下插入子节点</p><pre><code class="language-javascript">/**\n * 插入节点方法，传入任意节点ID，在其下插入子节点\n * @param {String} nodeId 节点id\n * @param {Array} children 插入的字节点\n */\nappend: function (nodeId, children) {\n    if (nodeId == undefined) return;\n    if (!Array.isArray(children) || !children.length) return;\n\n    var node = this.find(n =&gt; n.id === nodeId)\n\n    if (!node) return;\n    if (!node.children) node.children = [];\n\n    [].push.apply(node.children, children)\n}\n</code></pre><h3 id="11-treefrom" tabindex="-1"><a class="header-anchor" href="#11-treefrom">¶</a> 11、TreeFrom</h3><p>数组 --&gt; 树，利用堆栈转换，不改变数组本身，返回新的对象，支持乱序，类似Array.from</p><h4 id="yi-ci-bian-li-shi-xian" tabindex="-1"><a class="header-anchor" href="#yi-ci-bian-li-shi-xian">¶</a> 一次遍历实现：</h4><pre><code class="language-javascript">/**\n * 数组 --&gt; 树，利用堆栈转换，不改变数组本身，返回新的数组或对象，支持乱序\n * @param  {Array}  data  数组\n * @return {Array|Object} 数组或对象\n * 原数据要求：top顶点的parentId必须为0或者null/undefined\n */\nTreeFrom: function (data) {\n    if (!data || !data.length) return {};\n\n    var copy = data.map(function (v) {\n        return Object.assign({}, v)\n    });\n    var id, pid, node, parent;\n    var hash = {};\n    var tops = [];\n\n    copy.forEach(function (item) {\n        id = item.id;\n        pid = item.parentId;\n        node = hash[id]\n\n        // 如果已存提前存在，证明是父亲节点，先连接他的孩子，支持乱序的重点\n        if (node) item.children = node.children;\n\n        hash[id] = item;\n\n        if (pid) {\n            parent = hash[pid] = hash[pid] || {};\n            parent.children = (parent.children || []).concat(item);\n        } else {\n            tops.push(item);\n        }\n    });\n\n    return tops;\n}\n</code></pre><h4 id="er-ci-bian-li-shi-xian" tabindex="-1"><a class="header-anchor" href="#er-ci-bian-li-shi-xian">¶</a> 二次遍历实现：</h4><pre><code class="language-javascript">/**\n * 数组 --&gt; 树，利用堆栈转换，不改变数组本身，返回新的对象，支持乱序\n * @param  {Array}  data  数组\n * @return {Object} 数组或对象\n * 原数据要求：top顶点的parentId必须为0或者null/undefined\n */\nTreeFrom2: function (data) {\n    if (!data || !data.length) return {};\n\n    var hash = {};\n    var tops = [];\n    var node, parent\n    var copy = data.map(function (v) {\n        return Object.assign({}, v)\n    });\n\n    // 罗列所有节点\n    copy.forEach(function (item) {\n        hash[item.id] = item;\n    });\n    // console.log(&#39;hash --&gt; &#39;, hash)\n\n    // 连接所有节点\n    for (var item in hash) {\n        node = hash[item];\n        parent = hash[node.parentId];\n\n        if (!parent) tops.push(node);\n        else parent.children = (parent.children || []).concat(node);\n    };\n\n    return tops;\n}\n</code></pre>',45),c=[t];function i(n,e){return Object(r["L"])(),Object(r["n"])("section",d,c)}var l=a("6b0d"),o=a.n(l);const s={},h=o()(s,[["render",i]]);e["default"]=h}}]);