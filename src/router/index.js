import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
/**
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    meta: { title: '登录' },
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '记事本', icon: 'edit', affix: true }
      }
    ]
  },
  {
    path: '/json',
    component: Layout,
    redirect: '/json/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/json/index'),
        name: 'jsonFormater',
        meta: { title: '格式化json', icon: 'json' }
      }
    ]
  },
  {
    path: '/qrcode',
    component: Layout,
    redirect: '/qrcode/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/qrcode/index'),
        name: 'qrcode',
        meta: { title: '生成二维码', icon: 'qrcode' }
      }
    ]
  },
  {
    path: '/transition',
    component: Layout,
    redirect: '/transition/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/time-transition/index'),
        name: 'timeTransition',
        meta: { title: '时间转换', icon: 'transition', noCache: true }
      }
    ]
  }
]

export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router