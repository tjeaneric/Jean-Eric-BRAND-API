/* eslint-disable node/no-unpublished-require */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../server');

chai.use(chaiHttp);

// eslint-disable-next-line no-undef
describe('Testing User Auth', () => {
  it('USER SIGNUP Fail duplicate fields', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/signup')
      .send({
        name: 'Karenzi',
        email: 'karenzi@mail.com',
        password: 'mybrandapi',
        passwordConfirm: 'mybrandapi',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(400);
        //chai.expect(response.body).to.have.property('token');
        done();
      });
  });

  it('USER LOGIN SUCCESS', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send({
        email: 'admin@mail.com',
        password: 'mybrandapi',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(200);
        chai.expect(response.body).to.have.property('token');
        done();
      });
  });

  it('USER LOGIN FAIL', (done) => {
    chai
      .request(server)
      .post('/api/v1/users/login')
      .send({
        email: 'admin@mail1.com',
        password: 'mybrandapi',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(401);
        // chai.expect(response.body).to.have.property('token');
        done();
      });
  });

  it('USER getMe route', (done) => {
    chai
      .request(server)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(200);
        done();
      });
  });

  it('USER updateMe route FAIL', (done) => {
    chai
      .request(server)
      .patch('/api/v1/users/updateMe')
      .set('Authorization', `Bearer ${process.env.TEST_BAD_TOKEN}`)
      .field({
        name: 'victor',
        password: 'thisbrandisfake',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(401);
        done();
      });
  });

  it('USER updateMe route FAIL because of password field', (done) => {
    chai
      .request(server)
      .patch('/api/v1/users/updateMe')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .field({
        name: 'victor',
        password: 'thisbrandisfake',
        passwordConfirm: 'thisbrandisfake',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(200);
        done();
      });
  });

  it('USER updateMe route SUCCESS', (done) => {
    chai
      .request(server)
      .patch('/api/v1/users/updateMe')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN_ADMIN}`)
      .field({
        name: 'victor',
      })
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(200);
        done();
      });
  });

  // it('USER UPDATE PASSWORD SUCCESS', (done) => {
  //   chai
  //     .request(server)
  //     .patch('/api/v1/users/updateMyPassword')
  //     .set('Authorization', `Bearer ${process.env.TEST_TOKEN_ADMIN}`)
  //     .field({
  //       passwordCurrent: 'mybrandapi',
  //       password: 'mybrandapi',
  //       passwordConfirm: 'mybrandapi',
  //     })
  //     .end((error, response) => {
  //       chai.expect(response.statusCode).to.equal(200);
  //       done();
  //     });
  // });

  it('GET ALL USERS SUCCESS', (done) => {
    chai
      .request(server)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN_ADMIN}`)
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(200);
        // chai.expect(response.body).to.have.property('_id');
        done();
      });
  });

  it('GET ALL USERS FAIL', (done) => {
    chai
      .request(server)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
      .end((error, response) => {
        chai.expect(response.statusCode).to.equal(403);
        // chai.expect(response.body).to.have.property('_id');
        done();
      });
  });
});

////////////////////////////
//****************************
////////////////////////////
// eslint-disable-next-line no-undef

// after((done) => {
//   User.deleteMany({}, (error) => {
//     if (error) {
//       console.log(error.message);
//     } else done();
//   });
// });

// before((done) => {
//   const user1 = {
//     name: 'j',
//     email: 'j@mail.com',
//     password: 'mybrandapi',
//     passwordConfirm: 'mybrandapi',
//   };

//   const user2 = {
//     name: 'messi',
//     email: 'messi@mail.com',
//     password: 'mybrandapi',
//     passwordConfirm: 'mybrandapi',
//     role: 'admin',
//   };
//   User.insertMany([user1, user2], (error) => {
//     if (error) {
//       console.log(error.message);
//     } else done();
//   });

//   // chai
//   //   .request(server)
//   //   .post('localhost:8080/api/v1/users/signup')
//   //   .send(user1)
//   //   .end((err, res) => {
//   //     chai.expect(res.statusCode).to.equal(201);
//   //   });
// });

// describe('Getting number of signed up users', () => {
//   it('logging in', () => {
//     const user = {
//       email: 'messi@mail.com',
//       password: 'mybrandapi',
//     };
//     chai
//       .request(server)
//       .post('api/v1/users/login')
//       .send(user)
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(404);
//       });
//   });
//   it('number of users shoulb 2', () => {
//     chai
//       .request(server)
//       .get('/api/v1/users')
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(403);
//         chai.expect(res.length).to.equal(2);
//       });
//   });
// });

// describe('Testing User endpoints JWT Error', () => {
//   it('test get all Users', (done) => {
//     chai
//       .request(server)
//       .get('/api/v1/users')
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(401);
//       });
//     done();
//   });

//   it('test get one user JWT Error', (done) => {
//     chai
//       .request(server)
//       .get('/api/v1/users/622afff978a1e13ec9b169e1')
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(401);
//       });
//     done();
//   });
// });

// describe('Testing AUth endpoints', () => {
//   it('test login User with wrong credentions', (done) => {
//     const cred = {
//       email: 'ericjohn415@mail.com',
//       password: 'myrandapi',
//     };
//     chai
//       .request(server)
//       .post('/api/v1/users/login')
//       .send(cred)
//       .end((err, res) => {
//         chai.expect(res.statusCode).to.equal(401);
//         chai.expect(res.message).to.equal('Incorrect email or password');
//       });
//     done();
//   });

//   it('test login User with right credentions', (done) => {
//     const cred = {
//       email: 'eric@mail.com',
//       password: 'mybrandapi123',
//     };
//     chai
//       .request(server)
//       .post('/api/v1/users/login')
//       .send(cred)
//       .end((err, res) => {
//         expect(res.statusCode).to.equal(200);
//         expect(res.status).to.equal('succes');
//       });
//     done();
//   });

//   it('test login User with right credentions', (done) => {
//     const cred = {
//       email: 'j@mail.com',
//       password: 'mybrandapi',
//     };
//     chai
//       .request(server)
//       .post('/api/v1/users/login')
//       .send(cred)
//       .end((err, res) => {
//         expect(res.statusCode).to.equal(200);
//         expect(res.status).to.equal('succes');
//       });
//     done();
//   });
// });
