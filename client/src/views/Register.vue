<template>
    <div class="form">
      <div class="row">
        <form class="col s12" @submit.prevent="register">
            <div class="row">
                <div class="input-field col s6">
                <input id="name" type="text" class="validate" v-model="name">
                <label for="name" class="active">Full Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                <input id="email" type="email" class="validate" v-model="email">
                <label for="email" class="active">E-mail</label>
                </div>
            </div>
                <div class="row">
                <div class="input-field col s6">
                <input id="password" type="password" class="validate" v-model="password">
                <label for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <button class="btn waves-effect waves-light grey darken-2" type="submit" name="action">Register</button>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
export default {
    name: "Register",
    props: {
        name: String,
        email: String,
        password: String,
    },
    methods: {
        register: function(event) {
            console.log(`Register  ${this.name}${this.email} ${this.password}`);
        }
   }
}
</script>

<style>

</style>