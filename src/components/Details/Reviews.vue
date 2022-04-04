<template>
  <div>
    <v-card
      v-for="review in this.reviews.results"
      :key="review.id"
      class="ma-8"
    >
      <v-row class="ml-4">
        <v-icon v-if="!review.author_details.avatar_path"
          >fas fa-user-circle</v-icon
        >
        <!-- Even kijken naar fix voor die andere images -->
        <v-avatar v-else class="ma-2"
          ><v-img
            :src="`${review.author_details.avatar_path.substring(1)}`"
          ></v-img
        ></v-avatar>
        <v-card-title>{{ review.author }}</v-card-title>
      </v-row>
      <v-card-text>{{ review.content }}</v-card-text>
      <v-card-subtitle>{{
        new Date(review.created_at).toLocaleDateString("en-US", {
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
