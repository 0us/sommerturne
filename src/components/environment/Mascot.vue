<template>
    <img
        :src="this.src"
        class="spin w-40 select-none pointer-events-none relative"
    />
</template>

<script>
export default {
    name: "Mascot",
    params: {
        src: String,
    },
}
</script>

<style scoped></style>
