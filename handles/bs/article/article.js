const Router = require('koa-router');
const handle = new Router();
const db = require('./../../../db.js');

function handleFind(id) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM article WHERE id=${id} LIMIT 1;`, async function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

function handleInsert(data) {
  return new Promise(function (resolve, reject) {
    db.query(`INSERT article SET title=?, column_id=?, reprint=?, source=?, content=?;`, [data.title, data.column, data.reprint - 0, data.source, data.content], function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

function handleUpdate(data) {
  return new Promise(function (resolve, reject) {
    db.query(`UPDATE article SET title=?, column_id=?, reprint=?, source=?, content=? WHERE id=${data.id};`, [data.title, data.column, data.reprint - 0, data.source, data.content], function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

function handleDelete(id) {
  return new Promise(function (resolve, reject) {
    db.query(`DELETE FROM article WHERE id=${id};`, async function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}

function checkParams(data, action) {
  let msg;
  if (!data) {
    msg = '参数异常';
  }

  if (!data.title) {
    msg = '标题不能为空';
  }

  if (action && !data.column_id) {
    msg = '栏目id不能为空';
  }

  if (data.reprint && !data.source) {
    msg = '来源不能为空';
  }
  
  if (!data.content) {
    msg = '内容不能为空';
  }

  return msg;
}
handle
  .get('/', async (ctx, next) => {
    const query = ctx.request.query;
    ctx.response.type = 'json';
    ctx.status = 200;
    let resBody = {};
    if (query.id) {
      await handleFind(query.id).then((result) => {
        resBody = {
          flag: 1,
          data:  result[0],
        };
      }, () => {
        resBody = {
          flag: 0,
          msg: '系统错误',
        };
      });
    } else {
      resBody = {
        flag: 0,
        msg: 'id不能为空',
      };
    }

    ctx.body = JSON.stringify(resBody);
  })
  .post('/', async (ctx, next) => {
    const data = ctx.request.body;
    ctx.response.type = 'json';
    ctx.status = 200;
    let resBody = {};
    let msg = checkParams(data);
    if (msg) {
      resBody = {
        flag: 0,
        msg,
      };
    }
    await handleInsert(data).then((result) => {
      resBody = {
        flag: 1,
        msg,
      };
    }, () => {
      resBody = {
        flag: 0,
        msg,
      };
    });
    ctx.body = JSON.stringify(resBody);
  })
  .put('/', async (ctx, next) => {
    ctx.response.type = 'json';
    const data = ctx.request.body;
    let result = checkParams(data, 'put');
    if (result.status) {
      ctx.status = result.status;
      ctx.body = result.body;
      return false;
    }
    await handleUpdate(data).then((result) => {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        flag: 1,
      });
    }, (errMsg) => {
      ctx.status = 400;
    });
  })
  .delete('/', async (ctx, next) => {
    ctx.response.type = 'json';
    const data = ctx.request.body;
    await handleDelete(data.id).then((result) => {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        flag: 1,
      });
    }, () => {
      ctx.status = 400;
    });
  });

module.exports = handle;
