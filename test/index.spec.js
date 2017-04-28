const lint = require('mocha-eslint');
const app = require('../examples/example');
const request = require('supertest');

lint(['lib', 'test']);

const json = require('../package.json');

describe('koa2-swagger-ui', function() {
  it('should return index file', function() {
    return request(app.listen())
      .get('/docs')
      .expect('Content-Type', /html/)
      .expect(200);
  });
  it('should return index file', function() {
    const url = `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/${json.devDependencies['swagger-ui']}`;
    return request(url)
      .get('/swagger-ui.css')
      .expect('Content-Type', 'text/css')
      .expect(200);
  });
});
