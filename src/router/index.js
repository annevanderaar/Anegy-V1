import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/movies/details/:id",
    name: "Movie Details",
    component: () =>
      import(
        /* webpackChunkName: "account" */ "../views/Movies/DetailsMovie.vue"
      ),
  },
  {
    path: "/movies/discover",
    name: "Discover Movies",
    component: () =>
      import(
        /* webpackChunkName: "account" */ "../views/Movies/MoviesDiscover.vue"
      ),
  },
  {
    path: "/movies/trending",
    name: "Trending Movies",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Movies/Movies.vue"),
  },
  {
    path: "/movies/popular",
    name: "Popular Movies",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Movies/Movies.vue"),
  },
  {
    path: "/movies/playing",
    name: "Playing Movies",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Movies/Movies.vue"),
  },
  {
    path: "/movies/top-rated",
    name: "Top Rated Movies",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Movies/Movies.vue"),
  },
  {
    path: "/movies/upcoming",
    name: "Upcoming Movies",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Movies/Movies.vue"),
  },
  {
    path: "/series/details/:id",
    name: "Serie Details",
    component: () =>
      import(
        /* webpackChunkName: "account" */ "../views/Series/DetailsSerie.vue"
      ),
  },
  {
    path: "/series/discover",
    name: "Discover Series",
    component: () =>
      import(
        /* webpackChunkName: "account" */ "../views/Series/SeriesDiscover.vue"
      ),
  },
  {
    path: "/series/trending",
    name: "Trending Series",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Series/Series.vue"),
  },
  {
    path: "/series/popular",
    name: "Popular Series",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Series/Series.vue"),
  },
  {
    path: "/series/playing",
    name: "Playing Series",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Series/Series.vue"),
  },
  {
    path: "/series/top-rated",
    name: "Top Rated Series",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Series/Series.vue"),
  },
  {
    path: "/series/upcoming",
    name: "Upcoming Series",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Series/Series.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "account" */ "../views/Account/Account.vue"),
  },
  {
    path: "/create-account",
    name: "Create Account",
    component: () =>
      import(
        /* webpackChunkName: "createAccount" */ "../views/Account/CreateAccount.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Account/Login.vue"),
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "login" */ "../views/404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
