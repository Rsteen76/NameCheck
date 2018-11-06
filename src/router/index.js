import Vue from 'vue'
import Router from 'vue-router'
import nameSearch from '@/pages/nameSearch'
import login from '@/pages/login'

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
    }
  ]
})
