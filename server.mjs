import {dirname} from 'path'
import {fileURLToPath} from 'url';
import serveStatic from 'serve-static'
import history from 'connect-history-api-fallback'
import express from 'express'
import {Server} from 'socket.io'

const port = process.env.PORT || 5000

const dist = dirname(fileURLToPath(import.meta.url + "\\dist"))
console.log(dist)
console.log("21233124")

const server = express()
    .use(serveStatic(dist))
    .use(
        // @ts-ignore
        history({
            disableDotRule: true,
            verbose: true,
        })
    )
    .listen(port, () => console.log(`Listening on ${port}`))

const ioConfig = {allowEIO3: true}

if (port !== process.env.PORT) {
    ioConfig.cors = {
        credentials: true,
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST'],
    }
}

const io = new Server(server, ioConfig)

io.on('connection', client => {
    client.on('disconnect', () => {
        console.log('User ', client.id, ' disconnected')
    })

    client.on('send_score', score => {
        io.sockets.emit('broadcast', {user: client.id, score})
    })

    console.log('User ', client.id, ' connected')
})
