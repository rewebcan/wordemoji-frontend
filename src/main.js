import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import App from './App.vue'
import store from './store'
import router from './routes'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'buefy/dist/buefy.css'
import 'swiper/swiper-bundle.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Buefy, { defaultIconPack: 'fas' })
Vue.use(VueAwesomeSwiper)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
