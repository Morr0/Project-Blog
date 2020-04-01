<template>
    <div class="row" v-if="post">
    <div class="col s12 ">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
            <!-- TODO somehow get rid of the Vue error, try updating. Everything works fine but Vue is bugged. -->
          <router-link :to="post._id">
              <span class="card-title">{{post.title}}</span>
          </router-link>
          <p>{{post.content}}</p>
        </div>
        <div class="card-action">
            <a href="#">Like</a>
            <a href="#">Comment</a>
            <a href="#">Share</a>
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
    // false -> viewed on the homescreen with other views
    // true -> viewed on it's own page
    // individualPage: Boolean = true,
  }
}
</script>