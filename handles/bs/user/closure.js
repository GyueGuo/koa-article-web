const Router = require('koa-router');
const moment = require('moment');
const handle = new Router();
const db = require('../../../db.js');

function handleSearch(pageSize = 30, current = 0) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT username, nickname, created, closureText, closureTime FROM user WHERE status=0 ORDER BY created LIMIT ${current * pageSize}, ${pageSize};`, async function(err, result) {
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
    db.query(`UPDATE user SET status=${status} ${status ? '' : ', closureTime=NOW()'} WHERE userid='${id}'`, async (err, result) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

handle
  .get('/', async (ctx) => {
    ctx.response.type = 'json';
    const query = ctx.request.query;
    ctx.status = 200;
    let resBody = {
      flag: 0,
      data: '系统错误',
    };
    let result = await handleSearch(query.pageSize - 0, query.current - 0);
    if (result) {
      result.forEach((item) => {
        item.createTimeText = moment(item.created).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
        item.closureTimeText = moment(item.closureTime).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
      });
      resBody = {
        flag: 1,
        data: result,
      }
    }
    ctx.body = JSON.stringify(resBody);
  })
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
  });;

module.exports = handle;
