<template>
  <div class="flex flex-col items-center ">

    <div class="bottom-container">
      <div>
        <img src="palme.webp" class="w-auto flex-shrink h-64">
      </div>
      <TurboButton title="Chill" :action="randomChillFx"></TurboButton>
      <div>
        <img src="palme.webp" class="w-auto flex-shrink  h-64">
      </div>
    </div>
  </div>
</template>

<script>
import TurboButton from "@/components/TurboButton";

export default {
  name: "ChillActivityView",
  components: {TurboButton},
  data() {
    return {
      currentAudio: null,
      coolAudio: [
        new Audio("fx/chill_fx/beer1.wav"),
        new Audio("fx/chill_fx/beer2.wav"),
        new Audio("fx/chill_fx/seagull.wav")
      ]
    }
  },
  methods: {
    randomChillFx() {
      if (this.currentAudio != null) {
        this.currentAudio.pause()
        this.currentAudio.currentTime = 0
      }

      this.currentAudio = this.coolAudio[
          Math.floor(Math.random() * this.coolAudio.length)
          ]

      if (this.currentAudio != null) {
        this.currentAudio.play()
      }

    }
  }
}
</script>

<style scoped>

.bottom-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: auto;
}

</style>