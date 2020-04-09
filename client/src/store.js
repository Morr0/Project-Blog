import Vue from "vue";
import Vuex from "vuex";

import persistOnRefresh from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loggedIn: false,
        loggedInUserId: "",
        loggedInUser: "",
    },
    plugins: [persistOnRefresh()],
});