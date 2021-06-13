<template>
  <div>
    <Explosion />
    <button @click="explode">Explode</button>
  </div>
</template>

<script>
import Explosion from "@/components/Explosion.vue";
import { eventHub } from "../main";

export default {
  components: { Explosion },
  methods: {
    explode() {
      eventHub.$emit("explosion");
    },
  },
};
</script>

<style>
</style>