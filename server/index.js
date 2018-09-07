const http = require('http');
const Koa = require('koa');

// create koa app
const app = new Koa();

// middlewares
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

app.use(logger());
app.use(bodyParser());

// routes
const router = require('./router/index')();

app
  .use(router.routes())
  .use(router.allowedMethods());

// start server
const PORT = 3002;

http.createServer(app.callback()).listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
