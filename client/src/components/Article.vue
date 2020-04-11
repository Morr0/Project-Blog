<template>
    <div class="row">
    <div class="col s12 ">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <router-link :to="`/post/${post._id}`">
              <span class="card-title">{{post.title}}
                  <router-link v-if="loggedIn" :to="loggedInEditPath"> | Edit</router-link>
              </span>
          </router-link>
          <p>{{post.content}}</p>
        </div>
        <div class="card-action">
            <a v-if="author" href="" @click.prevent="toAuthor"><span>Author: {{this.author.name}} </span></a>
            <a href="" @click.prevent="like">{{`${post.likes} | Like`}}</a>
            <!-- <a href="#">Comment</a> -->
            <!-- <a href="" @click.prevent="share">{{`${post.shares} | Share`}}</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Article",
    props: {
    post: {},
    individualPage: Boolean,
    },
    computed: {
        loggedIn: function (){
            if (!this.$store.state.loggedIn) return false;

            return (this.post.author === this.$store.state.loggedInUserId);
        },
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
        share: function (){

        }
    },data: function(){
        return {
        //   loggedIn: this.$store.state.loggedIn,
            loggedInEditPath: `/blogger/edit/${this.post._id}`,
            author: undefined,
        };
    },
    async mounted(){
        try {
            const res = await fetch(`http://localhost:3400/users/${this.post.author}`);
            if (res.status === 200){
                this.author = await res.json();
            }
        } catch (error) {console.log(error);}
    }
}
</script>