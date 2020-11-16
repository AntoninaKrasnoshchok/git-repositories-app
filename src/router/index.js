import { createRouter, createWebHashHistory } from "vue-router";
import RepositoriesList from "../views/RepositoriesList.vue";

const routes = [
  {
    path: "/",
    name: "RepositoriesList",
    component: RepositoriesList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
