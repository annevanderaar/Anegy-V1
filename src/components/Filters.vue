<template>
    <section>
        <v-navigation-drawer clipped v-model="drawer" style="max-height: 100%; width: 400px;" absolute>
            <v-container>
                <v-row>
                    <v-col><h1 class="ml-2">Filter</h1></v-col>
                    <v-btn class="ma-2" color="black" icon @click="closeFilter"><v-icon>fas fa-times</v-icon></v-btn>
                </v-row>
                <v-divider></v-divider>
                <v-list-item v-for="item in genres" :key="item.name" link>
                    {{item.name}}
                </v-list-item>
            </v-container>
        </v-navigation-drawer>
    </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'Filters',
    data: () => ({
        genres: [
            {id: 28, name: 'Action'},
            {id: 12, name: 'Adventure'},
            {id: 16, name: 'Animation'},
            {id: 35, name: 'Comedy'},
            {id: 80, name: 'Crime'},
            {id: 99, name: 'Documentary'},
            {id: 18, name: 'Drama'},
            {id: 10751, name: 'Family'},
            {id: 14, name: 'Fantasy'},
            {id: 36, name: 'History'},
            {id: 27, name: 'Horror'},
            {id: 10402, name: 'Music'},
            {id: 9648, name: 'Mystery'},
            {id: 10749, name: 'Romance'},
            {id: 878, name: 'Science Fiction'},
            {id: 10770, name: 'TV Movie'},
            {id: 53, name: 'Thriller'},
            {id: 10752, name: 'War'},
            {id: 37, name: 'Western'},
        ],
        selectedGenre: [],
    }),
    methods: {
        ...mapActions(['setDrawerInput']),
        closeFilter() {this.setDrawerInput(false)},
    },
    computed: {
        ...mapGetters(['drawer']),
    }
}
</script>