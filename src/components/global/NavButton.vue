<template>
    <router-link v-bind:to="path">
        <img
            class="
            p-2 spin select-none pointer-events-none "
            :src="src"
            :alt="src"
            width="50px"
        />
    </router-link>
</template>

<script>
export default {
    name: "NavButton",
    props: {
        path: String,
        src: String,
    },
}
</script>

<style scoped></style>
