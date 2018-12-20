const Router = require('koa-router');
const moment = require('moment');
const router = new Router();
const db = require('./../../../db.js');
const errorText = require('./../../../commom/errorText.js');

function checkParams(data) {
  if (!data.title) {
    return '标题不能为空';
  }
}

function handleSearch(current = 0, pageSize = 30) {
  return new Promise(function (resolve) {
    let rule = '';
    if (pageSize === 'all') {
      rule = 'SELECT * FROM columns ORDER BY id';
    } else {
      const min = (pageSize - 0) * (current - 0);
      rule = `SELECT *, (select count(*) FROM article WHERE article.column_id = columns.id) AS count FROM columns  ORDER BY id ASC LIMIT ${min},${pageSize};`;
    }
    db.query(rule, function(err, result) {
      if (err) {
        resolve();
      } else {
        resolve(result);
      }
    });
  });
}
function checkRepeat(data) {
  return new Promise(function (resolve) {
    db.query(`SELECT * FROM columns WHERE title='${data.title}' ${typeof data.id !== 'undefined' ? `AND id <> ${data.id}` : ''};`, function(err, result) {
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
    db.query('INSERT columns SET title=?;', [data.title], function(err, result) {
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
    db.query(`UPDATE columns SET title=? WHERE id=${data.id};`, [data.title], function(err, result) {
      if (err) {
        resolve();
      } else {
        resolve(result);
      }
    });
  });
}

// 获取
router
  .get('/', async (ctx) => {
    const { query } = ctx.request;
    ctx.status = 200;
    ctx.response.type = 'json';

    const result = await handleSearch(query.current, query.pageSize);

    if (result) {
      const columns = result.slice(0, 30).map((item) => {
        return Object.assign({}, item, {
          createdText: moment(item.created).utcOffset(960)
            .format('YYYY-MM-DD HH:mm:ss'),
        });
      });
      ctx.body = JSON.stringify({
        flag: 1,
        data: columns,
      });
      return false;
    }
    ctx.body = JSON.stringify({
      flag: 0,
      msg: errorText.handleErrMsg,
    });
  })
  .put('/', async (ctx) => { // 修改
    const data = ctx.request.body;
    ctx.status = 200;
    ctx.response.type = 'json';
    const msg = checkParams(data);
    if (msg) {
      ctx.body = JSON.stringify({
        flag: 0,
        msg,
      });
      return false;
    }
    if (typeof data.id === 'undefined') {
      ctx.body = JSON.stringify({
        flag: 0,
        msg: '栏目id不能为空',
      });
      return false;
    }
    let result = await checkRepeat(data);
    if (result.length) {
      ctx.body = JSON.stringify({
        flag: 0,
        msg: '栏目名已存在',
      });
      return false;
    }
    result = await handleUpdate(data);
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
  .post('/', async (ctx) => { // 保存
    const data = ctx.request.body;
    ctx.status = 200;
    ctx.response.type = 'json';

    const msg = checkParams(data);
    if (msg) {
      ctx.body = JSON.stringify({
        flag: 0,
        msg,
      });
      return false;
    }

    let result = await checkRepeat(data);
    if (result.length) {
      ctx.body = JSON.stringify({
        flag: 0,
        msg: '栏目名已存在',
      });
      return false;
    }
    result = await handleInsert(data);
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
  });

module.exports = router;
