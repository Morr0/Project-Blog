<template>
    <!-- <div class="w-full max-w-md mx-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submit">
            <div v-if="reason === `askcontact`" class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    E-mail for contacting back
                </label>
                <input type="email" required v-model="email" id="email" placeholder="example1@example2.example3"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="text"><br></label>
                <textarea required v-model="content" id="text" :placeholder="reason === `feedback`? `Type Feedback here please...`: `Ask/Contact here please...`"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit">
                    Submit
                </button>
                <nuxt-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" 
                :to="reason === `feedback`? `/askcontact/`: `/feedback/`">
                {{reason === "feedback"? "Ask/Contact me instead?": "Give Feedback instead?"}}
                </nuxt-link>
            </div>
        </form>
    </div> -->
    <v-flex>
        <form>
            <v-text-field
            v-if="reason === `askcontact`"
            v-model="email"
            error-messages="Please provide an E-mail address to contact you back"
            label="E-mail"
            required></v-text-field>
            <v-col cols="12" md="6">
                <v-textarea
                
                v-model="content"
                error-message="Please provide something..."
                name="input-7-4"
                :label="reason === `feedback`? `Type Feedback here please...`: `Ask/Contact here please...`"
                counter
                ></v-textarea>
            </v-col>

            <v-btn class="mr-4" @click="submit">submit</v-btn>
        </form>
    </v-flex>
</template>

<script>
export default {
    name: "AskContactFeedbackForm",
    props: {
        reason: String,
    },
    data() {
        return  {
            email: undefined,
            content: undefined,
        }
    },
    methods: {
        submit: function (){

            if (this.reason === "askcontact"){
                const validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!validEmail.test(this.email)) return alert("Please provide a correct email");
            }

            const headers = {
                question: this.content,
            };

            if (this.reason === "askcontact") headers.email = this.email;

            fetch(`${this.$store.state.backend}/contact/${this.reason === "feedback"? "feedback": "contact"}/`, {
                headers: headers,
                method: "POST",
            });

            if (this.reason === "feedback")
                alert("Thanks for sending me your feedback. Will definitely study your feedback.👍👍");
            else 
                alert("Thanks for contacting me. Will get to you as soon as possible.👍👍");
        }
    }
}
</script>