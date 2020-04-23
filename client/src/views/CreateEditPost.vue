<template>
    <div class="w-full">
        <div class="flex flex-wrap -mx-1 sm:-mx-1 md:-mx-1 lg:-mx-1 xl:-mx-1">
            <div class="my-1 px-1 w-1/2 sm:my-1 sm:px-1 sm:w-1/2 md:my-1 md:px-1 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-1 xl:px-1 xl:w-1/2">
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
                    <div class="mb-4 flex flex-row flex-grow">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                        Content in MD (<a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" 
                        class="hover:text-blue-700 mr-2" target="_blank">MD Cheatsheet</a>)
                        </label>
                        <textarea v-model="mdContent" id="content" placeholder="Content" @input="mdChanged"
                        class="resize-y shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-auto
                         leading-tight focus:outline-none focus:shadow-outline" />
                    </div>

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

                    <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 
                    hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
                    {{id? "Update": (draft? "Draft": "Post")}}</button>

                    <button class="flex-shrink-0 border-transparent border-4 text-teal-500 
                    hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" @click.prevent="cancel">Cancel</button>
                </form>
            </div>
            <div class="my-1 px-1 w-1/2 sm:my-1 sm:px-1 sm:w-1/2 md:my-1 md:px-1 md:w-1/2 lg:my-1 lg:px-1 lg:w-1/2 xl:my-1 xl:px-1 xl:w-1/2
                        bg-white">
                <span v-html="content" class="h-full"></span>
            </div>
        </div>
    </div>
</template>

<script>
const showdown = require("showdown");
const converter = new showdown.Converter();

export default {
    data: function (){
        return {
            id: this.$route.params.id,
            title: "",
            description: "",
            mdContent: "",
            content: "",
            draft: true,
            hidden: false,

            // Verification stuff
            allowedToEdit: true,
        };
    },
    async created(){
        // Kick out if not logged in
        if (!this.$store.state.loggedIn) return this.$router.replace("/");
    },
    async mounted(){
        if (this.id){
            const res = await fetch(`http://localhost:3400/posts/${this.id}`, {credentials: "include"});
            if (!res.ok) return this.$router.replace("/");

            const post = await res.json();
            if (post){
                this.title = post.title;
                this.content = post.content;
                this.draft = post.draft;
                this.hidden = post.hidden;

                if (post.author !== this.$store.state.loggedInUserId) return this.$router.replace("/");
                // Make md from html
                this.mdContent = converter.makeMd(this.content);
            } else {
                return this.$router.replace("/");
            }
        }
    },
    methods: {
        // This treats both a new post and editting one
        edit: async function (){
            // Creating a new post
            if (!this.id){
                try {
                    console.log("Sending");
                    const res = await fetch("http://localhost:3400/posts/", {
                    method: "POST",
                    headers: {
                        author: this.$store.state.loggedInUserId,
                        title: this.title,
                        content: this.content,
                        draft: this.draft,
                        hidden: this.hidden
                    },
                    credentials: "include"
                    });

                    if (!res.status === 200) return alert("Failed to post");
                    console.log("Posted");

                    // Set id so it can be used for redirection
                    this.id = await res.json();
                } catch (error) {console.log(error);} 
            // Editing an existing one
            } else {
                try {
                    const res = await fetch(`http://localhost:3400/posts/${this.id}`, {
                    method: "PUT",
                    headers: {
                        author: this.$store.state.loggedInUserId,
                        title: this.title,
                        content: this.content,
                        draft: this.draft,
                        hidden: this.hidden
                    },
                    credentials: "include"
                    });

                    if (!res.ok) return alert("Failed to post");
                } catch (error){console.log(error);}
            } 

            // Once done posting/editting
            this.$router.replace(`/post/${this.id}`);
        },
        remove: async function(){
            // TODO add ability for the user to choose is he sure to delete

            if (this.id) {
                try {
                    const res = await fetch(`http://localhost:3400/posts/${this.id}`, {
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
        // Md change
        mdChanged: function (){
            this.content = converter.makeHtml(this.mdContent);
        }
    }
}
</script>

<style>
</style>