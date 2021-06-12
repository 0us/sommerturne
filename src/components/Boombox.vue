<template>
  <div class="secret fade-in container mx-auto" style="pointer-events: none !important;">
    <youtube :video-id="videoId"
             :player-vars="playerVars"
             ref="youtube"
             @paused="playVideo"
             @ready="forcePlayVideo"
             width="0"
             height="0"
    />
    <img src="/boombox.gif" alt="boombox" class="mx-auto relative"/>

    <!--    <iframe src="https://www.youtube.com/embed/mEOSy9lysj8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>-->
  </div>
</template>

<script>
export default {
  name: "Boombox",
  data() {
    return {
      videoId: "mEOSy9lysj8",
      playerVars: {
        autoplay: 1,
        controls: 0,
        loop: 1,

      }
    }
  },
  computed: {
    player() {
      return this.$refs.youtube.player
    },
  },
  methods: {
    forcePlayVideo() {
      setInterval(() => {
        this.playVideo()
      }, 1000)
    },
    playVideo() {
      if (!this.player.isPlaying) {
        this.player.playVideo()
      }
    },
  }
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 6s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>