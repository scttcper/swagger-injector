const app = require('../examples/example');
const request = require('supertest');

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
  it('should return jquery', function(done) {
    request(app.listen())
      .get('/docs/lib/jquery-1.8.0.min.js')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
  it('should return favicon', function(done) {
    request(app.listen())
      .get('/docs/images/favicon-32x32.png')
      .expect('Content-Type', /image\/png/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});
