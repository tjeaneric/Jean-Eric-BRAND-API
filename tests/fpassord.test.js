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

  it('RESET PASSWORD FAIL INVALID TOKEN', (done) => {
    chai
      .request(server)
      .post(
        '/api/v1/users/resetPassword/41067c2f99247979427097805753f3ec2d449ec65b9617fc1464e3cd021f5ecd'
      )
      .send({
        password: 'mybrandapi',
        passwordConfirm: 'mybrandapi',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(401);
        // chai.expect(response.body).to.have.property('token');
        done();
      });
  });
});
