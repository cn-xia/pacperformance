/**
 * 路由Map
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//rule
import ruleComponent from 'pages/rule'
//treecut
import treeCutComponent from 'pages/modeling/treecut'
//metamodel
import metaModelComponent from 'pages/modeling/metamodel'
//basicmodel
import basicModelComponent from 'pages/modeling/basicmodel'
//404
import noPageComponent from 'pages/error/404'
//login
import loginComponent from 'pages/user/login'


Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/tree',
  component: viewPageComponent,
  children: [{
    path: '/tree',
    name: 'tree',
    component: homeComponent,
    meta: {
      title: "特征树管理",
      auth: true
    }
  },{
    path:'/rule',
    name:'rule',
    component: ruleComponent,
    meta:{
      title:"规则库管理",
      auth:true
    }
  }, /* {
    path: '/table/update/:id',
    name: 'tableUpdate',
    component: saveTableComponent,
    meta: {
      title: "数据修改",
      auth: true
    }
  }, {
    path: '/table/add',
    name: 'tableAdd',
    component: saveTableComponent,
    meta: {
      title: "添加数据",
      auth: true
    }
  }, */ {
    path: '/modeling/treecut',
    name: 'TreeCut',
    component: treeCutComponent,
    meta: {
      title: "特征树裁剪",
      auth: true
    }
  },{
    path: '/modeling/metamodel',
    name: 'metamodel',
    component: metaModelComponent,
    meta: {
      title: "元模型构建",
      auth: true
    }
  },{
    path: '/modeling/basicmodel',
    name: 'basicmodel',
    component: basicModelComponent,
    meta: {
      title: "基模型构建",
      auth: true
    }
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
