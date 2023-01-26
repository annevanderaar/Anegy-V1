import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../views/Homepage.vue";
import { authGuard } from '../auth/authGuard';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
    meta: {
      title: "Anegy - Movies & Series",
    },
  },
  {
    path: "/movies/details/:id",
    name: "Movie Details",
    component: () =>
      import(/* webpackChunkName: "DetailsMovie" */ "../views/DetailsMovie.vue"),
    meta: {
      title: "Details ... - Anegy",
    },
  },
  {
    path: "/movies/discover",
    name: "Discover Movies",
    component: () =>
      import(/* webpackChunkName: "Movies" */ "../views/Movies.vue"),
    meta: {
      title: "Discover Movies - Anegy",
    },
  },
  {
    path: "/movies/trending",
    name: "Trending Movies",
    component: () =>
      import(/* webpackChunkName: "Movies" */ "../views/Movies.vue"),
    meta: {
      title: "Trending Movies - Anegy",
    },
  },
  {
    path: "/movies/popular",
    name: "Popular Movies",
    component: () =>
      import(/* webpackChunkName: "Movies" */ "../views/Movies.vue"),
    meta: {
      title: "Popular Movies - Anegy",
    },
  },
  {
    path: "/movies/playing",
    name: "Playing Movies",
    component: () =>
      import(/* webpackChunkName: "Movies" */ "../views/Movies.vue"),
    meta: {
      title: "Playing Movies - Anegy",
    },
  },
  {
    path: "/movies/top-rated",
    name: "Top Rated Movies",
    component: () =>
      import(/* webpackChunkName: "Movies" */ "../views/Movies.vue"),
    meta: {
      title: "Top Rated Movies - Anegy",
    },
  },
  {
    path: "/movies/upcoming",
    name: "Upcoming Movies",
    component: () =>
      import(/* webpackChunkName: "Movies" */ "../views/Movies.vue"),
    meta: {
      title: "Upcoming Movies - Anegy",
    },
  },
  {
    path: "/series/details/:id",
    name: "Serie Details",
    component: () =>
      import(/* webpackChunkName: "DetailsSerie" */ "../views/DetailsSerie.vue"),
    meta: {
      title: "Details ... - Anegy",
    },
  },
  {
    path: "/series/discover",
    name: "Discover Series",
    component: () =>
      import(/* webpackChunkName: "Series" */ "../views/Series.vue"),
    meta: {
      title: "Discover Series - Anegy",
    },
  },
  {
    path: "/series/trending",
    name: "Trending Series",
    component: () =>
      import(/* webpackChunkName: "Series" */ "../views/Series.vue"),
    meta: {
      title: "Trending Series - Anegy",
    },
  },
  {
    path: "/series/popular",
    name: "Popular Series",
    component: () =>
      import(/* webpackChunkName: "Series" */ "../views/Series.vue"),
    meta: {
      title: "Popular Series - Anegy",
    },
  },
  {
    path: "/series/playing",
    name: "Playing Series",
    component: () =>
      import(/* webpackChunkName: "Series" */ "../views/Series.vue"),
    meta: {
      title: "Playing Series - Anegy",
    },
  },
  {
    path: "/series/top-rated",
    name: "Top Rated Series",
    component: () =>
      import(/* webpackChunkName: "Series" */ "../views/Series.vue"),
    meta: {
      title: "Top Rated Series - Anegy",
    },
  },
  {
    path: "/series/upcoming",
    name: "Upcoming Series",
    component: () =>
      import(/* webpackChunkName: "Series" */ "../views/Series.vue"),
    meta: {
      title: "Upcoming Series - Anegy",
    },
  },
  {
    path: "/people/:id",
    name: "People",
    component: () =>
      import(/* webpackChunkName: "Person" */ "../views/Person.vue"),
    meta: {
      title: "Details ... - Anegy",
    },
  },
  {
    path: "/account",
    name: "Account",
    component: () =>
      import(/* webpackChunkName: "Account" */ "../views/Account/Account.vue"),
    meta: {
      title: "Account - Anegy",
    },
    beforeEnter: authGuard,
  },
  {
    path: "/account/favorites",
    name: "Favorites",
    component: () =>
      import(
        /* webpackChunkName: "Favorites" */ "../views/Account/Favorites.vue"
      ),
    meta: {
      title: "Favorites - Anegy",
    },
    beforeEnter: authGuard,
  },
  {
    path: "/account/watched",
    name: "Watched",
    component: () =>
      import(/* webpackChunkName: "Watched" */ "../views/Account/Watched.vue"),
    meta: {
      title: "Watchlist - Anegy",
    },
    beforeEnter: authGuard,
  },
  {
    path: "*",
    name: "404",
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue"),
    meta: {
      title: "404 - Anegy",
    },
  },
];

const router = new VueRouter({
  routes,
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

export default router;
