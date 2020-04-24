<template>
  <!-- <div class="form center-align">
    <div class="row">
        <form class="col s12" @submit.prevent="login">
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
                <button class="btn waves-effect waves-light grey darken-2" type="submit" name="action">Login</button>
            </div>
        </form>
    </div>
    <div class="row">
        <label class="active"><router-link to="/blogger/register/">Don't have an account sign up</router-link></label>
    </div>
  </div> -->
    <div class="w-full max-w-md mx-auto">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="login">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input type="email" required v-model="email" id="username" placeholder="Username"
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
                    Login
                </button>
                <router-link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/blogger/register/">
                Don't have an account
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>

export default {
  name: "Login",
  data() {
      return {
        email: "",
        password: ""
      };
  },
  async created(){
      if (this.$store.state.loggedIn) return this.$router.replace("/");
  },
  methods: {
      login: async function(event) {
        try {
            const res = await fetch("http://localhost:3400/users/login/", {
                method: "POST",
                headers: {
                    email: this.email,
                    password: this.password
                },
                credentials: "include",
            });

            switch (res.status){
                case 202 : case 200:
                    const user = await res.json();
                    this.$store.commit("updateUser", {loggedIn: true, loggedInUserId: user.id, loggedInUser: user.name});
                    this.$router.replace("/");
                    break;
                case 404: // Unknown email or password
                    alert("E-mail or Password are incorrect. Please enter the correct ones and sign in again.");
                    break;
                case 400: // Unauthorised, or when logged out by server
                    alert("Please fill all forms.");
                    break;
            }
        } catch(error) {
            console.log(error);
            return alert("An error has occured. Please try again.");
        }
      }
  }
}
</script>