import VueRouter, { RouteConfig } from 'vue-router'
import OnionActivityView from '../../views/OnionActivityView.vue'
import TurboView from '../../views/TurboView.vue'
import PageNotFoundView from '../../views/PageNotFoundView.vue'

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
    {
        path: '*',
        name: 'page_not_found',
        component: PageNotFoundView,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
