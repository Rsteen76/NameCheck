import Vue from 'vue'
import Router from 'vue-router'
import nameSearch from '@/pages/nameSearch'
import login from '@/pages/login'
import admin from '@/pages/Admin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nameSearch',
      component: nameSearch
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    }
  ]
})
