let fs = require('fs');
let path = require('path');

async function favicon (ctx, next) {
  if (ctx.method === 'GET' && ctx.url === '/favicon.ico') {
    ctx.body = fs.readFileSync(path.join('favicon.ico'));
  } else {
    await next();
  }
}

module.exports = favicon;
