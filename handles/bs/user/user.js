const Router = require('koa-router');
const handle = new Router();
const db = require('../../../db.js');

function handleSearchById(id) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM user WHERE id=${id} LIMIT 1;`, async function(err, result) {
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
    db.query(`INSERT user SET username=?, nickname=?, password=?; userid=?`, [data.title, data.column, data.reprint - 0, data.source, data.content], function(err, result) {
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

handle
  .get('/', async (ctx, next) => {
    ctx.response.type = 'json';
    const query = ctx.request.query;
    if (query && query.id) {
      await handleSearchById(query.id).then((result) => {
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
    await handleUpdate(data).then((result) => {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        flag: 1,
      });
    }, () => {
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
