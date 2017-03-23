const lint = require('mocha-eslint');
const app = require('../examples/example');
const request = require('supertest');

lint(['lib', 'test']);

describe('koa2-swagger-ui', function() {
  it('should return index file', function(done) {
    request(app.listen())
      .get('/docs')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
