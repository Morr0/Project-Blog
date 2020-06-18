<template>
  <v-app>
      <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">

      <Navbar />
      <v-main>
          <v-container fill-height fluid> 
              <v-layout column wrap class="align-center">
                  <v-flex xs12 sm6 md6 lg6 class="justify-center align-center">
                      <nuxt />
                      <v-fab-transition>
                        <v-btn
                        v-show="fabShow"
                        bottom
                        right
                        fixed
                        fab
                        @click="scrollUp"
                        style="margin-bottom: 3.8rem;margin-left: 2rem;"
                        >
                            <v-icon>mdi-chevron-up</v-icon>
                        </v-btn>
                      </v-fab-transition>
                  </v-flex>
              </v-layout>
          </v-container>
          
      </v-main>
      <Footer />

      
  </v-app>
</template>

<script>
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
    components: {
        Navbar,
        Footer,
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
    data(){
        return {
            fabShow: false,
        };
    },
    methods: {
        scrollUp: function (){
            window.scrollTo({
                top: 0, 
                left: 0,
                behavior: "smooth",
            });
            this.fabShow = false;
        },
        scrolling: function (){
            if (window.scrollY > 200){
                this.fabShow = true;
            } else {
                this.fabShow = false;
            }
        }
    },
    mounted(){
        this.scrolling(); // Just in case loading in the middle of the window
        window.addEventListener('scroll', this.scrolling);
    }
}
</script>