import { dirname } from "path"
import { fileURLToPath } from "url"
import serveStatic from "serve-static"
import history from "connect-history-api-fallback"
import express from "express"

const port = process.env.PORT || 5000
const dist = dirname(fileURLToPath(import.meta.url)) + "\\dist"

const setupExpress = () =>
    express()
        .use(serveStatic(dist))
        .use(
            // @ts-ignore
            history({
                disableDotRule: true,
                verbose: true,
            })
        )
        .listen(port, () => console.log(`Listening on ${port}`))

export default setupExpress
