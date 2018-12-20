const fs = require('fs');
const path = require('path');

async function favicon (ctx, next) {
  if (ctx.method === 'GET' && ctx.url === '/favicon.ico') {
    ctx.body = await new Promise((resolve) => resolve(fs.readFileSync(path.join('favicon.ico'))));
  } else {
    await next();
  }
}

module.exports = favicon;
