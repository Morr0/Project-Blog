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
    async asyncData(context){
        const id = context.params.id;
        let post = undefined;
        
        try {
            const res = await fetch(`${context.store.state.backend}/posts/${id}`, {credentials: "include"});
            if (res.status !== 200) return context.route.replace("/");

            post = await res.json();
        } catch(error){
            console.log(error);
            return context.route.replace("/");
        }

        return {
            post,
        }
    },
}
</script>