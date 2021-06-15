<template>
    <Background id="app" style="z-index: -10">
        <div class="turbo-nav flex flex-row">
          <NavButton src="house.png" path="/"/>
          <NavButton src="bowling.png" path="onion_activity"/>
          <NavButton src="chill.png" path="chill_activity"/>
        </div>
        <Content>
            <Boombox />
            <router-view></router-view>
        </Content>
    </Background>
</template>

<script lang="ts">
import Vue from 'vue'
import Background from '@/components/Background.vue'
import Content from '@/components/Content.vue'
import Boombox from '@/components/Boombox.vue'
import NavButton from "@/components/NavButton.vue";
import VueSocketIO from 'vue-socket.io';

Vue.use(new VueSocketIO({
    debug: true,
    connection: "http://localhost:5000"
}));

export default Vue.extend({
    name: 'App',
    components: {
      NavButton,
        Background,
        Boombox,
        Content,
    },
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap');
@import './styles/main.css';

#app {
    font-family: Inter, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    height: 100vh;
    display: flex;
    flex-direction: column;
}

.turbo-nav {
    height: 10vh;
}
</style>
