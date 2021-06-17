<template>
    <div
        ref="container"
        class="
            turboHover
            turbo-button-bg
            bg-gradient-to-r
            from-green-500
            to-yellow-500
            rounded
            transition duration-150 ease-in-out
            disabled:font-bold
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
                focus:outline-none
            "
            @click="action"
            :disabled="disabled"
        >
            {{ title }}
        </button>
    </div>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
    props: {
        title: {
            type: String,
            required: true,
        },
        action: {
            type: Function,
            default() {
                return {}
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    beforeUpdate() {
        if (this.disabled) {
            this.$refs.container.classList.remove("turboHover")
        } else {
            this.$refs.container.classList.add("turboHover")
        }
    },
})
</script>

<style scoped>
.turbo-button-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.1rem;
    filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5));
}

.turbo-button {
    width: 20rem;
    height: 10rem;
    font-size: 5rem;
    transition: box-shadow 0.1s ease-in-out;
}

@media (max-width: 600px) {
    .turbo-button {
        width: 10rem;
        height: 5rem;
        font-size: 2rem;
    }
}

.turboHover:hover {
    transform: translateY(-0.125rem) scale(1.05);
    filter: drop-shadow(0 50px 50px rgba(0, 0, 0, 0.5));
}

.turboDisable:disabled {
    transform: translateY(50px) scale(0.5);
}

.turbo-button:disabled {
    cursor: default;
    -webkit-box-shadow: inset 1px 1px 10px #333;
    -moz-box-shadow: inset 1px 1px 10px #333;
    box-shadow: inset 1px 1px 10px #333;
    transform: scale(0.99);
}
</style>
