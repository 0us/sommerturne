<template>
    <div class="onion-field">
        <div v-for="position in positionList" :key="position.id">
            <img :id="position.id" class="w-10 fixed relative" src="onion.png" :style="getPostion(position.id)">
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue"

interface BroadcastMessage {
    id: string
    user: string
    position: { 
        lat: number
        lon: number
     }
}

export default Vue.extend({
    sockets: {
        connect: function() {
            console.log("socket connected")
            this.$socket.emit(
                            "update_position",
                            {lat: 50, lon: 50}
                        )
        },
        broadcast_position: function(userPosition: BroadcastMessage) {
            // @ts-ignore
            this.updateUserPosition(userPosition)
        },
        get_id: function(id: string) {
            // @ts-ignore
            this.setMyId(id)
        }
    },
    data() {
            return {
                positionList: new Array<BroadcastMessage>(),
                myId: "",
            }
        },
    methods: {
        updateUserPosition(userPosition: BroadcastMessage) {
            const positionIndex = this.positionList.findIndex(
                position => position.user === userPosition.user
            )
            if (positionIndex !== -1) {
                this.positionList[positionIndex] = userPosition
            } else {
                this.positionList.push(userPosition)
            }
            console.log(this.positionList);
            this.positionList
            this.$forceUpdate();
        },
        getPostion(userId: string) {
            const user = this.positionList.find(p => p.id === userId)
            if (user) {
                return { "bottom": `${user.position.lat}%`, "left": `${user.position.lon}%` }
            }
        },
        getUserInfo(userId: string) {
            const user = this.positionList.find(p => p.id === userId)
            if (user) {
                return user
            }
        },
        move() {
            const currentUser = this.getUserInfo(this.myId)
            // @ts-ignore
            switch (event.keyCode) {
                case 37:
                    // LEFT
                    // @ts-ignore
                    currentUser.position.lon--
                    break;
                case 38:
                    // Up
                    // @ts-ignore
                    currentUser.position.lat--
                    break;
                case 39:
                    // RIGHT
                    // @ts-ignore
                    currentUser.position.lon++
                    break;
                case 40:
                    // DOWN
                    // @ts-ignore
                    currentUser.position.lat++
                    break;
                
                default:
                    break;
            }
            this.$socket.emit(
                "update_position",
                // @ts-ignore
                {lat: currentUser.position.lat, lon: currentUser.position.lon}
            )
        },
        setMyId(id: string) {
            this.myId = id
        }
    },
    mounted() {
        document.addEventListener("keydown", this.move)
    }
});
</script>