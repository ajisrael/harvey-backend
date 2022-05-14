import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import server from '../../../src/server.js';
import { resetDB } from '../../../src/seeder.js';
import generateToken from '../../../src/utilities/generateToken.js';
import actionData from '../../../src/data/actionData.js';

const should = chai.should();
chai.use(chaiHttp);

describe('Actions Routes', () => {
  let token = '';
  before((done) => {
    sinon.stub(console, 'log'); // disable console.log
    sinon.stub(console, 'info'); // disable console.info
    sinon.stub(console, 'warn'); // disable console.warn
    sinon.stub(console, 'error'); // disable console.error
    resetDB();
    token = generateToken('1');
    done();
  });

  after((done) => {
    console.log.restore();
    console.info.restore();
    console.warn.restore();
    console.error.restore();
    done();
  });

  describe('GET /api/v1/actions/data', () => {
    let action = {};
    it('should get all the actions', (done) => {
      chai
        .request(server)
        .get('/api/v1/actions/data')
        .set('Authorization', 'Bearer ' + token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(actionData.length);
          action = res.body.data[0];
          res.body.meta.should.be.a('object');
          res.body.meta.page.should.be.a('number');
          res.body.meta.page.should.be.eql(1);
          done();
        });
    });
    it('should get an action by ID', (done) => {
      chai
        .request(server)
        .get('/api/v1/actions/data')
        .set('Authorization', 'Bearer ' + token)
        .send({ actionId: action.id })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.actionName.should.be.a('string');
          res.body.bedIds.should.be.a('array');
          res.body.actionType.should.be.a('string');
          res.body.actionCompletedType.should.be.a('string');
          res.body.actionCompleted.should.be.a('number');
          done();
        });
    });
  });

  describe('POST /api/v1/actions/data', () => {
    let action = {
      actionName: 'IntegrationTestAction',
      bedIds: ['Bed_0', 'Bed_1'],
      actionType: 'Water',
      actionCompletedType: 'Moisture',
      actionCompleted: 0.45,
    };

    it('should save an action', (done) => {
      chai
        .request(server)
        .post('/api/v1/actions/data')
        .set('Authorization', 'Bearer ' + token)
        .send(action)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
