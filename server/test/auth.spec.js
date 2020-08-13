/* eslint-disable no-undef */
const chai = require('chai');
const path = require('path');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

const app = require('../app.js');

let mongoServer;

// Prepare
const validAccount = { username: 'foo@example.com', password: 'password', companyName: 'foo' };

chai.should();
chai.use(chaiHttp);

before(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('/POST auth/register', () => {
  function expectStatus(done, expectedStatusCode, objectToSend) {
    chai
      .request(app)
      .post('/auth/register/')
      .send(objectToSend)
      .end((err, res) => {
        res.should.have.status(expectedStatusCode);
        done();
      });
  }

  it('it should return 201 user has been registered',
    (done) => expectStatus(done, 201, validAccount));

  it('it should return 400 when password is not provided',
    (done) => expectStatus(done, 400, { username: 'foo@example.com', companyName: 'foo' }));

  it('it should return 400 when wrong email is provided',
    (done) => expectStatus(done, 400, { username: 'foo@com', password: 'wrong', companyName: 'foo' }));

  it('it should return 400 when wrong email format is provided',
    (done) => expectStatus(done, 400, { username: 'foo', password: 'wrong', companyName: 'foo' }));

  it('it should return 400 when username is not provided',
    (done) => expectStatus(done, 400, { password: 'password', companyName: 'foo' }));

  it('it should return 400 when account is already registered',
    (done) => expectStatus(done, 400, validAccount));
});

describe('/POST auth/login', () => {
  it('it should return 200 with valid credentials', (done) => {
    chai
      .request(app)
      .post('/auth/register/')
      .send(validAccount)
      .then(() => {
        chai
          .request(app)
          .post('/auth/login/')
          .send(validAccount)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });

  it('it should return 400 with invalid credentials', (done) => {
    chai
      .request(app)
      .post('/auth/login/')
      .send({ username: 'foo@example.com', password: 'foo' })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
