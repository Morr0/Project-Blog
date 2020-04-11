<template>
    <div class="container">
        <Article v-if="post._id" :post="post" :individualPage="true"/>
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
            if (res.status !== 200) return this.$router.replace("/");

            this.post = (await res.json())[0];
        }
    },
    created(){
        this.getPost();
    }
}
</script>

<style>

</style>