<template>
  <v-app>
    <v-main style="background: #1d2021">
      <v-container class="d-flex justify-center">
        <v-card
          dark
          class="ma-8"
          color="#919395"
          style="border-radius: 20px; min-height: 450px; width: 80%"
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
          <v-card-title class="justify-center">Create Account</v-card-title>
          <v-card-subtitle class="text-center"
            >Create an account at Anegy</v-card-subtitle
          >
          <div class="ma-2">
            <v-text-field
              :rules="[rules.required]"
              label="Name"
              v-model="name"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Email"
              v-model="email"
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
          <v-btn class="ma-2" @click="register">Create</v-btn>
          <a href="#/login" class="ma-2">Already have an account?</a>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import config from "@/config/index.js";

export default {
  name: "CreateAccount",
  data: () => ({
    name: "",
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
    register() {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          name: this.name,
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
