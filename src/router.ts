import Vue from 'vue';
import Router from 'vue-router';
import store from './store';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/auth/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/auth/Login.vue')
        },
        {
            path: '/user/home',
            name: 'uhome',
            component: () => import('./views/user/Home.vue'),
            meta: { auth: true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(r => r.meta.auth)){
        if(store.getters.isLoggedIn) next();
        else next('/login');
    } else next();
});

export default router;