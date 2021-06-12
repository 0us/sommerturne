<template>
  <Background id="app" style="z-index: -10">

    <FlyingStuff :src="randomSummerItem()" v-for="i in new Array(20)" :key="i"/>

    <Content>

      <div class="z-50">
        <Boombox/>
        <CrazyText msg="Det Er Sommer I Hele Verden"/>
      </div>
    </Content>
  </Background>
</template>

<script lang="ts">
import Vue from 'vue';
import CrazyText from "@/components/CrazyText.vue";
import Background from "@/components/Background.vue";
import Content from "@/components/Content.vue";
import Boombox from "@/components/Boombox.vue";
import FlyingStuff from "@/components/FlyingStuff.vue";

export default Vue.extend({
  name: 'App',
  components: {
    FlyingStuff,
    Boombox,
    Content,
    Background,
    CrazyText,
  },
  data() {
    return {
      summerThings: [
        "/onion.png",
        "/flamingo.png",
        "/hammer.png",
      ]
    }
  },
  methods: {
    randomSummerItem() {
      return this.summerThings[Math.floor(Math.random() * this.summerThings.length)]
    }
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap');

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
