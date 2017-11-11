import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import index from '@/components/index'

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
    }
  ]
})
