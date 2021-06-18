<template>
    <img
        :src="this.src"
        class="spin w-40 select-none pointer-events-none relative"
    />
</template>

<script>
export default {
    name: "Mascot",
    props: {
        src: {
            type: String,
            required: true,
        },
    },
}
</script>

<style scoped></style>
