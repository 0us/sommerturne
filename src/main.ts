import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
// @ts-ignore
import VueYoutube from 'vue-youtube'
Vue.config.productionTip = false
Vue.use(VueYoutube)

// Router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './plugins/router/index'

// Event hub
export const eventHub = new Vue()

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
