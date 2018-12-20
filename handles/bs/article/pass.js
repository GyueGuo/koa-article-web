const Router = require('koa-router');
const router = new Router();
const db = require('../../../db.js');
const errorText = require('./../../../commom/errorText.js');

function handleUpdate(data, method) {
  return new Promise(function (resolve, reject) {
    db.query(`UPDATE article SET status=${method === 'POST' ? 2 : 1} WHERE id=${data.id};`, function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

async function handler(ctx) {
  const data = ctx.request.body;
  ctx.response.type = 'json';
  ctx.status = 200;
  
  if (!data.id) {
    return ctx.body = JSON.stringify({
      flag: 0,
      msg: 'id不能为空',
    });
  }
  let result = await handleUpdate(data, ctx.request.method);
  if (result) {
    return ctx.body = JSON.stringify({
      flag: 1,
    });
  } else {
    return ctx.body = JSON.stringify({
      flag: 0,
      msg: errorText.handleErrMsg,
    });
  }
}

router
  .post('/', handler)
  .delete('/', handler);

module.exports = router;
