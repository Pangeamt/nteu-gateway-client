
<template>
  <v-app>

    <!-- Header -->
    <v-app-bar
      app
      color="#CCC"
      flat
    >
      <img
        src="@/assets/logo-icon.png"
        id="logo-mini"
        class="mr-4"
      />
      <router-link to="/">
        <v-btn color="primary">Translate
        </v-btn>
      </router-link>
      <router-link
        class="ml-1"
        to="/evaluate"
      >
        <v-btn
          color="primary"
          class="d-none"
        >Evaluate
        </v-btn>
      </router-link>
      <div class="flex-grow-1"></div>
      <router-link
        class="ml-1"
        to="/help"
      >
        <v-btn color="primary">Help
        </v-btn>
      </router-link>
    </v-app-bar>

    <!-- Content -->
    <v-content>
      <v-container id="main-container">
        <v-row>
          <!-- Left column : Logo -->
          <v-col
            cols="12"
            md="3"
            id="left-col"
          >
            <nteu-logo v-if="gatewayType == 'nteu'" />
            <pangeamt-logo v-if="gatewayType == 'pangeamt'" />
          </v-col>
          <!-- Right column : Logo -->
          <v-col
            cols="12"
            md="9"
          >
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <!-- Footer-->
    <v-footer
      color="#CCC"
      align="center"
      justify="center"
      height="60px"
    >
      <!-- <img src="@/assets/logo-ce-horizontal-en-neg-pantone-lr.png" id="logo-ce" /> -->

    </v-footer>
  </v-app>
</template>

<script>
import NteuLogo from '@/components/nteu-logo.vue'
import PangeamtLogo from '@/components/pangeamt-logo.vue'

export default {
  name: 'App',
  components: {
    'pangeamt-logo': PangeamtLogo,
    'nteu-logo': NteuLogo
  },
  props: {
    gatewayType: String
  },
  data: () => ({
    srcLang: '',
    tgtLang: '',
    showLogo: false
  }),

  methods: {
    init () {
      // Show logo
      const self = this
      this.showLogo = true
      setTimeout(function () {
        self.showLogo = true
      }, 2000);
    }
  },
  // Mounted
  mounted () {
    //this.loadConfig()
    this.init()
  }
};
</script>

<style>
#logo-mini {
  height: 32px;
  width: 32px;
  border: solid 2px white;
}

a {
  text-decoration: none;
}
#logo-footer {
  color: grey;
  font-size: 20px;
  padding-top: 20px;
}
#left-col {
  text-align: center;
}
#main-container {
  margin-top: 20px;
}

#logo-ce {
  width: 200px;
  opacity: 0.4;
}
</style>

