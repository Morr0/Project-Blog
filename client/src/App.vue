<template>
    <div class="app">
        <Navbar />
        <Articles />
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Footer from "@/components/Footer.vue"

import Home from "@/views/Home.vue";
import Articles from "@/components/Articles.vue"

export default {
    components: {
        Navbar,
        Articles,
        Footer
    }
}
</script>
