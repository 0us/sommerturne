<template>
    <div class="bowling-container">
        <CrazyText :msg="currentCrazyText" level="2" />
        <div v-if="showBowling" class="bowling-bane">
            <img
                ref="bowlingBall"
                class="bowling-ball"
                src="onion.png"
                alt=""
            />
            <img
                v-if="!kjegleIsKill"
                class="bowling-kjegle"
                src="bowling_kjegle.png"
                alt=""
            />
            <Explosion class="bowling-kjegle" />
        </div>
        <div class="bottom-container">
            <div class="turbo-counter text-white">
                {{ killCount }}
            </div>
            <TurboButton title="Bowl" :action="bowl" :disabled="showBowling" />
        </div>
    </div>
</template>

<script>
import Explosion from '@/components/Explosion.vue'
import { eventHub } from '../main'
import TurboButton from '@/components/TurboButton.vue'
import CrazyText from '@/components/CrazyText.vue'

const ANIMATION_DURATION = 500
const IMG_SIZE = 100
export default {
    components: { Explosion, TurboButton, CrazyText },
    data() {
        return {
            showBowling: false,
            showCrazyText: false,
            currentCrazyText: '',
            kjegleIsKill: false,
            kjegleStartPos: 0,
            killCount: 0,
            fxSounds: {
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
            },
        }
    },
    mounted() {},
    methods: {
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
            const ball = this.$refs.bowlingBall
            return ball.offsetLeft
        },
        killKjegle() {
            this.kjegleIsKill = true
            this.explode()
        },
        cleanupBowling(intervalId) {
            this.showBowling = false
            this.kjegleIsKill = false
            this.killCount++

            // Show crazyText
            this.showCrazyText = true
            this.currentCrazyText = this.crazyTexts[this.killCount]
            setTimeout(() => {
                this.showCrazyText = false
            }, 500)

            // If killstreak is achieved, play sound
            const fx = this.fxSounds[this.killCount]
            fx.play()

            clearInterval(intervalId)
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

.bowling-bane {
    display: flex;
    margin-top: 5rem;
    width: 100%;
}

.bowling-ball {
    position: fixed;
    width: 100px;

    animation: move_left_to_right 2000ms linear forwards, spin 2s;
}

.bowling-kjegle {
    position: fixed;
    width: 100px;
    right: 0;
}
</style>