const Router = require('koa-router');
const moment = require('moment');
const router = new Router();
const db = require('../../../db.js');
const errorText = require('./../../../commom/errorText.js');

const status = ['已封禁', '正常'];

function handleSearch(key, id) {
  return new Promise(function (resolve) {
    db.query(`SELECT  userid, username, nickname, status, closureTime, closureText,created FROM user WHERE ${key}='${id}' LIMIT 1;`, function(err, result) {
      if (err) {
        resolve();
      } else {
        resolve(result);
      }
    });
  });
}

function checkParam(data) {
  if (!data.type) {
    return 'type不能为空';
  }
  if (!data.id) {
    return 'id不能为空';
  }
}

router
  .post('/', async (ctx) => {
    ctx.response.type = 'json';
    ctx.status = 200;

    const data = ctx.request.body;

    const msg = checkParam(data);
    if (msg) {
      ctx.body = JSON.stringify({
        flag: 0,
        msg,
      });
      return false;
    }
    let key;
    switch (data.type) {
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
      ctx.body = JSON.stringify({
        flag: 1,
        data: result.map((item) => {
          const user = {...item};
          user.statusText = status[result.status];
          user.createText = moment(result.created).utcOffset(960)
            .format('YYYY-MM-DD HH:mm:ss');
          return user;
        }),
      });
      return false;
    }
    ctx.body = JSON.stringify({
      flag: 0,
      msg: errorText.handleErrMsg,
    });
  });

module.exports = router;
