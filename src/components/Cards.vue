<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      class="movie ma-4"
      v-for="item in data"
      :key="item.id"
      elevation="4"
    >
      <v-img
        v-if="item.profile_path"
        :src="`https://image.tmdb.org/t/p/w500${item.profile_path}`"
      ></v-img>
      <v-img
        v-else-if="item.poster_path == null"
        src="http://via.placeholder.com/1080x1580"
      ></v-img>
      <v-img
        v-else
        :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
      ></v-img>
      <div class="movie-info d-flex justify-space-between">
        <v-card-title v-if="item.title" style="word-break: normal">{{
          item.title
        }}</v-card-title>
        <v-card-title v-if="item.name" style="word-break: normal">{{
          item.name
        }}</v-card-title>
        <v-avatar
          class="ma-2"
          color="green white--text"
          v-if="item.vote_average >= 7.5"
          >{{ item.vote_average.toFixed(1) }}</v-avatar
        >
        <v-avatar
          class="ma-2"
          color="orange white--text"
          v-else-if="item.vote_average >= 5"
          >{{ item.vote_average.toFixed(1) }}</v-avatar
        >
        <v-avatar
          class="ma-2"
          color="accent white--text"
          v-else-if="item.vote_average == null"
          >P</v-avatar
        >
        <v-avatar class="ma-2" color="red white--text" v-else>{{
          item.vote_average.toFixed(1)
        }}</v-avatar>
      </div>
      <v-card class="overview">
        <v-card-subtitle v-if="item.release_date"
          ><strong>Release Date:</strong>
          {{
            new Date(item.release_date).toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}</v-card-subtitle
        >
        <v-card-subtitle v-if="item.first_air_date"
          ><strong>First Air Date:</strong>
          {{
            new Date(item.first_air_date).toLocaleDateString("nl-NL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }}</v-card-subtitle
        >
        <v-card-text
          v-if="item.media_type == 'person' || item.known_for_department"
          >Known for: {{ item.known_for_department }}</v-card-text
        >
        <v-card-text v-if="item.overview">{{ item.overview }}</v-card-text>
        <v-btn
          v-if="item.media_type == 'movie' || item.video == false"
          elevation="0"
          color="accent"
          class="ml-2"
          :to="`/movies/details/${item.id}`"
          >Know more</v-btn
        >
        <v-btn
          v-else-if="item.media_type == 'person' || item.known_for_department"
          elevation="0"
          color="accent"
          class="ml-2"
          :to="`/people/${item.id}`"
          >Know more</v-btn
        >
        <v-btn
          v-else-if="item.media_type == 'tv' || item.first_air_date"
          elevation="0"
          color="accent"
          class="ml-2"
          :to="`/series/details/${item.id}`"
          >Know more</v-btn
        >
        <v-btn
          icon
          color="secondary"
          @click="deleteFave(item.id)"
          v-if="faves.includes(item.id)"
          ><v-icon>fas fa-heart</v-icon></v-btn
        >
        <v-btn
          v-else
          icon
          color="secondary"
          @click="
            addFave(
              item.id,
              item.video,
              item.known_for_department,
              item.first_air_date
            )
          "
          ><v-icon>far fa-heart</v-icon></v-btn
        >
        <v-btn
          icon
          color="accent"
          @click="deleteWatched(item.id)"
          v-if="watcheds.includes(item.id)"
          ><v-icon>mdi-clipboard-list</v-icon></v-btn
        >
        <v-btn
          v-else-if="item.video == false || item.first_air_date"
          icon
          color="accent"
          @click="
            addWatched(
              item.id,
              item.video,
              item.known_for_department,
              item.first_air_date
            )
          "
          ><v-icon>mdi-clipboard-list-outline</v-icon></v-btn
        >
      </v-card>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config/index.js";

export default {
  props: ["data", "path", "faves", "watcheds"],
  data: () => ({
    type: "",
  }),
  methods: {
    addFave(id, video, known, air) {
      if (!this.$session.exists()) {
        this.$toast.warning("You have to be loged in to add a favorite", {
          timeout: 3000,
        });
      } else {
        if (video == false) {
          this.type = "movie";
        } else if (known) {
          this.type = "person";
        } else if (air) {
          this.type = "tv";
        }
        axios({
          method: "post",
          url: `${config.url}/Library/Account.php`,
          data: {
            param: "addFave",
            userid: this.$session.get("id"),
            msid: id,
            type: this.type,
          },
        })
          .then((res) => {
            if (res.data == "succes") {
              this.$toast.success("Successfully added favorite.", {
                timeout: 2000,
              });
              this.$emit("refresh", "add");
            } else if (res.data == "error") {
              this.$toast.error("Something went wrong. Try again.", {
                timeout: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteFave(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "deleteFave",
          userid: this.$session.get("id"),
          msid: id,
        },
      })
        .then((res) => {
          if (res.data == "succes") {
            this.$toast.success("Successfully deleted favorite.", {
              timeout: 2000,
            });
            let index = this.faves.indexOf(id);
            this.faves.splice(index, 1);
            if (this.path == "/account/favorites") {
              this.$emit("refresh", "delete");
            }
          } else if (res.data == "error") {
            this.$toast.error("Something went wrong. Try again.", {
              timeout: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addWatched(id, video, known, air) {
      if (!this.$session.exists()) {
        this.$toast.warning("You have to be loged in to add to watchlist", {
          timeout: 3000,
        });
      } else {
        if (video == false) {
          this.type = "movie";
        } else if (known) {
          this.type = "person";
        } else if (air) {
          this.type = "tv";
        }
        axios({
          method: "post",
          url: `${config.url}/Library/Account.php`,
          data: {
            param: "addWatched",
            userid: this.$session.get("id"),
            msid: id,
            type: this.type,
          },
        })
          .then((res) => {
            if (res.data == "succes") {
              this.$toast.success("Successfully added to watchlist.", {
                timeout: 2000,
              });
              this.$emit("refresh", "add");
            } else if (res.data == "error") {
              this.$toast.error("Something went wrong. Try again.", {
                timeout: 2000,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteWatched(id) {
      axios({
        method: "post",
        url: `${config.url}/Library/Account.php`,
        data: {
          param: "deleteWatched",
          userid: this.$session.get("id"),
          msid: id,
        },
      })
        .then((res) => {
          if (res.data == "succes") {
            this.$toast.success("Successfully deleted from watchlist.", {
              timeout: 2000,
            });
            let index = this.watcheds.indexOf(id);
            this.watcheds.splice(index, 1);
            if (this.path == "/account/watched") {
              this.$emit("refresh", "delete");
            }
          } else if (res.data == "error") {
            this.$toast.error("Something went wrong. Try again.", {
              timeout: 2000,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
