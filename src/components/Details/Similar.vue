<template>
  <div>
    <Cards :data="similar.results" :path="this.$route.path"/>
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
