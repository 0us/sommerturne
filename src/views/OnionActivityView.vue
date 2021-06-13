<template>
    <div class="view-container">
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
        <div
            class="
                turbo-button-bg
                bg-gradient-to-r
                from-green-500
                to-yellow-500
                rounded
            "
        >
            <button
                class="
                    turbo-button
                    bg-gradient-to-r
                    from-yellow-500
                    to-green-500
                    text-white
                    rounded
                "
                @click="bowl"
                :disabled="showBowling"
            >
                Bowl
            </button>
        </div>
    </div>
</template>

<script>
import Explosion from '@/components/Explosion.vue'
import { eventHub } from '../main'

const ANIMATION_DURATION = 500
const IMG_SIZE = 100
export default {
    components: { Explosion },
    data() {
        return {
            showBowling: false,
            kjegleIsKill: false,
            kjegleStartPos: 0,
        }
    },
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
            clearInterval(intervalId)
        },
    },
}
</script>

<style scoped>
.view-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
}

.turbo-button-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    padding: 0.1rem;
    filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5));
}

.turbo-button {
    width: 20rem;
    height: 10rem;
    font-size: 5rem;
}

.turbo-button:disabled {
    cursor: default;
    -webkit-box-shadow: inset 1px 1px 10px #333;
    -moz-box-shadow: inset 1px 1px 10px #333;
    box-shadow: inset 1px 1px 10px #333;
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