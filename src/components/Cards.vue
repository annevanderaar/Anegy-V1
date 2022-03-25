<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      class="movie ma-4"
      v-for="item in data.results"
      :key="item.id"
      elevation="4"
    >
      <v-img
        :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
        :alt="`${item.title}`"
      ></v-img>
      <v-img
        v-if="item.poster_path == null"
        src="http://via.placeholder.com/1080x1580"
        :alt="`${item.title}`"
      ></v-img>
      <div class="movie-info d-flex justify-space-between">
        <v-card-title v-if="item.title">{{ item.title }}</v-card-title>
        <v-card-title v-if="item.name">{{ item.name }}</v-card-title>
        <v-avatar
          class="ma-2"
          color="green white--text"
          v-if="item.vote_average >= 7.5"
          >{{ item.vote_average }}</v-avatar
        >
        <v-avatar
          class="ma-2"
          color="orange white--text"
          v-else-if="item.vote_average >= 5"
          >{{ item.vote_average }}</v-avatar
        >
        <v-avatar class="ma-2" color="red white--text" v-else>{{
          item.vote_average
        }}</v-avatar>
      </div>
      <v-card class="overview">
        <v-card-subtitle v-if="item.release_date"
          ><strong>Release Date:</strong>
          {{ item.release_date }}</v-card-subtitle
        >
        <v-card-subtitle v-if="item.first_air_date"
          ><strong>First Air Date:</strong>
          {{ item.first_air_date }}</v-card-subtitle
        >
        <v-card-text>{{ item.overview }}</v-card-text>
        <v-btn
          v-if="item.video == false"
          elevation="0"
          color="secondary"
          class="ml-2"
          :to="`/movies/details/${item.id}`"
          >Know more</v-btn
        >
        <v-btn
          v-else
          elevation="0"
          color="secondary"
          class="ml-2"
          :to="`/series/details/${item.id}`"
          >Know more</v-btn
        >
        <v-btn icon color="secondary"><v-icon>far fa-heart</v-icon></v-btn>
        <!-- <v-btn icon color="secondary"><v-icon>fas fa-heart</v-icon></v-btn> -->
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>