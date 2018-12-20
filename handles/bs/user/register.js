const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const md5 = require('md5');
const router = new Router();
const db = require('../../../db.js');
const errorText = require('./../../../commom/errorText.js');

function handleInsert(data) {
  return new Promise(function (resolve, reject) {
    db.query('INSERT user SET username=?, nickname=?, sex=?, password=?, userid=?;', [data.username, data.nickname, data.sex, data.password, data.userid], function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

function handleData(data) {
  return {
    username: data.username,
    nickname: data.nickname,
    sex: data.sex,
    password: md5(data.password),
    userid: uuidv1().replace(/-/g, ''),
  };
}

function checkRepeat(action, data) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM user WHERE ${action}='${data}' LIMIT 1;`, function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

function checkParams(param) {
  if (!param.username) {
    return '用户名不能为空';
  }
  if (param.username.length < 4) {
    return '用户名长度不能小于4';
  }
  if (!param.nickname) {
    return '昵称不能为空';
  }
  if (!param.password) {
    return '密码不能为空';
  }
}

router.post('/', async (ctx) => {
  ctx.response.type = 'json';
  ctx.status = 200;

  const data = ctx.request.body;
  const msg = checkParams(data);
  if (msg) {
    ctx.body = JSON.stringify({
      flag: 0,
      msg,
    });
    return false;
  }
  const params = handleData(data);
  let result = await checkRepeat('nickname', params.nickname);
  if (result.length) {
    ctx.body = JSON.stringify({
      flag: 0,
      msg: '昵称重复',
    });
    return false;
  }
  result = await checkRepeat('username', params.username);
  if (result.length) {
    ctx.body = JSON.stringify({
      flag: 0,
      msg: '用户名重复',
    });
    return false;
  }
  result = await handleInsert(params);
  if (result.affectedRows) {
    ctx.cookies.set('userid', params.userid, {
      maxAge: 10000,
      domain: 'localhost',
      httpOnly: false,
    });
    ctx.body = JSON.stringify({
      flag: 1,
    });
    return false;
  }
  ctx.body = JSON.stringify({
    flag: 0,
    msg: errorText.handleErrMsg,
  });
});

module.exports = router;
