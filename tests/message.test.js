/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
// const Message = require('../models/messageModel');

const server = require('../server');

chai.use(chaiHttp);

describe('Testing Message endpoints', () => {
  it('test get all messages', (done) => {
    chai
      .request(server)
      .get('/api/v1/messages')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(401);
      });
    done();
  });

  it('test get one message JWT Error', (done) => {
    chai
      .request(server)
      .get('/api/v1/messages/622ddc0434fc68fde6cbf2fe')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(401);
      });
    done();
  });

  it('test post one message fail duplicate field error', (done) => {
    const message = {
      name: 'Theo',
      email: 'theo1@mail.com',
      subject: 'Website',
      message: 'Please can you teach to develop Website',
    };

    chai
      .request(server)
      .post('/api/v1/messages')
      .send(message)
      .end((err, res) => {
        chai.expect(res.status).to.equal(400);
      });
    done();
  });

  it('test post one message fail Validation error', (done) => {
    const message = {
      name: 'Theo',
      email: 'theo2@mail.com',
      subject: 'Website',
      message: 'P',
    };

    chai
      .request(server)
      .post('/api/v1/messages')
      .send(message)
      .end((err, res) => {
        chai.expect(res.status).to.equal(400);
      });
    done();
  });
});
