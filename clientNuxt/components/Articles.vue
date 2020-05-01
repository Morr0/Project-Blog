<template>
    <div class="container" v-if="posts">
        <Article v-for="(post) in posts" :post="post" :key="post._id" :individualPage="false" :minimised="minimised" />
    </div>
</template>

<script>
import Article from "./Article.vue";

export default {
    props: {
        posts: undefined,
        minimised: false,
    },
    components: {
        Article
    },
}
</script>