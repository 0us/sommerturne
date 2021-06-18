<template>
    <span
        ref="text"
        :class="getBrazyLevel()"
        class="
      transform-gpu
      hello
      bg-gradient-to-b
      bg-clip-text
      text-transparent
      from-gray-900
      to-red-700
      select-none
      "
    >
        {{ msg }}
    </span>
</template>

<script>
import Vue from "vue"

export default Vue.extend({
    name: "BrazyText",
    props: {
        msg: String,
    },
    methods: {
        getBrazyLevel() {},
    },
})
</script>

<style scoped>
.hello {
    display: inline-block;
    font-size: 3rem;
    animation: drop-in 1s cubic-bezier(0.18, 0, 1, 0.09);
}

@keyframes drop-in {
    0% {
        opacity: 0;
        transform: scale(5);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.crazy0 {
    animation: bounce-in 5s infinite;
}

.crazy1 {
    animation: shake 5s infinite alternate ease-in-out;
}

.crazy2 {
    animation: shake 3s infinite alternate ease-in-out;
}

.crazy3 {
    animation: shake 1s infinite alternate ease-in-out;
}

.crazy4 {
    animation: shake-1 1s infinite linear;
}

.crazy5 {
    animation: shake-1 0.5s infinite linear;
}

.crazy6 {
    animation: shake-2 0.3s infinite linear;
}
</style>
