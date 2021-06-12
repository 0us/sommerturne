const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

express()
    .use(express.static(path.join(__dirname, 'dist')))
    .listen(port, () => console.log(`Listening on ${ port }`))