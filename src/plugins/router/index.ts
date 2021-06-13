import VueRouter, { RouteConfig } from 'vue-router'
import OnionActivityView from '../../views/OnionActivityView.vue'
import TurboView from '../../views/TurboView.vue'

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: TurboView,
    },
    {
        path: '/onion_activity',
        name: 'onion_activity',
        component: OnionActivityView,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
