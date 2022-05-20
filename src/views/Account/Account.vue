<template>
  <v-app>
    <AccountAppBar />
    <v-main>
      <h1>
        Welkom {{ data.firstname }}. Dit is je account van Anegy. Hier kan je al
        je favoriete films en series opslaan. En je kan alles afstrepen wat je
        hebt gekeken.
      </h1>
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
          id: id,
        },
      })
        .then((res) => {
          this.data = res.data[0];
          //console.log(res.data);
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
