process.env.NODE_ENV = 'test';

const chai = require('chai');
const path = require('path');
const chaiHttp = require('chai-http');
const { User } = require('../models/user');

const should = chai.should();
const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

const app = require('../app.js');

// Prepare
const validAccount = { username: 'foo@example.com', password: 'password', companyName: 'foo' };

chai.should();
chai.use(chaiHttp);

describe('auth', () => {
  before(() => {
    if (User.find({}).count > 0) {
      User.collection.drop();
    }
  });

  after(() => {
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
    function expectStatus(done, expectedStatusCode, objectToSend) {
      chai
        .request(app)
        .post('/auth/register/')
        .send(objectToSend).then((result) => {
          should.not.exist(result.err);
          result.should.have.status(expectedStatusCode);
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
