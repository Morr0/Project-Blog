<template>
    <div class="">
        <div v-if="!dialogMode" class="block sm:flex flex-col">
            <div class="flex mb-4 mt-4">
                <div class="w-1/5 h-12"></div>
                <div class="w-3/5 h-12">
                    <div v-if="user" class="flex flex-row mx-auto mb-8">
                        <img ref="image" :src="userImage"  alt="Profile Picture" class="w-32 h-32 border rounded-full" @dblclick.prevent="dblClickProfPicture">
                        <input type="file" ref="imageUpload" style="display: none;" accept="image/*" @input.prevent="selectedImage"/> 
                        <div class="flex flex-col ml-8">
                            <h1 class="font-bold font-sans mb-1">{{this.user.name}}</h1>
                            <div>
                                <span class="font-sans font-medium">
                                {{this.user.bio || "Bio goes here"}}</span>
                            </div>
                        </div>
                    </div>
                    <span class="font-semibold font-sans text-2xl mb-4">Posts</span>
                    <Articles v-if="posts" :posts="posts" :minimised="true" />
                </div>
                <div class="w-1/5 h-12"></div>
            </div>
        </div>
        <!-- <div v-if="dialogMode" class="flex justify-center items-center h-screen">
            <div class="w-1/2 bg-white shadow-lg rounded p-4">
                <input type="text" v-model="dialogText" id="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
                <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 
                    hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" @click.prevent="updateDialog">
                    Update</button>
                <button class="flex-shrink-0 border-transparent border-4 text-teal-500 
                    hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" @click.prevent="closeDialog">Cancel</button>
            </div>
        </div> -->
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

            dialogMode: false,
            dialogText: "",
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

        // this.getImage();

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
        }
    },
    computed: {
        userImage: function (){
            // 'require' is very important
            return this.user.image_url? this.user.image_url: require("@/assets/svg/user.svg");
        }
    }
}
</script>