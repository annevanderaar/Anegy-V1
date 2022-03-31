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
      },
      dark: {
        primary: "#1b1b1f",
        secondary: "#690f0f",
        accent: "#23a9a7",
      },
    },
  },
});
