<template>
    <div class="row">
    <div class="col s12 ">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{{this.data.title}}</span>
          <p>{{this.data.content}}</p>
        </div>
        <div class="card-action" v-if="this.individualPage">
            <router-link to="/">Like</router-link>
            <a href="#">Comment</a>
            <a href="#">Share</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    data: Object,
    // false -> viewed on the homescreen with other views
    // true -> viewed on it's own page
    individualPage: Boolean = true
  }
}
</script>