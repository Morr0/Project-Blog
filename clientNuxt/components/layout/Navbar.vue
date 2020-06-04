<template>
  <client-only placeholder="Loading...">
    <nav class="flex items-center justify-between flex-wrap p-6 bg-gray-100 sticky">
        <div class="flex items-center flex-shrink-0 text-gray-900 mr-6">
            <!-- <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg> -->
            <!-- TODO Make the logo glow on hover -->
            <!-- <img src="@/assets/logo.png" alt=".png" class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" /> -->
            <Icon :logo="true" />
            <span class="font-semibold text-2xl tracking-tight"><nuxt-link to="/">{{this.$store.state.title}}</nuxt-link></span>
        </div>
        <div class="flex flex-grow sm:flex sm:flex-row-reverse flex-wrap justify-center sm:flex-grow-0 sm:items-center sm:w-auto">
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

                <!-- Drop down styling issues -->
                <a class="mr-4 text-gray-700 hover:text-blue-500 w-12 relative drop font-bold">
                    Apps
                    <div class="dropdownMenu" >
                        <li title="Pomodoro Timer"><a target="_blank" href="https://morr0.github.io/Pomodoro-Timer/" 
                        class="px-4 py-2 block text-black hover:bg-grey-light text-gray-700 hover:text-blue-500">
                            Pomodoro Timer</a></li>
                        <li title="Rosary App"><a target="_blank" href="https://morr0.github.io/Rosary-Prayer-Counter/" 
                        class="px-4 py-2 block text-black hover:bg-grey-light text-gray-700 hover:text-blue-500">
                            Rosary App</a></li>
                    </div>
                </a>

                <!-- <a target="_blank" href="http://rami-apps.s3-website-ap-southeast-1.amazonaws.com/" 
                            class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                                Rosary App</a> -->

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
  </client-only>
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
    a {
        text-decoration: none;
        cursor: pointer;
    }
</style>