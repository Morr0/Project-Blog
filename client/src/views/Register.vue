<template>
    <!-- <div class="form">
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
        <label class="active"><router-link to="/blogger/login/">I have an account, login</router-link></label>
    </div>
  </div> -->
    <div class="w-full max-w-md mx-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="register">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Username
                </label>
                <input type="text" required v-model="name" id="name" placeholder="Full Name"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
                </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                </label>
                <input type="email" required v-model="email" id="email" placeholder="Email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
                </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input type="password" required v-model="password" id="password" placeholder="******************"
                class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" >
                <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
            <div class="flex items-center justify-between">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Register
                </button>
                <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/blogger/login/">
                Have an account, login.
                </router-link>
            </div>
        </form>
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
        if (this.$store.state.loggedIn) return this.$router.replace("/");

        if ((await fetch("${this.$store.state.backend}/users/allowedToRegister/", 
        {credentials: "include"})).status !== 200) return this.$router.replace("/");
    },
    methods: {
        register: function(event) {
            fetch("${this.$store.state.backend}/users/register/", {
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
                    this.$router.replace("/blogger/login/");
                }
            });
        }
   }
}
</script>

<style>

</style>