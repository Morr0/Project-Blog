<template>
    <div class="container">
        <Article v-for="(post) in posts" :post="post" :key="post._id" />
    </div>
</template>

<script>
import {} from "vue";
import Article from "./Article.vue";

export default {
    components: {
        Article
    },
    data(){
        return {
            posts: [],
        };
    },
    methods: {
        fetchPosts: async function (){
            const res = await fetch("http://localhost:3400/posts/");
            this.posts = await res.json();
        }
    }
    ,
    created(){
        this.fetchPosts();
    }
}
</script>