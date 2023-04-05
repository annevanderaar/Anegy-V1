<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      class="movie ma-4"
      v-for="item in data"
      :key="item.id"
      elevation="4"
    >
      <v-img
        v-if="item.profile_path"
        :src="posterPath + item.profile_path"
      ></v-img>
      <v-img
        v-else
        :src="
          item.poster_path
            ? posterPath + item.poster_path
            : 'http://via.placeholder.com/1080x1580'
        "
      ></v-img>
      <div class="movie-info d-flex justify-space-between">
        <v-card-title v-if="item.title" style="word-break: normal">{{
          item.title
        }}</v-card-title>
        <v-card-title v-if="item.name" style="word-break: normal">{{
          item.name
        }}</v-card-title>
        <v-avatar
          class="ma-2"
          color="green white--text"
          v-if="item.vote_average >= 7.5"
          >{{ item.vote_average.toFixed(1) }}</v-avatar
        >
        <v-avatar
          class="ma-2"
          color="orange white--text"
          v-else-if="item.vote_average >= 5"
          >{{ item.vote_average.toFixed(1) }}</v-avatar
        >
        <v-avatar
          class="ma-2"
          color="accent white--text"
          v-else-if="item.vote_average == null"
          >P</v-avatar
        >
        <v-avatar class="ma-2" color="red white--text" v-else>{{
          item.vote_average.toFixed(1)
        }}</v-avatar>
      </div>
      <v-card class="overview">
        <v-card-subtitle v-if="item.release_date"
          ><strong>Release Date:</strong>
          {{
            new Date(item.release_date).toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}</v-card-subtitle
        >
        <v-card-subtitle v-if="item.first_air_date"
          ><strong>First Air Date:</strong>
          {{
            new Date(item.first_air_date).toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}</v-card-subtitle
        >
        <v-card-text
          v-if="item.media_type == 'person' || item.known_for_department"
          >Known for: {{ item.known_for_department }}</v-card-text
        >
        <v-card-text v-if="item.overview">{{ item.overview }}</v-card-text>
        <v-btn
          v-if="item.media_type == 'movie' || item.video == false"
          elevation="0"
          color="accent"
          class="ml-2"
          :to="`/movies/details/${item.id}`"
          >Know more</v-btn
        >
        <v-btn
          v-else-if="item.media_type == 'person' || item.known_for_department"
          elevation="0"
          color="accent"
          class="ml-2"
          :to="`/people/${item.id}`"
          >Know more</v-btn
        >
        <v-btn
          v-else-if="item.media_type == 'tv' || item.name"
          elevation="0"
          color="accent"
          class="ml-2"
          :to="`/series/details/${item.id}`"
          >Know more</v-btn
        >
        <!-- <v-btn icon color="secondary"><v-icon>far fa-heart</v-icon></v-btn> -->
        <!-- <v-btn icon color="secondary"><v-icon>fas fa-heart</v-icon></v-btn> -->
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["data"],

  data: () => ({
    posterPath: "https://image.tmdb.org/t/p/w500",
  }),
};
</script>
