<template>
  <v-app>
    <v-main style="background: #1d2021">
      <v-container class="d-flex justify-center">
        <v-card
          dark
          class="ma-8"
          color="#919395"
          style="border-radius: 20px; min-height: 310px; width: 400px"
        >
          <v-btn plain depressed icon :to="`/`" class="ma-2">
            <v-img
              alt="Logo Anegy"
              contain
              src="/Anegy-logo.png"
              transition="scale-transition"
              width="40px"
              height="40px"
            ></v-img>
          </v-btn>
          <v-card-title class="justify-center">Reset Password</v-card-title>
          <v-card-subtitle class="text-center"
            >Reset your password for Anegy</v-card-subtitle
          >
          <div class="ma-2">
            <v-text-field
              :rules="[rules.required, rules.min, rules.passwordRules]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="Password"
              v-model="password"
              counter
              @click:append="show = !show"
              v-on:keyup.native.enter="register"
            ></v-text-field>
          </div>
          <v-btn @click="reset" @keyup.enter="reset" class="ma-2">Reset</v-btn>
          <a href="#/login" class="ma-2">Login</a>
          <a class="ma-2" href="#/create-account">Create Account</a>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import config from "@/config/index.js";

export default {
  name: "Reset",
  data: () => ({
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      emailRules: (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    },
  }),
  methods: {
    reset() {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "reset-form",
          password: this.password,
        },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
