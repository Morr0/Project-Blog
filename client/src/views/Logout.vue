<template>
    <div>
        Logging out
    </div>
</template>

<script>
export default {
    async created (){
        const res = await fetch("http://localhost:3400/users/logout", {method: "POST", credentials: "include"});
        if (res.ok){
            this.$store.commit("updateUser", {loggedIn: false, loggedInUserId: "", loggedInUser: ""});
        }

        this.$router.replace("/");
    }
}
</script>

<style>

</style>