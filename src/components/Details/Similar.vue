<template>
  <div>
    <Cards :data="similar.results" :faves="faves" :watcheds="watcheds" />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";

export default {
  props: ["similar"],
  components: {
    Cards,
  },
  data: () => ({
    faves: [],
    watcheds: [],
  }),
};
</script>
