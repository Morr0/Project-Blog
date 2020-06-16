<template>
    <!-- <div class="border h-screen sm:flex sm:justify-center sm:content-center">
        <Articles :posts="posts" />
    </div> -->
    <div class="flex mb-4 mt-4">
        <div class="w-1/5 h-12"></div>
        <div class="w-3/5 h-12">
            <Articles :posts="posts" />
        </div>
        <div class="w-1/5 h-12"></div>
    </div>
</template>

<script>
import Articles from "@/components/Articles.vue";

export default {
    // name: "Home",
    components: {
        Articles
    },
    async asyncData(context){
        let posts = undefined;

        try {
            const res = await fetch(`${context.store.state.backend}/posts/`);
            posts = await res.json();
        } catch (error){
            console.log(error);
        }

        return {
            posts,
        }
    },
}
</script>
