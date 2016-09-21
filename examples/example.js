const Koa = require('koa');
const koaSwagger = require('../lib/');

const app = new Koa();

app.use(koaSwagger());

app.listen(3000);
