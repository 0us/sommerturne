<template>
  <span
      ref="text"
      :class="getCrazyLevel()"
      class="
      hello
      bounce-enter-active
      bg-gradient-to-b
      bg-clip-text
      text-transparent
      from-gray-900
      to-indigo-600
">
    {{ msg }}
  </span>
</template>

<script lang="ts">

import Vue from 'vue';

export default Vue.extend({
  name: 'CrazyText',
  props: {
    msg: String,
    level: String
  },
  data() {
    return {}
  },
  mounted() {
    this.setCrazyLevel()
  },
  methods: {
    getCrazyLevel() {
      return "crazy" + this.level
    },
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: inline-block;
  font-size: 3rem;
}

.crazy0 {
  animation: bounce-in 5s infinite;
}

.crazy1 {
  animation: shake 5s infinite alternate ease-in-out;
}

.crazy2 {
  animation: shake-1 5s infinite linear;
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


@keyframes shake {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1) perspective(200px) skew(5deg, -5deg);
  }
  100% {
    transform: scale(0.9) skew(-5deg, 5deg);
  }
}

@keyframes shake-1 {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2) skew(2.5deg, -2.5deg);
  }
  50% {
    transform: scale(1.1) skew(5deg, -5deg);
  }
  75% {
    transform: scale(0.8) skew(-10deg, -2.5deg);
  }
  100% {
    transform: scale(1) skew(0deg, 0deg);
  }
}
</style>
