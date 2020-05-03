<template>
    <!-- <nav class="container">
        <div class="nav-wrapper grey darken-2">
            <nuxt-link to="/" class="brand-logo">{{this.$store.state.title}}</nuxt-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li v-if="loggedIn">
                <nuxt-link to="/blogger/create"> 
                    Create
                </nuxt-link></li>
                <li v-if="loggedIn">
                    <a @click.prevent="goToAccount">{{this.$store.state.loggedInUser || "Account"}}</a>
                </li>
                <li v-if="!loggedIn">
                    <nuxt-link to="/blogger/register">Register</nuxt-link>
                </li>
                <li>
                    <nuxt-link v-if="loggedIn" to="/blogger/logout">Logout</nuxt-link>
                    <nuxt-link v-if="!loggedIn" to="/blogger/login">Login</nuxt-link>
                </li>
            </ul>
        </div>
  </nav> -->
  <nav class="flex items-center justify-between flex-wrap p-6 bg-gray-100 sticky">
    <div class="flex items-center flex-shrink-0 text-gray-900 mr-6">
        <!-- <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> -->
        <!-- TODO Make an actual logo -->
        <!-- TODO Make the logo glow on hover -->
        <!-- <img src="@/assets/logo.png" alt=".png" class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" /> -->
        <Icon :logo="true" />
        <span class="font-semibold text-2xl tracking-tight"><nuxt-link to="/">{{this.$store.state.title}}</nuxt-link></span>
    </div>
    <div class="w-full block flex-grow sm:flex sm:flex-row-reverse sm:flex-grow-0 sm:items-center sm:w-auto">
        <div class="text-lg items-end lg:flex-grow">
            <nuxt-link to="/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                Home
            </nuxt-link>
            <a v-if="loggedIn" @click.prevent="goToAccount" href="" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                {{this.$store.state.sessionStorage.loggedInUser || "Account"}}
            </a>
            <!-- TODO implement a page that shows all posts -->
            <!-- <nuxt-link v-if="!loggedIn" to="/posts/" class="block text-gray-700 mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 font-bold">
                Posts
            </nuxt-link> -->
            <nuxt-link v-if="loggedIn" to="/blogger/create/" class="block text-gray-700 mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 font-bold">
                Create
            </nuxt-link>
            <!-- TODO implement an about page -->
            <!-- <nuxt-link to="/about/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 font-bold mr-4">
                About        
            </nuxt-link> -->
            <nuxt-link v-if="loggedIn" to="/blogger/logout/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                Logout
            </nuxt-link>
            <!-- <nuxt-link v-if="!loggedIn" to="/blogger/login/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                Login
            </nuxt-link> -->
        </div>
    </div>
</nav>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
    components: {
        Icon,
    },
    computed: {
        loggedIn: function (){
            return this.$store.state.sessionStorage.loggedIn;
        },
    },
    methods: {
        goToAccount: function (){
            this.$router.replace(`/blogger/${this.$store.state.sessionStorage.loggedInUserId}`);
        }
    }
}
</script>

<style scoped>
</style>