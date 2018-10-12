const Router = require('koa-router');
const handle = new Router();
const db = require('../../../db.js');

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
    let resBody = {};
    if (!data.id) {
      resBody = {
        flag: 0,
        msg: '文章id不能为空',
      };
    }
    console.log(ctx.request.method);
    await handleUpdate(data, ctx.request.method).then((result) => {
      resBody = {
        flag: 1,
      };
    }, () => {
      resBody = {
        flag: 0,
        msg: '系统错误',
      };
    });
    ctx.body = JSON.stringify(resBody);
}

handle
  .post('/', handler)
  .delete('/', handler);

module.exports = handle;
