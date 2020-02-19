const env = require("dotenv").config()

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#27ae60" },
  /*
   ** Global CSS
   */
  css: [{ src: "~/assets/scss/main.scss", lang: "scss" }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vuetify", "~/plugins/axios"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    [
      "nuxt-fontawesome",
      {
        imports: [
          {
            set: "@fortawesome/free-solid-svg-icons",
            icons: ["fas"]
          }
        ]
      }
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    postcss: [
      require("autoprefixer")(),
      require("cssnano")({
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: "pre",
      //     test: /\.(js|vue)$/,
      //     loader: "eslint-loader",
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },

  env: env.parsed,

  router: {
    base:
      process.env.NODE_ENV === "development"
        ? process.env.BASE_URL_DEV
        : process.env.BASE_URL_PROD
  },

  axios: {
    proxy: true,
    prefix:
      process.env.NODE_ENV === "development"
        ? process.env.VUE_APP_API_URL_DEV
        : process.env.VUE_APP_API_URL_PROD
  },

  proxy: {
    "/beta/app/*": "https://anfisa.forome.dev"
  },

  styleResources: {
    scss: ["~/assets/scss/utils/vars.scss"]
  }
}
