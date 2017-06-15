import Vue from 'vue'
import Router from 'vue-router'
const MerchandiseList = resolve => require(['@/pages/order_manage/MerchandiseList.vue'], resolve)
const Merchandise = resolve => require(['@/pages/order_manage/Merchandise.vue'], resolve)
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
    path: '/',
    component: MerchandiseList,
    name: 'merchandiseList',
    meta: {
      hidden: false
    }
  },
  {
    path: '/sale/:id',
    component: Merchandise,
    name: 'merchandise',
    meta: {
      hidden: false
    }
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: NotFound,
    name: 'notFound',
    meta: {
      hidden: true
    }
  },
  {
    path: '/home',
    component: Home,
    name: 'home',
    meta: {
      requireAuth: true,
      iconCls: 'ios-home', // 图标样式class
      leaf: false,
      menu_name: '应用中心',
      hidden: false
    },
    children: [
      {
        path: 'dash',
        component: Dashboard,
        name: 'dashboard',
        meta: {
          requireAuth: true,
          permission: 'add_group',
          iconCls: 'ios-home',
          leaf: true,
          menu_name: '控制面板',
          hidden: false
        }
      },
      {
        path: 'orders',
        component: OrderManage,
        name: 'order_manage',
        meta: {
          requireAuth: true,
          permission: 'add_group',
          iconCls: 'heart',
          leaf: true,
          menu_name: '订单管理',
          hidden: false
        }
      },
      {
        path: 'users',
        component: UserManage,
        name: 'user_manage',
        meta: {
          iconCls: 'ios-people',
          leaf: true,
          menu_name: '用户管理',
          hidden: false,
          requireAuth: true,
          permission: 'add_group'
        }
      },
      {
        path: 'stats',
        component: Echarts,
        name: 'statistics',
        meta: {
          iconCls: 'stats-bars',
          leaf: true,
          menu_name: '统计分析',
          hidden: false,
          requireAuth: true,
          permission: 'add_group'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: { path: '/404' },
    meta: {
      hidden: true
    }
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
