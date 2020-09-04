import Vue from 'vue'
import VueRouter from 'vue-router'
import Registration from '../pages/Registration'
import Settings from '../pages/Settings'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        { path: '/', component: Registration },
        { path: '/settings', component: Settings }
    ]
})

export default router
