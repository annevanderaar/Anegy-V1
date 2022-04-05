<template>
  <div>
    <v-btn-toggle mandatory tile group color="accent" v-model="value">
      <v-btn>Cast</v-btn>
      <v-btn>Crew</v-btn>
    </v-btn-toggle>
    <cards :data="personS" />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
//Fout in toggle
export default {
  data: () => ({
    value: "",
    personS: [],
  }),
  props: ["personSeries"],
  components: {
    Cards,
  },
  watch: {
    value(val) {
      if (val == 0) {
        this.value = "cast";
        this.personS = this.personSeries.cast;
      }
      if (val == 1) {
        this.value = "crew";
        this.personS = this.personSeries.crew;
      }
    },
  },
  mounted() {
    this.personS = this.personSeries;
    this.value = "cast";
  },
};
</script>