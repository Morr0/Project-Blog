<template>
  <div>
      <!-- <style src="@/assets/css/custom.css"></style> -->
      <Navbar />
      <nuxt />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
    components: {
        Navbar,
    }
}
</script>

<style>
    body {
        @apply bg-gray-100;
    }

    a {
        text-decoration: underline;
    }
</style>