const Router = require('koa-router');
const router = new Router();
const db = require('../../../db.js');
const errorText = require('./../../../commom/errorText.js');

function handleEdit(id, status) {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE user SET status=${status} WHERE userid='${id}'`, async (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

async function handler (ctx) {
  ctx.type = 'json';
  ctx.status = 200;

  const id = ctx.request.body.id;
  if (id) {
    const result = await handleEdit(id, ctx.request.method === 'POST' ? 0 : 1);
    if (result) {
      return ctx.body = JSON.stringify({
        flag: 1,
      });
    }
    return ctx.body = JSON.stringify({
      flag: 0,
      msg: errorText.handleErrMsg,
    });
  } else {
    return ctx.body = JSON.stringify({
      flag: 0,
      msg: 'id不能为空',
    });
  }
}
router
  .post('/', handler)
  .delete('/', handler);

module.exports = router;
