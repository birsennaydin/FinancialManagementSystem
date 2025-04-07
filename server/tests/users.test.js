const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('User API', () => {
  it('should return 404 for GET /api/users', async () => {
    const res = await chai.request(app).get('/api/users');
    expect(res).to.have.status(404);
  });

  it('should register a new user', async () => {
    const res = await chai.request(app).post('/api/users/register').send({
      name: 'Birsen Test',
      email: `birsen${Date.now()}@test.com`,
      password: 'test1234'
    });

    expect(res).to.have.status(201);
    expect(res.body.message).to.equal('User registered');
  });
});
