<template>
    <div>
        <FlyingStuff
            :src="randomSummerItem()"
            v-for="i in new Array(20)"
            :key="i"
        />

        <Content>
            <div class="z-50">
                <Boombox />
                <CrazyText msg="Det Er Sommer I Hele Verden" />
            </div>
        </Content>
    </div>
</template>

<script>
import CrazyText from '@/components/CrazyText.vue'
import Content from '@/components/Content.vue'
import Boombox from '@/components/Boombox.vue'
import FlyingStuff from '@/components/FlyingStuff.vue'

export default {
    components: {
        FlyingStuff,
        Boombox,
        Content,
        CrazyText,
    },
    data() {
        return {
            summerThings: ['/onion.png', '/flamingo.png', '/hammer.png'],
        }
    },
    methods: {
        randomSummerItem() {
            return this.summerThings[
                Math.floor(Math.random() * this.summerThings.length)
            ]
        },
    },
}
</script>

<style>
</style>