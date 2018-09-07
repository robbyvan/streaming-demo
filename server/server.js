const http = require('http');
const WebSocket = require('ws');
const Koa = require('koa');

// create koa app
const app = new Koa();

app.server = http.createServer(app.callback());


// setup websocket server.
const Connection = require('./ws/connection');

app.wss = new WebSocket.Server({ server: app.server });
app.connections = new Connection(app);


// middlewares
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

app.use(logger());
app.use(bodyParser());


// routes
const router = require('./router/index')(app);

app
  .use(router.routes())
  .use(router.allowedMethods());

// start server
const PORT = 3002;

app.server.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
