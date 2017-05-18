import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/pages/Login.vue'], resolve)
const NotFound = resolve => require(['@/pages/404.vue'], resolve)
// Home和AppDashboard合成一组作异步加载
const Home = r => require.ensure([], () => r(require('@/pages/Home.vue')), 'group-app')
const Dashboard = r => require.ensure([], () => r(require('@/pages/dashboard/Dashboard.vue')), 'group-app')
const UserManage = resolve => require(['@/pages/user_manage/UserManage.vue'], resolve)
// import Table from '../pages/nav1/Table.vue'
// import Form from '../pages/nav1/Form.vue'
// import user from '../pages/nav1/user.vue'
// import Page4 from '../pages/nav2/Page4.vue'
// import Page5 from '../pages/nav2/Page5.vue'
// import Page6 from '../pages/nav3/Page6.vue'
// import echarts from '../pages/charts/echarts.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login,
    name: 'login',
    hidden: true
  },
  {
    path: '/404',
    component: NotFound,
    name: 'notFound',
    hidden: true
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    iconCls: 'ios-home', // 图标样式class
    leaf: false,
    menu_name: 'home',
    meta: {
      requireAuth: true,
      permission: 'any'
    },
    children: [
      {
        path: 'dash',
        component: Dashboard,
        name: 'dashboard',
        leaf: true,
        menu_name: 'dashboard',
        meta: {
          requireAuth: true,
          permission: 'any'
        }
      },
      {
        path: 'users',
        component: UserManage,
        name: 'user_manage',
        leaf: true,
        menu_name: 'user_manage',
        meta: {
          requireAuth: true,
          permission: 'any'
        }
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    redirect: { path: '/404' }
  }],
  scrollBehavior (to, from, savedPosition) {
    console.log('ScrollBehavior in router')
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 30 }
    }
  }
})
