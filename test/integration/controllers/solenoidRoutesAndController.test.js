import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
import { resetDB } from '../../../src/seeder.js';
import { stubLogs, restoreLogs } from '../../utilities/testSetup.js';
import generateToken from '../../../src/utilities/generateToken.js';
import solenoidStateData from '../../../src/data/solenoidStateData.js';

const should = chai.should();
chai.use(chaiHttp);

const url = '/api/v1/solenoidState/data';

const checkSolenoidStateData = (data, componentId = null) => {
  data.forEach((entry) => {
    entry.id.should.be.a('number');
    entry.componentId.should.be.a('string');
    entry.solenoidState.should.be.a('number');
    entry.entryActive.should.be.a('number');
    entry.created_at.should.be.a('string');
    if (componentId) {
      entry.componentId.should.eql(componentId);
    }
  });
};

describe('Solenoid State Routes', () => {
  let token = '';
  before((done) => {
    stubLogs();
    resetDB();
    token = generateToken('1');
    done();
  });

  after((done) => {
    restoreLogs();
    done();
  });

  describe(`GET ${url}`, () => {
    it('should get all solenoid state data', (done) => {
      chai
        .request(server)
        .get(url)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          checkSolenoidStateData(res.body.data);
          done();
        });
    });

    it('should get solenoid state data by id', (done) => {
      const componentId = solenoidStateData[0].componentId;
      chai
        .request(server)
        .get(url)
        .set('Authorization', 'Bearer ' + token)
        .send({ componentId: componentId })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          checkSolenoidStateData(res.body.data, componentId);
          done();
        });
    });
  });
});
