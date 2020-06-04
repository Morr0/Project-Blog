<template>
    <div class="">
        <div v-if="!dialogMode" class="block sm:flex flex-col">
            <div class="flex mb-4 mt-4">
                <div class="w-1/5 h-12"></div>
                <div class="w-3/5 h-12">
                    <div v-if="user" class="flex flex-row mx-auto mb-8">
                        <!-- <img ref="image" :src="userImage"  alt="Profile Picture" @error.once="imageErrorLoading"
                        class="w-32 h-32 border rounded-full" @dblclick.prevent="dblClickProfPicture"> -->
                        <ProfilePicture :image_url="user.image_url" :dblclik="dblClickProfPicture" />
                        
                        <input type="file" ref="imageUpload" style="display: none;" accept="image/*" @input.prevent="selectedImage"/> 
                        <div class="flex flex-col ml-8">
                            <h1 class="font-bold text-xl font-sans mb-1">{{this.user.name}}</h1>
                            <div>
                                <span class="font-sans font-medium">
                                    <!-- TODO Stop the HARDCODE -->
                                <!-- {{this.user.bio || "Bio goes here"}}</span> -->
                                I am an Electrical Engineering student at the university of Sydney (USyd). I enjoy programming as it makes
                                my ideas alive. I also like how the technology ecosystem works and love to use it to help myself and others.
                                </span>
                            </div>
                        </div>
                    </div>
                    <span class="font-semibold font-sans text-2xl mb-4">Posts</span>
                    <Articles v-if="posts" :posts="posts" :minimised="true" />
                </div>
                <div class="w-1/5 h-12"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Articles from "@/components/Articles.vue";
import ProfilePicture from "@/components/ProfilePicture.vue";

export default {
    name: "User",
    components: {
        Articles,
        ProfilePicture,
    },
    data(){
        return {
            // id: this.$route.params.id,
            // user: undefined,
            // posts: undefined,

            dialogMode: false,
            dialogText: "",
        };
    },
    async asyncData(context){
        const id = context.params.id;
        let posts, user = undefined;

        // TODO clean code
        try {
            const res = await fetch(`${context.store.state.backend}/users/${id}`, {credentials: "include"});
            if (res.status !== 200) return context.router.replace("/");
            else {
                user = await res.json();
            }
        } catch (error) {
            console.log(error);
            return context.router.replace("/");
        }

        try {
            const res = await fetch(`${context.store.state.backend}/posts/user/${id}`, {credentials: "include"});

            if (res.status === 200){
                posts = await res.json();
            }
        } catch (error) {
            console.log(error);
            return context.router.replace("/");
        }

        return {
            id,
            posts,
            user,
        }

    },
    // async created(){
    //     try {
    //         const res = await fetch(`${this.$store.state.backend}/users/${this.id}`, {credentials: "include"});
    //         if (res.status !== 200) return this.$router.replace("/");
    //         else {
    //             this.user = await res.json();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return this.$router.replace("/");
    //     }
    // },
    // async mounted(){
    //     try {
    //         const res = await fetch(`${this.$store.state.backend}/posts/user/${this.id}`, {credentials: "include"});

    //         if (res.status === 200){
    //             this.posts = await res.json();
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return this.$router.replace("/");
    //     }
    // },
    methods: {
        directToView: function (){
            this.$router.replace(`/post/${post._id}`);
        },
        directToEdit: function (){
            this.$router.replace(`/blogger/edit/${post._id}`);
        },
        // Clicks the hidden file chooser
        dblClickProfPicture: function (){
            this.$refs.imageUpload.click();
        },
        // Called when a file chooser's input changes
        selectedImage: function (){
            console.log(this.$refs.imageUpload.files);

            // To prevent bugs on empty files
            if (this.$refs.imageUpload.files.length > 0){
                let formData = new FormData();
                formData.append("picture", this.$refs.imageUpload.files[0]);

                fetch(`${this.$store.state.backend}/users/image/profile/${this.user._id}`, {
                    method: "PUT",
                    body: formData,
                    credentials: "include",
                }).then((res) => {
                    if (res.status === 200) return this.$router.go();
                    
                }).catch((error) => {
                    alert("Could not upload the picture");
                });

            }
        },

        
    },
}
</script>