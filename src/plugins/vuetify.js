import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#e0dfdf",
        secondary: "#f32b2b",
        accent: "#23a9a7",
        btnFilterColor: "#000000",
      },
      dark: {
        primary: "#1b1b1f",
        secondary: "#8B0000",
        accent: "#23a9a7",
        btnFilterColor: "#FFFFFF",
      },
    },
  },
});
