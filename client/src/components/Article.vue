<template>
    <div class="row" v-if="post">
    <div class="col s12 ">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{post.title}}</span>
          <p>{{post.content}}</p>
        </div>
        <div class="card-action" v-if="individualPage">
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
    post: Object,
    // false -> viewed on the homescreen with other views
    // true -> viewed on it's own page
    individualPage: Boolean = true,
  }
}
</script>