<template>
        <div class="flex flex-wrap -mx-1 sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1 justify-center">
            <div class="my-1 px-1 sm:my-1 sm:px-1 md:my-1 md:px-1 lg:my-1 lg:px-1 xl:my-1 xl:px-1" >
                <form @submit.prevent="edit">
                    <div class="mb-4 flex flex-row flex-grow">
                        <label class="block text-gray-700 text-sm font-bold mb-2 mr-2" for="title">
                        Title
                        </label>
                        <input type="text" required v-model="title" id="title" placeholder="Title"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
                    </div>
                    <div class="mb-4 flex flex-row flex-grow">
                        <label class="block text-gray-700 text-sm font-bold mb-2 mr-2" for="description">
                        Description
                        </label>
                        <textarea v-model="description" id="description" placeholder="Description"
                        class="resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
                         leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

                    
                    <client-only>
                        <vue-editor ref="editor" class="articleContent" v-model="content"></vue-editor>
                    </client-only>

                    <div class="flex flex-row">
                        <label class="md:w-2/3 block text-gray-500 font-bold">
                            <input class="mr-2 leading-tight" type="checkbox" v-model="draft">
                            <span class="text-sm">
                                Draft
                            </span>
                        </label>
                        <label class="md:w-2/3 block text-gray-500 font-bold">
                            <input class="mr-2 leading-tight" type="checkbox" v-model="hidden">
                            <span class="text-sm">
                                Hidden
                            </span>
                        </label>
                    </div>

                    <button class="flex-shrink-0 border-transparent border-4 text-teal-500 
                    hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" @click.prevent="cancel">Cancel</button>

                    <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 
                    hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                    {{id? "Update": (draft? "Draft": "Post")}}</button>

                    <button class="flex-shrink-0 bg-red-600 hover:bg-teal-700 border-red-600 
                    hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button" @click.prevent="remove">
                    Delete</button>
                </form>
            </div>
        </div>
</template>

<script>
import {VueEditor} from "vue2-editor";

export default {
    components: {
        VueEditor,
    },
    data: function (){
        return {
            id: this.$route.params.id,
            title: "",
            description: "",
            content: "",
            draft: true,
            hidden: false,
        };
    },
    async created(){
        // Kick out if not logged in
        if (!this.$store.state.sessionStorage.loggedIn) return this.$router.replace("/");
    },
    async mounted(){
        try {
            if (this.id){
            const res = await fetch(`${this.$store.state.backend}/posts/${this.id}`, {credentials: "include"});
            if (!res.ok) return this.$router.replace("/");

            const post = await res.json();
            if (post){
                this.title = post.title;
                this.content = post.content;
                this.description = post.description;
                this.draft = post.draft;
                this.hidden = post.hidden;

                if (post.author !== this.$store.state.sessionStorage.loggedInUserId) return this.$router.replace("/");
            } else {
                return this.$router.replace("/");
            }
        }
        } catch (error){
            console.log(error);
            return this.$router.replace("/");
        }

        document.editor = this.$refs.editor;
    },
    methods: {
        // This treats both a new post and editting one
        edit: async function (){
            // Creating a new post
            if (!this.id){
                try {
                    const res = await fetch(`${this.$store.state.backend}/posts/`, {
                    method: "POST",
                    headers: {
                        author: this.$store.state.sessionStorage.loggedInUserId,
                        title: this.title,
                        description: this.description,
                        // content: this.content,
                        draft: this.draft,
                        hidden: this.hidden,
                        "Content-Type": "text/html",
                        "Accept": "text/html"
                    },
                    body: this.content,
                    credentials: "include"
                    });

                    if (res.status !== 200) return alert("Failed to post");

                    // Set id so it can be used for redirection
                    this.id = await res.json();
                } catch (error) {console.log(error);} 
            // Editing an existing one
            } else {
                try {
                    const res = await fetch(`${this.$store.state.backend}/posts/${this.id}`, {
                    method: "PUT",
                    headers: {
                        author: this.$store.state.sessionStorage.loggedInUserId,
                        title: this.title,
                        description: this.description,
                        draft: this.draft,
                        hidden: this.hidden,
                        "Content-Type": "text/html",
                        "Accept": "text/html"
                    },
                    body: this.content,
                    credentials: "include",
                    });

                    if (res.status !== 200) return alert("Failed to post");
                } catch (error){console.log(error);}
            } 

            // Once done posting/editting
            this.$router.replace(`/post/${this.id}`);
        },
        remove: async function(){
            // TODO add ability for the user to choose is he sure to delete

            if (this.id) {
                try {
                    const res = await fetch(`${this.$store.state.backend}/posts/${this.id}`, {
                    method: "DELETE",
                    credentials: "include",
                    });

                    if (!res.ok) return alert("There was a problem deleting your post");
                } catch (error) {console.log(error);}
            } else return;

            // Once removed
            this.$router.replace(`/`);
        },
        cancel: function (){
            this.$router.replace("/");
        },
    }
}
</script>