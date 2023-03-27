import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/Home.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
