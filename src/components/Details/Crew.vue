<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="crew in this.credits.crew"
      :key="crew.id"
      width="300px"
      class="cards"
    >
      <v-avatar size="128" class="ma-2">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${crew.profile_path}`"
        ></v-img>
      </v-avatar>
      <v-card-title>{{ crew.name }}</v-card-title>
      <v-card-text style="text-align: center">{{ crew.job }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: ["credits"],
  };
</script>
