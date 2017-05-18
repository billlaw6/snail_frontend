// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import iView from 'iview'
// import zhLocale from 'iview/src/locale/lang/zh-CN'
// import enLocale from 'iview/src/locale/lang/en-US'
import * as messages from './i18n/messages.js'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
import store from './vuex-store/index'
import { currency } from './common/filters'
// import Mock from './mock'
// Mock.bootstrap()

Vue.filter('currency', currency)
Vue.use(VueI18n)
Vue.use(iView)

// Vue.config.lang = 'zh-CN'
const i18n = new VueI18n({
  locale: 'en',
  messages
})

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

// router.beforeEach((to, from, next) => {
  // // 判断该路由是否需要登录权限
  // // to.matched 包含admin和dash两个路径
  // if (to.matched.some(record => record.meta.requireAuth)) {
    // let accessToken = window.sessionStorage.getItem('accessToken')
    // let user = JSON.parse(window.sessionStorage.getItem('user'))
    // let perms = JSON.parse(window.sessionStorage.getItem('permissions'))
    // // console.log('checking logging status in main.js: ' + accessToken)
    // // console.log('checking logging status in main.js: ' + user)
    // // console.log('checking logging status in main.js: ' + perms)
    // if (accessToken && user) {
      // if (typeof (to.meta.permission) === 'undefined') {
        // // console.log(perms.indexOf(to.meta.permission))
        // next()
      // } else if (perms.indexOf(to.meta.permission) > 0) {
        // // console.log('Has permission')
        // next()
      // } else {
        // // console.log('Lack of permission')
        // next({ name: 'noPerm' })
      // }
    // } else {
      // next({
        // name: 'login',
        // query: { redirect: to.fullPath }
      // })
    // }
  // } else {
    // next()
  // }
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  template: '<App/>',
  components: { App },
  store
})
