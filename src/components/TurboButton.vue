<template>
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
            @click="action"
            :disabled="disabled"
        >
            {{ title }}
        </button>
    </div>
</template>

<script>
export default {
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
}
</script>

<style scoped>
.turbo-button-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: auto;
    padding: 0.1rem;
    margin-bottom: 2rem;
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
</style>