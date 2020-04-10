import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Post from "@/views/Post.vue"
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Logout from "@/views/Logout.vue";
import CreateEditPost from "@/views/CreateEditPost.vue";
import UserPage from "@/views/UserPage.vue";


Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/post/:id",
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
  },
  {
    path: "/blogger/logout/",
    name: "Logout",
    component: Logout
  },
  {
      path: "/blogger/create/",
      name: "CreateEdit",
      component: CreateEditPost
  },
  {
    path: "/blogger/edit/:id",
    name: "CreateEdit",
    component: CreateEditPost
  },
  {
      path: "/blogger/:id",
      name: "User",
      component: UserPage
  },
  {
      path: '*',
      redirect: "/"
  },
]

const router = new VueRouter({
  routes,
  mode: "history",
})

export default router
