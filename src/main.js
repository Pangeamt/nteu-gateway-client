import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import TranslatePage from '@/components/translate-page.vue'
import EvaluatePage from '@/components/evaluate-page.vue'
import Help from '@/components/help.vue'
import axios from 'axios';
import serverUri from '@/utils/server-uri.js'

Vue.config.productionTip = false
Vue.use(VueRouter)

// Load config from server
async function loadConfig () {
  try {

    const url = serverUri() + '/initialize'
    const res = await axios.post(url)
    if (res.status == 200) {
      return res.data
    } else {
      throw 'Http error loading config'
    }
  }
  catch {
    throw 'Http error loading config'
  }
}

// Start 
async function start () {
  try {
    // Load config from server
    const config = await loadConfig()

    // Router
    const routes = [
      {
        path: '/',
        component: TranslatePage,
        props: {
          srcLang: config.srcLang,
          tgtLang: config.tgtLang,
          langDescription: config.langDescription
        }
      },
      {
        path: '/help',
        component: Help,
        props: {
          srcLang: config.srcLang,
          tgtLang: config.tgtLang,
          langDescription: config.langDescription,
          help: config.help
        }
      },
      {
        path: '/evaluate',
        component: EvaluatePage,
        props: {
          srcLang: config.srcLang,
          tgtLang: config.tgtLang,
          langDescription: config.langDescription,
        }
      }
    ]
    const router = new VueRouter({ routes: routes })

    // Main component
    new Vue({
      vuetify,
      router: router,
      render: h => h(App, { props: { gatewayType: config.gatewayType } })
    }).$mount('#app')
  } catch (error) {
    alert(error)
  }

}

// Start the app
start()

