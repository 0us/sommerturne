<template>
    <div class="bowling-container">
        <CrazyText
            v-if="showCrazyText"
            :msg="currentCrazyText"
            level="2"
            class="floating-text"
        />
        <div class="bowling-bane">
            <div v-if="showBowling">
                <img
                    ref="bowlingBall"
                    class="bowling-ball"
                    src="onion.png"
                    :style="calcBowlingAnimation()"
                />
                <img
                    v-if="!kjegleIsKill"
                    class="bowling-kjegle"
                    src="bowling_kjegle.png"
                    alt=""
                />
                <Explosion class="bowling-kjegle" />
            </div>
        </div>

        <div class="bottom-container">
            <div class="turbo-counter text-white">
                {{ killCount }}
            </div>

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

<script>
import Explosion from '@/components/Explosion.vue'
import { eventHub } from '../main'
import TurboButton from '@/components/TurboButton.vue'
import CrazyText from '@/components/CrazyText.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const ANIMATION_DURATION = 500
const CRAZY_TEXT_DURATION = 1500
const IMG_SIZE = 100

const KILL_COUNT_MAX = 10

export default {
    sockets: {
        connect: function () {
            console.log('socket connected')
        },
    },
    components: { Explosion, TurboButton, CrazyText, VueSlider },
    data() {
        const screenWidth = document.body.clientWidth

        return {
            showBowling: false,
            showCrazyText: false,
            currentCrazyText: '',
            kjegleIsKill: false,
            kjegleStartPos: 0,
            killCount: 0,
            fxKillStreakSounds: {
                1: new Audio('fx/head_shot.mp3'),
                2: new Audio('fx/double_kill.mp3'),
                3: new Audio('fx/triple_kill.mp3'),
                4: new Audio('fx/multi_kill.mp3'),
                5: new Audio('fx/monster_kill.mp3'),
                10: new Audio('fx/god_like.mp3'),
            },
            crazyTexts: {
                1: 'Head Shot!',
                2: 'Double Kill!',
                3: 'Triple Kill!',
                4: 'Multi Kill!',
                5: 'Monster Kill!',
                10: 'God Like!',
                n: 'Ha en fortsatt fin sommer!',
            },
            bowlingAnimationDuration: 2000,
            sliderHeight: screenWidth <= 600 ? 75 : 150,
        }
    },
    created() {
        window.addEventListener('resize', this.handleScreenResize)
    },
    destroyed() {
        window.removeEventListener('resize', this.handleScreenResize)
    },
    methods: {
        handleScreenResize() {
            // Handle slider height
            const screenWidth = document.body.clientWidth
            this.sliderHeight = screenWidth <= 600 ? 50 : 150
        },
        explode() {
            eventHub.$emit('explosion')
        },
        bowl() {
            this.showBowling = true
            this.kjegleStartPos = document.body.clientWidth - IMG_SIZE
            let locked = false

            const intervalId = setInterval(() => {
                const pos = this.getBallPos() + IMG_SIZE

                if (pos >= this.kjegleStartPos) {
                    if (locked === false) {
                        locked = true
                        this.killKjegle()

                        setTimeout(() => {
                            this.cleanupBowling(intervalId)
                        }, ANIMATION_DURATION)
                    }
                }
            }, 60)
        },
        getBallPos() {
            return this.$refs.bowlingBall.offsetLeft
        },
        killKjegle() {
            this.kjegleIsKill = true
            this.playBowlingPinSound()
            this.explode()
        },
        async playBowlingPinSound() {
            new Audio('fx/bowling_pins.mp3').play()
        },
        cleanupBowling(intervalId) {
            this.showBowling = false
            this.kjegleIsKill = false
            this.killCount++
            this.$socket.emit('send_score', this.killCount.toString())

            // Show crazyText
            this.showCrazyText = true
            this.currentCrazyText = this.crazyTexts[this.killCount]
            if (this.killCount > KILL_COUNT_MAX) {
                this.currentCrazyText = this.crazyTexts['n']
            }
            setTimeout(() => {
                this.showCrazyText = false
                this.currentCrazyText = ''
            }, CRAZY_TEXT_DURATION)

            // If killstreak is achieved, play sound
            const fx = this.fxKillStreakSounds[this.killCount]
            if (fx) fx.play()

            clearInterval(intervalId)
        },
        calcBowlingAnimation() {
            return `animation: move_left_to_right ${this.bowlingAnimationDuration}ms linear forwards, spin 2s;`
        },
    },
}
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

.turbo-counter {
    left: 0;
    position: absolute;
    margin-left: 2rem;
    font-size: 5rem;
}

@media (max-width: 600px) {
    .turbo-counter {
        margin-left: 1rem;
        font-size: 3rem;
    }
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

@media (max-width: 600px) {
    .turbo-slider {
    }
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
</style>