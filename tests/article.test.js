/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

describe('Testing article endpoints', () => {
  it('test get all articles', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
      });
    done();
  });

  it('test get one article', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/622d969bd428fe7fa87168a8')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
      });
    done();
  });
});
