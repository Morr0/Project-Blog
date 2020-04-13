<template>
    <div class="row s12 m4 l8">
        <form class="col s6" @submit.prevent="edit">
            <div class="input-field col s6">
                <input placeholder="Title" id="title" type="text" class="validate active" v-model="title" required>
                <label for="title" class="active">Title</label>
            </div>
            <!-- <div class="row">
                <div class="input-field col s6">
                    <textarea id="textarea1" class="materialize-textarea" placeholder="Enter Markdown" v-model="mdContent"></textarea>
                    <label class="active" for="textarea1">Markdown</label>
                </div>
                <div class="input-field col s6">
                    <textarea id="textarea2" class="materialize-textarea" placeholder="HTML" v-model="content"></textarea>
                    <label class="active" for="textarea1">Content</label>
                </div>
            </div> -->
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
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
    <div>
      <button :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
        Bold
      </button>
      <button :class="{ 'is-active': isActive.heading({ level: 2 }) }" @click="commands.heading({ level: 2 })">
        H2
      </button>
    </div>
  </editor-menu-bar>
        <!-- <EditorMenuBar :editor="editor"></EditorMenuBar> -->
        <EditorContent :editor="editor" />
    </div>
</template>

<script>


export default {
    data: function (){
        return {
            id: this.$route.params.id,
            title: "",
            // mdContent: "",
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
            // TODO make sure the user has access to this post and not someone else's
            const res = await fetch(`http://localhost:3400/posts/${this.id}`);
            if (!res.ok)
                return this.$router.replace("/");

            const post = (await res.json())[0];
            if (post){
                this.title = post.title;
                this.content = post.content;
                this.draft = post.draft;
                this.hidden = post.hidden;

                if (post.author !== this.$store.state.loggedInUserId) return this.$router.replace("/");
            } else {
                return this.$router.replace("/");
            }
        }

        // Tiptap editor
        document.edd = this.editor;
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
        }
    }
}
</script>

<style>
</style>