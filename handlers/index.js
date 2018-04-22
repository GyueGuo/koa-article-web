let Router = require('koa-router');
let path = require('path');
let index = new Router();
let PATH = path.join('..', 'views', 'index');

index
  .get('/', async (ctx) => {
    await ctx.render(PATH, {
      title: 'hello index'
    });
  }).post('/', (ctx) => {
    ctx.body = 'post, index'
  });


module.exports = index;
