const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const router = require('./routes.js');
const PORT = 9090;
const app = new Koa();

app
  .use(logger())
  .use(cors({
    methods: ['GET', 'PUT', 'POST', 'DELETE']
  }))
  // .use(favicon)
  .use(bodyparser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('server is running at port: ' + PORT);
  });
