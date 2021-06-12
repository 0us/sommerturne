<template>
  <img v-if="show" src="explosion.gif" />
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 1250);
  },
};
</script>