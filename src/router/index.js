import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/HelloWorld.vue";
import Login from "../components/loginform.vue";
import User from "../components/userinfo.vue";
import result from "../components/result.vue";
import info from "../components/info.vue";
import question from "../components/question.vue";

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
  {
    path: "/info",
    name: "info",
    component: info,
  },
  {
    path: "/question",
    name: "question",
    component: question,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;