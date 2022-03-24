/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

describe('ARTICLE', () => {
  it('GET ALL ARTICLES', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
      });
    done();
  });

  it('GET ARTICLE FAIL', (done) => {
    chai
      .request(server)
      .get('/api/v1/articles/62330d48fc857f2373537268')
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(404);
        // chai.expect(response.body).to.have.property('_id');
        if (error) {
          console.log(error);
        }
        done();
      });
  });

  it('test delete article fail', (done) => {
    chai
      .request(server)
      .delete('/api/v1/articles/6233fc6b9fef220016ccff65')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN_ADMIN}`)
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(404);
      });
    done();
  });

  it('ARTICLE CREATE SUCCESS', (done) => {
    chai
      .request(server)
      .post('/api/v1/articles')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .field({
        title: 'Aimes Article',
        author: 'Aimee',
        preview: 'see Aime',
        body: 'Police Adhan confusion',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(201);
        // chai.expect(response.body).to.have.property('_id');
        done();
      });
  });

  it('test update article fail', (done) => {
    chai
      .request(server)
      .patch('/api/v1/articles/6233fc6b9fef220016ccff65')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN_ADMIN}`)
      .field({
        title: 'This title doses not exist',
      })
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(404);
      });
    done();
  });

  it('test update article success', (done) => {
    chai
      .request(server)
      .patch('/api/v1/articles/62330b842947551ec9e11149')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN_ADMIN}`)
      .field({
        title: 'This title doses not exist',
      })
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(200);
      });
    done();
  });
});
