<template>
    <div class="row s12 m4 l8">
        <form class="col s6" @submit.prevent="edit">
            <div class="input-field col s6">
                <input placeholder="Title" id="title" type="text" class="validate active" v-model="title" required>
                <label for="title" class="active">Title</label>
            </div>
            <div class="markdownCheatsheet">
                <a href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet" target="_blank">Md Cheatsheet</a>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <textarea id="textarea1" class="materialize-textarea" placeholder="Enter Markdown" v-model="mdContent"
                     @input="mdChanged"></textarea>
                    <label class="active" for="textarea1">Markdown</label>
                </div>
                <!-- <div class="input-field col s6">
                    <textarea id="textarea2" class="materialize-textarea" placeholder="HTML" v-model="content"
                    @change.prevent="htmlChanged"></textarea>
                    <label class="active" for="textarea1">Content</label>
                </div> -->
                <div class="container">
                    <h1>Preview: </h1>
                    <div class="container s6" v-html="content"></div>
                </div>
            </div>
            <div class="row">
                <div class="switch col s6">
                <label>
                
                <input type="checkbox" v-model="hidden">
                <span class="lever"></span>
                Hidden
                </label>
                </div>
                <div class="switch">
                    <label>
                    
                    <input type="checkbox" v-model="draft">
                    <span class="lever"></span>
                    Draft
                    </label>
                </div>
            </div>
            <div class="row">
                <button class="btn waves-effect waves-light" type="submit" name="action">
                    {{id? "Update": (draft? "Draft": "Post")}}</button>
                <button class="btn waves-effect grey" type="button" name="action" @click.prevent="cancel">Cancel</button>
            </div>
            <div class="row">
                <button v-if="id" class="btn red" type="button" name="remove" @click.prevent="remove">Remove</button>
            </div>
        </form>
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
            console.log("Changed");
            this.content = converter.makeHtml(this.mdContent);
        }
    }
}
</script>

<style>
</style>