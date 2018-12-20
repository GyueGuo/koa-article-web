const Router = require('koa-router');
const moment = require('moment');
const router = new Router();
const db = require('../../../db.js');
const errorText = require('./../../../commom/errorText.js');

function handleSearch(pageSize = 30, current = 0) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT username, nickname, created, closureText, closureTime FROM user WHERE status=0 ORDER BY created LIMIT ${current * pageSize}, ${pageSize};`, function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}
function handleEdit(id, status) {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE user SET status=${status} ${status ? '' : ', closureTime=NOW()'} WHERE userid='${id}'`, function (err) {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

async function handler (ctx) {
  const id = ctx.request.body.id;
  ctx.response.type = 'json';
  ctx.status = 200;
  if (id) {
    const result = await handleEdit(id, ctx.request.method === 'POST' ? 0 : 1);
    if (result) {
      return ctx.body = JSON.stringify({
        flag: 1
      });
    } else {
      return ctx.body = JSON.stringify({
        flag: 0,
        msg: errorText.handleErrMsg,
      });
    }
  } else {
    return ctx.body = JSON.stringify({
      flag: 0,
      msg: '用户id不能为空',
    });
  }
}
router
  .get('/', async (ctx) => {
    const query = ctx.request.query;
    ctx.response.type = 'json';
    ctx.status = 200;

    const result = await handleSearch(query.pageSize - 0, query.current - 0);
    if (result) {
      result.forEach((item) => {
        item.createTimeText = moment(item.created).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
        item.closureTimeText = moment(item.closureTime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
      });
      return ctx.body = JSON.stringify({
        flag: 1,
        data: result,
      });
    } else {
      return ctx.body = JSON.stringify({
        flag: 0,
        msg: errorText.handleErrMsg
      });
    }
  })
  .post('/', handler)
  .delete('/', handler);

module.exports = router;
