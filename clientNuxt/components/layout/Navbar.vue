<template>
  <!-- <client-only placeholder="Loading..."> -->
    <nav class="flex items-center justify-between flex-wrap p-6 bg-gray-100 sticky">
        <div class="flex items-center flex-shrink-0 text-gray-900 mr-6">
            <Icon :logo="true" />
            <span class="font-extrabold text-3xl text-gray-800 hover:text-blue-500 tracking-tight"><nuxt-link to="/">Rami Hikmat's</nuxt-link></span>
        </div>
        <div class="flex flex-grow sm:flex sm:flex-row-reverse flex-wrap justify-center sm:flex-grow-0 sm:items-center sm:w-auto">
            <div class="text-lg items-end lg:flex-grow">
                <a v-if="loggedIn" @click.prevent="goToAccount" href="" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                    {{this.$store.state.sessionStorage.loggedInUser || "Account"}}
                </a>

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

                <a class="mr-4 text-gray-700 hover:text-blue-500 w-12 relative drop font-bold">
                    About
                    <div class="dropdownMenu" >
                        <li title="Portfolio"><a target="_blank" href="https://ramihikmat.net" 
                        class="px-4 py-2 block text-black hover:bg-grey-light text-gray-700 hover:text-blue-500">
                            Portfolio</a></li>
                        <li title="Pomodoro Timer"><a target="_blank" href="https://www.linkedin.com/in/rami-hikmat/" 
                        class="px-4 py-2 block text-black hover:bg-grey-light text-gray-700 hover:text-blue-500">
                            Linkedin</a></li>
                        <li title="Rosary App"><a target="_blank" href="https://github.com/Morr0" 
                        class="px-4 py-2 block text-black hover:bg-grey-light text-gray-700 hover:text-blue-500">
                            Github</a></li>
                    </div>
                </a>


                <nuxt-link v-if="loggedIn" to="/blogger/create/" class="block text-gray-700 mt-4 lg:inline-block lg:mt-0 hover:text-blue-500 mr-4 font-bold">
                    Create
                </nuxt-link>
                <nuxt-link v-if="loggedIn" to="/blogger/logout/" class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">
                    Logout
                </nuxt-link>
            </div>
        </div>
    </nav>
  <!-- </client-only> -->
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