<template>

</template>

<script>
export default {
    created (){
        fetch("http://localhost:3400/users/logout", {method: "POST", credentials: "include"});
        this.$store.state.loggedIn = false;
        this.$router.replace("../");
    }
}
</script>

<style>

</style>