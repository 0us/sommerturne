<template>
    <span
        ref="text"
        :class="getBrazyLevel()"
        class="
      transform-gpu
      hello
      bounce-enter-active
      bg-gradient-to-b
      bg-clip-text
      text-transparent
      from-gray-900
      to-indigo-600
"
    >
        {{ msg }}
    </span>
</template>

<script>
export default {
    name: "BrazyText",
}
</script>

<style scoped>
.hello {
    display: inline-block;
    font-size: 5rem;
    animation: drop-in 1s ease-in-out;
}

@keyframes drop-in {
    0% {
        opacity: 0;
        transform: scale(1.4);
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
