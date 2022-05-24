<template>
  <v-app-bar app color="secondary" clipped-left>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          :to="`/movies/discover`"
          ><v-icon>mdi-movie-open</v-icon></v-btn
        >
      </template>
      <span>Movies Discover</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          :to="`/series/discover`"
          ><v-icon>mdi-television-classic</v-icon></v-btn
        >
      </template>
      <span>Series Discover</span>
    </v-tooltip>
    <v-btn disabled icon></v-btn>
    <v-btn disabled icon></v-btn>
    <v-spacer></v-spacer>
    <v-btn plain depressed icon :to="`/`">
      <v-img
        alt="Logo Anegy"
        contain
        src="/Anegy-logo.png"
        transition="scale-transition"
        width="40px"
        height="40px"
      ></v-img>
    </v-btn>
    <v-spacer></v-spacer>
    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon class="white--text" v-on="on"
          ><v-icon>fas fa-user-astronaut</v-icon></v-btn
        >
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <h3>
              {{
                this.$session.get("firstname") +
                " " +
                this.$session.get("lastname")
              }}
            </h3>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed text @click="openAccount"> Account </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed text @click="logOut"> Logout </v-btn>
          </div></v-list-item-content
        >
      </v-card>
    </v-menu>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          :to="`/account/watched`"
          ><v-icon>mdi-clipboard-list-outline</v-icon></v-btn
        >
      </template>
      <span>Watchlist</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          icon
          class="white--text"
          :to="`/account/favorites`"
          ><v-icon>fas fa-heart</v-icon></v-btn
        >
      </template>
      <span>Favorites</span>
    </v-tooltip>
    <v-btn
      icon
      class="white--text"
      v-if="!$vuetify.theme.dark"
      @click="darkMode"
      ><v-icon>fas fa-moon</v-icon></v-btn
    >
    <v-btn icon class="white--text" v-else @click="darkMode"
      ><v-icon>fas fa-sun</v-icon></v-btn
    >
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({}),
  methods: {
    openAccount() {
      this.$router.push({ path: `/account` });
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    logOut() {
      this.$session.destroy();
      this.$toast.success(
        "You have succesfully loged out. You will be redirected.",
        {
          timeout: 2000,
        }
      );
      setTimeout(() => {
        this.$router.push({ path: `/` });
      }, 2000);
    },
  },
};
</script>
