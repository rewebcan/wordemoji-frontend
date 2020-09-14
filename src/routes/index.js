import Vue from "vue";
import VueRouter from "vue-router";
import Game from "../pages/Game/index";
import Settings from "../pages/Settings/index";
import Registration from "../pages/Registration/index";
import NotFound from "../pages/NotFound/index";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      name: "Registration",
      path: "/",
      component: Registration,
      props: true,
    },
    {
      name: "Settings",
      path: "/",
      component: Settings,
      props: true,
    },
    {
      name: "Game",
      path: "/",
      component: Game,
      props: true,
    },
    { name: "NotFound", path: "*", component: NotFound, meta: { order: 4 } },
  ],
});

export default router;
