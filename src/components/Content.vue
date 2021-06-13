<template>
    <div class="turbo-container w-full h-full text-center z-50">
        <slot> </slot>
    </div>
</template>

<script>
export default {
    name: 'Content',
}
</script>

<style scoped>
.turbo-container {
    display: flex;
    flex-direction: column;
    height: 90vh;
}
</style>
