const lint = require('mocha-eslint');
const app = require('../examples/example');
const request = require('supertest');

lint(['lib', 'test']);

describe('koa2-swagger-ui', function() {
  it('should return index file', function(done) {
    request(app.listen())
      .get('/docs/index.html')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return swagger-ui-bundle', function(done) {
    request(app.listen())
      .get('/docs/swagger-ui-bundle.js')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return favicon', function(done) {
    request(app.listen())
      .get('/docs/favicon-32x32.png')
      .expect('Content-Type', /image\/png/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
