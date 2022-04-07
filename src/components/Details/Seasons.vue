<template>
  <div class="d-flex justify-center flex-wrap">
    <div v-for="sea in season" :key="sea.id">
      <v-card width="300px" class="cards">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500${sea.poster_path}`"
        ></v-img>
        <v-card-title>Season {{ sea.season_number }}</v-card-title>
        <v-card-text style="text-align: center">
          {{ sea.episodes.length }}
          {{ sea.episodes.length > 1 ? "Episodes" : "Episode" }}
          <br />
          {{
            new Date(sea.air_date).toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["season"],
};
</script>
