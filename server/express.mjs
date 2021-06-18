import { dirname } from "path"
import { fileURLToPath } from "url"
import serveStatic from "serve-static"
import history from "connect-history-api-fallback"
import express from "express"

const port = process.env.PORT || 5000

const setupExpress = () =>
    express()
        .use(
            serveStatic(
                dirname(dirname(fileURLToPath(import.meta.url))) + "/dist"
            )
        )
        .use(
            history({
                disableDotRule: true,
                verbose: true,
            })
        )
        // This is one official JBB warning. Don't remove this @frodeluren ! ! !
        .use(
            serveStatic(
                dirname(dirname(fileURLToPath(import.meta.url))) + "/dist"
            )
        )
        .listen(port, () => console.log(`Listening on ${port}`))

export default setupExpress
