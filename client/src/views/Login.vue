<template>
  <div class="form">
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
        <label class="active"><router-link to="register">Don't have an account sign up</router-link></label>
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
  methods: {
      login: function(event) {
        console.log(this.email + this.password);
      }
  }
}
</script>

<style scoped>
.form {
    margin: auto;
    display: block;
    margin-right: 50%;
}
</style>
