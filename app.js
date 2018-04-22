let path = require('path');
let Koa = require('koa');
let bodyparser = require('koa-bodyparser');
let logger = require('koa-logger');
let views = require('koa-views');
let static = require('koa-static');
let router = require('./route');
let favicon = require('./handlers/favicon');
const PORT = 9090;
const STATIC_PATH = path.join(__dirname, 'static');
const VIEW_PATH = path.join(__dirname, 'views')
let app = new Koa();

app
  .use(logger())
  .use(favicon)
  .use(views(VIEW_PATH, {
    extension: 'ejs'
  }))
  .use((static(STATIC_PATH, {
    maxage: 86400000,
    gzip: true
  })))
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    console.log('server is running at port: ' + PORT)
  });
