<template>
  <div>
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
</style>