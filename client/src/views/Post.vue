<template>
    <div class="container">
        <Article v-bind:post="this.post" />
    </div>
</template>

<script>
import Article from "@/components/Article.vue";

export default {
    name: "Post",
    components: {
        Article
    },
    data: function(){
        return {
            id: this.$route.params.id,
            post: {},
        }
    },
    methods: {
        getPost: async function(){
            const res = await fetch(`http://localhost:3400/posts/${this.id}`);
            this.post = (await res.json())[0];
        }
    },
    created(){
        // console.log(this.id);
        this.getPost();
    }
}
</script>

<style>

</style>