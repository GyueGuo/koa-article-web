const mysql = require('mysql');
const db = mysql.createConnection({
  host: '45.78.27.143',
  port: 3306,
  user: 'koaArticleGuest',
  password: 'koaArticleGuest',
  database: 'koaArticle',
});
db.connect(function (err) {
  if (err) {
    throw err;
  } else {
    // eslint-disable-next-line no-console
    console.log('mysql connect success');
  }
});
module.exports = db;