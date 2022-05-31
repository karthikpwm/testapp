import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/HelloWorld.vue";
import Login from "../components/loginform.vue";
import User from "../components/userinfo.vue";
import result from "../components/result.vue"


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/result",
    name: "result",
    component: result,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;