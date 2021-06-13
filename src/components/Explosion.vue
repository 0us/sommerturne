<template>
  <div>
    <img v-if="show" src="explosion.gif" />
  </div>
</template>

<script>
import { eventHub } from "../main";

export default {
  data() {
    return {
      show: false,
    };
  },
  created: function () {
    eventHub.$on("explosion", this.showExplo);
  },
  methods: {
    showExplo() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 1250);
    },
  },
};
</script>
