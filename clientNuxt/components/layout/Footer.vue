<template>
    <v-footer app>
        Rami Hikmat
        <v-spacer></v-spacer>
        <AskContactFeedbackForm />
    </v-footer>
</template>

<script>
import AskContactFeedbackForm from "@/components/views/AskContactFeedbackForm.vue";

export default {
    components: {
        AskContactFeedbackForm
    },
    data(){
        return {
            showDialog: false,
        };
    }
}
</script>