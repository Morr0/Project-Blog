import Vue from "vue";
import Vuex from "vuex";

import persistOnRefresh from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        title: "Rami's",
        loggedIn: false,
        loggedInUserId: "",
        loggedInUser: "",
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