<template>
  <v-card
    class="d-flex justify-center flex-row"
    color="secondary"
    style="border-radius: 0px"
  >
    <v-footer color="secondary">
      <v-card-text class="white--text">
        ©{{ new Date().getFullYear() }} — <strong>Anegy</strong>
        <v-img
          class="mt-2"
          max-width="100px"
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
        ></v-img>
      </v-card-text>
    </v-footer>
  </v-card>
</template>

<script>
export default {};
</script>