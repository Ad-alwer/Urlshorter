import { createApp } from "vue";
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import home from "./components/home.vue";
import register from "./components/Register.vue"

const routes = [
  { path: "/", component: home },
  { path: "/register", component: register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).use(bootstrap).mount("#app");
