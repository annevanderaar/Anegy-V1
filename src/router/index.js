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
    component: () => import(/* webpackChunkName: "account" */ '../views/Movies.vue')
  },
  {
    path: '/series',
    name: 'Series',
    component: () => import(/* webpackChunkName: "account" */ '../views/Series.vue')
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