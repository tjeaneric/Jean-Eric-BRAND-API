/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
// const Comment = require('../models/commentModel');

const server = require('../server');

chai.use(chaiHttp);

describe('Testing comment endpoints', () => {
  it('test get all comments', (done) => {
    chai
      .request(server)
      .get('/api/v1/comments')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
      });
    done();
  });

  it('test get one comment', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/622d969bd428fe7fa87168a8/comments')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
      });
    done();
  });

  it('test get one comment cast Error expected', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/622d969bd428fe7fa8716a8/comments')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(400);
      });
    done();
  });

  it('test create comment', (done) => {
    chai
      .request(server)
      .post('/api/v1/articles/62330b68aef8fd1dccc73b78/comments')
      .send({
        author: 'Aime',
        email: 'aime@mail.com',
        comment: 'see Aime is lifting weight',
      })
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(400);
      });
    done();
  });
});
