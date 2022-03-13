<template>
    <v-app>
        <HomeAppBar />
    </v-app>
</template>

<script>
import HomeAppBar from "@/components/AppBar/HomeAppBar.vue";

export default {
  name: 'Homepage',
  components: {
      HomeAppBar,
  },
  data: () => ({
    //
  }),
};
</script>