<template>
    <div>
        <FlyingStuff
            :src="randomSummerItem()"
            v-for="i in new Array(20)"
            :key="i"
        />
        <CrazyText msg="Det Er Sommer I Hele Verden" />
    </div>
</template>

<script>
import FlyingStuff from '@/components/FlyingStuff.vue'
import CrazyText from '@/components/CrazyText.vue'

export default {
    components: {
        FlyingStuff,
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