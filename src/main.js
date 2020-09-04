import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import App from './App.vue'
import router from './routes'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'buefy/dist/buefy.css'
import 'swiper/swiper-bundle.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Buefy)
Vue.use(VueAwesomeSwiper)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
