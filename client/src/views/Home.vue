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
    name: "Home",
    components: {
        Articles
    },
    data(){
        return {
            posts: undefined,
        };
    },
    async created(){
        const isLoggedIn = await fetch(`http://localhost:3400/users/loggedIn/`, {credentials: "include"});
        if (isLoggedIn.status !== 200){
            this.$store.commit("updateUser", {loggedIn: false, loggedInUserId: "", loggedInUser: ""});
        } else {
            const user = await isLoggedIn.json();
            this.$store.commit("updateUser", {loggedIn: true, loggedInUserId: user.id, loggedInUser: user.name});
        }

        const res = await fetch("http://localhost:3400/posts/");
        this.posts = await res.json();
    },
}
</script>
