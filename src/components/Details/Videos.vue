<template>
  <div class="d-flex flex-wrap justify-center">
    <h2 v-if="!videos.results.length" style="text-align: center">No videos</h2>
    <v-card v-for="video in videos.results" :key="video.id" class="cards">
      <h4>{{ video.name }}</h4>
      <iframe
        allowfullscreen
        width="560"
        height="315"
        :src="`https://www.youtube.com/embed/${video.key}`"
        frameborder="0"
      ></iframe>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["videos"],
};
</script>
