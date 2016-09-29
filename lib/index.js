const path = require('path');
const fs = require('fs');
const defaultsDeep = require('lodash.defaultsdeep');
const send = require('koa-send');
const swaggerUiPath = require('swagger-ui/index').dist;
const Handlebars = require('handlebars');

const defaultOptions = {
  title: 'swagger',
  oauthOptions: {},
  swaggerOptions: {
    dom_id: 'swagger-ui-container',
    url: 'http://petstore.swagger.io/v2/swagger.json',
    supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
    docExpansion: 'none',
    jsonEditor: false,
    defaultModelRendering: 'schema',
    showRequestHeaders: false,
  },
  routePrefix: '/docs',
};

module.exports = function koaSwagger(config) {
  const options = defaultsDeep(config || {}, defaultOptions);
  Handlebars.registerHelper('json', context => JSON.stringify(context));
  const index = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../templates/index.hbs'), 'utf-8'));

  return (ctx, next) => {
    if (ctx.path === options.routePrefix) {
      ctx.type = 'text/html';
      ctx.body = index(options);
      return next();
    } else if (ctx.path.indexOf(options.routePrefix) === 0) {
      const truePath = ctx.path.substring(options.routePrefix.length, ctx.path.length);
      return send(ctx, truePath, { root: swaggerUiPath });
    }
    return next();
  };
};
