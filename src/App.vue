<template>
    <Background id="app" style="z-index: -10">
        <div class="flex flex-row">
            <router-link to="/">
                <img
                    class="p-2 spin"
                    src="house.png"
                    alt="house"
                    width="50px"
                />
            </router-link>

            <router-link to="onion_activity">
                <img
                    class="p-2 spin"
                    src="bowling.png"
                    alt="bowling"
                    width="50px"
                />
            </router-link>
        </div>

        <router-view></router-view>
    </Background>
</template>

<script lang="ts">
import Vue from 'vue'
import Background from '@/components/Background.vue'

export default Vue.extend({
    name: 'App',
    components: {
        Background,
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
}
</style>
