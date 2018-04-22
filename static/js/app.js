let path = require('path');
let Koa = require('koa');
let bodyparser = require('koa-bodyparser')
let router = require('./route');

const PORT = 9090;

new Koa()
  .use(bodyparser())
  .use(require('koa-static')(path.join( __dirname,  'static'), {
    maxage: 86400000,
    gzip: true
  }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    console.log('server is running at port: ' + PORT)
  });
