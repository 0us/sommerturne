<template>
  <div class="mango-ipa dekk-heile-greia">
    <slot>

    </slot>
  </div>
</template>

<script>
export default {
  name: "Background"
}
</script>

<style scoped>

.mango-ipa {
  background: rgb(34,193,195);
  background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(172,189,101,1) 67%, rgba(255,139,0,1) 100%);
}

.dekk-heile-greia {
  height: 100vh;
}

</style>