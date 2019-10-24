import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios';
import router from './router';
import VuePersist from 'vuex-persist';
import localForage from 'localforage';

Vue.use(Vuex)

const vuePersist = new VuePersist<any>({
    key: 'sourcelink',
    storage: localForage
});

export default new Vuex.Store({
    plugins: [vuePersist.plugin],
    state: {
        token: '',
        user: null,
        err: null,
        response: false
    },
    mutations: {
        auth(state, signin){
            state.token = signin.token;
            state.user = signin.user;
        },
        response(state, response){
            state.response = response;
        },
        logout(state){
            state.token = '';
            state.user = null;
        },
        err(state, err){
            state.err = err;
        }
    },
    actions: {
        auth({commit}, login){
            axios.post('/auth/signin', login).then(r => {
                let { token, user } = r.data;
                commit('auth', {token, user});
                commit('response', true);
                router.push('/user/home');
            }).catch(err => {
                commit('err', err);
                commit('response', false);
            });
        },
        register({commit}, register){
            axios.post('/auth/signup', register).then(r => {
                if(r){
                    router.push('/login');
                    commit('response', true);
                } else {
                    commit('response', false);
                }
            }).catch(err => {
                commit('err', err);
                commit('response', false);
            });
        },
        logout({commit}){
            commit('logout');
            router.push('/');
        }
    },
    getters: {
        token: state => state.token,
        user: state => state.user,
        err: state => state.err,
        isLoggedIn: state => state.token != null && state.token.length > 0,
        response: state => state.response
    }
});
