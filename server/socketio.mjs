import { Server as SocketIoServer } from "socket.io"

const setupSocketIo = server => {
    const ioConfig = { allowEIO3: true }

    const port = server.address().port

    if (port !== process.env.PORT) {
        ioConfig.cors = {
            credentials: true,
            origin: "http://localhost:8080",
            methods: ["GET", "POST"],
        }
    }

    const io = new SocketIoServer(server, ioConfig)

    const crazyNames = [
        "Bjarne",
        "Halgeir",
        "Rufus",
        "Frans Xavier",
        "Vanessa",
        "Idun",
        "Laura",
    ]

    io.on("connection", client => {
        const name = randomElement(crazyNames)
        client.on("disconnect", () => {
            console.log("User ", client.id, " disconnected")
        })

        client.on("send_score", score => {
            io.sockets.emit("broadcast", { user: name, score })
        })

        console.log("User ", client.id, " connected")
    })
}

const randomElement = array => array[Math.floor(Math.random() * array.length)]

export default setupSocketIo
