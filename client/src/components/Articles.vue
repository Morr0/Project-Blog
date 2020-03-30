<template>
    <div class="container" v-if="now">
        <Article v-for="(post) in posts" :data="post" :key="post._id" :individualPage="individualPage" />
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
            individualPage: false,
            now: false
        };
    },
    methods: {
        fetchPosts: async function (){
            fetch("http://localhost:3400/posts/").then((res) => res.json())
            .then ((data) => {
                this.posts = data;
                this.now = true;
            });
        }
    }
    ,
    async created(){
        // fetch("http://localhost:3400/posts").then((res) => res.json())
        // .then(posts => {
        //     // this.posts = posts;
            
        //     console.log(posts);
        //     console.log(this.posts);
        // });

        this.fetchPosts();
        console.log(this.posts);
    }
}
</script>