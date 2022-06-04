import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
import { resetDB } from '../../../src/seeder.js';
import {
  stubLogs,
  restoreLogs,
  getAdminUserToken,
} from '../../utilities/testHelper.js';
import serverConfig from '../../../src/config/serverConfig.js';
import { checkValidationResponse } from '../../utilities/dataChecker.js';

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

  describe('validateLoginData', () => {
    it('should NOT login a user when body is empty', (done) => {
      chai
        .request(server)
        .post(`${url}/login`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'body required for request');
          done();
        });
    });

    it('should NOT login a user when email is empty', (done) => {
      const loginUser = { password: '1234567' };
      chai
        .request(server)
        .post(`${url}/login`)
        .send(loginUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'email is empty');
          done();
        });
    });

    it('should NOT login a user when email is not a string', (done) => {
      const loginUser = { email: 1, password: '1234567' };
      chai
        .request(server)
        .post(`${url}/login`)
        .send(loginUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'email must be a string');
          done();
        });
    });

    it('should NOT login a user when password is empty', (done) => {
      const loginUser = { email: 'test@test.com' };
      chai
        .request(server)
        .post(`${url}/login`)
        .send(loginUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'password is empty');
          done();
        });
    });

    it('should NOT login a user when password is not a string', (done) => {
      const loginUser = { email: 'test@test.com', password: 1 };
      chai
        .request(server)
        .post(`${url}/login`)
        .send(loginUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'password must be a string');
          done();
        });
    });
  });

  describe('validateRegistrationData', () => {
    it('should NOT register a new user when body is empty', (done) => {
      chai
        .request(server)
        .post(url)
        .set('Authorization', `Bearer ${getAdminUserToken()}`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'body required for request');
          done();
        });
    });

    it('should NOT register a new user when missing name', (done) => {
      const registerUser = Object.assign({}, newUser);
      delete registerUser.name;
      chai
        .request(server)
        .post(url)
        .set('Authorization', `Bearer ${getAdminUserToken()}`)
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'name is empty');
          done();
        });
    });

    it('should NOT register a new user when name is not a string', (done) => {
      const registerUser = Object.assign({}, newUser);
      delete registerUser.name;
      registerUser.name = 1;
      chai
        .request(server)
        .post(url)
        .set('Authorization', `Bearer ${getAdminUserToken()}`)
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'name must be a string');
          done();
        });
    });

    it('should NOT register a new user when missing email', (done) => {
      const registerUser = Object.assign({}, newUser);
      delete registerUser.email;
      chai
        .request(server)
        .post(url)
        .set('Authorization', `Bearer ${getAdminUserToken()}`)
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'email is empty');
          done();
        });
    });

    it('should NOT register a new user when email is not a string', (done) => {
      const registerUser = Object.assign({}, newUser);
      delete registerUser.email;
      registerUser.email = 1;
      chai
        .request(server)
        .post(url)
        .set('Authorization', `Bearer ${getAdminUserToken()}`)
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'email must be a string');
          done();
        });
    });

    it('should NOT register a new user when email is not correctly formatted', () => {});

    it('should NOT register a new user when missing password', (done) => {
      const registerUser = Object.assign({}, newUser);
      delete registerUser.password;
      chai
        .request(server)
        .post(url)
        .set('Authorization', `Bearer ${getAdminUserToken()}`)
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'password is empty');
          done();
        });
    });

    it('should NOT register a new user when password is not a string', (done) => {
      const registerUser = Object.assign({}, newUser);
      delete registerUser.password;
      registerUser.password = 1;
      chai
        .request(server)
        .post(url)
        .set('Authorization', `Bearer ${getAdminUserToken()}`)
        .send(registerUser)
        .end((err, res) => {
          res.should.have.status(400);
          checkValidationResponse(res.body, 'password must be a string');
          done();
        });
    });

    it(`should NOT register a new user when password is less than ${serverConfig.passwordMinLength} characters`, () => {});

    it(`should NOT register a new user when password does not contain a number`, () => {});

    it(`should NOT register a new user when password does not contain a symbol`, () => {});
  });
});
