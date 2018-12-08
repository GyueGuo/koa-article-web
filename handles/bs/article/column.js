const Router = require('koa-router');
const moment = require('moment');
const handle = new Router();
const db = require('./../../../db.js');

function checkParams(data) {
  let msg;
  if (!data.title) {
    msg = '标题不能为空'
  }
  return msg;
}

function handleSearch(current = 0, pageSize = 30) {
  return new Promise(function (resolve, reject) {
    let rule = '';
    if (pageSize === 'all') {
      rule = 'SELECT * FROM columns ORDER BY id';
    } else {
      const min = (pageSize - 0) * (current - 0);
      rule = `SELECT *, (select count(*) FROM article WHERE article.column_id = columns.id) AS count FROM columns  ORDER BY id ASC LIMIT ${min},${pageSize};`;
    }
    db.query(rule, async function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}
function checkRepeat(data) {
  return new Promise(function (resolve, reject) {
    db.query(`SELECT * FROM columns WHERE title='${data.title}' ${typeof data.id !== 'undefined' ? `AND id <> ${data.id}` : ''};`, async function(err, result) {
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
    db.query(`INSERT columns SET title=?;`, [data.title], function(err, result) {
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
    db.query(`UPDATE columns SET title=? WHERE id=${data.id};`, [data.title], function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// 获取
handle.get('/', async (ctx, next) => {
  const query = ctx.request.query;
  ctx.status = 200;
  ctx.response.type = 'json';
  let resBody;
  const result = await handleSearch(query.current, query.pageSize);
  if (result) {
    const columns =  result.slice(0, 30).map((item) => {
      return Object.assign({}, item, {
        created: moment(item.created).utcOffset(960).format('YYYY-MM-DD HH:mm:ss')
      });
    });
    resBody = {
      flag: 1,
      data: columns
    };
  } else {
    resBody = {
      flag: 0,
      msg: '系统错误'
    };
  }
  ctx.body = JSON.stringify(resBody);
});

// 修改
handle.put('/', async (ctx, next) => {
  let data = ctx.request.body;
  ctx.status = 200;
  ctx.response.type = 'json';
  let resBody;
  const msg = checkParams(data);
  if (msg) {
    resBody = {
      flag: 0,
      msg,
    };
  }
  if (typeof data.id === 'undefined') {
    resBody = {
      flag: 0,
      msg: '栏目id不能为空',
    };
  }
  const result = await checkRepeat(data);
  if (!result.length) {
    const result = await handleUpdate(data);
    if (result) {
      resBody = {
        flag: 1,
      };
    } else {
      resBody = {
        flag: 0,
        msg: '系统错误',
      };
    }
  } else {
    resBody = {
      flag: 0,
      msg: '栏目名已存在',
    };
  }
  ctx.body = JSON.stringify(resBody);
});

// 保存
handle.post('/', async (ctx, next) => {
  let data = ctx.request.body;
  ctx.status = 200;
  ctx.response.type = 'json';
  let resBody;
  const msg = checkParams(data);
  if (msg) {
    resBody = {
      flag: 0,
      msg,
    };
  }

  const result = await checkRepeat(data);
  if (!result.length) {
    const result = await handleInsert(data);
    if (result) {
      resBody = {
        flag: 1,
      };
    } else {
      resBody = {
        flag: 0,
        msg: '系统错误',
      };
    }
  } else {
    resBody = {
      flag: 0,
      msg: '栏目名已存在',
    };
  }
  ctx.body = JSON.stringify(resBody);
});

module.exports = handle;