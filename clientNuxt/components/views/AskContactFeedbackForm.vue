<template>
    <div class="w-full max-w-md mx-auto">
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
    </div>
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

            // Validation

            const headers = {
                question: this.content,
            };

            if (this.reason === "askcontact") headers.email = this.email;

            console.log(headers);

            fetch(`${this.$store.state.backend}/contact/${this.reason === "feedback"? "feedback": "contact"}/`, {
                headers: headers,
                method: "POST",
            });
        }
    }
}
</script>