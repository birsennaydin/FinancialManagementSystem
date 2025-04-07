const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // server.js dosyanı buraya göre ayarla
const User = require('../models/User');
const mongoose = require('mongoose');

chai.should();
chai.use(chaiHttp);

describe('User Authentication', () => {
  before((done) => {
    mongoose.connect(process.env.MONGO_URI).then(() => done());
  });

  it('should register a new user', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123"
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User registered');
        done();
      });
  });

  it('should not register with existing email', (done) => {
    chai.request(server)
      .post('/api/users/register')
      .send({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123"
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('error');
        done();
      });
  });

  after((done) => {
    User.deleteMany({ email: "testuser@example.com" }).then(() => mongoose.disconnect().then(() => done()));
  });
});
