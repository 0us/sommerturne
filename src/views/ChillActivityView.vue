<template>
    <div class="bowling-container">
        <div class="bottom-container flex flex-initial">
            <Mascot :src="currentMascot" v-if="showMascot" />
            <BrazyText
                v-if="showMascot && !chill"
                msg="-5"
                style="font-size: 8rem"
                class="flex flex-initial"
            ></BrazyText>
            <CrazyText
                v-if="showMascot && chill"
                msg="+5"
                :level="3"
                style="font-size: 8rem"
                class="flex flex-initial"
            ></CrazyText>
        </div>

        <div class="bottom-container">
            <Palme />
            <TurboButton
                title="Chill?"
                :action="onGamble"
                :disabled="showMascot"
            ></TurboButton>
            <Palme />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import TurboButton from "@/components/TurboButton.vue"
import BrazyText from "@/components/BrazyText.vue"
import CrazyText from "@/components/CrazyText.vue"
import Palme from "@/components/environment/Palme.vue"
import Mascot from "@/components/environment/Mascot.vue"

export default Vue.extend({
    name: "ChillActivityView",
    components: { Mascot, Palme, CrazyText, BrazyText, TurboButton },
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
        this.coolAudio.forEach((audio) => {
            audio.addEventListener("ended", this.disableMascot)
        })
        this.unCoolAudio.forEach((audio) => {
            audio.addEventListener("ended", this.disableMascot)
        })
    },
    beforeDestroy() {
        this.coolAudio.forEach((audio) => {
            audio.removeEventListener("ended", this.disableMascot)
        })
        this.unCoolAudio.forEach((audio) => {
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
        },
        chillOrNoChill() {
            const chill = Math.random() < 0.5

            this.currentMascot = chill ? "sun.png" : "crow.png"
            this.currentAudio = this.randomElement(
                chill ? this.coolAudio : this.unCoolAudio
            )

            this.$socket.emit(chill ? "chill" : "no_chill")

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
