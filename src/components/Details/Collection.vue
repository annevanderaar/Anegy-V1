<template>
  <div>
    <h2 v-if="!collection.name" style="text-align: center">
      Not part of an collection
    </h2>
    <h2 style="text-align: center">{{ collection.name }}</h2>
    <p style="text-align: center">{{ collection.overview }}</p>
    <cards :data="collection.parts" />
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";

export default {
  props: ["collection"],
  components: {
    Cards,
  },
};
</script>
