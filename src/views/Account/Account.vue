<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <v-container justify="center">
        <h1 style="text-align: center">
          Welcome {{ data.firstname }}! We are glad to have you here on Anegy
        </h1>
        <h2 style="text-align: center">Your information</h2>
        <v-row justify="center">
          <h3>Name:</h3>
          <h3>{{ $auth.user.name }}</h3>
        </v-row>
        <v-row justify="center">
          <h3>Email:</h3>
          <h3>{{ $auth.user.email }}</h3>
        </v-row>
        <v-row justify="center">
          <v-btn color="accent" class="ma-2" @click="logOut">Logout</v-btn>
        </v-row>
        <v-row justify="center">
          <v-btn color="accent" class="ma-2" :to="`/reset`"
            >Change password</v-btn
          >
        </v-row>
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="300">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red" dark class="ma-2" v-bind="attrs" v-on="on">
                Delete user
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="text-h5" style="word-break: normal">
                Are you sure you want to delete your account?
              </v-card-title>
              <v-card-text style="word-break: normal; text-align: center">
                This action will be irreversible</v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="dialog = false">
                  No
                </v-btn>
                <v-btn color="green darken-1" text @click="deleteUser">
                  Yes
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>
    </v-main>
    <WebsiteFooter />
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";
import WebsiteFooter from "@/components/WebsiteFooter.vue";

export default {
  name: "Account",
  components: {
    AccountAppBar,
    WebsiteFooter,
  },
  data: () => ({
    data: [],
    dialog: false,
  }),
  methods: {
    logOut() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
  mounted() {
    if (!this.$auth.isAuthenticated) {
      this.$auth.loginWithRedirect();
    }
  },
};
</script>