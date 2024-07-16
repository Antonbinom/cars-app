import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/MainPage.vue"),
    },
    {
      path: "/shops",
      name: "shops",
      component: () => import("@/views/ShopsPage.vue"),
    },
    {
      path: "/cars",
      name: "cars",
      component: () => import("@/views/CarsPage.vue"),
    },
  ],
});

export default router;
