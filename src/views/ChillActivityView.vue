<template>
    <div class="flex flex-col items-center ">
        <img
            src="sun.png"
            v-if="showSun"
            class="spin absolute top-12 right-12 w-40 select-none pointer-events-none"
        />

        <div class="bottom-container">
            <div
                class="transition ease-in-out duration-1000 transform hover:scale-105"
            >
                <img
                    src="palme.webp"
                    class="w-auto flex-shrink h-64 select-none pointer-events-none"
                />
            </div>

            <TurboButton
                title="Chill"
                :action="randomChillFx"
                :disabled="showSun"
            ></TurboButton>

            <div class="transition ease-in-out transform hover:scale-105">
                <img
                    src="palme.webp"
                    class="w-auto flex-shrink  h-64 select-none pointer-events-none"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import TurboButton from "@/components/TurboButton.vue"

export default Vue.extend({
    name: "ChillActivityView",
    components: { TurboButton },
    data() {
        return {
            buttonClicked: false,
            showSun: false,
            currentAudio: null as null | HTMLAudioElement,
            coolAudio: [
                new Audio("fx/chill_fx/beer1.wav"),
                new Audio("fx/chill_fx/beer2.wav"),
                new Audio("fx/chill_fx/seagull.wav"),
                new Audio("fx/chill_fx/slurp.wav"),
                new Audio("fx/chill_fx/ducks.m4a"),
                new Audio("fx/chill_fx/splash.wav"),
            ],
        }
    },
    mounted() {
        this.coolAudio.forEach(audio => {
            audio.addEventListener("ended", this.disableSun)
        })
    },
    beforeDestroy() {
        this.coolAudio.forEach(audio => {
            audio.removeEventListener("ended", this.disableSun)
        })
    },
    methods: {
        randomChillFx() {
            if (this.currentAudio != null) {
                this.currentAudio.pause()
                this.currentAudio.currentTime = 0
                this.showSun = false
            }

            this.currentAudio = this.coolAudio[
                Math.floor(Math.random() * this.coolAudio.length)
            ]

            if (this.currentAudio != null) {
                this.showSun = true
                this.currentAudio.play()
            }
        },
        disableSun() {
            this.showSun = false
        },
    },
})
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
