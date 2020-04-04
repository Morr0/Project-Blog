<template>
    <div class="app">
        <Navbar />
        <router-view></router-view>
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Articles from "@/components/Articles.vue"

export default {
    components: {
        Navbar,
        Articles,
        Footer,
        Login
    },
}
</script>
