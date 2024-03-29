<template>
    <div class="bowling-container">
        <CrazyText
            v-if="showCrazyText"
            :msg="currentCrazyText"
            :level="getCrazyLevel()"
            class="floating-text"
        />
        <div class="bowling-bane">
            <div v-if="showBowling">
                <img
                    ref="bowlingBall"
                    class="bowling-ball select-none pointer-events-none"
                    src="onion.png"
                    :style="calcBowlingAnimation()"
                />
                <img
                    v-if="!kjegleIsKill"
                    class="
                        bowling-kjegle
                        select-none
                        pointer-events-none
                        boince-in
                    "
                    src="bowling_kjegle.png"
                    alt=""
                />
                <Explosion class="bowling-kjegle" />
            </div>
        </div>

        <div class="bottom-container">
            <TurboButton title="Bowl" :action="bowl" :disabled="showBowling" />

            <div class="turbo-slider-container text-white">
                <VueSlider
                    :min="200"
                    :max="4000"
                    :interval="100"
                    :height="sliderHeight"
                    contained
                    direction="btt"
                    v-model="bowlingAnimationDuration"
                />
                <span>Speed</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Explosion from "@/components/Explosion.vue"
import { eventHub } from "../main"
import TurboButton from "@/components/TurboButton.vue"
import CrazyText from "@/components/CrazyText.vue"
import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/antd.css"
import Vue from "vue"
import { killstreaks } from "@/data/Killstreaks"
// eslint-disable-next-line no-undef
import Timeout = NodeJS.Timeout

const ANIMATION_DURATION = 500
const CRAZY_TEXT_DURATION = 1500
const IMG_SIZE = 100

export default Vue.extend({
    components: { Explosion, TurboButton, CrazyText, VueSlider },
    data() {
        const screenWidth = document.body.clientWidth

        return {
            showBowling: false,
            showCrazyText: false,
            currentCrazyText: "",
            kjegleIsKill: false,
            kjegleStartPos: 0,
            killCount: 0,
            crazyLevel: 0,
            crazyTimeout: null as Timeout | null,
            killstreaks,
            bowlingAnimationDuration: 2000,
            sliderHeight: screenWidth <= 600 ? 75 : 150,
            username: "",
        }
    },
    created() {
        window.addEventListener("resize", this.handleScreenResize)
    },
    destroyed() {
        window.removeEventListener("resize", this.handleScreenResize)
    },
    methods: {
        handleScreenResize() {
            // Handle slider height
            const screenWidth = document.body.clientWidth
            this.sliderHeight = screenWidth <= 600 ? 50 : 150
        },
        explode() {
            eventHub.$emit("explosion")
        },
        bowl() {
            this.showBowling = true
            this.kjegleStartPos = document.body.clientWidth - IMG_SIZE
            let locked = false

            const intervalId = setInterval(() => {
                const pos = this.getBallPos() + IMG_SIZE

                if (pos >= this.kjegleStartPos) {
                    if (!locked) {
                        locked = true
                        this.killKjegle()
                        this.$socket.emit("bowling_goal", {
                            username: this.username,
                        })

                        setTimeout(() => {
                            this.cleanupBowling(intervalId)
                        }, ANIMATION_DURATION)
                    }
                }
            }, 60)
        },
        getBallPos() {
            let pos = 0
            try {
                // @ts-ignore
                pos = this.$refs.bowlingBall.offsetLeft
            } catch (e) {
                //
            }
            return pos
        },
        killKjegle() {
            this.killCount++
            this.kjegleIsKill = true
            this.playBowlingPinSound()
            this.explode()
        },
        async playBowlingPinSound() {
            await new Audio("fx/bowling_pins.mp3").play()
        },
        cleanupBowling(intervalId: any | null) {
            const killstreak = this.killstreaks.get(this.killCount)

            this.showBowling = false
            this.kjegleIsKill = false

            // Show crazyText
            this.showCrazyText = true
            this.currentCrazyText = killstreak?.crazyText

            this.clearCrazyText()

            // If killstreak is achieved, play sound
            killstreak?.audio?.play()

            if (intervalId) {
                clearInterval(intervalId)
            }
        },
        clearCrazyText() {
            if (this.crazyTimeout) {
                clearTimeout(this.crazyTimeout)
            }
            this.crazyTimeout = setTimeout(() => {
                this.showCrazyText = false
                this.currentCrazyText = ""
                this.crazyTimeout = null
            }, CRAZY_TEXT_DURATION)
        },
        calcBowlingAnimation() {
            return `animation: move_left_to_right ${this.bowlingAnimationDuration}ms linear forwards, spin 2s;`
        },
        getCrazyLevel() {
            const kills = this.killCount
            if (kills == 1) this.crazyLevel = 2
            else if (kills == 2) {
                this.crazyLevel = 3
            } else if (kills == 3) {
                this.crazyLevel = 4
            } else if (kills == 5) {
                this.crazyLevel = 5
            } else if (kills == 10) {
                this.crazyLevel = 6
            } else if (kills >= this.killstreaks.KILL_COUNT_MAX) {
                this.crazyLevel = 1
            }
            return this.crazyLevel
        },
    },
})
</script>

<style scoped>
.bowling-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
}

.floating-text {
    position: absolute;
}

.bottom-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2rem;
    margin-top: auto;
}

.turbo-slider-container {
    right: 0;
    position: absolute;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
}

.bowling-bane {
    display: flex;
    margin-top: 5rem;
    width: 100%;
    height: 100%;
}

.bowling-ball {
    position: fixed;
    width: 100px;
}

.bowling-kjegle {
    position: fixed;
    width: 100px;
    right: 0;
}

.boince-in {
    animation: bounceIn 300ms linear forwards;
}

.username-text {
    align-self: center;
    user-select: none;
    font-size: 2rem;
}

@keyframes bounceIn {
    0% {
        opacity: 0;
        transform: scale(0.3) translate3d(0, 0, 0);
    }
    50% {
        opacity: 0.9;
        transform: scale(1.1);
    }
    80% {
        opacity: 1;
        transform: scale(0.89);
    }
    100% {
        opacity: 1;
        transform: scale(1) translate3d(0, 0, 0);
    }
}
</style>
