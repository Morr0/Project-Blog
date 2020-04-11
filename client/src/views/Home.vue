<template>
    <div class="home">
        <Articles :posts="posts" />
    </div>
</template>

<script>
import Articles from "@/components/Articles.vue";

export default {
    name: "Home",
    components: {
        Articles
    },
    data(){
        return {
            posts: undefined,
        };
    },
    async created(){
        const res = await fetch("http://localhost:3400/posts/");
        this.posts = await res.json();
    }
}
</script>
