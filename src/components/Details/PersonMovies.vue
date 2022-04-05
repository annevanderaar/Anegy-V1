<template>
  <div>
    <v-btn-toggle mandatory tile group color="accent" v-model="value">
      <v-btn>Cast</v-btn>
      <v-btn>Crew</v-btn>
    </v-btn-toggle>
    <cards v-if="this.value == 'cast'" :data="personMovies.cast" />
    <cards v-if="this.value == 'crew'" :data="personMovies.crew" />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
//Fout in toggle
export default {
  data: () => ({
    value: "cast",
  }),
  props: ["personMovies"],
  components: {
    Cards,
  },
  watch: {
    value(val) {
      if (val == 0) {
        this.value = "cast";
      }
      if (val == 1) {
        this.value = "crew";
      }
    },
  },
};
</script>