/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

describe('FORGOT PASSWORD ROUTES', () => {
  it('FORGOT PASSWORD SUCCESS', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/forgotPassword')
      .send({
        email: 'admin@mail.com',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(200);
        // chai.expect(response.body).to.have.property('token');
        done();
      });
  });

  it('FORGOT PASSWORD FAIL', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/forgotPassword')
      .send({
        email: 'eric@mail.com',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(404);
        // chai.expect(response.body).to.have.property('token');
        done();
      });
  });

  it('RESET PASSWORD FAIL', (done) => {
    chai
      .request(server)
      .post(
        '/api/v1/users/resetPassword/09ec1f71b16f9b6cd18e0c1bce81547b08968e85e8f2177008b970cc528f12a4'
      )
      .send({
        password: 'mybrandapi123',
        passwordConfirm: 'mybrandapi123',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(401);
        // chai.expect(response.body).to.have.property('token');
        done();
      });
  });
});
