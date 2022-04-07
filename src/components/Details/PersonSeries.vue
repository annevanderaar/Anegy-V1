<template>
  <div>
    <v-btn-toggle mandatory tile group color="accent" v-model="values">
      <v-btn>Cast</v-btn>
      <v-btn>Crew</v-btn>
    </v-btn-toggle>
    <cards v-if="this.value == 'cast'" :data="personSeries.cast" />
    <cards v-if="this.value == 'crew'" :data="personSeries.crew" />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
//Fout in toggle
export default {
  data: () => ({
    value: "",
    values: "",
  }),
  props: ["personSeries"],
  components: {
    Cards,
  },
  watch: {
    values(val) {
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