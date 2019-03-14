// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './help/rem'
import Axios from './api/index'
Vue.prototype.$axios = Axios
import api from 'axios'
api.defaults.baseURL = 'http://study.my/laravel-mock-api/public/'
Vue.prototype.$ajax = api


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
