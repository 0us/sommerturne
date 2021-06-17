import setupSocketIo from "./socketio.mjs"
import setupExpress from "./express.mjs"

console.log("Starting express server")
const express = setupExpress()
setupSocketIo(express)
