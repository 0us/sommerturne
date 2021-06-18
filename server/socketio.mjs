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

        console.log("SocketIo - Player " + name + " connected")

        client.on("disconnect", () => {
            console.log("User ", client.id, " disconnected")
        })

        client.on("send_score", score => {
            io.sockets.emit("broadcast_bowl", { user: name, score })
        })

        client.on("update_position", position => {
            io.sockets.emit("broadcast_position", { id: client.id, user: name, position })
        })

        console.log("User ", client.id, " connected")
        client.emit("get_id", client.id)
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
