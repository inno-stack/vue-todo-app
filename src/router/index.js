import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";
import { supabase } from "../lib/supabase";

const routes = [
  // Root redirects to login
  { path: "/", redirect: "/login" },

  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },

  // Catch-all 404 redirect to login
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Auth guard
router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getSession();

  // If route requires auth and no session, redirect to login
  if (to.meta.requiresAuth && !data.session) {
    return "/login";
  }

  // If user is already logged in, prevent going to login/signup
  if ((to.path === "/login" || to.path === "/signup") && data.session) {
    return "/dashboard";
  }

  // Otherwise, allow navigation
  return true;
});

export default router;
