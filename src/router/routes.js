import { useAuthStore } from "@/state/pinia";


export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/account/login.vue"),
    meta: {
      title: "Login",
      beforeResolve(routeTo, routeFrom, next) {
        const auth = useAuthStore();
        if (auth.loggedIn == true) {
          next({ name: "default" });
        } else {
          next();
        }
      }
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/account/logout.vue"),
    meta: {
      title: "Logout",
      authRequired: true
    }
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "404",
  },
  {
    path: "/404",
    name: "404",
    meta: { title: "404 Not Found" },
    component: require("../views/utility/404.vue").default
  },
  
  // --- Start From Here is Page with Auth Required --- //
  {
    path: "/",
    name: "default",
    meta: { title: "Dashboard", authRequired: true },
    component: () => import("../views/dashboards/default.vue")
  },

  // -- Sub Menu Master -- //

  // -- Konfigurasi -- //
  {
    path: "/master/konfigurasi",
    name: "konfigurasi",
    meta: { title: "Konfigurasi Aplikasi", authRequired: true },
    component: () => import("../views/master/konfigurasi/index-konfigurasi.vue")
  },

  // -- Menu Master -- //
  {
    path: "/master/menu-master",
    name: "menu-master",
    meta: { title: "Menu Master", authRequired: true },
    component: () => import("../views/master/menu-master/index-menu-master.vue")
  },

  // -- Ordering Menu Master -- //
  {
    path: "/master/menu-master/ordering",
    name: "ordering-menu-master",
    meta: { title: "Ordering Menu Master", authRequired: true },
    component: () => import("../views/master/menu-master/ordering-menu-master.vue")
  },

  // -- Role -- //
  {
    path: "/master/role",
    name: "role",
    meta: { title: "Role", authRequired: true },
    component: () => import("../views/master/role/index-role.vue")
  },

  // -- User -- //
  {
    path: "/master/user",
    name: "user",
    meta: { title: "User", authRequired: true },
    component: () => import("../views/master/user/index-user.vue")
  },

  //--periode--//
  {
    path: "/master/periode",
    name: "periode",
    meta: { title: "Periode", authRequired: true },
    component: () => import("../views/master/periode/index-periode.vue")
  },
  // -- Profil User -- //
  {
    path: "/accout/profile-user",
    name: "profile-user",
    meta: { title: "Profil User", authRequired: true },
    component: () => import("../views/account/profile.vue")
  },
  // -- mentorring List -- //
  {
    path: "/jadwal/list",
    name: "jadwal",
    meta: { title: "Mentorring List", authRequired: true },
    component: () => import("../views/mentoring/mentoring-list.vue")
  },
  {
    path: "/mentorring/:mode/:id",
    name: "mentorring-edit",
    meta: { title: "Mentorring Edit", authRequired: true },
    component: () => import("../views/mentoring/mentoringEdit.vue")  
  },

  {
    path: "/calendar",
    name: "Calendar",
    meta: { title: "Calendar", authRequired: true },
    component: () => import("../views/calendar/calendar.vue")
  },

];