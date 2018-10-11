const Router = require('koa-router');
const moment = require('moment');
const handle = new Router();
const db = require('./../../../db.js');
const STATUSES = ['审核中', '未通过', '已通过', '已下架'];
function find(parms) {
  return new Promise(function (resolve, reject) {
    const pageSize = parms.pageSize || 30;
    const current = parms.current || 0;
    const min = (pageSize - 0) * (current - 0);
    delete parms.current;
    delete parms.pageSize;
    const keys = Object.keys(parms);
    let query = '';
    if (keys.length) {
      query = ' WHERE';
    }
    Object.keys(parms).forEach((key) => {
      console.log(key);
      query += ` ${key}=${key === 'status' ? parms[key] - 0 : parms[key]} AND`;
    });
    query = query.substr(0, query.length - 4);
    console.log(query);
    db.query(`SELECT * FROM article${query} ORDER BY id ASC LIMIT ${min}, ${pageSize};`, async function(err, result) {
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
    await find({...ctx.request.query}).then((result) => {
      ctx.response.type = 'json';
      ctx.status = 200;
      const articles =  result.slice(0, 30).map((item) => {
        return Object.assign({}, item, {
          created: moment(item.created).utcOffset(960).format('YYYY-MM-DD HH:mm:ss'),
          status: STATUSES[item.status]
        });
      });
      ctx.body = JSON.stringify({
        flag: 1,
        data: {
          articles,
        }
      });
    }, () => {
      ctx.status = 400;
    });
  });

module.exports = handle;
