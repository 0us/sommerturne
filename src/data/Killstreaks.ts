interface Killstreaks {
    readonly KILL_COUNT_MAX: number
    get(killstreak: number): Killstreak
}

interface KillstreaksList {
    readonly [index: number]: Killstreak
}

interface Killstreak {
    audio: HTMLAudioElement | null
    crazyText: string
}

const fallback: Killstreak = {
    audio: null,
    crazyText: "Ha en fortsatt fin sommer!",
}

const killstreaksList: KillstreaksList = {
    1: {
        audio: new Audio("fx/head_shot.mp3"),
        crazyText: "Head Shot!",
    },
    2: {
        audio: new Audio("fx/double_kill.mp3"),
        crazyText: "Double Kill!",
    },
    3: {
        audio: new Audio("fx/triple_kill.mp3"),
        crazyText: "Triple Kill!",
    },
    4: {
        audio: new Audio("fx/multi_kill.mp3"),
        crazyText: "Multi Kill!",
    },
    5: {
        audio: new Audio("fx/monster_kill.mp3"),
        crazyText: "Monster Kill!",
    },
    10: {
        audio: new Audio("fx/god_like.mp3"),
        crazyText: "God Like!",
    },
}

export const killstreaks: Killstreaks = {
    KILL_COUNT_MAX: 10,
    get(killstreak: number) {
        if (killstreak > this.KILL_COUNT_MAX) return fallback
        return killstreaksList[killstreak]
    },
}
