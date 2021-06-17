import setupSocketIo from "./socketio.mjs"
import setupExpress from "./express.mjs"

const express = setupExpress()
console.log("Starting express server")
console.log(express)
setupSocketIo(express)
