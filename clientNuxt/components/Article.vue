<template>
  <!-- <div class="border w-full sm:flex sm:items-center min-w-full sm:flex-col mb-8">
        <div class="max-w-sm w-full sm:max-w-full sm:flex flex-grow min-w-full">
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t 
            lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal
            min-w-full">
                <div class="mb-8 content-center">
                    <div class="text-gray-900 font-bold text-xl mb-2 inline-flex flex-grow">
                        <nuxt-link class="hover:text-blue-500 articleTitle" :to="`/post/${post._id}`">{{post.title}}</nuxt-link>
                        <span v-if="post.content"> {{this.timeToRead.text}}</span>
                    </div>
                    <p class="text-gray-700 articleContent" v-if="!individualPage" v-html="post.description">Description goes here</p>
                    <div class="text-gray-700 articleContent" v-else v-html="content">Content goes here</div>
                </div>
                <div class="flex ">
                    <div class="w-4/10 h-auto">
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
  </div> -->
  <v-card elevation="3" hover>
      <v-card-title>
          {{post.title}}
      </v-card-title>
      
      <v-card-subtitle>
          {{post.timeToRead}} minutes read since {{postDate}}
      </v-card-subtitle>

      <v-card-text v-if="individualPage">
          {{post.description}}
      </v-card-text>
      <v-card-text v-else v-html="content">

      </v-card-text>

  </v-card>
</template>

<script>
import marked from "marked";
import readingTime from "reading-time";
import moment from "moment";

moment.locale("en-au");

export default {
    name: "Article",
    props: {
        post: {},
        individualPage: Boolean,
        minimised: Boolean
    },
    computed: {
        content: function(){
            return marked(this.post.content);
        },
        timeToRead: function(){
            return readingTime(this.content);
        },
        postDate: function (){
            return moment.parseZone(this.post.postDate).format('L').toString();
        }
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
    },
    data: function(){
        return {
            date: new Date(),
            liked: false,
        };
    },
    async mounted(){
        if (this.post.postDate) this.date = new Date(this.post.postDate);
        document.date = this.date;
    }
}
</script>