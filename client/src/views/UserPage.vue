<template>
    <div class="block sm:flex flex-col">
        <div class="flex mb-4 mt-4">
            <div class="w-1/5 h-12"></div>
            <div class="w-3/5 h-12">
                <div v-if="user" class="flex flex-row mx-auto mb-8">
                    <img src="@/assets/svg/user.svg" class="w-32 h-32 border rounded-full"> 
                    <div class="flex flex-col ml-8">
                        <h1 class="font-bold font-sans mb-1">{{this.user.name}}</h1>
                        <span class="font-sans font-medium">{{this.user.bio}}</span>
                    </div>
                </div>
                <span class="font-semibold font-sans text-2xl mb-4">Posts</span>
                <Articles v-if="posts" :posts="posts" :minimised="true" />
            </div>
            <div class="w-1/5 h-12"></div>
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
            const res = await fetch(`${this.$store.state.backend}/users/${this.id}`);
            if (res.status !== 200) return this.$router.replace("/");
            else {
                this.user = await res.json();
            }
        } catch (error) {
            console.log(error);
            return this.$router.replace("/");
        }

    },
    async mounted(){
        try {
            const res = await fetch(`${this.$store.state.backend}/posts/user/${this.id}`, {credentials: "include"});

            if (res.status === 200){
                this.posts = await res.json();
            }
        } catch (error) {
            console.log(error);
            return this.$router.replace("/");
        }
    },
    methods: {
        directToView: function (){
            this.$router.replace(`/post/${post._id}`);
        },
        directToEdit: function (){
            this.$router.replace(`/blogger/edit/${post._id}`);
        }
    },
    computed: {
        // Return the default if there is none
        profilePicture: function (){
            //TODO implement
            return "@/assets/svg/user.svg";
        }
    }
}
</script>