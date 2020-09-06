import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../pages/Game/index'
import Settings from '../pages/Settings/index'
import Registration from '../pages/Registration/index'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
        { path: '/', component: Registration },
        { path: '/settings', component: Settings },
        { path: '/game', component: Game }
    ]
})

export default router
