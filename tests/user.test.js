/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../models/userModel');

const server = require('../server');

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
after((done) => {
  User.deleteMany({}, (error) => {
    if (error) {
      console.log(error.message);
    } else done();
  });
});

before((done) => {
  const user1 = {
    name: 'j',
    email: 'j@mail.com',
    password: 'mybrandapi',
    passwordConfirm: 'mybrandapi',
  };

  const user2 = {
    name: 'messi',
    email: 'messi@mail.com',
    password: 'mybrandapi',
    passwordConfirm: 'mybrandapi',
  };
  User.insertMany(user1, user2, (error) => {
    if (error) {
      console.log(error.message);
    } else done();
  });
});

describe('Testing User endpoints JWT Error', () => {
  it('test get all Users', (done) => {
    chai
      .request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(401);
      });
    done();
  });

  it('test get one user JWT Error', (done) => {
    chai
      .request(server)
      .get('/api/v1/users/622afff978a1e13ec9b169e1')
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(401);
      });
    done();
  });
});

describe('Testing AUth endpoints', () => {
  it('test login User with wrong credentials', (done) => {
    const cred = {
      email: 'ericjohn415@mail.com',
      password: 'myrandapi',
    };
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send(cred)
      .end((err, res) => {
        chai.expect(res.statusCode).to.equal(401);
        chai.expect(res.message).to.equal('Incorrect email or password');
      });
    done();
  });

  it('test login User with right credentials', (done) => {
    const cred = {
      email: 'eric@mail.com',
      password: 'mybrandapi123',
    };
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send(cred)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.status).to.equal('succes');
      });
    done();
  });

  it('test login User with right credentials', (done) => {
    const cred = {
      email: 'j@mail.com',
      password: 'mybrandapi',
    };
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send(cred)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.status).to.equal('succes');
      });
    done();
  });
});
