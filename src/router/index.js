/*
 * @Author: your name
 * @Date: 2021-12-24 10:34:53
 * @LastEditTime: 2021-12-31 17:12:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \1688_demo\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // 不需要登陆
  // { path: '/invoice', name: '自动登录', component: _import('finance/financeInvoice/auto'), hidden: true },

  { path: '/login', name: '登录', component: _import('login/index'), hidden: true },
  { path: '/404', name: '404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      { path: 'dashboard', component: _import('dashboard/index'), name: 'dashboard', meta: { title: '首页', icon: 'dashboard', noCache: true } },
      // { path: 'upload', component: _import('admin/user/info'), name: '修改信息', meta: { title: '修改信息', icon: '', noCache: true } },
      // { path: 'toLineShow', component: _import('trustPass/salesStatistics/toLineShow/index'), name: '销售数据曲线图', meta: { title: '销售数据曲线图', icon: '',noCache: true} },

    ]
  },
  

  // 前端路由
  // { path: '/1688/authInfo', name: '授权', component: _import('1688/authInfo'), hidden: true },
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  // {
  //   // menuId: 1105,
  //   path: '/dashboard',
  //   component: Layout,
  //   name: 'dashboard',
  //   redirect: '/dashboard/home',
  //   hidden: false,
  //   // icon: 'table',
  //   meta: {
  //     title: '首页',
  //     icon: 'dashboard'
  //   },
  //   children:[
  //     { path: 'home', component: _import('dashboard/index'), name: '首页', meta: { title: '首页', icon: 'dashboard' } },
  //   ]
  // },
  // {
  //   path: '/advanceOrder',
  //   component: Layout,
  //   name: 'advanceOrder',
  //   redirect: '/advanceOrder/creatOrder',
  //   hidden: false,
  //   // icon: 'table',
  //   meta: {
  //     title: '预订单管理',
  //     icon: 'dashboard'
  //   },
  //   children:[
  //     { path: 'creatOrder', component: _import('advanceOrder/creatOrder/index'), name: 'creatOrder', meta: { title: '创建预订单', icon: 'swagger' } },
  //     { path: 'orederManage', component: _import('advanceOrder/orederManage/index'), name: 'orederManage', meta: { title: '预订单管理', icon: 'swagger' } },
  //   ]
  // },
  
  // {
  //   path: '/setting',
  //   component: Layout,
  //   name: 'setting',
  //   noDropdown:true,
  //   redirect: 'noredirect',
  //   hidden: false,
  //   // icon: 'table',
  //   meta: {
  //     title: '设置',
  //     icon: 'el-icon-setting'
  //   },
  //   children:[
  //     { path: 'index', component: _import('setting/index'), name: 'index', meta: { title: '设置', icon: 'dashboard',noCache:true} },
  //   ]
  // },
]
