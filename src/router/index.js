import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "not-found",
    //   component: () => import("../pages/not-found.vue"),
    // },

    {
      path: "/",
      component: () => import("../layout/default.vue"),
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("../pages/home.vue"),
        },
        {
          path: "/orders",
          name: "orders",
          component: () => import("../pages/orders.vue"),
        },
      ],
    },

    {
      path: "/auth/admin",
      name: "admin-login",
      component: () => import("../pages/auth/admin-auth.vue"),
    },

    {
      path: "/dashboard",
      name: "admin-dashboard",
      redirect: "/dashboard/home",
      component: () => import("../pages/admin-dashboard.vue"),
      children: [
        {
          path: "/dashboard/home",
          name: "home",
          component: () => import("../views/HomeView.vue"),
        },

        {
          path: "/dashboard/admins",
          name: "admin-list",
          component: () => import("../views/AdminView.vue"),
        },
        {
          path: "/dashboard/orders",
          name: "order-list",
          component: () => import("../views/OrdersView.vue"),
        },
        {
          path: "/dashboard/drivers",
          name: "driver-list",
          component: () => import("../views/DriversView.vue"),
        },
      ],
    },
    // {
    //   path: "/",
    //   component: () => import("../layout/authLayout.vue"),
    //   children: [
    //     {
    //       path: "/login",
    //       name: "login",
    //       component: () => import("../pages/auth/signIn.vue"),
    //     },
    //     {
    //       path: "/signup",
    //       name: "signup",
    //       component: () => import("../pages/auth/signUp.vue"),
    //     },
    //   ],
    // },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// router.beforeEach((to, from) => {
//   const isLoggedin = JSON.parse(localStorage.getItem("user"));

//   if (!isLoggedin && to.name != "login") {
//     return { name: "login" };
//   }
// });

router.beforeEach((to, from, next) => {
  const isAdminAuthenticated = JSON.parse(
    localStorage.getItem("isAdminAuthenticated")
  );

  if (to.path.startsWith("/dashboard") && !isAdminAuthenticated) {
    next({ name: "admin-login" });
  } else {
    next();
  }
});

export default router;
