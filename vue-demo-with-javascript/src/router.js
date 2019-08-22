import Vue from 'vue'
import Router from 'vue-router'
import {MessageBox} from 'element-ui'
import tokenUtils from './utils/token-utils'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login')
    }
  ]
})

// 拦截器
router.beforeEach((to, from, next) => {
  const loginPath = '/login'
  const isLogin = tokenUtils.isLogin()
  if (to.path !== loginPath && !isLogin) {
    MessageBox.confirm('登录信息已失效. 点击取消停留在此页面, 点击确定重新登录', '登录失效', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      next({
        path: loginPath,
        query: {redirect: to.fullPath}
      })
    }).catch(() => {
      console.log('要注意数据安全性喔')
    })
  } else {
    next()
  }
})

export default router

