<template>
  <div class="border w-full sm:flex sm:items-center min-w-full sm:flex-col mb-8">
        <div class="max-w-sm w-full sm:max-w-full sm:flex flex-grow min-w-full">
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t 
            lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal
            min-w-full">
                <div class="mb-8 content-center">
                    <div class="text-gray-900 font-bold text-xl mb-2 inline-flex flex-grow">
                        <nuxt-link class="hover:text-blue-500 articleTitle" :to="`/post/${post._id}`">{{post.title}}</nuxt-link>
                        <div @click.prevent="clickedIcon"><Icon class="mt-1 ml-2" :draft="post.draft" :hidden="post.hidden" :editable="loggedIn" /></div>
                    </div>
                    <p class="text-gray-700 articleContent" v-if="!individualPage" v-html="post.description">Description goes here</p>
                    <div class="text-gray-700 articleContent" v-else v-html="post.content">Content goes here</div>
                </div>
                <div class="flex ">
                    <div class="w-4/10 h-auto">
                        <div class="flex items-center">
                            <ProfilePicture v-if="individualPage && author" class="w-10 h-10 rounded-full mr-4 articleImg" :image_url="author.image_url" />
                            <div class="text-sm">
                                <p v-if="author" class="text-gray-900 leading-none"><a :href="toAuthor"  class="articleAuthor">
                                    {{author.name}}</a></p>
                                <p class="text-gray-600">{{date.toUTCString()}}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="individualPage" class="w-6/10 h-12 block text-justify w-1/2 ml-10 mt-8 ">
                        <p class="mb-4 ml-12 text-gray-900 ">
                            {{post.likes}} Likes || 
                            <a v-if="individualPage && !liked" href="" @click.prevent="like" style="text-decoration: none;" 
                            class="block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-blue-500 mr-4 font-bold">Like it</a>
                        </p>
                    </div>
                    <div v-else class="w-6/10 h-auto w-1/2 mb-4 ml-12 text-gray-900">
                        {{post.likes}} Likes
                    </div>
                </div>
                
            </div>
        </div>
  </div>
</template>

<script>
import Icon from "@/components/Icon.vue"
import ProfilePicture from "@/components/ProfilePicture.vue";

export default {
    name: "Article",
    components: {
        Icon,
        ProfilePicture,
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
        toAuthor: function (){
            // return `/blogger/${this.author._id}`;
            return "https://ramihikmat.net";
        },
    },
    methods: {
        like: function (){
            try {fetch(`${this.$store.state.backend}/posts/like/${this.post._id}`, { method: "PUT", credentials: "include"});} catch(error) {return console.log(error);}
            // Client side rendering
            if (!this.post.likes)
                this.post.likes = 0

            this.liked = true;
            this.post.likes++;
        },
        clickedIcon: function (){
            if (this.$store.state.sessionStorage.loggedInUserId === this.post.author) return this.$router.replace(this.loggedInEditPath);
        }
    },
    data: function(){
        return {
            loggedInEditPath: `/blogger/edit/${this.post._id}`,
            author: undefined,
            date: new Date(),
            liked: false,
        };
    },
    async mounted(){
        if (this.post.postDate) this.date = new Date(this.post.postDate);
        document.date = this.date;

        try {
        const res = await fetch(`${this.$store.state.backend}/users/${this.post.author}`, {credentials: "include"});
            if (res.status === 200){
                this.author = await res.json();
            }
        } catch (error) {console.log(error);}
    }
}
</script>

<style scoped>
img {
    cursor: default;
}

.articleTitle {
    text-decoration: none;
    
    @apply text-3xl;
}

.articleDescription {
    word-wrap: break-word;
}

.articleContent {
    @apply p-3;
    @apply text-gray-900;

    text-overflow: clip;
    word-wrap: break-word;
}

.articleContent h3, h4, h5, h6, p, span, blockquote{
    @apply text-lg;
}

.articleContent h1 {
    @apply text-2xl;
}

.articleContent h2  {
    @apply text-xl;
}

.articleContent a {
    @apply text-gray-600;
    text-decoration: wavy;
}

.articleContent a:hover {
    @apply text-blue-500;
}

.articleAuthor {
    text-decoration: none;
}

.articleContent blockquote,pre {
    display: inline-block;
    @apply bg-gray-200;
    font-style: oblique;
}

/* Copied from quill/dist/quill.snow.css */
.articleContent pre {
    border: 1px;
    border-radius: 1%;
    @apply p-3;
    background-color: #23241f;
    color: #f8f8f2;
    /* overflow: scroll; */
    width: 100%;
    height: auto;
    border-color: unset;

    overflow-x: scroll;
    overflow-y: hidden;

    /* Scrollbar */
    /* scrollbar */

}

.articleContent pre.ql-syntax {
    border: 1px;
    border-radius: 1%;
    @apply p-3;
    background-color: #23241f;
    color: #f8f8f2;
    /* overflow: scroll; */
    width: 100%;
    height: auto;
    border-color: unset;

    overflow-x: scroll;
    overflow-y: hidden;

    /* Scrollbar */
    /* scrollbar */

}

.articleContent img {
    /* width: 100%;
    height: fit-content;
    object-fit: scale-down; */
    /* object-position: center; */
    
}

.articleContent iframe {
    width: 100%;
    height: 100%;
    
    /* padding-bottom: 56.25%; */
    /* height: 400px; */
    /* object-fit: scale-down;
    image-rendering: pixelated;
    border: none; */
    
}

/* TODO add tabs and lists styling */
</style>