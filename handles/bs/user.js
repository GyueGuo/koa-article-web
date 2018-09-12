let Router = require('koa-router');
let path = require('path');
let user = new Router();
user
  .get('/', async (ctx) => {
    await ctx.render(PATH, {
      title: 'hello user'
    });
  }).post('/', (ctx) => {
    ctx.body = 'post, user'
  });

module.exports = user;
