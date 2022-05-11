<template>
  <v-app>
    <v-main style="background: #1d2021">
      <v-container class="d-flex justify-center">
        <v-card
          dark
          class="ma-8"
          color="#919395"
          style="border-radius: 20px; min-height: 500px; width: 40%"
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
          <div class="d-flex justify-center flex-column">
            <v-btn class="ma-2">Login</v-btn>
            <a href="">Forgot password?</a>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
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
};
</script>
