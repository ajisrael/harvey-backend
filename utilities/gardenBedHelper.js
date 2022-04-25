import db from './db.js';
import serverConfig from '../config/serverConfig.js';

function validateGardenBedData(gardenBedData) {
  let messages = [];

  if (!gardenBedData) {
    messages.push('No object is provided');
  }

  if (!gardenBedData.bedId) {
    messages.push('Bed ID is empty');
  }

  if (!gardenBedData.airTemp) {
    messages.push('Air Temp is empty');
  }

  if (!gardenBedData.soilTemp) {
    messages.push('Soil Temp is empty');
  }

  if (!gardenBedData.light) {
    messages.push('Light is empty');
  }

  if (!gardenBedData.moisture) {
    messages.push('Moisture is empty');
  }

  if (!gardenBedData.humidity) {
    messages.push('Humidity is empty');
  }

  if (messages.length) {
    let error = new Error(messages.join(', '));
    error.statusCode = 400;

    throw error;
  }
}

function createGardenBedTable() {
  return db.run(
    'CREATE TABLE gardenBed( ' +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'bedId TEXT, ' +
      'airTemp REAL, ' +
      'soilTemp REAL, ' +
      'light REAL, ' +
      'moisture REAL, ' +
      'humidity REAL, ' +
      'created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ' +
      '); ',
    {}
  );
}

function deleteGardenBedData() {
  return db.run('DELETE FROM gardenBed;', {});
}

function saveGardenBedData(gardenBedData) {
  validateGardenBedData(gardenBedData);
  const { bedId, airTemp, soilTemp, light, moisture, humidity } = gardenBedData;
  const result = db.run(
    'INSERT INTO gardenBed (bedId, airTemp, soilTemp, light, moisture, humidity) VALUES (@bedId, @airTemp, @soilTemp, @light, @moisture, @humidity)',
    { bedId, airTemp, soilTemp, light, moisture, humidity }
  );

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Garden bed data saved successfully';
  }

  return { message };
}

function getGardenBedData(page = 1) {
  const offset = (page - 1) * serverConfig.listPerPage;
  const data = db.query(`SELECT * FROM gardenBed LIMIT ?,?`, [
    offset,
    serverConfig.listPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function getGardenBedDataById(page = 1, bedId) {
  const offset = (page - 1) * serverConfig.listPerPage;
  const data = db.query(
    `SELECT * FROM gardenBed WHERE bedId = ${bedId} LIMIT ?,?`,
    [offset, serverConfig.listPerPage]
  );
  const meta = { page };

  return {
    data,
    meta,
  };
}

export {
  saveGardenBedData,
  getGardenBedData,
  getGardenBedDataById,
  createGardenBedTable,
  deleteGardenBedData,
};
