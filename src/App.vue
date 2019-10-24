<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <router-link to="/">
                <v-toolbar-title>Elancrud</v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>

            <router-link to="/login" v-if="!isLogged">
                <v-btn small color="warn" class="btn-custom">Sign In</v-btn>
            </router-link>
            <router-link to="/register" v-if="!isLogged">
                <v-btn small class="btn-custom">Sign Up</v-btn>
            </router-link>
            <router-link v-if="isLogged" to="/user/home">
                <v-btn small class="btn-custom">Profile</v-btn>
            </router-link>
            <v-btn small v-if="isLogged" @click="logout" class="btn-custom">Log Out</v-btn>
        </v-app-bar>
        <v-app>
            <v-content>
                <router-view />
            </v-content>
        </v-app>
    </div>
</template>

<style lang="scss" scoped>
    .btn-custom {
        margin-left: 10px;
    }
</style>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator';
    @Component
    export default class App extends Vue {
        get isLogged(): boolean {
            let state: string = this.$store.getters.token;
            return state != null && state.length > 0;
        }
        logout(): void {
            this.$store.dispatch('logout');
        }
    }
</script>