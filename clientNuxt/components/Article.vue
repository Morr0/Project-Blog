<template>
  <v-layout >
      <v-flex>
        <v-container v-if="individualPage">
            <v-card elevation="3" hover>
                <v-card-title>
                    <!-- <v-btn block x-large text :href="`/post/${post._id}`" class="text-wrap"> -->
                        {{post.title}}
                    <!-- </v-btn> -->
                </v-card-title>
                
                <v-card-subtitle>
                    <!-- {{post.timeToRead}} minutes read --> since {{postDate}}
                </v-card-subtitle>

                <v-card-text>
                    <v-container  v-html="content" fluid>

                    </v-container>
                </v-card-text>
            </v-card>
        </v-container>
        <v-container v-else wrap>
            <v-card  :to="`/post/${post._id}`" wrap>
                <v-responsive>
                    <v-card-title>
                    <!-- <v-btn block x-large text :href="`/post/${post._id}`" class="text-wrap"> -->
                        {{post.title}}
                    <!-- </v-btn> -->
                </v-card-title>
                
                <v-card-subtitle>
                    <!-- {{post.timeToRead}} minutes read --> since {{postDate}}
                </v-card-subtitle>

                <v-card-text>
                    {{post.description}}
                </v-card-text>
                </v-responsive>
            </v-card>
        </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import marked from "marked";
import readingTime from "reading-time";
import moment from "moment";

moment.locale("en-au");

export default {
    name: "Article",
    props: {
        post: {},
        individualPage: Boolean,
        minimised: Boolean
    },
    computed: {
        content: function(){
            return marked(this.post.content);
        },
        timeToRead: function(){
            return readingTime(this.content);
        },
        postDate: function (){
            return moment.parseZone(this.post.postDate).format('L').toString();
        }
    },
    methods: {
        like: function (){
            try {fetch(`${this.$store.state.backend}/posts/like/${this.post._id}`, { method: "PUT", credentials: "include"});} catch(error) {return console.log(error);}
            // Client side rendering
            if (!this.post.likes)
                this.post.likes = 0

            this.liked = true;
            this.post.likes++;
        },
    },
    data: function(){
        return {
            date: new Date(),
            liked: false,
        };
    },
    async mounted(){
        if (this.post.postDate) this.date = new Date(this.post.postDate);
        document.date = this.date;
    }
}
</script>