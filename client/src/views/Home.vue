<template>
    <div class="home">
        <Articles :posts="posts" />
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
