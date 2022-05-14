import { equal } from 'assert';
import sinon from 'sinon';
import { resetDB } from '../../../src/seeder.js';
import gardenBedData from '../../../src/data/gardenBedData.js';
import {
  getGardenBedData,
  getGardenBedDataById,
  saveGardenBedData,
} from '../../../src/services/gardenBedHelper.js';
import serverConfig from '../../../src/config/serverConfig.js';
import { gardenBedSaveSuccess } from '../../../src/constants/messages.js';

describe('gardenBedHelper', function () {
  beforeEach((done) => {
    sinon.stub(console, 'log'); // disable console.log
    sinon.stub(console, 'info'); // disable console.info
    sinon.stub(console, 'warn'); // disable console.warn
    sinon.stub(console, 'error'); // disable console.error
    resetDB();
    done();
  });

  afterEach((done) => {
    console.log.restore();
    console.info.restore();
    console.warn.restore();
    console.error.restore();
    done();
  });

  describe('getGardenBedData', function () {
    it('should return a page of garden bed data', function () {
      const result = getGardenBedData();
      const expectedData = gardenBedData.slice(0, serverConfig.listPerPage - 1);

      equal(result.data.length, expectedData.length);

      for (let i = 0; i < result.data.length; i++) {
        equal(result.data[i].bedId, expectedData[i].bedId);
        equal(result.data[i].airTemp, expectedData[i].airTemp);
        equal(result.data[i].soilTemp, expectedData[i].soilTemp);
        equal(result.data[i].light, expectedData[i].light);
        equal(result.data[i].moisture, expectedData[i].moisture);
        equal(result.data[i].humidity, expectedData[i].humidity);
      }
    });
  });

  describe('getGardenBedDataById', function () {
    it('should return a page of data for one garden bed', function () {
      const result = getGardenBedDataById(1, 'Bed_0');

      const expectedData = gardenBedData.filter((entry) => {
        return entry.bedId === 'Bed_0';
      });

      equal(result.data.length, expectedData.length);

      for (let i = 0; i < result.data.length; i++) {
        equal(result.data[i].bedId, expectedData[i].bedId);
        equal(result.data[i].airTemp, expectedData[i].airTemp);
        equal(result.data[i].soilTemp, expectedData[i].soilTemp);
        equal(result.data[i].light, expectedData[i].light);
        equal(result.data[i].moisture, expectedData[i].moisture);
        equal(result.data[i].humidity, expectedData[i].humidity);
      }
    });
  });

  describe('saveGardenBedData', function () {
    it('should get success message after saving garden bed data', function () {
      const newGardenBedData = {
        bedId: 'Bed_5',
        airTemp: 91.1,
        soilTemp: 43.2,
        light: 0.8,
        moisture: 0.2,
        humidity: 0.9,
      };

      const message = gardenBedSaveSuccess;

      equal(saveGardenBedData(newGardenBedData).message, message);
    });
  });
});
