<template>
  <div>
    <v-card
      v-for="review in this.reviews.results"
      :key="review.id"
      class="ma-8"
    >
      <v-row class="ml-4">
        <v-card-title>{{ review.author }}</v-card-title>
        <v-avatar class="ma-2"
          ><v-img
            :src="`${review.author_details.avatar_path.substring(1)}`"
          ></v-img
        ></v-avatar>
        <v-avatar class="ma-2">
          <v-img
            :src="`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`"
          ></v-img>
        </v-avatar>
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
