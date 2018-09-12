let Router = require('koa-router');
let path = require('path');
let index = new Router();

index
  .get('/', async (ctx, next) => {
    ctx.body = 'get, index';
  }).post('/', (ctx) => {
    ctx.body = 'post, index'
  });

module.exports = index;
