import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { routes } from "./routes";

Vue.use(Router);

const router = new Router({
  routes,
  mode: !process.env.CORDOVA_PLATFORM ? "history" : "hash",
  scrollBehviour(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
  }
});

const keepSignin = async () => {
  const { logged } = store.getters;
  const { user } = localStorage;
  if (!logged) {
    if (user) store.dispatch("keepSignin");
  }
};

router.beforeEach(async (to, from, next) => {
  await keepSignin();
  const { user } = localStorage;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!user) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
