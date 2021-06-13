<template>
    <div class="view-container">
        <button
            class="
                turbo-button
                bg-gradient-to-r
                from-green-400
                to-blue-500
                text-white
                p-5
                rounded
            "
            @click="bowl"
            :disabled="showBowling"
        >
            Bowl
        </button>

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
    </div>
</template>

<script>
import Explosion from '@/components/Explosion.vue'
import { eventHub } from '../main'

const ANIMATION_DURATION = 3000
const IMG_SIZE = 100
const kjegleStartPos = document.body.clientWidth - IMG_SIZE

export default {
    components: { Explosion },
    data() {
        return {
            showBowling: false,
            kjegleIsKill: false,
        }
    },
    methods: {
        explode() {
            eventHub.$emit('explosion')
        },
        bowl() {
            this.showBowling = true

            const intervalId = setInterval(() => {
                const pos = this.getBallPos() + IMG_SIZE
                if (pos >= kjegleStartPos) this.killKjegle()
            }, 60)

            // Cleanup when done
            setTimeout(() => {
                this.cleanupBowling(intervalId)
            }, ANIMATION_DURATION)
        },
        getBallPos() {
            const ball = this.$refs.bowlingBall
            return ball.offsetLeft
            // output.innerHTML = 'offsetTop: ' + target.offsetTop
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
}

.turbo-button {
    max-width: 6rem;
}

.turbo-button:disabled {
    cursor: default;
    color: grey !important;
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