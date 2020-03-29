<template>
  <div class="home">
    <Articles />
  </div>
</template>

<script>
import Article from "@/components/Article.vue";
import Articles from "@/components/Articles.vue";

export default {
  name: "Home",
  components: {
    Article,
    Articles
  }
}
</script>
