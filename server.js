const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const app = require('express')();

const port = process.env.PORT || 5000;

// @ts-ignore
const server = app.use(serveStatic(path.join(__dirname, 'dist')))
  .use(
      history({
          disableDotRule: true,
          verbose: true,
      })
  )
  .listen(port, () => console.log(`Listening on ${port}`));

const ioConfig = { allowEIO3: true };

if (port !== process.env.PORT) {
  ioConfig.cors = { credentials: true, origin: "http://localhost:8080", methods: ["GET", "POST"] };
};

const io = require('socket.io')(server, ioConfig);

io.on('connection', (client) => {
  client.on('disconnect', () => {
    console.log("User ", client.id, " disconnected");
  });

  client.on('send_score', (score) => {
    console.log("message");
    console.log(score);
    io.sockets.emit('broadcast', { user: client.id, score })
  })

  console.log("User ", client.id, " connected");
});