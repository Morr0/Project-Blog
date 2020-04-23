<template>
    <!-- <div class="border sm:flex sm:justify-center sm:content-center max-w-">
        
    </div> -->
    <div class="flex mb-4 mt-4">
        <div class="w-1/5 h-12"></div>
        <div class="w-3/5 h-12">
            <Article v-if="post._id" :post="post" :individualPage="true"/>
        </div>
        <div class="w-1/5 h-12"></div>
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
            const res = await fetch(`http://localhost:3400/posts/${this.id}`, {credentials: "include"});
            if (res.status !== 200) return this.$router.replace("/");

            this.post = await res.json();
        }
    },
    async created(){
        // if ((await fetch(`http://localhost:3400/posts/allowed/3400/${this.id}`)))

        this.getPost();
    }
}
</script>

<style>

</style>