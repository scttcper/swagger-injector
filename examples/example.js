const Koa = require('koa');
const koaSwagger = require('../lib/');
const router = require('koa-router')();

const app = new Koa();
module.exports = app;

app.use(koaSwagger());

router.get('/moredocs', koaSwagger({ routePrefix: false }));

app
  .use(router.routes())
  .use(router.allowedMethods());

/* istanbul ignore if */
if (!module.parent) {
  app.listen(3000);
  console.log('listening on: http://localhost:3000/docs');
}
