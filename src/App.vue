<template>
    <Background id="app" style="z-index: -10">
        <div class="flex flex-row">
            <router-link to="/">
                <img
                    class="p-2 turbo-link"
                    src="house.png"
                    alt="house"
                    width="50px"
                />
            </router-link>

            <router-link to="onion_activity">
                <img
                    class="p-2 turbo-link"
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

#app {
    font-family: Inter, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.turbo-link {
    -webkit-animation-name: spin;
    -webkit-animation-duration: 1000ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spin;
    -moz-animation-duration: 1000ms;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spin;
    -ms-animation-duration: 1000ms;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear;

    animation-name: spin;
    animation-duration: 1000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@-moz-keyframes spin {
    from {
        -moz-transform: rotate(0deg);
    }
    to {
        -moz-transform: rotate(360deg);
    }
}
@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
    }
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
