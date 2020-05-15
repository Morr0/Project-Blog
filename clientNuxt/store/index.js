import Vue from "vue";
import Vuex from "vuex";

const {
    NODE_ENV = "development",
} = process.env;

let VUE_APP_BACKEND = "http://localhost:3400";
if (NODE_ENV === "production") VUE_APP_BACKEND = process.env.VUE_APP_BACKEND;

Vue.use(Vuex);

// Server side code

export const state = () => ({
    title: "Rami's",
    backend: VUE_APP_BACKEND,
});

export const mutations = {
    updateUser(state, data){
        state.sessionStorage.loggedIn = data.loggedIn;
        state.sessionStorage.loggedInUserId = data.loggedInUserId;
        state.sessionStorage.loggedInUser = data.loggedInUser;
    }
};
