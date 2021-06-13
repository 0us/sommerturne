const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

const app = express();
const port = process.env.PORT || 5000;

// @ts-ignore
app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(
    history({
        disableDotRule: true,
        verbose: true,
    })
);
app.listen(port, () => console.log(`Listening on ${port}`));
