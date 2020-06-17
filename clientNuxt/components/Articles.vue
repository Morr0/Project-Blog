<template>
    <!-- <div class="container" v-if="posts">
        <Article v-for="(post) in posts" :post="post" :key="post._id" :individualPage="false" :minimised="minimised" />
    </div>
    <div v-else class="">
        No posts ...
    </div> -->
    <v-container class="my-20">
        <Article v-for="(post) in posts" :post="post" :key="post._id" :individualPage="false" :minimised="minimised" />
    </v-container>
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