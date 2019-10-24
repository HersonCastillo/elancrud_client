<template>
    <div class="home">
        <br><br>
        <v-container class="grey lighten-5">
            <v-row no-gutters>
                <v-col lg="7">
                    <v-tabs grow v-model="global.listTab">
                        <v-tab>Products</v-tab>
                        <v-tab>Categories</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="global.listTab">
                        <v-tab-item>
                            <v-card
                            class="pa-2"
                            outlined
                            tile>
                                <v-list>
                                    <v-list-item 
                                        three-line
                                        v-if="products.length === 0">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                No content to show
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item 
                                        three-line
                                        v-for="(item, i) in products"
                                        :key="i">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{item.name}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{item.description}}
                                            </v-list-item-subtitle>
                                            <v-list-item-subtitle>
                                                Price: ${{item.price}}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn icon @click="deleteProduct(item.id)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                            <v-btn icon>
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card
                            class="pa-2"
                            outlined
                            tile>
                                <v-list>
                                    <v-list-item 
                                        three-line
                                        v-if="categories.length === 0">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                No content to show
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item 
                                        three-line
                                        v-for="(item, i) in categories"
                                        :key="i">
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{item.name}}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{item.description}}
                                            </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                            <v-btn icon @click="deleteCategory(item.id)">
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                            <v-btn icon>
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
                <v-col lg="5">
                    <v-tabs grow v-model="global.creationTab">
                        <v-tab>Product</v-tab>
                        <v-tab>Category</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="global.creationTab">
                        <v-tab-item>
                            <v-card
                            class="pa-2"
                            outlined
                            tile>
                                <h3>Save a product</h3>
                                <v-form
                                    ref="productForm"
                                    v-model="propertiesProduct.isValid">
                                    <v-text-field
                                        v-model="propertiesProduct.name"
                                        :rules="rulesProduct.name"
                                        label="Name"
                                        required></v-text-field>
                                    <v-text-field
                                        v-model="propertiesProduct.description"
                                        :rules="rulesProduct.description"
                                        label="Description"
                                        required></v-text-field>
                                    <v-text-field
                                        v-model="propertiesProduct.price"
                                        :rules="rulesProduct.price"
                                        label="Price ($)"
                                        required></v-text-field>
                                    <v-select
                                        v-model="propertiesProduct.category_id"
                                        :items="categories"
                                        :rules="rulesProduct.category_id"
                                        item-text="name"
                                        item-value="id"
                                        label="Category"
                                        ></v-select>
                                    <br>
                                    <v-btn color="primary" @click="saveProduct">
                                        Save product
                                    </v-btn>
                                </v-form>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card
                            class="pa-2"
                            outlined
                            tile>
                                <h3>Save a category</h3>
                                <v-form
                                    ref="categoryForm"
                                    v-model="propertiesCategory.isValid">
                                    <v-text-field
                                        v-model="propertiesCategory.name"
                                        :rules="rulesCategory.name"
                                        label="Name"
                                        required></v-text-field>
                                    <v-text-field
                                        v-model="propertiesCategory.description"
                                        :rules="rulesCategory.description"
                                        label="Short description"
                                        required></v-text-field>
                                        <br>
                                    <v-btn color="primary" @click="saveCategory">
                                        Save category
                                    </v-btn>
                                </v-form>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import axios from '../../axios';
    import swal from 'sweetalert2';
    @Component
    export default class Home extends Vue {
        public rulesProduct: any = {
            name: [
                (v: any) => !!v || 'Name is required'
            ],
            description: [
                (v: any) => !!v || 'Description is required'
            ],
            price: [
                (v: any) => !!v || 'Price is required',
                (v: any) => /^[\d]{1,}([.]{1}[\d]{1,})?$/.test(v) || 'Price must be valid'
            ],
            category_id: [
                (v: any) => !!v || 'Category is required'
            ]
        };
        public propertiesProduct = {
            isValid: false,
            name: '',
            description: '',
            price: 0,
            category_id: null
        };
        public rulesCategory: any = {
            name: [
                (v: any) => !!v || 'Name is required'
            ],
            description: [
                (v: any) => !!v || 'Description is required'
            ]
        };
        public propertiesCategory = {
            isValid: false,
            name: '',
            category: ''
        }
        public global = {
            creationTab: null,
            listTab: null
        };
        public categories: any[] = [];
        public products: any[] = [];

        constructor(){
            super();
            this.getCategories();
            this.getProducts();
        }
        getCategories(): void {
            axios.get('/app/categories', {
                headers: {
                    'Authorization': `Bearer ${this.$store.getters.token}`
                }
            }).then(r => {
                this.categories = r.data.blob;
            });
        }
        getProducts(): void {
            axios.get('/app/products', {
                headers: {
                    'Authorization': `Bearer ${this.$store.getters.token}`
                }
            }).then(r => {
                this.products = r.data.blob;
            });
        }
        saveCategory(): void {
            if(this.propertiesCategory.isValid){
                let token: string = this.$store.getters.token;
                axios.post('/app/categories', this.propertiesCategory, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(r => {
                    (<any>this.$refs.categoryForm).reset();
                    this.getCategories();
                }).catch(err => {
                    console.error(err);
                });
            }
        }
        saveProduct(): void {
            if(this.propertiesProduct.isValid){
                let token: string = this.$store.getters.token;
                axios.post('/app/products', this.propertiesProduct, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then(r => {
                    (<any>this.$refs.productForm).reset();
                    this.getProducts();
                }).catch(err => {
                    console.error(err);
                });
            }
        }

        deleteProduct(id: number): void {
            swal.fire({
                title: 'Delete a product',
                text: 'Do you want to continue',
                type: 'question',
                showCancelButton: true
            }).then(r => {
                if(r.value){
                    axios.delete(`/app/products/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.getters.token}`
                        }
                    }).then(r => {
                        this.getProducts();
                    }).catch(err => {
                        console.error(err);
                    });
                }
            });
        }
        deleteCategory(id: number): void {
            swal.fire({
                title: 'Delete a category',
                text: 'Do you want to continue',
                type: 'question',
                showCancelButton: true
            }).then(r => {
                if(r.value){
                    axios.delete(`/app/categories/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.getters.token}`
                        }
                    }).then(r => {
                        this.getCategories();
                    }).catch(err => {
                        console.error(err);
                    });
                }
            });
        }
    }
</script>