<template>
    <nav>
    <div class="nav-wrapper grey darken-2">
      <router-link to="/" class="brand-logo">{{this.$store.state.title}}</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="loggedIn">
        <router-link to="/blogger/create"> 
            Create
        </router-link></li>
        <li v-if="loggedIn">
            <a @click.prevent="goToAccount">{{this.$store.state.loggedInUser || "Account"}}</a>
        </li>
        <li>
            <router-link v-if="loggedIn" to="/blogger/logout">Logout</router-link>
            <router-link v-if="!loggedIn" to="/blogger/login">Login</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
    computed: {
        loggedIn: function (){
            return this.$store.state.loggedIn;
        }
    },
    methods: {
        goToAccount: function (){
            this.$router.replace(`/blogger/${this.$store.state.loggedInUserId}`);
        }
    }
}
</script>

<style scoped>
</style>