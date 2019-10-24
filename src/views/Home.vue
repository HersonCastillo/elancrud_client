<template>
    <div class="home">
        <v-container class="grey lighten-5">
            <v-row no-gutters>
                <v-col class="custom-card" lg="3" v-for="(item, i) in products" :key="i">
                    <v-card>
                        <v-card-text>
                            <p class="display-1 text--primary">
                                {{item.name}}
                            </p>
                            <p>${{item.price}}</p>
                            <div class="text--primary">
                                {{item.description}}
                            </div>
                        </v-card-text>
                        <v-card-actions v-if="isLoggedIn">
                            <v-btn icon text color="primary" @click="saveLike(item.id)" v-if="!isProductLiked(item.id)">
                                <v-icon>mdi-thumb-up</v-icon>                    
                            </v-btn>
                            <v-btn class="ma-2" text icon color="red lighten-2" @click="deleteLike(item)" v-if="isProductLiked(item.id)">
                                <v-icon>mdi-thumb-down</v-icon>
                            </v-btn>
                        </v-card-actions>
                        <v-card-text v-if="!isLoggedIn">
                            You need log-in if you want save in your favorite list
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style lang="scss" scoped>
    .home {
        margin: 10px;
    }
    .custom-card {
        margin-top: 10px;
    }
</style>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from '../axios';
    @Component
    export default class Home extends Vue {
        public categories: any[] = [];
        public products: any[] = [];
        public likes: any[] = [];

        public loadings = {
            save: false,
            delete: false
        };

        constructor(){
            super();
            this.getCategories();
            this.getProducts();
            this.getLikes();
        }
        getProducts(): void {
            axios.get('/pub/products').then(r => {
                this.products = r.data.blob;
            });
        }
        getCategories(): void {
            axios.get('/pub/categories').then(r => {
                this.categories = r.data.blob;
            });
        }
        getLikes(): void {
            if(this.$store.getters.isLoggedIn){
                axios.get('/app/likes', {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.token}`
                    }
                }).then(r => {
                    this.likes = r.data.blob;
                });
            }
        }
        saveLike(product_id: number): void {
            axios.post('/app/likes', {product_id}, {
                headers: {
                    'Authorization': `Bearer ${this.$store.getters.token}`
                }
            }).then(r => {
                console.log(r);
                this.getLikes();
            }).catch(err => {
                console.error(err);
            });
        }
        deleteLike(product: any): void {
            let like: any = this.likes.find(r => r.product_id == product.id);
            if(like){
                axios.delete(`/app/likes/${like.id}`, {
                    headers: {
                        'Authorization': `Bearer ${this.$store.getters.token}`
                    }
                }).then(r => {
                    console.log(r);
                    this.getLikes();
                }).catch(err => {
                    console.error(err);
                });
            }
        }
        isProductLiked(productId: number): boolean {
            return this.likes.find(r => r.product_id == productId) != null;
        }
        get isLoggedIn(): boolean {
            return this.$store.getters.isLoggedIn;
        }
    }
</script>
