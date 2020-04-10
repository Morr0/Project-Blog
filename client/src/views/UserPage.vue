<template>
    <div class="">
        <div v-if="user" class="row">
            <h1>{{this.user.name}}</h1>
        </div>
        <div class="row">
            <ul class="collection with-header">
            <li class="collection-header"><h4>First Names</h4></li>
            <li class="collection-item"><div>Alvin<a href="#!" class="secondary-content"></a></div></li>
        </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "User",
    data(){
        return {
            id: this.$route.params.id,
            user: undefined,
        };
    },
    async created(){
        try {
            const res = await fetch(`http://localhost:3400/users/${this.id}`);
            if (res.status !== 200) return this.$router.replace("/");
            else {
                this.user = await res.json();
            }
        } catch (error) {console.log(error);}

    },
    async mounted(){

    }
}
</script>

<style>

</style>