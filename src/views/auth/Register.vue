<template>
    <div class="products">
        <br><br>
        <v-form
        ref="form"
        v-model="properties.isValid">
            <v-card
                class="mx-auto"
                max-width="344">
                <v-card-text>
                    <p class="display-1 text--primary">
                        Register
                    </p>
                    <v-text-field
                        v-model="properties.name"
                        :rules="rules.name"
                        label="Name"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="properties.email"
                        :rules="rules.email"
                        label="E-mail"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="properties.password"
                        :rules="rules.password"
                        label="Password"
                        type="password"
                        required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        text
                        @click="register"
                        color="deep-purple accent-4">
                        Register
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    @Component
    export default class Register extends Vue {
        public rules = {
            email: [
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            password: [
                (v: any) => !!v || 'Password is required'
            ],
            name: [
                (v: any) => !!v || 'Name is required'
            ]
        };
        public properties = {
            isValid: false,
            email: '',
            password: '',
            name: ''
        };
        register(): void {
            if(this.properties.isValid){
                this.$store.dispatch('register', this.properties);
            }
        }
    }
</script>