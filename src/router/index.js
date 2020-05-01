import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultPage from '@/layout/default.vue'
import blankPage from '@/layout/blank.vue'
import goodsList from '@/page/goodsList.vue'
import Index from '@/page/index.vue'
import ChangeCity from '@/page/changeCity.vue'
import Login from '@/page/login.vue'
import Register from '@/page/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'defaultPage',
    component: defaultPage,
    // 首页嵌套goodsList子路由
    // 设置重定向 默认页面初始化展示goodsList
    // redirect: '/index',
    children: [{
      path: 's/:name', // 访问路径为 http://127.0.0.1:8080/s/name 同时方便前端页面获取该路由参数名
      name: 'goods',
      component: goodsList
    }, {
      path: '/index',
      name: 'index',
      component: Index
    }, {
      path: '/changeCity',
      name: 'changeCity',
      component: ChangeCity
    }]
  },
  {
    path: '/blank',
    name: 'blankPage',
    component: blankPage,
    children: [{
      path: 'login',
      name: 'login',
      component: Login
    }, {
      path: 'register',
      name: 'register',
      component: Register
    }]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history', // 不想要地址是hash 哈希值形式, 让它能自动拼接上去(自己写的地址)
  base: process.env.BASE_URL,
  routes
})

export default router
