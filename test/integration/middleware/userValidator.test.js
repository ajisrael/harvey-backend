import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
import { resetDB } from '../../../src/seeder.js';
import {
  stubLogs,
  restoreLogs,
  getAdminUserToken,
} from '../../utilities/testHelper.js';
import users from '../../../src/data/userData.js';

const should = chai.should();
chai.use(chaiHttp);

const url = '/api/v1/users';

const newUser = {
  name: 'Alex Israels',
  email: 'alex@example.com',
  password: '1234567',
};

describe('userValidator', () => {
  before((done) => {
    stubLogs();
    resetDB();
    done();
  });

  after((done) => {
    restoreLogs();
    done();
  });

  it('should NOT register a new user when missing name', (done) => {
    const userMissingName = Object.assign({}, newUser);
    delete userMissingName.name;
    chai
      .request(server)
      .post(url)
      .set('Authorization', `Bearer ${getAdminUserToken()}`)
      .send(userMissingName)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.a('string');
        res.body.stack.should.be.a('string');
        res.body.message.should.eql('Name is empty');
        done();
      });
  });

  it('should NOT register a new user when missing email', (done) => {
    const userMissingEmail = Object.assign({}, newUser);
    delete userMissingEmail.email;
    chai
      .request(server)
      .post(url)
      .set('Authorization', `Bearer ${getAdminUserToken()}`)
      .send(userMissingEmail)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.a('string');
        res.body.stack.should.be.a('string');
        res.body.message.should.eql('Email is empty');
        done();
      });
  });

  it('should NOT register a new user when missing password', (done) => {
    const userMissingPassword = Object.assign({}, newUser);
    delete userMissingPassword.password;
    chai
      .request(server)
      .post(url)
      .set('Authorization', `Bearer ${getAdminUserToken()}`)
      .send(userMissingPassword)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.message.should.be.a('string');
        res.body.stack.should.be.a('string');
        res.body.message.should.eql('Password is empty');
        done();
      });
  });
});
