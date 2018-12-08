const Router = require('koa-router');
const handle = new Router();
const db = require('../../../db.js');

function handleEdit(id, status) {
  return new Promise((resolve, reject) => {
    db.query(`UPDATE user SET status=${status} WHERE userid='${id}'`, async (err, result) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

handle
  .post('/', async (ctx) => {
    const id = ctx.request.body.id;
    ctx.type = 'json';
    ctx.status = 200;
    const resBody = {
      flag: 0,
    };
    if (id) {
      await handleEdit(id, 0).then(() => {
        resBody.flag = 1;
      }, () => {
        resBody.msg = '系统错误';
      });
    } else {
      resBody.msg = '用户id不能为空';
    }
    ctx.body = JSON.stringify(resBody);
  })
  .delete('/', async (ctx) => {
    const id = ctx.request.body.id;
    ctx.type = 'json';
    ctx.status = 200;
    const resBody = {
      flag: 0,
    };
    if (id) {
      await handleEdit(id, 1).then(() => {
        resBody.flag = 1;
      }, () => {
        resBody.msg = '系统错误';
      });
    } else {
      resBody.msg = '用户id不能为空';
    }
    ctx.body = JSON.stringify(resBody);

  });
module.exports = handle;