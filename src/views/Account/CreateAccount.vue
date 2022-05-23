<template>
  <v-app>
    <v-main style="background: #1d2021">
      <v-container class="d-flex justify-center">
        <v-card
          dark
          class="ma-8"
          color="#919395"
          style="border-radius: 20px; min-height: 500px; width: 400px"
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
          <v-card-title class="justify-center">Create Account</v-card-title>
          <v-card-subtitle class="text-center"
            >Create an account at Anegy</v-card-subtitle
          >
          <div class="ma-2">
            <v-text-field
              :rules="[rules.required]"
              label="First name"
              v-model="firstname"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required]"
              label="Last name"
              v-model="lastname"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.emailRules]"
              label="Email"
              v-model="email"
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.min, rules.passwordRules]"
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
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    show: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters.",
      emailRules: (v) =>
        /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
      passwordRules: (v) =>
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
        "Password must contain at least lowercase letter, one number, a special character and one uppercase letter.",
    },
  }),
  methods: {
    register() {
      if (this.name == "" || this.email == "" || this.password == "") {
        this.$toast.warning("You forgot something, try again.", {
          timeout: 2000,
        });
      } else {
        axios({
          method: "post",
          url: `${config.url}/Library/Account.php`,
          data: {
            param: "create",
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          },
        })
          .then((res) => {
            console.log(res.data);
            if (res.data == "error") {
              this.$toast.error("Something went wrong. Try again.", {
                timeout: 2000,
              });
            } else {
              this.$session.start();
              this.$session.set("id", res.data);
              this.$toast.success(
                "Account successfully made. You will be redirected.",
                {
                  timeout: 2000,
                }
              );
              setTimeout(() => {
                this.$router.push({ path: `/account` });
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
