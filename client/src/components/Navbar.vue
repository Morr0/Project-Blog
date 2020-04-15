<template>
    <!-- <nav class="container">
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
                <li v-if="!loggedIn">
                    <router-link to="/blogger/register">Register</router-link>
                </li>
                <li>
                    <router-link v-if="loggedIn" to="/blogger/logout">Logout</router-link>
                    <router-link v-if="!loggedIn" to="/blogger/login">Login</router-link>
                </li>
            </ul>
        </div>
  </nav> -->
  <nav class="flex items-center justify-between flex-wrap p-6 bg-gray-100 sticky">
    <div class="flex items-center flex-shrink-0 text-gray-900 mr-6">
        <!-- <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> -->
        <!-- TODO Make an actual logo -->
        <!-- TODO Make the logo glow on hover -->
        <img src="@/assets/logo.png" alt=".png" class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" />
        <span class="font-semibold text-2xl tracking-tight"><router-link to="/">{{this.$store.state.title}}</router-link></span>
    </div>
    <div class="w-full block flex-grow sm:flex sm:flex-row-reverse sm:flex-grow-0 sm:items-center sm:w-auto">
        <div class="text-lg items-end lg:flex-grow">
            <router-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                Home
            </router-link>
            <a v-if="loggedIn" @click.prevent="goToAccount" href="" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                {{this.$store.state.loggedInUser || "Account"}}
            </a>
            <router-link v-if="!loggedIn" to="/posts/" class="block text-gray-700 mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 font-bold">
                Posts
            </router-link>
            <router-link v-if="loggedIn" to="/blogger/create/" class="block text-gray-700 mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 font-bold">
                Create
            </router-link>
            <router-link to="/about/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 font-bold mr-4">
                About        
            </router-link>
            <router-link v-if="loggedIn" to="/blogger/logout/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                Logout
            </router-link>
            <router-link v-if="!loggedIn" to="/blogger/login/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                Login
            </router-link>
        </div>
    </div>
</nav>
</template>

<script>

export default {
    computed: {
        loggedIn: function (){
            return this.$store.state.loggedIn;
        },
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