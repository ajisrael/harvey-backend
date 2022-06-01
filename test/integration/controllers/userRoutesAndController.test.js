import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
import { resetDB } from '../../../src/seeder.js';
import { stubLogs, restoreLogs } from '../../utilities/testHelper.js';
import users from '../../../src/data/userData.js';

const should = chai.should();
chai.use(chaiHttp);

const url = '/api/v1/users';

const checkUsersData = (data, name, email) => {
  data._id.should.be.a('number');
  data.name.should.be.a('string');
  data.email.should.be.a('string');
  data.isAdmin.should.be.a('boolean');
  data.token.should.be.a('string');
  data.name.should.eql(name);
  data.email.should.eql(email);
};

describe('Solenoid State Controller and Routes', () => {
  before((done) => {
    stubLogs();
    resetDB();
    done();
  });

  after((done) => {
    restoreLogs();
    done();
  });

  describe(`POST ${url}/login`, () => {
    it('should login a user', (done) => {
      const email = users[0].email;
      const password = users[0].password;

      chai
        .request(server)
        .post(`${url}/login`)
        .send({ email, password })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          checkUsersData(res.body, users[0].name, users[0].email);
          done();
        });
    });
  });
});
