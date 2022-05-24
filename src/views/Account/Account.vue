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
          <h3>{{ data.firstname }} {{ data.lastname }}</h3>
        </v-row>
        <v-row justify="center">
          <h3>Email:</h3>
          <h3>{{ data.email }}</h3>
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
import axios from "axios";
import config from "@/config/index.js";

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
    getAccount(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "account",
          id: id,
        },
      })
        .then((res) => {
          this.data = res.data[0];
          this.$session.set("firstname", res.data[0].firstname);
          this.$session.set("lastname", res.data[0].lastname);
          this.$session.set("email", res.data[0].email);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser() {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "deleteUser",
          id: this.$session.get("id"),
        },
      })
        .then((res) => {
          if (res.data == "succes") {
            this.$session.destroy();
            this.dialog = false;
            this.$toast.success(
              "Successfully deleted your account. You will be redirected.",
              {
                timeout: 2000,
              }
            );
            setTimeout(() => {
              this.$router.push({ path: `/` });
            }, 2000);
          } else if (res.data == "error") {
            this.$toast.error("Something went wrong. Try again.", {
              timeout: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
  mounted() {
    if (!this.$session.exists()) {
      this.$router.push({ path: `/login` });
    } else {
      this.getAccount(this.$session.get("id"));
    }
  },
};
</script>
