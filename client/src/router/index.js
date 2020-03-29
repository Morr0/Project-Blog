import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Post from "@/views/Post.vue"
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:id",
    name: "Post",
    component: Post
  },
  {
    path: "/blogger/login/",
    name: "Login",
    component: Login
  },
  {
    path: "/blogger/register/",
    name: "Register",
    component: Register
  }
]

const router = new VueRouter({
  routes,
  mode: "history",
})

export default router
