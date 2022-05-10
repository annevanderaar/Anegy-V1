<template>
  <v-app>
    <v-main>
      <v-card
        class="ma-8"
        color="#f32b2b"
        dark
        style="border-radius: 20px; min-height: 500px"
      >
        <v-img
          alt="Logo Anegy"
          contain
          src="/Anegy-logo.png"
          transition="scale-transition"
          width="40px"
          height="40px"
          class=""
        ></v-img>
        <v-card-title>Create Account</v-card-title>
        <v-card-subtitle>Create an account at Anegy</v-card-subtitle>
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
        <v-btn>Create</v-btn>
        <a href="#/login">Already have an account?</a>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
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
};
</script>
