const Router = require('koa-router');
const moment = require('moment');
const handle = new Router();
const db = require('../../../db.js');
const status = ['已封禁', '正常'];
function handleSearch(key, id) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT  userid, username, nickname, status, closureTime, closureText,created FROM user WHERE ${key}='${id}' LIMIT 1;`, async function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

function checkParam(data) {
  let msg;
  if (!data.type) {
    msg = 'type不能为空'
  } else if (!data.id) {
    msg = 'id不能为空';
  }
  return msg;
}

handle.post('/', async (ctx) => {
  ctx.response.type = 'json';
  ctx.status = 200;
  let resBody;
  const data = ctx.request.body;
  const msg = checkParam(data);
  if (msg) {
    resBody = {
      flag: 0,
      msg,
    };
  } else {
    let key;
    switch(data.type) {
      case '1':
        key = 'nickname';
        break;
      case '2':
        key = 'userid';
        break;
      default:
        key = 'username';
        break;
    }
    const result = await handleSearch(key, data.id);
    if (result) {
      resBody = {
        flag: 1,
        data: result.map((item) => {
          const result = {...item};
          result.statusText = status[result.status];
          result.createText = moment(result.created).utcOffset(960).format('YYYY-MM-DD HH:mm:ss');
          return result;
        }),
      };
    } else {
      resBody = {
        flag: 0,
        msg: '系统错误',
      };
    }

  }
  ctx.body = JSON.stringify(resBody);
});

module.exports = handle;
