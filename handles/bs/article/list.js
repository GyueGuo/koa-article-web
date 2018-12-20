const Router = require('koa-router');
const moment = require('moment');
const router = new Router();
const db = require('./../../../db.js');
const errorText = require('./../../../commom/errorText.js');

const STATUSES = ['审核中', '未通过', '已通过'];
const defaultPageSize = 30;

function handleSearch(parms) {
  return new Promise(function (resolve, reject) {
    const query = { ...parms };
    const pageSize = query.pageSize || defaultPageSize;
    const current = query.current || 0;
    const min = (pageSize - 0) * (current - 0);

    delete query.pageSize;
    delete query.current;

    let sqlQuery = 'SELECT *, (SELECT title FROM columns WHERE columns.id=article.column_id) AS columnName FROM article ';
    if (Object.keys(query).length) {
      sqlQuery += 'WHERE ';
      if (query.status) {
        sqlQuery += `status=${query.status} AND `;
      }
      if (query.title) {
        sqlQuery += `title like '%${query.title}%' AND `;
      }
      if (query.column) {
        sqlQuery += `column=${query.column} AND `;
      }
      sqlQuery = sqlQuery.slice(0, sqlQuery.length - 4);
    }
    sqlQuery += `ORDER BY id ASC LIMIT ${min}, ${pageSize};`;
    db.query(sqlQuery, async function(err, result) {
      if (err) {
        reject();
      } else {
        resolve(result);
      }
    });
  });
}
router
  .get('/', async (ctx, next) => {
    const data = ctx.request.query;
    ctx.response.type = 'json';
    ctx.status = 200;
    let resBody = {};
    const result = await handleSearch(data);
    if (result) {
      const articles =  result.map((item) => {
        return Object.assign({}, item, {
          created: moment(item.created).utcOffset(960).format('YYYY-MM-DD HH:mm:ss'),
          statusText: STATUSES[item.status]
        });
      });
      resBody = {
        flag: 1,
        data: articles,
      };
    } else {
      resBody = {
        flag: 0,
        msg: '系统错误',
      };
    }
    ctx.body = JSON.stringify(resBody);
  });

module.exports = router;
