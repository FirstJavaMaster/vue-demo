import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './filters'
import './plugins/axios'
import './plugins/element-ui'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
