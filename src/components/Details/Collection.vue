<template>
  <div>
    <h2 v-if="collection.belongs_to_collection == null">
      Not part of a collection
    </h2>
    <h2 v-else>{{ collection.belongs_to_collection.name }}</h2>
  </div>
</template>

<script>
  export default {
    props: ["collection"],
  };
</script>
