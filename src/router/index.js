import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/HelloWorld.vue";
import Login from "../components/loginform.vue";
import User from "../components/userinfo.vue";
import result from "../components/result.vue";
import info from "../components/info.vue";
import question from "../components/question.vue";
import cresult from "../components/candidateresults.vue";
import calc from "../components/calculator.vue"
import printcanquestions from "../components/printcandidatequestions.vue"

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
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
  {
    path: "/cresult",
    name: "cresult",
    component: cresult,
  },
  {
    path: "/calc",
    name: "calc",
    component: calc,
  },
  {
    path: "/printcanquestions",
    name: "printcanquestions",
    component: printcanquestions,
    props:true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;