<template>
    <v-container >
        <v-card v-if="individualPage" elevation="3" hover>
            <v-responsive>
                <v-card-title class="display-2">
                    {{post.title}}
                </v-card-title>
                
                <v-card-subtitle>
                    <!-- {{post.timeToRead}} minutes read --> since {{postDate}}
                </v-card-subtitle>

                <v-card-text v-html="content" fluid></v-card-text>
            </v-responsive>
        </v-card>
        <v-card v-else :to="`/post/${post._id}`" wrap>
            <v-responsive>
                <v-card-title>
                    {{post.title}}
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