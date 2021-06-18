<template>
    <div class="bowling-container">
        <img
            :src="currentMascot"
            :v-if="showMascot"
            class="spin absolute top-12 right-12 w-40 select-none pointer-events-none"
        />

        <div class="bottom-container">
            <BrazyText
                v-if="showMascot && !chill"
                :msg="-5"
                style="font-size: 8rem"
            ></BrazyText>
            <CrazyText
                v-if="showMascot && chill"
                msg="+5"
                level="3"
                style="font-size: 8rem"
            ></CrazyText>
        </div>

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
                title="Chill?"
                :action="onGamble"
                :disabled="showMascot"
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
import BrazyText from "@/components/BrazyText.vue"
import CrazyText from "@/components/CrazyText.vue"

export default Vue.extend({
    name: "ChillActivityView",
    components: { CrazyText, BrazyText, TurboButton },
    data() {
        return {
            chill: false,
            showMascot: false,
            currentMascot: "sun.png" as "sun.png" | "crow.png",
            currentAudio: null as null | HTMLAudioElement,
            coolAudio: [
                new Audio("fx/chill_fx/beer1.wav"),
                new Audio("fx/chill_fx/beer2.wav"),
                new Audio("fx/chill_fx/slurp.wav"),
                new Audio("fx/chill_fx/splash.wav"),
            ],
            unCoolAudio: [
                new Audio("fx/bad_fx/bad1.wav"),
                new Audio("fx/bad_fx/bad2.wav"),
                new Audio("fx/bad_fx/bad3.wav"),
                new Audio("fx/bad_fx/bad4.wav"),
                new Audio("fx/bad_fx/bad5.wav"),
                new Audio("fx/bad_fx/bad6.wav"),
            ],
        }
    },
    mounted() {
        this.coolAudio.forEach(audio => {
            audio.addEventListener("ended", this.disableMascot)
        })
        this.unCoolAudio.forEach(audio => {
            audio.addEventListener("ended", this.disableMascot)
        })
    },
    beforeDestroy() {
        this.coolAudio.forEach(audio => {
            audio.removeEventListener("ended", this.disableMascot)
        })
        this.unCoolAudio.forEach(audio => {
            audio.removeEventListener("ended", this.disableMascot)
        })
    },
    methods: {
        onGamble() {
            this.chillOrNoChill()
            if (this.currentAudio != null) {
                this.currentAudio.pause()
                this.currentAudio.currentTime = 0
                this.showMascot = false
            }

            if (this.currentAudio != null) {
                this.showMascot = true
                this.currentAudio.play()
            }

            this.$socket.emit()
        },
        chillOrNoChill() {
            const chill = Math.random() < 0.5

            this.currentMascot = chill ? "sun.png" : "crow.png"
            this.currentAudio = this.randomElement(
                chill ? this.coolAudio : this.unCoolAudio
            )
            this.$socket.emit(chill ? "chill" : "no-chill")

            this.chill = chill
        },

        disableMascot() {
            this.showMascot = false
        },
        randomElement(array: Array<HTMLAudioElement>): HTMLAudioElement {
            return array[Math.floor(Math.random() * array.length)]
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

.bowling-bane {
    display: flex;
    margin-top: 5rem;
    width: 100%;

    height: 100%;
}

.bowling-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}
</style>
