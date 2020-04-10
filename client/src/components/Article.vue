<template>
    <div class="row">
    <div class="col s12 ">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
            <!-- TODO somehow get rid of the Vue error, try updating. Everything works fine but Vue is bugged. -->
          <router-link :to="post._id">
              <span class="card-title">{{post.title}}
                  <router-link v-if="loggedIn" :to="loggedInEditPath"> | Edit</router-link>
              </span>
          </router-link>
          <p>{{post.content}}</p>
        </div>
        <div class="card-action">
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
    individualPage: Boolean
  },
  methods: {
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
          loggedIn: this.$store.state.loggedIn,
          loggedInEditPath: `blogger/edit/${this.post._id}`,
      };
  }
}
</script>