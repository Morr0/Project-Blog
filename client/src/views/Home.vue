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
        fetch("http://localhost:3400/users/loggedIn/", {credentials: "include"})
        .then((res) => {
            if (res.status === 200) return res.json();
            else if (res.status === 404) this.$store.commit("updateUser", {loggedIn: false, loggedInUserId: "", loggedInUser: ""});
        })
        .then((user) => {
            this.$store.commit("updateUser", {loggedIn: true, loggedInUserId: user.id, loggedInUser: user.name});
        }).catch((error) => console.log(error));

        const res = await fetch("http://localhost:3400/posts/");
        this.posts = await res.json();
    },
}
</script>
