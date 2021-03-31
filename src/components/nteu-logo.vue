<template>
  <transition name="slide-fade">
    <div v-if="showLogo">
      <img
        src="@/assets/nteu.png"
        id="logo"
      />
      <p id="logo-footer">
        Neural Translation <br />for Europe
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'nteu-logo',
  components: {
  },
  data: () => ({
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
  mounted () {
    this.init()
  }
};
</script>

<style>
#logo {
  width: 50%;
  max-width: 200px;
}
#logo-footer {
  color: grey;
  font-size: 20px;
  padding-top: 20px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-30px);
  opacity: 0;
}
</style>

