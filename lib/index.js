const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const send = require('koa-send');
const swaggerUiPath = require('swagger-ui/index').dist;
const Handlebars = require('handlebars');

const defaultOptions = {
  title: 'swagger',
  oauthOptions: {},
  swaggerOptions: {
    url: 'http://petstore.swagger.io/v2/swagger.json',
    supportedSubmitMethods: ['head', 'get', 'post', 'put', 'patch', 'delete'],
    apisSorter: 'alpha',
    operationsSorter: 'alpha',
    docExpansion: 'none',
  },
  routePrefix: '/docs',
};

module.exports = function koaSwagger(config = {}) {
  const options = _.defaultsDeep(config, defaultOptions);
  Handlebars.registerHelper('json', context => JSON.stringify(context));
  const index = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../templates/index.hbs'), 'utf-8'));

  return (ctx, next) => {
    if (ctx.path === options.routePrefix) {
      ctx.set('Content-Type', 'text/html');
      ctx.body = index(options);
      return next();
    }
    if (_.startsWith(ctx.path, options.routePrefix)) {
      const truePath = ctx.path.substring(options.routePrefix.length, ctx.path.length);
      return send(ctx, truePath, { root: swaggerUiPath });
    }
    return next();
  };
};
