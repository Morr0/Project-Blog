<template>
  <div class="home">
    <Article />
  </div>
</template>

<script>
// @ is an alias to /src
import Article from "@/components/Article.vue";

export default {
  name: 'Home',
  components: {
    Article
  }
}
</script>
