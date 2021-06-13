<template>
    <div class="bowling-container">
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
        <TurboButton title="Bowl" :action="bowl" />
    </div>
</template>

<script>
import Explosion from '@/components/Explosion.vue'
import { eventHub } from '../main'
import TurboButton from '@/components/TurboButton.vue'

const ANIMATION_DURATION = 500
const IMG_SIZE = 100
export default {
    components: { Explosion, TurboButton },
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
.bowling-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
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