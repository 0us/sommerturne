<template>
    <figure
        :id="this.id"
        class="select-none transform-gpu select-none"
        :style="this.translation"
    >
        <img
            :src="src"
            class="flying select-none pointer-events-none"
            alt="FlyingStuff"
        />
    </figure>
</template>

<script>
import shortid from "shortid"

const tickrate = 1000

export default {
    name: "FlyingStuff",
    props: {
        src: String,
    },
    data() {
        return {
            id: shortid.generate(),
            figure: {},
            translation: {},
            screenWidth: 0,
            screenHeight: 0,
            seconds: 0,
        }
    },
    computed: {
        // interval: null
    },
    mounted() {
        this.figure = document.getElementById(this.id)

        window.addEventListener("resize", this.updateWindowDimensions)
        this.updateWindowDimensions()
        this.interval = setInterval(() => this.tick(), tickrate + 100)
    },
    methods: {
        tick() {
            this.seconds = this.seconds + tickrate / 1000
            this.translation = this.getRandomTranslation()
        },
        getRandomTranslation() {
            const x = Math.floor(
                Math.random() *
                    this.screenWidth *
                    2 *
                    this.positiveOrNegative() -
                    this.figure.clientWidth / 2
            )

            const y = Math.floor(
                Math.random() *
                    this.screenHeight *
                    2 *
                    this.positiveOrNegative() -
                    this.figure.clientHeight / 2
            )

            return {
                position: "fixed",
                margin: 0,
                transform: "translate(" + x + "px, " + y + "px)",
                transition: "transform " + tickrate / 1000 + "s linear",
            }
        },
        updateWindowDimensions() {
            document.body
            const body = document.body
            this.screenHeight = body.clientHeight
            this.screenWidth = body.clientWidth
        },
        positiveOrNegative() {
            let positiveOrNegative = 1
            if (Math.random() - 0.5 > 0) {
                positiveOrNegative = 1
            } else {
                positiveOrNegative = -1
            }
            return positiveOrNegative
        },
    },
}
</script>

<style scoped>
.flying {
    animation: spin 1s infinite linear;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
