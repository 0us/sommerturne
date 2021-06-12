<template>
  <Background id="app">
    <Content>
      <Boombox>

      </Boombox>
      <CrazyText msg="Det Er Sommer I Hele Verden"/>
      <FlyingStuff src="/onion.png"/>
      <Boom/>
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
import Boom from "@/components/Boom.vue";

export default Vue.extend({
  name: 'App',
  components: {
    Boom,
    FlyingStuff,
    Boombox,
    Content,
    Background,
    CrazyText,
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
