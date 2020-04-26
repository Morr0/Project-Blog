import Vue from "vue";
import Vuex from "vuex";

import persistOnRefresh from "vuex-persistedstate";

const {
    BACKEND = "http://52.220.43.137:3400",
} = process.env;

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        title: "Rami's",
        loggedIn: false,
        loggedInUserId: "",
        loggedInUser: "",

        backend: BACKEND,
    },
    mutations: {
        updateUser(state, data){
            state.loggedIn = data.loggedIn;
            state.loggedInUserId = data.loggedInUserId;
            state.loggedInUser = data.loggedInUser;
        }
    },
    plugins: [persistOnRefresh({storage: window.sessionStorage})],
});