<template>
  <div>
    <cards :data="similar.results" />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";

export default {
  props: ["similar"],
  components: {
    Cards,
  },
};
</script>
