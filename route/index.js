const Router = require('koa-router');
let indexHandler = require('./../handles/bs/index.js');
let userHandler = require('./../handles/bs/user.js');
let router = new Router();
router
  .use('/bs/', indexHandler.routes(), indexHandler.allowedMethods())
  .use('/bs/user', userHandler.routes(), userHandler.allowedMethods())

module.exports = router;
