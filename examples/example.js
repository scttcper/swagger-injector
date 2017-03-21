const Koa = require('koa');
const koaSwagger = require('../lib/');

const app = new Koa();
module.exports = app;

app.use(koaSwagger());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port: 3000');
}
