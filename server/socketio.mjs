import { Server as SocketIoServer } from "socket.io"

const setupSocketIo = server => {
    const io = new SocketIoServer(server, getConfig(server))

    let users = [
        {
            username: "Bjarne",
            score: 0,
        },
        {
            username: "Halgeir",
            score: 0,
        },
        {
            username: "Rufus",
            score: 0,
        },
        {
            username: "Frans Xavier",
            score: 0,
        },
        {
            username: "Vanessa",
            score: 0,
        },
        {
            username: "Idun",
            score: 0,
        },
        {
            username: "Laura",
            score: 0,
        },
    ]

    io.on("connection", client => {
        const { username } = randomElement(users)

        client.on("client_ready", () => {
            client.emit("init", {
                username: username,
                users: users,
            })
        })

        console.log("SocketIo - Player " + username + " connected")

        client.on("disconnect", () => {
            console.log("User ", client.id, " disconnected")
        })

        client.on("bowling_goal", () => {
            users.find(user => user.username === username).score++
            io.sockets.emit("updated_users", users)
        })

        client.on("chill", () => {
            users.find(user => user.username === username).score += 5
            io.sockets.emit("updated_users", users)
        })

        client.on("no_chill", () => {
            users.find(user => user.username === username).score -= 5
            io.sockets.emit("updated_users", users)
        })

        client.on("error", error => {
            console.log(error)
        })

        console.log("User ", client.id, " connected")
    })
}

const getConfig = server => {
    const ioConfig = {
        allowEIO3: true,
    }

    const address = server.address()
    if (address.port !== process.env.PORT) {
        ioConfig.cors = {
            credentials: true,
            origin: [
                address.address,
                "http://localhost:8080",
                "https://summerturne.herokuapp.com",
            ],
            methods: ["GET", "POST"],
        }
    }

    console.log("Starting socketIo with config")
    console.log(ioConfig)

    return ioConfig
}

const randomElement = array => array[Math.floor(Math.random() * array.length)]

export default setupSocketIo
