<template>
    <div class="container">
        <Article v-for="(post) in posts" :data="post" :key="post._id" :individualPage="individualPage" />
    </div>
</template>

<script>
import Article from "./Article.vue";

export default {
    components: {
        Article
    },
    data(){
        return {
            posts: [],
            individualPage: false
        };
    },
    created(){
        fetch("http://localhost:3400/posts").then((res) => res.json())
        .then(posts => {
            this.posts = posts;
        });
        console.log(this.posts);
    }
}
</script>