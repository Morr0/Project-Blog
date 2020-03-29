<template>
    <div class="container">
        <!-- <Article :data="articleData" v-if="now"/> -->
        {{id}}
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
            articleData: Object,
            now: Boolean = false
        }
    },
    beforeCreate(){
        console.log("beforeCreate");
        // Fetches item from DB
        if (this.individualPage){
            fetch(`http://localhost:3400/posts/${this.id}`).then((res) => res.json())
            .then((d) => {
                console.log(d);
                this.articleData = d;
                this.now = true;
                vm.$forceUpdate();
            })
            .catch((error) => {console.log("HANDLE ME")});
        }
    }
}
</script>

<style>

</style>