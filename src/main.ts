import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
// @ts-ignore
import VueYoutube from 'vue-youtube'
Vue.config.productionTip = false
Vue.use(VueYoutube)

new Vue({
  render: h => h(App),
}).$mount('#app')



