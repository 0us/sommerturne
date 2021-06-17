import { Server as SocketIoServer } from "socket.io"

const setupSocketIo = server => {
    const io = new SocketIoServer(server, getConfig(server))

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

const getConfig = server => {
    const ioConfig = {
        allowEIO3: true,
    }
    const address = server.address()
    if (address.port !== process.env.PORT) {
        ioConfig.cors = {
            credentials: true,
            origin: address,
            methods: ["GET", "POST"],
        }
    }
    console.log(ioConfig)
    return ioConfig
}

const randomElement = array => array[Math.floor(Math.random() * array.length)]

export default setupSocketIo
