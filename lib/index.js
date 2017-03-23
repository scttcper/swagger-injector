const path = require('path');
const fs = require('fs');
const defaultsDeep = require('lodash.defaultsdeep');
const Handlebars = require('handlebars');

const defaultOptions = {
  title: 'Swagger UI',
  oauthOptions: {},
  swaggerOptions: {
    dom_id: '#swagger-ui',
    url: 'http://petstore.swagger.io/v2/swagger.json',
    layout: 'StandaloneLayout',
  },
  routePrefix: '/docs',
};

module.exports = function koaSwagger(config) {
  const options = defaultsDeep(config || {}, defaultOptions);
  Handlebars.registerHelper('json', context => JSON.stringify(context));
  const index = Handlebars.compile(fs.readFileSync(path.join(__dirname, './index.hbs'), 'utf-8'));

  return function koaSwaggerUi(ctx, next) {
    ctx.assert(ctx.path === options.routePrefix, 404);
    ctx.type = 'text/html';
    ctx.body = index(options);
    return next();
  };
};
