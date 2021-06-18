<template>
    <Background id="app" style="z-index: -10">
        <div class="turbo-nav flex flex-row">
            <NavButton src="house.png" path="/" />
            <NavButton src="bowling.png" path="onion_activity" />
            <NavButton src="chill.png" path="chill_activity" />
            <NavButton src="chill.png" path="onion_mmo" />
        </div>
        <Content>
            <div class="flex w-full justify-around">
                <ScoreList class="w-1/5" :users="users" />
                <Boombox class="w-1/5" />
                <CrazyText
                    :msg="'Username: ' + username"
                    :level="0"
                    class="username-text w-1/5"
                />
            </div>
            <router-view></router-view>
        </Content>
    </Background>
</template>

<script lang="ts">
import Vue from "vue"
import Background from "@/components/global/Background.vue"
import Content from "@/components/global/Content.vue"
import Boombox from "@/components/global/Boombox.vue"
import NavButton from "@/components/global/NavButton.vue"
import VueSocketIO from "vue-socket.io"
import ScoreList from "./components/global/ScoreList.vue"
import CrazyText from "./components/CrazyText.vue"

const SOCKET_URL =
    window.location.hostname === "localhost"
        ? window.location.protocol + "//" + window.location.hostname + ":5000"
        : window.location.protocol + "//" + window.location.hostname

Vue.use(
    new VueSocketIO({
        debug: false,
        connection: `${SOCKET_URL}`,
    })
)

export default Vue.extend({
    name: "App",
    components: {
        NavButton,
        Background,
        Boombox,
        Content,
        ScoreList,
        CrazyText,
    },
    data() {
        return {
            username: "",
            users: [],
        }
    },
    mounted() {
        this.$socket.emit("connection")
        this.$socket.emit("client_ready")
        this.sockets.subscribe("init", payload => {
            this.username = payload.username
            this.users = payload.users
        })

        this.sockets.subscribe("updated_users", users => {
            this.users = users
        })
    },
})
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@800&display=swap");
@import "./styles/main.css";

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
