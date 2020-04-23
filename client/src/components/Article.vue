<template>
    <!-- <div class="row">
    <div class="col s12 ">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <router-link :to="`/post/${post._id}`">
              <span class="card-title">{{post.title}}{{post.draft?" | (Draft)":""}}{{post.hidden?" | (Hidden)":""}}
                  <router-link v-if="loggedIn" :to="loggedInEditPath"> | Edit</router-link>
              </span>
          </router-link>
          <div v-if="!minimised" v-html="post.content"></div>
        </div>
        <div class="card-action" v-if="!minimised">
            <a v-if="author" href="" @click.prevent="toAuthor"><span>Author: {{this.author.name}} </span></a>
            <a href="" @click.prevent="like">{{`${post.likes} | Like`}}</a>
            <a href="#">Comment</a>
            <a href="" @click.prevent="share">{{`${post.shares} | Share`}}</a>
        </div>
      </div>
    </div>
  </div> -->
  <div class="border w-full sm:flex sm:items-center min-w-full sm:flex-col">
        <div class="max-w-sm w-full sm:max-w-full sm:flex flex-grow min-w-full">
            <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t 
            lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal
            min-w-full">
                <div class="mb-8 content-center">
                    <div class="text-gray-900 font-bold text-xl mb-2 inline-flex flex-grow">
                        <router-link class="hover:text-blue-500" :to="`/post/${post._id}`">{{post.title}}</router-link>
                        <!-- TODO fix svg onclick -->
                        <Icon class="mt-1 ml-2" :draft="post.draft" :hidden="post.hidden" :editable="loggedIn" @click.prevent="clickedIcon" />
                    </div>
                    <p class="text-gray-500 text-base">{{post.description}}</p>
                </div>
                <div class="flex items-center">
                    <img class="w-10 h-10 rounded-full mr-4" src="@/assets/logo.png" alt="Avatar of Jonathan Reinink">
                    <div class="text-sm">
                        <p v-if="author" class="text-gray-900 leading-none"><a href="" @click.prevent="toAuthor">{{author.name}}</a></p>
                        <p class="text-gray-600">{{date.toLocaleDateString()}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="individualPage" class="mt-4 text-left flex-wrap" v-html="post.content">
            
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
            return (this.post.author === this.$store.state.loggedInUserId);
        },
        canEditIt: function (){
            return this.$store.state.loggedInUserId === post.author;
        }
    },
    methods: {
        toAuthor: function (){
            this.$router.replace(`/blogger/${this.author._id}`);
        },
        like: function (){
            fetch(`http://localhost:3400/posts/like/${this.post._id}`, { method: "PUT"});
            // Client side rendering
            if (!this.post.likes)
                this.post.likes = 0
            this.post.likes++;
        },
        clickedIcon: function (){
            console.log("clicked");
            if (this.canEditIt()){
                console.log(this.$router);
                
                // this.$router.replace(this.loggedInEditPath);
            }
        }
    },data: function(){
        return {
        //   loggedIn: this.$store.state.loggedIn,
            loggedInEditPath: `/blogger/edit/${this.post._id}`,
            author: undefined,
            date: new Date(),
        };
    },
    async mounted(){
        if (this.post.updateDate) this.date = new Date(this.post.updateDate);
        document.date = this.date;

        try {
            const res = await fetch(`http://localhost:3400/users/${this.post.author}`);
            if (res.status === 200){
                this.author = await res.json();
            }
        } catch (error) {console.log(error);}
    }
}
</script>