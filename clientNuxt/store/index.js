import Vue from "vue";
import Vuex from "vuex";

const {
    NODE_ENV = "development",
} = process.env;

let VUE_APP_BACKEND = "http://localhost:3400";
if (NODE_ENV === "production") VUE_APP_BACKEND = process.env.VUE_APP_BACKEND;

Vue.use(Vuex);

// Client side code
// export default new Vuex.Store({
//     state: {
//         title: "Rami's",
//         loggedIn: false,
//         loggedInUserId: "",
//         loggedInUser: "",

//         backend: VUE_APP_BACKEND,
//     },
//     mutations: {
//         updateUser(state, data){
//             state.loggedIn = data.loggedIn;
//             state.loggedInUserId = data.loggedInUserId;
//             state.loggedInUser = data.loggedInUser;
//         }
//     },
//     // plugins: [persistOnRefresh({storage: window.sessionStorage})],
// });

// Server side code

export const state = () => ({
    title: "Rami's",
    loggedIn: false,
    loggedInUserId: "",
    loggedInUser: "",

    backend: VUE_APP_BACKEND,
});

export const mutations = {
    updateUser(state, data){
        state.loggedIn = data.loggedIn;
        state.loggedInUserId = data.loggedInUserId;
        state.loggedInUser = data.loggedInUser;
    }
};
