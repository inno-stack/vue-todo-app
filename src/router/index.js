import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import Dashboard from "../pages/Dashboard.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  { path: "/dashboard", component: Dashboard, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Redirect if not logged in
import { supabase } from "../lib/supabase";
router.beforeEach(async (to) => {
  const { data } = await supabase.auth.getSession();
  if (to.meta.requiresAuth && !data.session) {
    return "/login";
  }
});

export default router;
