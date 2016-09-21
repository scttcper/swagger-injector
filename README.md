# koa2-swagger-ui
Host swagger ui at a given directory from your koa v2 app.

Inspired by:
- [swagger-injector](https://github.com/johnhof/swagger-injector) for serving on a specific route
- [hapi-swaggered-ui](https://github.com/z0mt3c/hapi-swaggered-ui) for serving files from node_modules using a handlebars driven index.html

## install
```
npm install koa2-swagger-ui --save
```

## config
for more swaggerOptions see [swagger-ui](https://github.com/swagger-api/swagger-ui#swaggerui)
defaults:
```javascript
title: 'swagger', // page title
oauthOptions: {}, // passed to initOAuth
swaggerOptions: { // passed to SwaggerUi()
  supportedSubmitMethods: ['head', 'get', 'post', 'put', 'patch', 'delete'],
  apisSorter: 'alpha',
  operationsSorter: 'alpha',
  docExpansion: 'none',
},
routePrefix: '/docs', // route where the view is returned
```

## example
```javascript
const Koa = require('koa');
const koaSwagger = require('koa2-swagger-ui');

const app = new Koa();


app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: 'http://petstore.swagger.io/v2/swagger.json', // example path to json
  },
}));

app.listen(3000);
```
