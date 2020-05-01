import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 注册全局自定义指令
Vue.directive('document-click', {
  // 绑定的时候调用一次
  // 当前绑定的 dom 元素, 元素对象, 虚拟的节点
  bind (el, binding, vnode) {
    // console.log('绑定的时候调用 一次', el, binding, vnode)
    document.addEventListener('click', binding.value, false) // false 为不捕获
  },
  inserted () {
    console.log('插入')
  },
  update () {
    console.log('更新')
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
