<template>
    <div class="form">
      <div class="row">
        <form class="col s12" @submit.prevent="register">
            <div class="row">
                <div class="input-field col s6">
                <input id="name" type="text" class="validate" v-model="name" required>
                <label for="name" class="active">Full Name</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                <input id="email" type="email" class="validate" v-model="email" required>
                <label for="email" class="active">E-mail</label>
                </div>
            </div>
                <div class="row">
                <div class="input-field col s6">
                <input id="password" type="password" class="validate" v-model="password" required>
                <label for="password">Password</label>
                </div>
            </div>
            <div class="row">
                <button class="btn waves-effect waves-light grey darken-2" type="submit" name="action">Register</button>
            </div>
        </form>
    </div>
    <div class="row">
        <label class="active"><router-link to="login">I have an account, login</router-link></label>
    </div>
  </div>
</template>

<script>
export default {
    name: "Register",
    data() {
        return {
            name: "",
            email: "",
            password: "",
        };
    },
    async created(){
      const res = await fetch("http://localhost:3400/users/", {credentials: "include"});
      const back = await res.json();
      if (back.res === "") this.$router.replace("../");
    },
    methods: {
        register: function(event) {
            fetch("http://localhost:3400/users/register/", {
                method: "POST",
                headers: {
                    "name": this.name,
                    "email": this.email,
                    "password": this.password
                }
            }).then((res) => {
                if (res.status === 409)
                    return alert("Your email is already registered");
                else if (res.status === 500)
                    return alert("The server is experiencing a bit of motion, submit in a few seconds");
                else if (res.status === 400) 
                    return alert("You must fill all the forms");
                else if (res.status === 201){
                    // Registered
                    // TODO add loading indicator as a transition
                    this.$router.replace("Login");
                }
            });
        }
   }
}
</script>

<style>

</style>