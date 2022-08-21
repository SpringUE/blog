(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ab66b"],{"14b4":function(t,e,n){"use strict";n.r(e);var r=n("f2bf");const s={class:"blog-doc-component"},a=Object(r["p"])('<p></p><h1>Vue大型项目如何统一管理API</h1><h2 id="yi-xu-qiu" tabindex="-1"><a class="header-anchor" href="#yi-xu-qiu">¶</a> 一、需求：</h2><p>1.API独立管理； 2.按模块拆分； 3.拦截控制； 4.响应数据一致化； 5.消息提示</p><h2 id="er-shi-xian" tabindex="-1"><a class="header-anchor" href="#er-shi-xian">¶</a> 二、实现：</h2><h3 id="1.mu-lu-jie-gou-she-ji" tabindex="-1"><a class="header-anchor" href="#1.mu-lu-jie-gou-she-ji">¶</a> 1.目录结构设计：</h3>',6),o=Object(r["o"])("pre",null,[Object(r["o"])("code",{class:"language-javascript"},"src/api/index.js // 入口(从main.js引入)\nsrc/api/configs.js // 全局配置\nsrc/api/request.js // 封装的主程序\nsrc/api/common.js // 公共类api接口\nsrc/api/modules // 模块-对齐微服务\n")],-1),i=Object(r["o"])("h3",{id:"2.quan-liu-cheng",tabindex:"-1"},[Object(r["o"])("a",{class:"header-anchor",href:"#2.quan-liu-cheng"},"¶"),Object(r["q"])(" 2.全流程：")],-1),c=Object(r["o"])("p",null,"1.引入axios --\x3e 2.全局配置 --\x3e 3.实例配置 --\x3e 4.注入Vue原型 --\x3e 5.实例调用 --\x3e 6.请求拦截 --\x3e 7.请求 --\x3e 8.响应 --\x3e 9.响应拦截 --\x3e 10.数据解析 --\x3e 11.响应提示",-1),p=Object(r["o"])("h3",{id:"3.lan-jie-kong-zhi",tabindex:"-1"},[Object(r["o"])("a",{class:"header-anchor",href:"#3.lan-jie-kong-zhi"},"¶"),Object(r["q"])(" 3.拦截控制：")],-1),l=Object(r["o"])("p",null,"配置类型：全局配置, 请求拦截, 响应拦截 事件钩子：",-1),u=Object(r["o"])("pre",null,[Object(r["o"])("code",{class:"language-javascript"},"beforeRequest, \nrequestError, \nresponse, \nresponseError\n")],-1),d=Object(r["o"])("h3",{id:"4.shu-ju-yi-zhi-hua",tabindex:"-1"},[Object(r["o"])("a",{class:"header-anchor",href:"#4.shu-ju-yi-zhi-hua"},"¶"),Object(r["q"])(" 4.数据一致化：")],-1),g=Object(r["o"])("p",null,"返回对象的封装:",-1),m=Object(r["o"])("ul",null,[Object(r["o"])("li",null,"内容"),Object(r["o"])("li",null,"分页"),Object(r["o"])("li",null,"正常响应"),Object(r["o"])("li",null,"报错响应"),Object(r["o"])("li",null,"提示信息")],-1),h=Object(r["o"])("pre",null,[Object(r["o"])("code",{class:"language-javascript"},"{\n    result: any, // 内容\n    page: {} || null, // 分页\n    response: {}, // 正常响应\n    error: {}, // 报错响应\n    baseMessage: String, // 基础成功/错误信息\n    presetMessage: String, // 预设成功/错误信息\n    message(msg) {}, // 提示信息\n    notify(msg) {}, // 右侧通知\n\n}\n")],-1),b=Object(r["o"])("h3",{id:"5.zhu-ru-vue.prototypeyuan-xing",tabindex:"-1"},[Object(r["o"])("a",{class:"header-anchor",href:"#5.zhu-ru-vue.prototypeyuan-xing"},"¶"),Object(r["q"])(" 5.注入vue.prototype原型")],-1),j=Object(r["o"])("pre",null,[Object(r["o"])("code",{class:"language-javascript"},"// src/index.js\nimport common from './common';\nimport article from './modules/article';\n\nconst API =  {\n\t...common,\n\tarticle\n}\n\nexport default {\n\tinstall(Vue, options) {\n\t\tVue.prototype.$api = API\n\t}\n}\n\n\n// src/main.js\nimport api from ./api\nvue.prototype.$api = api\n")],-1),f=Object(r["p"])('<h3 id="6.jie-kou-shi-li-pei-zhi" tabindex="-1"><a class="header-anchor" href="#6.jie-kou-shi-li-pei-zhi">¶</a> 6.接口实例配置：</h3><pre><code class="language-javascript">// src/api/common.js\nimport request from ./request\n\nconst $api = request.create({\n    baseURL: &#39;/api/user&#39;,\n    timeout: 1000 * 10\n})\n\n/*\n接口适配层函数命名规范：\n新增：addXXX\n删除：deleteXXX\n更新：updateXXX\n根据ID查询记录：getXXXDetail\n条件查询一条记录：findOneXXX\n条件查询：findXXXs\n查询所有记录：getAllXXXs\n分页查询：getXXXPage\n搜索：searchXXX\n其余个性化接口根据语义进行命名\n*/\n\nexport default {\n    getUsersPage(req = {}) {\n        let {params, page} = req\n        return $api.get({\n            url: &#39;/page&#39;,\n            params: {id: params &amp;&amp; params.id, ...page}\n        })\n    },\n    addUser(req = {}) {\n        let { data } = req\n        return $api.post({\n            url: &#39;/api/user&#39;,\n            data: data.map(x =&gt; x),\n            headers: {\n                &#39;content-type&#39;: &#39;application/json&#39;\n            },\n            // 结果验证(从200状态中返回的结果合格校验)\n            validator(res) {\n                return res.data &amp;&amp; res.data.code === 200\n            },\n            // 结果过滤器\n            filter(res) {\n                return res.data.map(x =&gt; x)\n            },\n            // 出错消息过滤器\n            errorMessage(err) {\n                return err.response.data.message\n            },\n            // 成功消息过滤器\n            successMessage(res) {\n                return &#39;新增用户成功！&#39;\n            }\n        })\n    }\n}\n</code></pre><h3 id="7.zu-jian-nei-diao-yong-pei-zhi" tabindex="-1"><a class="header-anchor" href="#7.zu-jian-nei-diao-yong-pei-zhi">¶</a> 7.组件内调用配置：</h3><pre><code class="language-javascript">// demo.vue\nthis.$api.getUsersPage({\n    params: {keyword: &#39;xxx&#39;},\n    page: {pageSize: 10, currPage: 1},\n})\n.then(res =&gt; {\n    let {result, page, message} = res\n    message(&#39;用户加载成功！&#39;)\n})\n.catch(err =&gt; {\n    let {presetMessage, message, notify} = res\n    message(&#39;用户加载失败，&#39;+ presetMessage)\n})\n</code></pre><h3 id="8.zhu-cheng-she-ji" tabindex="-1"><a class="header-anchor" href="#8.zhu-cheng-she-ji">¶</a> 8.主程设计</h3><pre><code class="language-javascript">// src/api/request.js \nimport axios from &#39;axios&#39;;\nimport configs from &#39;./configs&#39;;\nimport router from &#39;../router&#39;;\nimport store from &#39;../store&#39;;\nimport { Message, Notification } from &#39;element-ui&#39;\n\n/** \n * http 状态码\n */\n\nconst httpStatusMap = {\n\t// 1 消息\n\t&#39;100&#39;: &#39;Continue&#39;,\n\t&#39;101&#39;: &#39;Switching Protocols&#39;,\n\t&#39;102&#39;: &#39;Processing&#39;,\n\t// 2 成功\n\t&#39;200&#39;: &#39;OK&#39;,\n\t&#39;201&#39;: &#39;Created&#39;,\n\t&#39;202&#39;: &#39;Accepted&#39;,\n\t&#39;203&#39;: &#39;Non-Authoritative Information&#39;,\n\t&#39;204&#39;: &#39;No Content&#39;,\n\t&#39;205&#39;: &#39;Reset Content&#39;,\n\t&#39;206&#39;: &#39;Partial Content&#39;,\n\t&#39;207&#39;: &#39;Multi-Status&#39;,\n\t// 3 重定向\n\t&#39;300&#39;: &#39;Multiple Choices&#39;,\n\t&#39;301&#39;: &#39;Moved Permanently&#39;,\n\t&#39;302&#39;: &#39;Move Temporarily&#39;,\n\t&#39;303&#39;: &#39;See Other&#39;,\n\t&#39;304&#39;: &#39;Not Modified&#39;,\n\t&#39;305&#39;: &#39;Use Proxy&#39;,\n\t&#39;306&#39;: &#39;Switch Proxy&#39;,\n\t&#39;307&#39;: &#39;Temporary Redirect&#39;,\n\t// 4 请求错误\n\t&#39;400&#39;: &#39;Bad Request&#39;,\n\t&#39;401&#39;: &#39;Unauthorized&#39;,\n\t&#39;402&#39;: &#39;Payment Required&#39;,\n\t&#39;403&#39;: &#39;Forbidden&#39;,\n\t&#39;404&#39;: &#39;Not Found&#39;,\n\t&#39;405&#39;: &#39;Method Not Allowed&#39;,\n\t&#39;406&#39;: &#39;Not Acceptable&#39;,\n\t&#39;407&#39;: &#39;Proxy Authentication Required&#39;,\n\t&#39;408&#39;: &#39;Request Timeout&#39;,\n\t&#39;409&#39;: &#39;Conflict&#39;,\n\t&#39;410&#39;: &#39;Gone&#39;,\n\t&#39;411&#39;: &#39;Length Required&#39;,\n\t&#39;412&#39;: &#39;Precondition Failed&#39;,\n\t&#39;413&#39;: &#39;Request Entity Too Large&#39;,\n\t&#39;414&#39;: &#39;Request-URI Too Long&#39;,\n\t&#39;415&#39;: &#39;Unsupported Media Type&#39;,\n\t&#39;416&#39;: &#39;Requested Range Not Satisfiable&#39;,\n\t&#39;417&#39;: &#39;Expectation Failed&#39;,\n\t&#39;418&#39;: &#39;I\\&#39;m a teapot&#39;,\n\t&#39;421&#39;: &#39;Misdirected Request&#39;,\n\t&#39;422&#39;: &#39;Unprocessable Entity&#39;,\n\t&#39;423&#39;: &#39;Locked&#39;,\n\t&#39;424&#39;: &#39;Failed Dependency&#39;,\n\t&#39;425&#39;: &#39;Too Early&#39;,\n\t&#39;426&#39;: &#39;Upgrade Required&#39;,\n\t&#39;449&#39;: &#39;Retry With&#39;,\n\t&#39;451&#39;: &#39;Unavailable For Legal Reasons&#39;,\n\t// 5 服务器错误\n\t&#39;500&#39;: &#39;Internal Server Error&#39;,\n\t&#39;501&#39;: &#39;Not Implemented&#39;,\n\t&#39;502&#39;: &#39;Bad Gateway&#39;,\n\t&#39;503&#39;: &#39;Service Unavailable&#39;,\n\t&#39;504&#39;: &#39;Gateway Timeout&#39;,\n\t&#39;505&#39;: &#39;HTTP Version Not Supported&#39;,\n\t&#39;506&#39;: &#39;Variant Also Negotiates&#39;,\n\t&#39;507&#39;: &#39;Insufficient Storage&#39;,\n\t&#39;509&#39;: &#39;Bandwidth Limit Exceeded&#39;,\n\t&#39;510&#39;: &#39;Not Extended&#39;,\n\t&#39;600&#39;: &#39;Unparseable Response Headers&#39;,\n}\n\n/**\n  * 跳转登录页\n  * 携带当前页面路由，以期在登录页面完成登录后返回当前页面\n  */\nconst toLogin = () =&gt; {\n\trouter.replace({\n\t\tpath: &#39;/login&#39;,\n\t\tquery: {\n\t\t\tredirect: router.currentRoute.fullPath\n\t\t}\n\t});\n}\n\n/**\n  * 请求失败后的错误统一处理\n  * @param {Number} status 请求失败的状态码\n  */\nconst baseErrorHandler = error =&gt; {\n\tconst { response, message } = error\n\t// 状态码判断\n\tswitch (response.status) {\n\t\t// 401: 未登录状态，跳转登录页\n\t\tcase 401:\n\t\t\ttoLogin();\n\t\t\tbreak;\n\n\t\t// 403 token过期\n\t\t// 清除token并跳转登录页\n\t\tcase 403:\n\t\t\terror.message = &#39;登录过期，请重新登录&#39;;\n\t\t\tlocalStorage.removeItem(&#39;token&#39;);\n\t\t\tstore.commit(&#39;loginSuccess&#39;, null);\n\t\t\tsetTimeout(() =&gt; {\n\t\t\t\ttoLogin();\n\t\t\t}, 1000);\n\t\t\tbreak;\n\n\t\t// 404请求不存在\n\t\tcase 404:\n\t\t\terror.message = &#39;请求的资源不存在&#39;;\n\t\t\tbreak;\n\n\t\t// 500服务器内部错误\n\t\tcase 500:\n\t\t\terror.message = &#39;服务器内部错误&#39;;\n\t\t\tbreak;\n\n\t\t// 502服务网关出错\n\t\tcase 502:\n\t\t\terror.message = &#39;服务网关出错&#39;;\n\t\t\tbreak;\n\n\t\t// 504服务网关超时\n\t\tcase 504:\n\t\t\terror.message = &#39;服务网关超时&#39;;\n\t\t\tbreak;\n\t}\n}\n\n// 默认配置\nconst defConfigs = configs\n\n// 全局拦截钩子\nconst interceptors = {\n\t// 请求前\n\tbeforeRequest(config) {\n\t\t// 登录流程控制中，根据本地是否存在token判断用户的登录情况\n\t\t// 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token\n\t\t// 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码\n\t\t// 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。\n\n\t\t/*\n\t\tconst token = store.state.token;\n\t\ttoken &amp;&amp; (config.headers.Authorization = token);\n\t\t*/\n\t\treturn config;\n\t},\n\t// 请求出错\n\trequestError(error) {\n\t\treturn Promise.reject(error)\n\t},\n\tresponse(res) {\n\t\treturn res.status &gt;= 200 &amp;&amp; res.status &lt; 300 ? Promise.resolve(res) : Promise.reject(res)\n\t},\n\tresponseError(error) {\n\t\tconst { response } = error;\n\t\tif (response) {\n\t\t\t// 响应码不在2xx的范围\n\t\t\tbaseErrorHandler(error);\n\t\t} else {\n\t\t\t// 处理断网的情况\n\t\t\t// eg:请求超时或断网时，更新state的network状态\n\t\t\t// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏\n\t\t\t// 关于断网组件中的刷新重新获取数据，会在断网组件中说明\n\t\t\t// store.commit(&#39;changeNetwork&#39;, false);\n\t\t}\n\t\treturn Promise.reject(error);\n\t}\n}\n\n/**\n  * 创建请求实例\n  * @param {Object} configs 全局配置\n  */\nconst createInstance = (handler, configs) =&gt; {\n\t// 创建axios实例\n\tvar instance = handler.create(configs);\n\n\t// 设置post请求头\n\tinstance.defaults.headers.post[&#39;Content-Type&#39;] = &#39;application/x-www-form-urlencoded&#39;;\n\n\t/**\n\t\t* 请求拦截器\n\t\t* 每次请求前，如果存在token则在请求头中携带token\n\t\t*/\n\tinstance.interceptors.request.use(\n\t\t// 请求成功\n\t\tinterceptors.beforeRequest,\n\t\t// 请求失败\n\t\tinterceptors.requestError\n\t)\n\n\t/**\n\t\t* 响应拦截器\n\t\t*/\n\tinstance.interceptors.response.use(\n\t\t// 响应成功\n\t\tinterceptors.response,\n\t\t// 响应失败\n\t\tinterceptors.responseError\n\t);\n\n\treturn instance\n}\n\n/**\n * 请求处理器\n * @param {Object} handler 处理器\n * @param {String} method 方法\n * @param {Object} options 选项\n * \n * 1.创建请求实例\n * 2.整合请求配置、数据\n * 3.处理响应\n */\nconst requestHandler = (handler, method, options) =&gt; {\n\tlet { url, params, data, headers, validator, filter, errorMessage, successMessage } = options\n\n\treturn new Promise((resolve, reject) =&gt; {\n\t\thandler(\n\t\t\t{\n\t\t\t\turl,\n\t\t\t\tmethod,\n\t\t\t\tparams,\n\t\t\t\tdata,\n\t\t\t\theaders\n\t\t\t}\n\t\t).then(res =&gt; {\n\t\t\tconst valid = validator &amp;&amp; validator(res)\n\t\t\tif (valid === undefined || valid === true) {\n\t\t\t\tresolve(successHandler(res, filter, successMessage))\n\t\t\t} else {\n\t\t\t\treject(errorHandler(res, res, errorMessage))\n\t\t\t}\n\t\t})\n\t\t\t.catch(err =&gt; {\n\t\t\t\treject(errorHandler(null, err, errorMessage))\n\t\t\t})\n\t})\n}\n\n/**\n * 响应处理器\n * @param {Object} response 正常响应\n * @param {Function} callback 回调函数\n * @param {Object} error 报错响应\n */\nconst successHandler = (response, filter, successMessage) =&gt; {\n\tlet { data } = response\n\tlet presetMessage = successMessage &amp;&amp; successMessage(response);\n\n\treturn {\n\t\tresult: filter &amp;&amp; filter(data) || data, // 内容\n\t\tpage: data &amp;&amp; data.page || null, // 分页\n\t\tresponse, // 正常响应\n\t\t// 提示信息\n\t\tpresetMessage,\n\t\tmessage(msg) {\n\t\t\tMessage.success(msg || presetMessage || baseMessage)\n\t\t},\n\t\tnotify(msg) {\n\t\t\tNotification({\n\t\t\t\ttype: &#39;success&#39;,\n\t\t\t\ttitle: &#39;提示&#39;,\n\t\t\t\tmessage: msg || presetMessage || baseMessage\n\t\t\t})\n\t\t}\n\t}\n}\n\n/**\n * 响应处理器\n * @param {Object} response 正常响应\n * @param {Object} error 报错响应\n * @param {Function} callback 回调函数\n * @param {Function} filter 过滤器\n */\nconst errorHandler = (response, error, errorMessage) =&gt; {\n\tlet baseMessage = error &amp;&amp; error.message;\n\tlet presetMessage = errorMessage &amp;&amp; errorMessage(error);\n\treturn {\n\t\tresult: null, // 内容\n\t\tpage: null, // 分页\n\t\tresponse, // 响应信息\n\t\terror, // 报错响应\n\t\t// 提示信息\n\t\tbaseMessage,\n\t\tpresetMessage,\n\t\tmessage(msg) {\n\t\t\tMessage.error(msg || presetMessage || baseMessage)\n\t\t},\n\t\tnotify(msg = {}) {\n\t\t\tNotification({\n\t\t\t\ttype: &#39;error&#39;,\n\t\t\t\ttitle: msg.title || &#39;服务出错了，请联系管理员，错误信息如下：&#39;,\n\t\t\t\tmessage: msg.message || presetMessage || baseMessage\n\t\t\t})\n\t\t}\n\t}\n}\n\n/**\n\t* 创建请求方法对象\n\t* @params {handler} 处理器\n\t*/\nconst createRequsetMethods = handler =&gt; {\n\t// 请求方法列表\n\tconst methods = [&#39;get&#39;, &#39;post&#39;, &#39;put&#39;, &#39;delete&#39;, &#39;head&#39;, &#39;patch&#39;];\n\n\treturn methods.reduce((total, x) =&gt; {\n\t\ttotal[x] = options =&gt; requestHandler(handler, x, options)\n\t\treturn total\n\t}, {})\n}\n\n/**\n * 默认实例\n */\nconst defInstance = createInstance(axios, defConfigs);\n\n/**\n * 对外接口对象\n */\nconst Interface = {\n\t/**\n\t * 默认请求方法\n\t */\n\t...createRequsetMethods(defInstance),\n\n\t/**\n\t * 使用创建方法生成实可调用例，可传入自定义配置\n\t * @param {Object} configs 配置项\n\t * @demo \n\t * let $api = request.create({....})\n\t * $api.get({...})\n\t */\n\tcreate(configs) {\n\t\tconst instance = createInstance(axios, {\n\t\t\t...defConfigs,\n\t\t\t...configs\n\t\t});\n\n\t\t/**\n\t\t\t* 封装接口对象\n\t\t\t* options来自调用实例的选项\n\t\t\t* req来自调用实例的原始选项\n\t\t\t*/\n\t\treturn createRequsetMethods(instance)\n\t}\n}\n\nexport default Interface\n</code></pre>',6);function x(t,e){const n=Object(r["U"])("code-viewer");return Object(r["L"])(),Object(r["n"])("section",s,[a,Object(r["r"])(n,null,{default:Object(r["ib"])(()=>[o]),_:1}),i,c,p,l,Object(r["r"])(n,null,{default:Object(r["ib"])(()=>[u]),_:1}),d,g,m,Object(r["r"])(n,null,{default:Object(r["ib"])(()=>[h]),_:1}),b,Object(r["r"])(n,null,{default:Object(r["ib"])(()=>[j]),_:1}),f])}var O=n("6b0d"),M=n.n(O);const q={},y=M()(q,[["render",x]]);e["default"]=y}}]);