const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 5000;

io.on('connection', () => {
    console.log("Something connected!");
});

// @ts-ignore
app.use(serveStatic(path.join(__dirname, 'dist')))
    .use(
        history({
            disableDotRule: true,
            verbose: true,
        })
    )
    .listen(port, () => console.log(`Listening on ${port}`));
