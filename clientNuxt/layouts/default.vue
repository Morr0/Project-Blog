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
    },
    head: { // HARD CODED STUFF
        title: "Rami Hikmat's",
        meta: [
        {   hid: 'description', name: 'description', 
            content: 'This is a personal site where I host my portfolio and blog. My name is Rami Hikmat.' 
        },
        {
            hid: "author", name: "author", content: "Rami Hikmat"
        },
        {
            hid: "keywords", name: "keywords", 
            content: "HTML, CSS, JAVASCRIPT, NODEJS, PROGRAMMING, VUEJS, EXPRESS, BLOG, TUTORIAL, ENGLISH, برمجة, الويب, Web development"
        }
        ],
    },
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