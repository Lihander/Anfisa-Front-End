import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import variable from '~/assets/scss/utils/vars.scss'

Vue.use(Vuetify)

export default ctx => {
  const vuetify = new Vuetify({
    theme: {
      themes:{
        light:{
          primary: variable.primary,
          secondary: variable.secondary,
          accent: variable.accent,
          error: variable.error,
          warning: variable.warning,
        }
      }
    }
  })

  ctx.app.vuetify = vuetify
  ctx.$vuetify = vuetify.framework
}
