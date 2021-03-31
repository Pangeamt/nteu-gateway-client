<template>
  <div id="engine-title">
    <div id="engine-h1">
      Translation engine
      <v-avatar color="#CCC" id="srcLang" class="lang">
        {{ srcLang.toUpperCase() }} 
      </v-avatar> 
      <v-icon  color="#000">mdi-redo</v-icon>
      <v-avatar color="#CCC" id="tgtLang" class="lang">
        {{ tgtLang.toUpperCase() }} 
      </v-avatar>
    </div>
    <p id="lang-description">{{ langDescription }} </p>
  </div>
</template>

<script>


export default {
  name: 'EngineDescription',
  components: {
  },
  props: {
    srcLang: String,
    tgtLang: String,
    langDescription: String
  }
};
</script>

<style>
#engine-title{
  margin:0 0 20px 0 !important;
}
#engine-h1{
  margin:0;
  font-size:40px;
}

.lang {
  color:#000 !important;
  margin-left: 2px;
  margin-right:2px;
  font-size:14px;
  font-weight: normal;
}
#lang-description {
  margin: -10px 0 0 5px;
  color: grey
}


</style>

