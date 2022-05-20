<template>
  <v-app>
    <v-main style="background: #1d2021">
      <v-container class="d-flex justify-center">
        <v-card
          dark
          class="ma-8"
          color="#919395"
          style="border-radius: 20px; min-height: 360px; width: 400px"
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
          <v-card-title class="justify-center">Reset Password</v-card-title>
          <v-card-subtitle class="text-center"
            >Reset your password for Anegy</v-card-subtitle
          >
          <v-btn class="ma-2" @click="login">Reset</v-btn>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Reset",
  data: () => ({}),
  methods: {},
};
</script>
