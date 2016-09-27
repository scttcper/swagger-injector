const Koa = require('koa');
const koaSwagger = require('../lib/');

const app = module.exports = new Koa();

app.use(koaSwagger());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port: 3000');
}
