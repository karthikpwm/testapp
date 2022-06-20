import { useUserStore } from './../store/user'
import { createWebHistory, createRouter } from "vue-router";
// import Home from "../components/HelloWorld.vue";
// import Login from "../components/loginform.vue";
// import User from "../components/userinfo.vue";
// import result from "../components/result.vue";
// import info from "../components/info.vue";
// import question from "../components/question.vue";
// import cresult from "../components/candidateresults.vue";
// import calc from "../components/calculator.vue"
// import printcanquestions from "../components/printcandidatequestions.vue"

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("../components/loginform.vue"), meta: { requiresAuth: true } },
      { path: "/home", component: () => import("../components/HelloWorld.vue"), meta: { requiresAuth: true } },
      { path: "/login", component: () => import("../components/loginform.vue") },
      { path: "/user", component: () => import("../components/userinfo.vue"), meta: { requiresAuth: true } },
      { path: "/result", component: () => import("../components/result.vue") },
      { path: "/info", component: () => import("../components/info.vue"), meta: { requiresAuth: true } },
      { path: "/question", component: () => import("../components/question.vue"), meta: { requiresAuth: true } },
      { path: "/cresult", component: () => import("../components/candidateresults.vue") },
      { path: "/calc", component: () => import("../components/calculator.vue") },
      { path: "/printcanquestions/:id", component: () => import("../components/printcandidatequestions.vue") },
      { path: '/:pathMatch(.*)*', redirect: '/login' },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const store = useUserStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.token) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;