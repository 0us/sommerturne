const express = require('express');
const path = require('path');
const serveStatic = require('serve-static')
const port = process.env.PORT || 5000;

express()
    // @ts-ignore
    .use(serveStatic(path.join(__dirname, 'dist')))
    .listen(port, () => console.log(`Listening on ${port}`))