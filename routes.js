const Router = require('koa-router');
const bsArticleColumn = require('./handles/bs/article/column.js');
const bsArticleArticle = require('./handles/bs/article/article.js');
const bsArticleList = require('./handles/bs/article/list.js');
const bsArticlePass = require('./handles/bs/article/pass.js');
const bsUserClosure = require('./handles/bs/user/closure.js');
const bsUserUserClosure = require('./handles/bs/user/userClosure.js');
const bsUserRegister = require('./handles/bs/user/register.js');
const bsUserSearch = require('./handles/bs/user/search.js');

const router = new Router();

router
  .use('/bs/article/column.json', bsArticleColumn.routes(), bsArticleColumn.allowedMethods())
  .use('/bs/article/article.json', bsArticleArticle.routes(), bsArticleArticle.allowedMethods())
  .use('/bs/article/list.json', bsArticleList.routes(), bsArticleList.allowedMethods())
  .use('/bs/article/pass.json', bsArticlePass.routes(), bsArticlePass.allowedMethods())
  .use('/bs/user/closure.json', bsUserClosure.routes(), bsUserClosure.allowedMethods())
  .use('/bs/user/register.json', bsUserRegister.routes(), bsUserRegister.allowedMethods())
  .use('/bs/user/search.json', bsUserSearch.routes(), bsUserSearch.allowedMethods())
  .use('/bs/user/userclosure.json', bsUserUserClosure.routes(), bsUserUserClosure.allowedMethods())

module.exports = router;
