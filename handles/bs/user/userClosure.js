const Router = require('koa-router');
const router = new Router();
const db = require('../../../db.js');
const errorText = require('./../../../commom/errorText.js');

function handleEdit(id, status) {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE user SET status=${status} WHERE userid='${id}'`, function (err) {
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

  const { id } = ctx.request.body;
  if (id) {
    const result = await handleEdit(id, ctx.request.method === 'POST' ? 0 : 1);
    if (result) {
      ctx.body = JSON.stringify({
        flag: 1,
      });
      return false;
    }
    ctx.body = JSON.stringify({
      flag: 0,
      msg: errorText.handleErrMsg,
    });
    return false;
  }
  ctx.body = JSON.stringify({
    flag: 0,
    msg: 'id不能为空',
  });
}
router
  .post('/', handler)
  .delete('/', handler);

module.exports = router;
