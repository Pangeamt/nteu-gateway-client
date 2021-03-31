<template>
  <div>
    <engine-description
      v-bind:srcLang="srcLang"
      v-bind:tgtLang="tgtLang"
      v-bind:langDescription="langDescription"
    />
    <h1 id="form-title">Get started with translation!</h1>
    <v-form
      v-model="valid"
      ref="form"
    >
      <!-- Text input -->
      <v-textarea
        outlined
        name="text-input"
        label="Text to translate"
        v-model="textInput"
        :rules="[(v) => !!v || 'Item is required']"
      ></v-textarea>

      <!-- Translation -->
      <v-textarea
        v-if="showTranslation"
        outlined
        name="translation"
        label="Translation"
        v-model="translation"
      ></v-textarea>

      <!-- submit -->
      <v-btn
        color="primary"
        v-on:click="this.translateHandler"
      >Translate
      </v-btn>

      <!-- Animation -->
      <v-progress-circular
        v-if="loading"
        :size="30"
        :width="3"
        color="primary"
        indeterminate
        class="ml-2"
      ></v-progress-circular>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
import EngineDescription from '@/components/engine-description.vue'
import serverUri from '@/utils/server-uri.js'

// Translate
async function translate (text) {
  const data = {
    texts: [text]
  }
  try {
    const url = serverUri() + '/translate'
    const res = await axios.post(
      url,
      data, {        headers: {
          'Content-Type': 'application/json',
        }    })
    if (res.status == 200) {
      return res.data.translations[0].translation
    } else {
      throw 'Http error '
    }
  }
  catch {
    throw 'Http error '
  }
}

export default {
  name: 'TranslatePage',
  components: {
    'engine-description': EngineDescription
  },
  props: {
    srcLang: String,
    tgtLang: String,
    langDescription: String
  },
  data: () => ({
    valid: false,
    showTranslation: false,
    loading: false,
    textInput: '',
    translation: ''
  }),
  methods: {
    async translateHandler () {
      this.$refs.form.validate()
      if (this.valid) {
        this.showResult = false
        this.loading = true
        try {
          const translation = await translate(this.textInput)
          this.showTranslation = true
          this.translation = translation
        } catch (error) {
          alert(error)
        }
        finally {
          this.loading = false
        }
      }
    }

  }
}
</script>

<style>
#form-title {
  margin: 30px 0 10px 0 !important;
  font-weight: normal;
}
</style>

