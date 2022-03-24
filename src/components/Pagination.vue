<template>
  <v-pagination
    color="secondary"
    v-model="currentPage"
    :length="6"
    class="my-4"
  ></v-pagination>
</template>

<script>
export default {
  props: ["currentPage"],
};
</script>