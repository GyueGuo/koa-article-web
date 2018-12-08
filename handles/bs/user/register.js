const Router = require('koa-router');
const uuidv1 = require('uuid/v1');
const md5 = require('md5');
const handle = new Router();
const db = require('../../../db.js');

function handleInsert(data) {
  return new Promise(function (resolve, reject) {
    db.query(`INSERT user SET username=?, nickname=?, sex=?, password=?, userid=?;`, [data.username, data.nickname, data.sex, data.password, data.userid], function(err, result) {
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
    userid: uuidv1().replace(/-/g, '')
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
  let msg = '';
  if (!param.username) {
    msg = '用户名不能为空'
  } else if (param.username.length < 4) {
    msg = '用户名长度不能小于4'
  } else if (!param.nickname) {
    msg = '昵称不能为空'
  } else if (!param.password) {
    msg = '密码不能为空'
  }
  return msg;
}

handle.post('/', async (ctx, next) => {
  ctx.response.type = 'json';
  ctx.status = 200;
  let resBody;
  const data = ctx.request.body;
  const msg = checkParams(data);
  if (msg) {
    resBody = {
      msg,
      flag: 0,
    };
  } else {
    const params = handleData(data);
    let temp = await checkRepeat('nickname', params.nickname);
    console.log(1);
    if (temp.length) {
      resBody = {
        msg: '昵称重复',
        flag: 0,
      };
      console.log(1);
    } else {
      console.log(2);
      temp = await checkRepeat('username', params.username);
      if (temp.length) {
        resBody = {
          msg: '用户重复',
          flag: 0,
        };
      } else {
        console.log(3);
        const result = await handleInsert(params);
        if (result.affectedRows) {
          resBody = {
            flag: 1,
          };
          ctx.cookies.set('userid', params.userid, {
            maxAge: 10000,
            domain: 'localhost',
            httpOnly: false,
          });
        } else {
          resBody = {
            msg: '系统错误',
            flag: 0,
          };
        }
      }
    }
  }
  ctx.body = JSON.stringify(resBody);
});

module.exports = handle;
