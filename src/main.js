import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VScrollLock from 'v-scroll-lock'
import FocusDirective from './directive/focus'


Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://127.0.0.1:5000';
Vue.use(Vuelidate)
Vue.use(VScrollLock)
Vue.directive('focus', FocusDirective)





new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
