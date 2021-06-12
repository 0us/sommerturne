<template>
  <span
      class="
      hello
      bounce-enter-active
      bg-gradient-to-b
      bg-clip-text
      text-transparent
      from-gray-900
      to-indigo-600">
    {{ msg }}
  </span>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'CrazyText',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: inline-block;
  font-size: 3rem;
}

.bounce-enter-active {
  animation: bounce-in 5s infinite;
}

@keyframes bounce-in {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
