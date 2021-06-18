<template>
    <div
        ref="container"
        class="boombox secret fade-in transform-gpu transition ease-in-out"
    >
        <youtube
            style="pointer-events: none !important"
            :video-id="videoId"
            :player-vars="playerVars"
            ref="youtube"
            @paused="playVideo"
            @ready="forcePlayVideo"
            width="0"
            height="0"
            id="boombox"
        />
        <img
            ref="img"
            src="/boombox.gif"
            alt="boombox"
            class="
                transform
                mx-auto
                relative
                transition
                ease-in-out
                select-none
                pointer-events-none
            "
        />
    </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
    name: "Boombox",
    data() {
        return {
            videoId: "mEOSy9lysj8",
            playerVars: {
                autoplay: 1,
                controls: 0,
                loop: 1,
            },
        }
    },
    computed: {
        player() {
            return this.$refs.youtube.player
        },
    },
    methods: {
        forcePlayVideo() {
            this.player.setVolume(10)
            setInterval(this?.playVideo, 5000)
        },
        playVideo() {
            if (this.player && !this.player.isPlaying) {
                this.player.playVideo()
            }
        },
    },
})
</script>

<style scoped>
.fade-in {
    animation: fadeIn 6s;
}

.boombox:hover {
    transform: translateY(-0.125rem) scale(1.05);
    filter: drop-shadow(0 50px 50px rgba(0, 0, 0, 0.5));
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
