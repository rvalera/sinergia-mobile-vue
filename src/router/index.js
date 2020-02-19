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
  const { access_token } = localStorage;
  if (!logged) {
    if (access_token) store.dispatch("keepSignin");
  }
};

router.beforeEach(async (to, from, next) => {
  await keepSignin();
  const { access_token } = localStorage;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!access_token) {
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
