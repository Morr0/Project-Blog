<template>
  <div class="border w-full sm:flex sm:items-center min-w-full sm:flex-col">
        <div class="max-w-sm w-full sm:max-w-full sm:flex flex-grow min-w-full">
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t 
            lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal
            min-w-full">
                <div class="mb-8 content-center">
                    <div class="text-gray-900 font-bold text-xl mb-2 inline-flex flex-grow">
                        <nuxt-link class="hover:text-blue-500" :to="`/post/${post._id}`">{{post.title}}</nuxt-link>
                        <div @click.prevent="clickedIcon"><Icon class="mt-1 ml-2" :draft="post.draft" :hidden="post.hidden" :editable="loggedIn" /></div>
                    </div>
                    <p class="text-gray-700 text-base" v-if="!individualPage" v-html="post.description"></p>
                    <p class="text-gray-700 text-base" v-else v-html="post.content">Here is the content</p>
                </div>
                <div class="flex items-center">
                    <img class="w-10 h-10 rounded-full mr-4" @click.prevent="toAuthor" src="@/assets/svg/user.svg" alt="Profile picture">
                    <div class="text-sm">
                        <p v-if="author" class="text-gray-900 leading-none"><a href="" @click.prevent="toAuthor">{{author.name}}</a></p>
                        <p class="text-gray-600">{{date.toLocaleDateString("en-au")}}</p>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import Icon from "./Icon.vue"

export default {
    name: "Article",
    components: {
        Icon
    },
    props: {
    post: {},
    individualPage: Boolean,
    minimised: Boolean
    },
    computed: {
        loggedIn: function (){
            return (this.post.author === this.$store.state.sessionStorage.loggedInUserId);
        },
    },
    methods: {
        toAuthor: function (){
            this.$router.replace(`/blogger/${this.author._id}`);
        },
        like: function (){
            try {fetch(`${this.$store.state.backend}/posts/like/${this.post._id}`, { method: "PUT"});} catch(error) {return console.log(error);}
            // Client side rendering
            if (!this.post.likes)
                this.post.likes = 0
            this.post.likes++;
        },
        clickedIcon: function (){
            if (this.$store.state.sessionStorage.loggedInUserId === this.post.author) return this.$router.replace(this.loggedInEditPath);
        }
    },data: function(){
        return {
            loggedInEditPath: `/blogger/edit/${this.post._id}`,
            author: undefined,
            date: new Date(),
        };
    },
    async mounted(){
        if (this.post.updateDate) this.date = new Date(this.post.updateDate);
        document.date = this.date;

        try {
            const res = await fetch(`${this.$store.state.backend}/users/${this.post.author}`);
            if (res.status === 200){
                this.author = await res.json();
            }
        } catch (error) {console.log(error);}
    }
}
</script>

<style>
    code {
        @apply bg-gray-900; 
        @apply text-orange-400;
    }
</style>