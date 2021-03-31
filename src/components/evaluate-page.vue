<template>
  <div >
    <engine-description v-bind:srcLang="srcLang" v-bind:tgtLang="tgtLang" v-bind:langDescription="langDescription"/>

    <h1 id="form-title">Evaluate</h1>
    <div id="form-help">
      <p>To evaluate translation quality, we will compute BLEU and TER scores. For that, an evaluation corpus is needed</p>
      <ul>
        <li>A source file with the segments to translate.</li>
        <li>A reference file with the "human translation" of each segments of the source file.</li>
      </ul>
      <p>If you don't have an evaluation corpus, you can click the "Use build-in evaluation corpus" checkbox.</p>
    </div>
    <h2 id="form-subtitle">Lets'go!</h2>
    <v-file-input 
      label="Source file" 
      outlined prepend-icon="mdi-clipboard-text" 
      @change="getSrcFileContent"
      v-if="!useDefaultCorpus">
    </v-file-input>
    <v-file-input 
      label="Reference file "
      outlined prepend-icon="mdi-clipboard-text"
      @change="getReferenceFileContent"
      v-if="!useDefaultCorpus">
    </v-file-input>
    <v-checkbox color="primary"
      v-model="useDefaultCorpus"
      label="Use build-in evaluation corpus"
    ></v-checkbox>
    <!-- submit -->
    <v-btn
      color="primary"
      v-on:click="this.evaluateHandler"
    >Evaluate
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
    
    <!-- <div id="results" v-if="!showResult">
      <h2>Results</h2>
        BLEU score: <v-avatar color="success" id="tgtLang" class="lang">
        {{ 50 }} 
      </v-avatar>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';
import EngineDescription from '@/components/engine-description.vue'
import strip from '@/utils/strip.js'
import serverUri from '@/utils/server-uri.js'

export default {
  name: 'EvaluatePage',
  components: {
    'engine-description': EngineDescription
  },
  props: {
    srcLang: String,
    tgtLang: String,
    langDescription: String
  },
  data: () => ({
    showResult:false,
    loading: false,
    src: '',
    reference: '',
    useDefaultCorpus: false

  }),
  methods: {
    async evaluateHandler() {
      let tus = []
      if (!this.useDefaultCorpus) {
        const srcs = strip(this.src).split()
        const references = strip(this.reference).split()

        if (srcs.length != references.length) {
          alert("Source file and reference file hasn't the same number of lines")
          return       
        } 
        
        for (let i=0; i<srcs.length; i++) {
          tus.push({
            'src': srcs[i],
            'tgt': references[i]
          })
        }
      } 
      this.showResult = false
      this.loading = true
      try {  
        const url = serverUri() + '/evaluate'
        const res = await axios.post(
          url,
          {'tus':tus},
          { headers: 
            {
              'Content-Type': 'application/json',
            }
          }
         )
        if (res.status == 200) {
          return res.data[0]
        } else {
          console.log('Error loading' + res.status)
          throw 'Http error loading config'
        }
      }
      catch {
        throw 'Http '
      }
      finally {
        this.loading = false
      }  
      
    
    
    },
    getSrcFileContent(file) {
      const reader = new FileReader();
      reader.onloadend = () => {this.src = reader.result;}
      reader.readAsText(file);
    },
    getReferenceFileContent(file) {
      const reader = new FileReader();
      reader.onloadend = () => {this.reference = reader.result;}
      reader.readAsText(file);
    }
  }
};
</script>

<style>
#form-title {
  margin:30px 0 0 0;
  font-weight: normal
}

#form-subtitle {
  margin:20px 0 20px 0;
  font-weight: normal
}

#form-help p {
  margin:0 0 10px 0;
}
#form-help ul {
  margin:0 0 10px 0;
}
#form-help li {
  list-style-type: none;

}
#form-help li:before{
  content: "- ";
}
</style>

