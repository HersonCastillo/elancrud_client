<template>
    <div class="home">
        <v-card max-width="200">
            <v-card-text>
                <p class="display-1 text--primary">
                    be•nev•o•lent
                </p>
                <p>adjective</p>
                <div class="text--primary">
                    well meaning and kindly.<br>
                    "a benevolent smile"
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    icon
                    text
                    color="deep-purple accent-4">
                    <v-icon>mdi-heart</v-icon>                    
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style lang="scss" scoped>
    .home {
        margin: 10px;
    }
</style>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from '../axios';
    @Component
    export default class Home extends Vue {
        public products: any[] = [];

        constructor(){
            super();
            axios.get('/pub/products').then(r => {
                this.products = r.data.blob;
            });
        }
    }
</script>
