let path = require('path');
let Koa = require('koa');
let bodyparser = require('koa-bodyparser');
let logger = require('koa-logger');
let cors = require('koa2-cors');
let router = require('./routes.js');
const PORT = 9090;
let app = new Koa();

app
  .use(logger())
  .use(cors({
    methods:['GET', 'PUT', 'POST', 'DELETE']
  }))
  // .use(favicon)
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    console.log('server is running at port: ' + PORT)
  });
