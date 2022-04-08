<template>
  <div class="d-flex justify-center flex-wrap">
    <v-card
      width="300px"
      class="cards"
      v-for="sea in season"
      :key="sea.id"
      @click="episode(sea.episodes)"
    >
      <v-img :src="`https://image.tmdb.org/t/p/w500${sea.poster_path}`"></v-img>
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
    <v-card
      v-for="episode in this.episodes"
      :key="episode.id"
      width="1000px"
      class="cards"
    >
      <v-card-title>
        E{{ episode.episode_number }} {{ episode.name }}</v-card-title
      >
      <v-card-text>{{ episode.overview }}</v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["season"],
  data: () => ({
    episodes: [],
  }),
  methods: {
    episode(val) {
      this.episodes = val;
      window.scrollTo(0, document.body.scrollHeight);
    },
  },
};
</script>
