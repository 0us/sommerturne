<template>
    <div class="score-container text-white">
        <ul
            class="
                p-5
                w-52
                overflow-ellipsis
                bg-gradient-to-r
                from-purple-500
                to-green-700
                text-left
                shadow-2xl
                rounded
            "
        >
            <li v-for="user in users" :key="user.username">
                {{ user.username + ": " + user.score }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        users: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style>
.score-container {
    margin-left: 2rem;
    display: flex;
    animation: bounce-in 5s infinite;
    filter: drop-shadow(0 50px 50px rgba(0, 0, 0, 0.5));
}
</style>