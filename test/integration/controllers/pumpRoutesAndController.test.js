import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/server.js';
import { resetDB } from '../../../src/seeder.js';
import { stubLogs, restoreLogs } from '../../utilities/testSetup.js';
import generateToken from '../../../src/utilities/generateToken.js';
import pumpStateData from '../../../src/data/pumpStateData.js';

const should = chai.should();
chai.use(chaiHttp);

const url = '/api/v1/pumpState/data';

const checkPumpStateData = (data, componentId = null) => {
  data.forEach((entry) => {
    entry.id.should.be.a('number');
    entry.componentId.should.be.a('string');
    entry.pumpState.should.be.a('number');
    entry.entryActive.should.be.a('number');
    entry.created_at.should.be.a('string');
    if (componentId) {
      entry.componentId.should.eql(componentId);
    }
  });
};

describe('Pump State Routes', () => {
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
    it('should get all pump state data', (done) => {
      chai
        .request(server)
        .get(url)
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          checkPumpStateData(res.body.data);
          done();
        });
    });

    it('should get pump state data by id', (done) => {
      const componentId = pumpStateData[0].componentId;
      chai
        .request(server)
        .get(url)
        .set('Authorization', 'Bearer ' + token)
        .send({ componentId: componentId })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          checkPumpStateData(res.body.data, componentId);
          done();
        });
    });
  });
});
