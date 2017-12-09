import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import index from '@/components/index'
import testPage2 from '@/components/page2'
import testPage3 from '@/components/page3'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: login,
      name:'login'
    },
    {
      path: '/index',
      component: index,
      name:'index'
    },
    {
      path: '/page2',
      component: testPage2,
      name:'index2'
    },
    {
      path: '/page3',
      component: testPage3,
      name:'index3'
    }
  ]
})
