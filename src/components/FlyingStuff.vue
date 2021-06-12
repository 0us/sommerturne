<template>
  <figure>
    <img :src="src" class="flying" alt="FlyingStuff"/>
  </figure>

</template>

<script>
export default {
  name: "FlyingStuff",
  props: {
    src: String
  },
  data() {
    return {
      parentWidth: 0,
      parentHeight: 0
    }
  },
  computed: {
    // interval: null
  },
  mounted() {
    // window.addEventListener("resize", this.updateWindowDimensions);
    // this.updateWindowDimensions();
    // this.interval = setInterval(() => this.tick(), this.tickrate + 100);
  },
  methods: {
    getRandomTranslation() {
      const x = Math.floor(
          (Math.random() * this.state.parentWidth) - (this.figureElement.current.clientWidth / 2)
      );

      const y = Math.floor(
          (Math.random() * this.state.parentHeight) - (this.figureElement.current.clientHeight / 2)
      );

      let moveAnimation = {
        zIndex: 999,
        position: "fixed",
        margin: 0,
        transform: "translate(" + x + "px, " + y + "px)",
        transition: "transform " + this.tickrate / 1000 + "s"
      };
      return moveAnimation;
    }
  },
  updateWindowDimensions() {
    //
    // this.({
    //   parentWidth: this.figureElement.current.parentNode.clientWidth,
    //   parentHeight: this.figureElement.current.parentNode.clientHeight
    // });
  }
}
</script>

<style scoped>

.flying {
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>