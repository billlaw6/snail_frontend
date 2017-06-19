// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import iView from 'iview'
// import zhLocale from 'iview/src/locale/lang/zh-CN'
// import enLocale from 'iview/src/locale/lang/en-US'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'
import store from './vuex-store/index'
import { currency } from './common/filters'
// import Mock from './mock'
// Mock.bootstrap()
import App from './App'

Vue.filter('currency', currency)
Vue.use(iView)

Vue.config.lang = 'en-US'
// Vue.locale('zh-CN', zhLocale)
// Vue.locale('en-US', enLocale)
// 注意：使用 vue-i18n 时，需要将本地的语言包和 iView 的语言包合并

// interceptors
axios.interceptors.request.use(
  config => {
    let accessToken = window.sessionStorage.accessToken
    if (accessToken) {
      // console.log('setting accessToken to: ' + accessToken)
      config.headers.Authorization = `Token ${accessToken}`
    } else {
      console.log('No accessToken')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  let accessToken = window.sessionStorage.getItem('accessToken')
  let user = JSON.parse(window.sessionStorage.getItem('user'))
  let permissions = JSON.parse(window.sessionStorage.getItem('permissions'))
  // console.log('checking accessToken in main.js: ' + accessToken)
  // console.log('checking user in main.js: ' + user)
  // console.log('checking permission in main.js: ' + permissions)
    // to.matched 包含admin和dash两个路径
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (accessToken && user) {
      if (to.meta.permission === 'undefined') {
        // console.log(permissions.some(to.meta.permission))
        next()
      } else if (permissions.some(record => record.codename === to.meta.permission)) {
        // console.log('Has permission')
        next()
      } else {
        console.log('Lack of permission')
        // next({ path: from.path })
      }
    } else {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false

Vue.use(BaiduMap, {
  ak: 'uMrZwlmGzs5vqFRlsECDsnRiZGcZgnKj'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
