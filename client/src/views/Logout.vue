<template>
    <div>
        Logging out
    </div>
</template>

<script>
export default {
    async created (){
        if ((await fetch("http://localhost:3400/users/loggedIn/", {credentials: "include"})).status !== 200){
            this.$store.commit("updateUser", {loggedIn: false, loggedInUserId: "", loggedInUser: ""});
        }

        if (!this.$store.state.loggedIn) return this.$router.replace("/");

        const res = await fetch("http://localhost:3400/users/logout", {method: "POST", credentials: "include"});
        if (res.status === 202){
            this.$store.commit("updateUser", {loggedIn: false, loggedInUserId: "", loggedInUser: ""});
        }

        this.$router.replace("/");
    }
}
</script>

<style>

</style>