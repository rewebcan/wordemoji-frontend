import Vue from "vue";
import Vuex from "vuex";
import Buefy from "buefy";
import VueCookie from "vue-cookie";
import App from "./App.vue";
import store from "./store";
import router from "./routes";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "buefy/dist/buefy.css";
import "swiper/swiper-bundle.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import VueMeta from "vue-meta";
import VueGtag from "vue-gtag";

Vue.config.productionTip = false;

Vue.use(VueMeta);
Vue.use(VueCookie);
Vue.use(Vuex);
Vue.use(Buefy, { defaultIconPack: "fas" });
Vue.use(VueAwesomeSwiper);
Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV !== "production",
    connection: SocketIO(process.env.VUE_APP_WS_URL),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);
Vue.use(VueGtag, {config: { id: "UA-174960017-1" }}, router)
Vue.router = router;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
