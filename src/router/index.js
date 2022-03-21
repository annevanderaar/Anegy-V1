import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/movies',
    name: 'Movies',
    component: () => import(/* webpackChunkName: "account" */ '../views/Movies/Movies.vue')
  },
  {
    path: '/movies/popular',
    name: 'Popular Movies',
    component: () => import(/* webpackChunkName: "account" */ '../views/Movies/MoviesPopular.vue')
  },
  {
    path: '/movies/playing',
    name: 'Playing Movies',
    component: () => import(/* webpackChunkName: "account" */ '../views/Movies/MoviesPlaying.vue')
  },
  {
    path: '/movies/top-rated',
    name: 'Top Rated Movies',
    component: () => import(/* webpackChunkName: "account" */ '../views/Movies/MoviesTopRated.vue')
  },
  {
    path: '/movies/upcoming',
    name: 'Popular Movies',
    component: () => import(/* webpackChunkName: "account" */ '../views/Movies/MoviesUpcoming.vue')
  },
  {
    path: '/series',
    name: 'Series',
    component: () => import(/* webpackChunkName: "account" */ '../views/Series/Series.vue')
  },
  {
    path: '/series/popular',
    name: 'Popular Series',
    component: () => import(/* webpackChunkName: "account" */ '../views/Series/SeriesPopular.vue')
  },
  {
    path: '/series/playing',
    name: 'Playing Series',
    component: () => import(/* webpackChunkName: "account" */ '../views/Series/SeriesOnAir.vue')
  },
  {
    path: '/series/top-rated',
    name: 'Top Rated Series',
    component: () => import(/* webpackChunkName: "account" */ '../views/Series/SeriesTopRated.vue')
  },
  {
    path: '/series/upcoming',
    name: 'Popular Series',
    component: () => import(/* webpackChunkName: "account" */ '../views/Series/SeriesAiring.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account/Account.vue')
  },
  {
    path: '/create-account',
    name: 'Create Account',
    component: () => import(/* webpackChunkName: "createAccount" */ '../views/Account/CreateAccount.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Account/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router