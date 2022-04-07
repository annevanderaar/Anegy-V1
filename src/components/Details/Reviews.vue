<template>
  <div>
    <h2 v-if="!reviews.results.length" style="text-align: center">
      No reviews
    </h2>
    <v-card v-for="review in reviews.results" :key="review.id" class="ma-8">
      <v-row class="ml-4">
        <v-icon large v-if="review.author_details.avatar_path == null"
          >fas fa-user-circle</v-icon
        >
        <v-avatar
          class="ma-2"
          v-else-if="review.author_details.avatar_path.charAt(1) == 'h'"
          ><v-img
            :src="`${review.author_details.avatar_path.substring(1)}`"
          ></v-img
        ></v-avatar>
        <v-avatar class="ma-2" v-else>
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`"
          ></v-img>
        </v-avatar>
        <v-card-title>{{ review.author }}</v-card-title>
      </v-row>
      <v-card-text>{{ review.content }}</v-card-text>
      <v-card-subtitle>{{
        new Date(review.created_at).toLocaleDateString("nl-NL", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["reviews"],
};
</script>
