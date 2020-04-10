<template>
  <div class="form center-align">
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
    //   try {
    //       const res = await fetch("http://localhost:3400/users/", {credentials: "include"});
    //       if (res.status === 208) this.$router.replace("/");
    //   } catch(error) {console.log(error);}

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
                    console.log(user);
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
        } catch(error) {console.log(`Error: ${error}`);}
      }
  }
}
</script>

<style>

</style>
