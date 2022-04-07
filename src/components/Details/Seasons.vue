<template>
  <div>
    <h1>{{ data.number_of_seasons }}</h1>
    <h1>{{ data.number_of_episodes }}</h1>
  </div>
</template>

<script>
export default {
  props: ["seasons", "data"],
};
</script>
