<template>
    <nav>
    <div class="nav-wrapper grey darken-2">
      <router-link to="/" class="brand-logo">Logo</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li v-if="loggedIn">
        <router-link to="/blogger/create"> 
            Create
        </router-link></li>
        <li v-if="loggedIn">
            <a>Hello</a>
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
}
</script>

<style scoped>
</style>