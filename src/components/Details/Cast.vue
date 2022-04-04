<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="cast in this.credits.cast"
      :key="cast.id"
      width="300px"
      class="cards"
      :to="`/people/${cast.id}`"
    >
      <v-avatar size="128" class="ma-2">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${cast.profile_path}`"
        ></v-img>
      </v-avatar>
      <v-card-title>{{ cast.name }}</v-card-title>
      <v-card-subtitle>as</v-card-subtitle>
      <v-card-text style="text-align: center">{{ cast.character }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["credits"],
};
</script>
