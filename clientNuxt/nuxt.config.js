const axios = require("axios");

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Rami Hikmat's Blog",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "This is a personal site where I host my portfolio and blog. My name is Rami Hikmat." },
      { hid: "og:title", name: "og:title", content: "Rami Hikmat's Blog"},
      { hid: "og:url", name: "og:title", content: "https://blog.ramihikmat.net"},
      { hid: "og:description", name: "og:title", content: "This is a personal site where I host my portfolio and blog. My name is Rami Hikmat."},
    ],
    link: [
      { rel: 'shortcut icon', href: "favicon.svg" }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/pwa',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    "nuxt-vuex-localstorage",
    '@nuxtjs/vuetify',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  pwa: {
    meta: {
      title: "Rami Hikmat's",
      author: "Rami Hikmat",
    },
    manifest: {
      name: 'Rami Hikmat',
      short_name: 'Rami',
      lang: 'en',
    },
  },
  generate: {
      routes: function (){
          return axios.get("http://localhost:3400/posts/")
          .then((res) => {
              return res.data.map((post) => {
                return {
                    route: `/post/${post._id}`,
                    payload: post,
                }
              });
          });
      },
      dir: "./dist/site/"
  },
}
