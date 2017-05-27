import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => require(['@/pages/Login.vue'], resolve)
const NotFound = resolve => require(['@/pages/404.vue'], resolve)
// Home和AppDashboard合成一组作异步加载
const Home = r => require.ensure([], () => r(require('@/pages/Home.vue')), 'group-app')
const Dashboard = r => require.ensure([], () => r(require('@/pages/dashboard/Dashboard.vue')), 'group-app')
const OrderManage = resolve => require(['@/pages/order_manage/OrderManage.vue'], resolve)
const UserManage = resolve => require(['@/pages/user_manage/UserManage.vue'], resolve)
const Echarts = resolve => require(['@/pages/statistics/Echarts.vue'], resolve)

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
    menu_name: '应用中心',
    hidden: false,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'dash',
        component: Dashboard,
        name: 'dashboard',
        iconCls: 'ios-paw',
        leaf: true,
        menu_name: '控制面板',
        hidden: false,
        meta: {
          requireAuth: true,
          permission: 'add_group'
        }
      },
      {
        path: 'orders',
        component: OrderManage,
        name: 'order_manage',
        iconCls: 'social-freebsd-devil',
        leaf: true,
        menu_name: '订单管理',
        hidden: false,
        meta: {
          requireAuth: true,
          permission: 'add_group'
        }
      },
      {
        path: 'users',
        component: UserManage,
        name: 'user_manage',
        iconCls: 'social-freebsd-devil',
        leaf: true,
        menu_name: '用户管理',
        hidden: false,
        meta: {
          requireAuth: true,
          permission: 'add_group'
        }
      },
      {
        path: 'stats',
        component: Echarts,
        name: 'statistics',
        iconCls: 'social-freebsd-devil',
        leaf: true,
        menu_name: '统计分析',
        hidden: false,
        meta: {
          requireAuth: true,
          permission: 'add_group'
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
