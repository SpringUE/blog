(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229b77"],{df43:function(n,e,o){"use strict";o.r(e);var t=o("f2bf");const c={class:"blog-doc-component"},a=Object(t["o"])("p",null,null,-1),i=Object(t["o"])("h2",{id:"yi-bu-zu-jian-zhi-dong-tai-dan-chuang",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#yi-bu-zu-jian-zhi-dong-tai-dan-chuang"},"¶"),Object(t["q"])(" 异步组件之动态弹窗")],-1),s=Object(t["o"])("h3",{id:"jian-jie",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#jian-jie"},"¶"),Object(t["q"])(" 简介")],-1),r=Object(t["o"])("p",null,[Object(t["q"])("在大型项目中，我们可能需要拆分应用为更小的块，并仅在需要时再从服务器加载相关组件。"),Object(t["o"])("br"),Object(t["q"])(" 弹窗几乎是项目中比不可少的一部分，它就是经典的异步组件需求。"),Object(t["o"])("br"),Object(t["q"])(" 同时，它也是动态的，需要的时候通过方法来调用执行。")],-1),l=Object(t["o"])("p",null,"调用示例：",-1),p=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-javascript"},"import importAsyncComponent from '@/util.component'\nconst DialogComp = importAsyncComponent('./components/DialogComp.vue')\n\n// 选项\nconst options = {\n  props: {}\n  events: {}\n}\nthis.$dialog(DialogComp, options).then(() => {\n  // todo something\n})\n")],-1),b=Object(t["o"])("h3",{id:"zhun-bei",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#zhun-bei"},"¶"),Object(t["q"])(" 准备")],-1),u=Object(t["o"])("p",null,"Vue 官方也提供了相关的方法来实现此功能：",-1),j=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-javascript"},"// Vue2\nconst AsyncComp = () => import('./components/MyComponent.vue')\n\n\n// Vue3\nimport { defineAsyncComponent } from 'vue'\n\nconst AsyncComp = defineAsyncComponent(() =>\n  import('./components/MyComponent.vue')\n)\n")],-1),d=Object(t["o"])("p",null,[Object(t["q"])("["),Object(t["o"])("code",null,"import"),Object(t["q"])("] 方法会返回一个Promise, 因此可以在事件钩子里进行拦截，增加loading效果以及出错提示。")],-1),m=Object(t["o"])("p",null,"安装nprogress",-1),O=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-shell"},"npm install --save nprogress\n")],-1),g=Object(t["o"])("h3",{id:"feng-zhuang-yin-yong-fang-fa",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#feng-zhuang-yin-yong-fang-fa"},"¶"),Object(t["q"])(" 封装引用方法")],-1),h=Object(t["o"])("p",null,[Object(t["q"])("importAsyncComponent函数统一对引入组件进行处理"),Object(t["o"])("br"),Object(t["q"])(" 以ant-design-vue组件库来做示例")],-1),f=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-javascript"},"// util.component.js\nimport { notification } from 'ant-design-vue';\nimport NProgress from 'nprogress';\nimport 'nprogress/nprogress.css';\n\nNProgress.configure({     \n  easing: 'ease',  // 动画方式    \n  speed: 500,  // 递增进度条的速度    \n  showSpinner: false, // 是否显示加载ico    \n  trickleSpeed: 200, // 自动递增间隔    \n  minimum: 0.3 // 初始化时的最小百分比\n})\n\nfunction importAsyncComponent(path) {\n  NProgress.start()\n  return import(path).then(res => {\n    return res\n  })\n  .catch(err => {\n    notification.open({\n      message: '提示',\n      description: '加载失败，请检查你的网络...'\n    })\n  })\n  .finally(() => {\n    NProgress.done()\n  })\n}\n\nexport default importAsyncComponent\n")],-1),v=Object(t["o"])("h3",{id:"feng-zhuang-dan-chuang-han-shu",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#feng-zhuang-dan-chuang-han-shu"},"¶"),Object(t["q"])(" 封装弹窗函数")],-1),y=Object(t["o"])("p",null,"上一步已经有了加载组件的函数，现在就差实现$dialog函数了",-1),C=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-javascript"},"// util.dialog.js\nimport Vue from 'vue'\n\n/**\n * 创建弹窗\n * @params {Object|Promise} component 弹窗组件\n * @params {Object} options 选项\n */\nfunction createDialogComp(component, options) {\n  const { props = {}, events = {} } = options || {}\n  const comp = Vue.extend(component, {\n    propsData: props,\n    watch: {\n      // 预设弹出显隐属性\n      visible(nv) {\n        if(!nv) {\n          // 监听关闭时销毁\n          this.destroy()\n        }\n      }\n    },\n    methods: {\n      destroy() {\n        this.$destroy()\n        document.body.removeChild(this.$el)\n      }\n    }\n  })\n\n  const vm = new Vue(comp).$mount()\n  \n  // 注册事件\n  Object.entries(events).forEach(([name, event]) => {\n    vm.$on(name, event) \n  })\n\n  // 挂载\n  document.body.appendChild(vm.$el)\n\n  // 打开\n  vm.$nextTick(() => {\n    vm.open() // 通过调用弹窗组件预设的open方法开弹出\n  })\n\n  return vm\n}\n\nexport default {\n  install(Vue) {\n    Vue.prototype.$dialog = function dialog(component, options) {\n      if(component instanceof Promise) {\n        return component.then(res => {\n          return createDialogComp(res, options)\n        })\n      }\n      return createDialogComp(component, options)\n    }\n  }\n}\n")],-1),q=Object(t["o"])("h3",{id:"bang-ding-quan-ju",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#bang-ding-quan-ju"},"¶"),Object(t["q"])(" 绑定全局")],-1),x=Object(t["o"])("p",null,"弹窗开发完成，如何绑定全局使用？",-1),D=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-javascript"},"// main.js\nimport Vue from 'vue'\nimport dialog from '@/util.dialog.js'\n\nVue.use(dialog)\n")],-1),A=Object(t["o"])("h3",{id:"bian-xie-dan-chuang",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#bian-xie-dan-chuang"},"¶"),Object(t["q"])(" 编写弹窗")],-1),w=Object(t["o"])("p",null,[Object(t["q"])("至此，弹窗支撑逻辑已经全部完成，下面需要编写一个弹窗组件。"),Object(t["o"])("br"),Object(t["q"])(" 以ant-design-vue组件库为例：")],-1),z=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-html"},'<template>\n  <div>\n    <a-modal :visible="visible" title="My Dialog">\n      <p>Some contents...</p>\n      <p>Some contents...</p>\n      <p>Some contents...</p>\n    </a-modal>\n  </div>\n</template>\n<script>\n\n\nexport default {\n  data() {\n    return {\n      visible: false // 该属性控制弹窗弹出\n    }\n  },\n  methods: {\n    open() {\n      this.visible = true\n    },\n    close() {\n      this.visible = false\n    }\n  }\n}\n<\/script>\n')],-1),V=Object(t["o"])("h3",{id:"diao-yong",tabindex:"-1"},[Object(t["o"])("a",{class:"header-anchor",href:"#diao-yong"},"¶"),Object(t["q"])(" 调用")],-1),$=Object(t["o"])("p",null,"最后，在父级组件里动态的加载上一步的弹窗组件。",-1),P=Object(t["o"])("pre",null,[Object(t["o"])("code",{class:"language-html"},"<template>\n  <div>\n    <a-button type=\"primary\" @click=\"openDialog\">Open Dialog</a-button>\n  </div>\n</template>\n<script>\nimport importAsyncComponent from '@/utils/util.component'\nconst MyDialog = importAsyncComponent('./components/MyDialog.vue')\n\nexport default {\n  data() {\n    return {\n    }\n  },\n  methods: {\n    openDialog() {\n      // 选项\n      const options = {\n        props: {}\n        events: {}\n      }\n      this.$dialog(MyDialog, options).then(() => {\n        // todo something\n      })\n    }\n  }\n}\n<\/script>\n")],-1);function _(n,e){const o=Object(t["U"])("code-viewer");return Object(t["L"])(),Object(t["n"])("section",c,[a,i,s,r,l,Object(t["r"])(o,null,{default:Object(t["jb"])(()=>[p]),_:1}),b,u,Object(t["r"])(o,null,{default:Object(t["jb"])(()=>[j]),_:1}),d,m,O,g,h,Object(t["r"])(o,null,{default:Object(t["jb"])(()=>[f]),_:1}),v,y,Object(t["r"])(o,null,{default:Object(t["jb"])(()=>[C]),_:1}),q,x,Object(t["r"])(o,null,{default:Object(t["jb"])(()=>[D]),_:1}),A,w,Object(t["r"])(o,null,{default:Object(t["jb"])(()=>[z]),_:1}),V,$,Object(t["r"])(o,null,{default:Object(t["jb"])(()=>[P]),_:1})])}var k=o("6b0d"),M=o.n(k);const S={},N=M()(S,[["render",_]]);e["default"]=N}}]);