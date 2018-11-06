// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
// import Vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
// Vue.use(Vuetify, { theme: {
//   primary: '#ee44aa',
//   secondary: '#424242',
//   accent: '#82B1FF',
//   error: '#FF5252',
//   info: '#2196F3',
//   success: '#4CAF50',
//   warning: '#FFC107'
// }})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
