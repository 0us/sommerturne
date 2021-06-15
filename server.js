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


const io = require('socket.io')(server, {
  allowEIO3: true // false by default
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log("A user disconnected");
  });

  socket.on('send_score', (socket) => {
    console.log("message");
    console.log(socket);
  })

  console.log("A user connected");
});