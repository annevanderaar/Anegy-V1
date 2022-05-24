<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <v-container class="d-flex justify-center">
        <h1>
          Welcome {{ data.firstname }}! We are glad to have you here on Anegy
        </h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AccountAppBar from "@/components/AppBar/AccountAppBar.vue";
import axios from "axios";
import config from "@/config/index.js";

export default {
  name: "Account",
  components: {
    AccountAppBar,
  },
  data: () => ({
    data: [],
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
