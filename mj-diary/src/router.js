import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("./components/CalendarSplashPage.vue")
  }, {
    path: "/main",
    component: () => import("./components/CalendarMainPage.vue")
  }, {
    path: "/write/:writeDate",
    component: () => import("./components/CalendarWritePage.vue")
  }, {
    path: "/statistics",
    component: () => import("./components/CalendarStatisticsPage.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;