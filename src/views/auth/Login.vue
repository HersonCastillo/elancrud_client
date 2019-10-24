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
                        Sign In
                    </p>
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
                        @click="login"
                        text
                        color="deep-purple accent-4">
                        Log In 
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    @Component
    export default class Login extends Vue {
        public rules: any = {
            email: [
                (v: any) => !!v || 'E-mail is required',
                (v: any) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            password: [
                (v: any) => !!v || 'Password is required'
            ]
        };
        public properties = {
            isValid: false,
            email: '',
            password: ''
        };
        login(): void {
            this.$store.dispatch('auth', this.properties);
        }
    }
</script>