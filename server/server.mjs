import setupSocketIo from "./socketio.mjs"
import setupExpress from "./express.mjs"

const express = setupExpress()
setupSocketIo(express)
