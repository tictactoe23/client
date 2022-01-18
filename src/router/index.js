import { createRouter, createWebHistory } from "vue-router";
import TicTacToe from "../pages/TicTacToe.vue";
import LoginForm from "../pages/LoginForm.vue";
import AdminPanel from "../pages/AdminPanel.vue";
import NotFound from "../pages/NotFound.vue";
import { postRequest } from "@/plugins/requests";

const routes = [
  {
    path: "/",
    name: "Home",
    component: TicTacToe,
  },
  {
    path: "/login-admin",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPanel,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await postRequest("/auth-token", { token: token });
      if (data.success) {
        next();
      }
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
