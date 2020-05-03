export const state = () => ({
    loggedIn: false,
    loggedInUserId: "",
    loggedInUser: "",
});

export const mutations = {
    updateUser(state, data){
        state.loggedIn = data.loggedIn;
        state.loggedInUserId = data.loggedInUserId;
        state.loggedInUser = data.loggedInUser;
    }
};