<template>
    <div>
        <v-app-bar color="deep-purple accent-4" dense dark>
            <router-link to="/">
                <v-toolbar-title>Elancrud</v-toolbar-title>
            </router-link>

            <v-spacer></v-spacer>

            <router-link to="/login">
                <v-btn small color="warn" class="btn-custom">Sign In</v-btn>
            </router-link>
            <router-link to="/register">
                <v-btn small color="error" class="btn-custom">Sign Up</v-btn>
            </router-link>
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