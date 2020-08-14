/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const path = require('path');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const should = chai.should();
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

const app = require('../app.js');

let mongoServer;

// Prepare
const validAccount = { username: 'foo@example.com', password: 'password', companyName: 'foo' };

chai.should();
chai.use(chaiHttp);

describe('auth', () => {
  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  function createAccount() {
    return chai
      .request(app)
      .post('/auth/register/')
      .send(validAccount);
  }

  async function getLoggedInAgent() {
    await createAccount();
    const agent = chai.request.agent(app);
    await agent.post('/auth/login/').send(validAccount);
    return agent;
  }

  describe('/POST auth/register', () => {
    async function expectStatus(done, expectedStatusCode, objectToSend) {
      const result = await chai
        .request(app)
        .post('/auth/register/')
        .send(objectToSend);
      should.not.exist(result.err);
      result.should.have.status(expectedStatusCode);
    }

    it('it should return 201 user has been registered',
      async () => expectStatus(undefined, 201, validAccount));

    it('it should return 400 when password is not provided',
      async () => expectStatus(undefined, 400, { username: 'foo@example.com', companyName: 'foo' }));

    it('it should return 400 when wrong email is provided',
      async () => expectStatus(undefined, 400, { username: 'foo@com', password: 'wrong', companyName: 'foo' }));

    it('it should return 400 when wrong email format is provided',
      async () => expectStatus(undefined, 400, { username: 'foo', password: 'wrong', companyName: 'foo' }));

    it('it should return 400 when username is not provided',
      async () => expectStatus(undefined, 400, { password: 'password', companyName: 'foo' }));

    it('it should return 400 when account is already registered',
      async () => expectStatus(undefined, 400, validAccount));
  });

  describe('/POST auth/login', () => {
    it('it should return 200 with valid credentials', async () => {
      await createAccount();
      const result = await chai
        .request(app)
        .post('/auth/login/')
        .send(validAccount);
      should.not.exist(result.err);
      result.should.have.status(200);
    });

    it('it should return 400 with invalid credentials', async () => {
      const result = await chai
        .request(app)
        .post('/auth/login/')
        .send({ username: 'foo@example.com', password: 'foo' });
      should.not.exist(result.err);
      result.should.have.status(400);
    });
  });

  describe('/GET auth/me', () => {
    it('it should return 200 when logged in', async () => {
      // Prepare
      const agent = await getLoggedInAgent();
      // Act
      const result = await agent.get('/auth/me');
      // Assert
      should.not.exist(result.err);
      result.should.have.status(200);
    });

    it('it should return 401 when not logged in', async () => {
      // Prepare
      const agent = chai.request.agent(app);
      // Act
      const result = await agent.get('/auth/me');
      // Assert
      should.not.exist(result.err);
      result.should.have.status(401);
    });
  });

  describe('/PATCH auth/me', () => {
    it('it should return 202 when updated', async () => {
      // Prepare
      const agent = await getLoggedInAgent();

      (await agent.patch('/auth/me')
        .send({ terms: ['foo'] })).should.have.status(202);

      (await agent.patch('/auth/me')
        .send({ terms: ['foo'], email: 'foo@example.com' }))
        .should.have.status(202);

      (await agent.patch('/auth/me')
        .send({ crawlers: ['twitter'] }))
        .should.have.status(202);
    });

    it('it should return 4** when updating with wrong values', async () => {
      // Prepare
      const agent = await getLoggedInAgent();

      (await agent.patch('/auth/me')
        .send({ email: ['foo'] }))
        .should.have.status(400);

      (await agent.patch('/auth/me')
        .send({ terms: 3, email: 'foo@example.com' }))
        .should.have.status(400);

      (await agent.patch('/auth/me')
        .send({ companyName: ' ' }))
        .should.have.status(400);

      (await agent.patch('/auth/me')
        .send({ companyName: '' }))
        .should.have.status(400);

      (await agent.patch('/auth/me')
        .send({ email: 'foo' }))
        .should.have.status(400);
    });

    it('it should return 401 when not logged in', async () => {
      // Prepare
      const agent = chai.request.agent(app);

      const result = await agent.get('/auth/me');
      should.not.exist(result.err);
      result.should.have.status(401);
    });
  });
});
