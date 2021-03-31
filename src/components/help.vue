<template>
  <div>
    <engine-description v-bind:srcLang="srcLang" v-bind:tgtLang="tgtLang" v-bind:langDescription="langDescription"/>
    <div id="help-content">
      <div v-html="compiledMarkdown"></div>
    </div>
  </div>
  
</template>

<script>
import EngineDescription from '@/components/engine-description.vue'
import marked from "marked"
import hljs   from 'highlight.js';

require('highlight.js/styles/googlecode.css')

marked.setOptions({
  highlight: function(code, lang) {
    if (lang == '') {
      lang = 'bash'
    }
    return hljs.highlight(lang, code).value;
  }
});

export default {
  name: 'Help',
  components: {
    'engine-description': EngineDescription
  },
  props: {
    srcLang: String,
    tgtLang: String,
    langDescription: String,
    help: String
  },
  data: function() {
    return {
    }
  },
  computed: {
    compiledMarkdown: function () {
          
      return marked(this.help, { sanitize: true })
    }
  }
};
</script>

<style>
#help-content code {
  color:#000;
  border-radius: 0
}
#help-content a {
  text-decoration: None 
}

#help-content pre {
  border:None !important;
}
#help-content code{
  box-shadow:None !important;
  padding:0 !important;
  border-left:solid 5px #CCC;
  padding-left:20px !important
}


#help-content code::before {
  display: None;
}
#help-content h1, #help-content h2, #help-content h3 {
  font-weight: normal;
}

#help-content h2 {
  margin-top: 20px
}

#help-content em {
  color:#666;
  font-style: normal;
}

#help-content li {
  list-style-type: none

}
#help-content li:before{
  content: "- "
  }
</style>

