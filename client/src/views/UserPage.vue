<template>
    <div class="block sm:flex flex-col">
        <div v-if="user" class="">
            <h1>{{this.user.name}}</h1>
            <div class="">
                <div v-if="hasProfilePicture" class="">Has</div>
                <div v-else class="">
                    <!-- <object data="@/assets/svg/user.svg" type="image/svg+xml">
                        <img src="@/assets/png/user.png" />
                    </object>   -->
                    <img src="@/assets/svg/user.svg" class="w-20 h-20 border"> 
                </div>
            </div>
        </div>
        <div class="flex mb-4 mt-4">
            <div class="w-1/5 h-12"></div>
            <div class="w-3/5 h-12">
                <span class="font-semibold font-sans">Posts</span>
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
    },
    computed: {
        hasProfilePicture: function (){
            return this.user.image_url;
        }
    }
}
</script>

<style>

</style>