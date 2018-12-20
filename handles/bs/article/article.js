const Router = require('koa-router');
const router = new Router();
const db = require('./../../../db.js');
const errorText = require('./../../../commom/errorText.js');

function handleSelectById(id) {
  return new Promise(function (resolve) {
    db.query('SELECT * FROM article WHERE id=? LIMIT 1;', [id], function (err, result) {
      if (err) {
        resolve();
      } else {
        resolve(result);
      }
    });
  });
}

function handleInsert(data) {
  return new Promise(function (resolve) {
    db.query('INSERT article SET title=?, column_id=?, reprint=?, source=?, content=?;', [data.title, data.column, data.reprint - 0, data.source, data.content], function (err, result) {
      if (err) {
        resolve();
      } else {
        resolve(result);
      }
    });
  });
}

function handleUpdate(data) {
  return new Promise(function (resolve) {
    db.query(`UPDATE article SET title=?, column_id=?, reprint=?, source=?, content=? WHERE id=${data.id};`, [data.title, data.column, data.reprint - 0, data.source, data.content], function (err, result) {
      if (err) {
        resolve();
      } else {
        resolve(result);
      }
    });
  });
}

function handleDelete(id) {
  return new Promise(function (resolve) {
    db.query(`DELETE FROM article WHERE id=${id};`, function (err, result) {
      if (err) {
        resolve();
      } else {
        resolve(result);
      }
    });
  });
}

function checkParams(data, action) {
  if (!data) {
    return '参数不能为空';
  }

  if (!data.title) {
    return '标题不能为空';
  }

  if (action && !data.id) {
    return '栏目id不能为空';
  }

  if (data.reprint && !data.source) {
    return '来源不能为空';
  }

  if (!data.content) {
    return '内容不能为空';
  }
}

router
  .get('/', async (ctx) => {
    const { query } = ctx.request;
    ctx.response.type = 'json';
    ctx.status = 200;

    if (query.id) {
      const result = await handleSelectById(query.id);
      if (result) {
        ctx.body = JSON.stringify({
          flag: 1,
          data: result[0],
        });
        return false;
      }
      ctx.body = JSON.stringify({
        flag: 0,
        msg: errorText.handleErrMsg,
      });
      return false;
    }
    ctx.body = JSON.stringify({
      flag: 0,
      msg: 'id不能为空',
    });
  })
  .post('/', async (ctx) => {
    const data = ctx.request.body;
    ctx.response.type = 'json';
    ctx.status = 200;
    const msg = checkParams(data);
    if (msg) {
      ctx.body = JSON.stringify({
        flag: 0,
        msg,
      });
      return false;
    }
    const result = await handleInsert(data);
    if (result) {
      ctx.body = JSON.stringify({
        flag: 1,
        data: result,
      });
      return false;
    }
    ctx.body = JSON.stringify({
      flag: 0,
      msg: errorText.handleErrMsg,
    });
  })
  .put('/', async (ctx) => {
    ctx.response.type = 'json';
    const data = ctx.request.body;
    const msg = checkParams(data, 'put');
    if (msg) {
      ctx.body = JSON.stringify({
        flag: 0,
        msg,
      });
      return false;
    }
    const result = await handleUpdate(data);
    if (result) {
      ctx.body = JSON.stringify({
        flag: 1,
      });
      return false;
    }
    ctx.body = JSON.stringify({
      flag: 0,
      msg: errorText.handleErrMsg,
    });
  })
  .delete('/', async (ctx) => {
    ctx.response.type = 'json';
    const data = ctx.request.body;
    if (data.id) {
      const result = await handleDelete(data.id);
      if (result) {
        ctx.body = JSON.stringify({
          flag: 1,
        });
        return false;
      }
      ctx.body = JSON.stringify({
        flag: 0,
        msg: errorText.handleErrMsg,
      });
      return false;
    }
    ctx.body = JSON.stringify({
      flag: 0,
      msg: 'id不能为空',
    });
  });

module.exports = router;
