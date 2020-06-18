<template>
    <v-dialog v-model="showDialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
          @click="reason = `askcontact`"
        >
          Ask/Contact
        </v-btn>
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
          @click="reason = `feedback`"
        >
          Feedback
        </v-btn>
      </template>
      <v-card>
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
                    full-width
                    ></v-textarea>
                </v-col>

            </form>
            <v-spacer></v-spacer>
            <v-btn text @click="showDialog = false; content = ``;">Close</v-btn>
            <v-btn text @click="submit">Submit</v-btn>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "AskContactFeedbackForm",
    data() {
        return  {
            email: undefined,
            content: undefined,
            reason: "feedback",
            showDialog: false,
        }
    },
    methods: {
        submit: function (){

            if (this.reason === "askcontact"){
                const validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!validEmail.test(this.email)) return alert("Please provide a correct email");
            }

            if (!this.content) return alert("Please provide something to write on");

            this.showDialog = false;

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

            this.content = "";
        }
    }
}
</script>