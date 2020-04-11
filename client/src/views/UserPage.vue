<template>
    <div class="">
        <div v-if="user" class="row">
            <h1>{{this.user.name}}</h1>
        </div>
        <div class="row">
            <ul v-if="posts" class="collection with-header">
                <li class="collection-header"><h4>My Posts</h4></li>
                <!-- <li v-for="(post) in posts" :key="post._id" class="collection-item">
                    <div>
                        <a href="" @click.prevent="directToView(post)" class="secondary-content">{{post.title}} </a>
                        || 
                        <a href="" @click.prevent="directToEdit" class="secondary-content"> Edit</a>
                    </div>
                </li> -->
                <Articles v-if="posts" :posts="posts" :minimised="true" />
            </ul>
        </div>
    </div>
</template>

<script>
import Articles from "@/components/Articles.vue"

export default {
    name: "User",
    components: {
        Articles,
    },
    data(){
        return {
            id: this.$route.params.id,
            user: undefined,
            posts: undefined,
        };
    },
    async created(){
        try {
            const res = await fetch(`http://localhost:3400/users/${this.id}`);
            if (res.status !== 200) return this.$router.replace("/");
            else {
                this.user = await res.json();
            }
        } catch (error) {console.log(error);}

    },
    async mounted(){
        try {
            const res = await fetch(`http://localhost:3400/posts/user/${this.id}`, {credentials: "include"});

            if (res.status === 200){
                this.posts = await res.json();
            }
        } catch (error) {console.log(error);}
    },
    methods: {
        directToView: function (){
            this.$router.replace(`/post/${post._id}`);
        },
        directToEdit: function (){
            this.$router.replace(`/blogger/edit/${post._id}`);
        }
    }
}
</script>

<style>

</style>