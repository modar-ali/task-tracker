import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "tasks",
      component: () => import("../views/Tasks.vue"),
      props: true,
    },
    {
      path: "/tasks/:id",
      name: "editTask",
      component: () => import("../views/EditTask.vue"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../views/Add.vue"),
    },
  ],
});

export default router;
