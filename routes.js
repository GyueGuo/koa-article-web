const Router = require('koa-router');
const bsArticleColumn = require('./handles/bs/article/column.js');
const bsArticleArticle = require('./handles/bs/article/article.js');
const bsArticleList = require('./handles/bs/article/list.js');
const bsArticlePass = require('./handles/bs/article/pass.js');

const router = new Router();

router
  .use('/bs/article/column.json', bsArticleColumn.routes(), bsArticleColumn.allowedMethods())
  .use('/bs/article/article.json', bsArticleArticle.routes(), bsArticleArticle.allowedMethods())
  .use('/bs/article/list.json', bsArticleList.routes(), bsArticleList.allowedMethods())
  .use('/bs/article/pass.json', bsArticlePass.routes(), bsArticlePass.allowedMethods())
  // .use('/bs/user/user.json', bsUser.routes(), bsUser.allowedMethods());

module.exports = router;
