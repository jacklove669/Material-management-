import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import axios from 'axios'
import echarts from 'echarts'

import http from './config'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

// Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$http = http

new Vue({
  router,
  store,
  http,
  render: h => h(App)
}).$mount('#app')
