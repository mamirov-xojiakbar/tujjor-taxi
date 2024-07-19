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

export default router;