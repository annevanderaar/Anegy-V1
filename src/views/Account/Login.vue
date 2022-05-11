<template>
  <v-app>
    <v-main style="background: #1d2021">
      <v-container class="d-flex justify-center">
        <v-card
          dark
          class="ma-8"
          color="#919395"
          style="border-radius: 20px; min-height: 400px; width: 80%"
        >
          <v-img
            alt="Logo Anegy"
            contain
            src="/Anegy-logo.png"
            transition="scale-transition"
            width="40px"
            height="40px"
            class="ma-2"
          ></v-img>
          <v-card-title class="justify-center">Login</v-card-title>
          <v-card-subtitle class="text-center"
            >Login at your account on Anegy</v-card-subtitle
          >
          <div class="ma-2">
            <v-text-field
              label="Email"
              v-model="email"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.min]"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="Password"
              v-model="password"
              counter
              @click:append="show = !show"
            ></v-text-field>
          </div>
          <v-btn class="ma-2" @click="login">Login</v-btn>
          <a class="ma-2" href="">Forgot password?</a>
          <a class="ma-2" href="#/create-account">Don't have an account?</a>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import config from "@/config/index.js";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    show: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),
  methods: {
    login() {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          email: this.email,
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
