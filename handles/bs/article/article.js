const Router = require('koa-router');
const handle = new Router();
const db = require('./../../../db.js');

function handleFind(id) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM article WHERE id=${id} LIMIT 1;`, async function(err, result) {
      if (err) {
        reject(err);
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
        reject(err);
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
        reject(err);
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
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function checkParams(data) {
  const ctx = {};
  if (!data) {
    ctx.status = 400;
    ctx.body = JSON.stringify({
      flag: 0,
      msg: '参数异常',
    });
    return false;
  }

  if (!data.title) {
    ctx.status = 400;
    ctx.body = JSON.stringify({
      flag: 0,
      msg: '标题不能为空',
    });
    return false;
  }

  if (!data.column_id) {
    ctx.status = 400;
    ctx.body = JSON.stringify({
      flag: 0,
      msg: '栏目id不能为空',
    });
    return false;
  }
  if (reprint && !source) {
    ctx.status = 400;
    ctx.body = JSON.stringify({
      flag: 0,
      msg: '来源不能为空',
    });
    return false;
  }
  
  if (!data.content) {
    ctx.status = 400;
    ctx.body = JSON.stringify({
      flag: 0,
      msg: '内容不能为空',
    });
  }
  return ctx;
}
handle
  .get('/', async (ctx, next) => {
    ctx.response.type = 'json';
    const query = ctx.request.query;
    if (query && query.id) {
      await handleFind(query.id).then((result) => {
        ctx.status = 200;
        ctx.body = JSON.stringify({
          flag: 1,
          data: {
            article: result[0]
          }
        });
      }, () => {
        ctx.status = 400;
      });
    } else {
      ctx.status = 400;
    }
  })
  .post('/', async (ctx, next) => {
    ctx.response.type = 'json';
    const data = ctx.request.body;
    let result = checkParams(data)
    if (result.status) {
      ctx.status = result.status;
      ctx.body = result.body;
      return false;
    }
    await handleInsert(data).then((result) => {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        flag: 1,
        data: {
          id: result.insertId
        }
      });
    }, () => {
      ctx.status = 400;
    });
  })
  .put('/', async (ctx, next) => {
    ctx.response.type = 'json';
    const data = ctx.request.body;
    let result = checkParams(data)
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
