let Router = require('koa-router');
let indexHandler = require('./../handlers/index');
let userHandler = require('./../handlers/user');

let router = new Router();

router
  .use('/', indexHandler.routes(), indexHandler.allowedMethods())
  .use('/user', userHandler.routes(), userHandler.allowedMethods())
  
module.exports = router;
