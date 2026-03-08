import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/customers" },
  {
    path: "/customers",
    name: "customers",
    component: () => import("../components/customers/CustomersPage.vue"),
  },
  {
    path: "/map",
    name: "map",
    component: () => import("../components/map/MapPage.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
