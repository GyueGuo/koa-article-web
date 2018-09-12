let path = require('path');
let Koa = require('koa');
let bodyparser = require('koa-bodyparser');
let logger = require('koa-logger');
let router = require('./route/');
const PORT = 9090;
let app = new Koa();

app
  .use(logger())
  // .use(favicon)
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    console.log('server is running at port: ' + PORT)
  });
