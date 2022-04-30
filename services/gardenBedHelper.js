import db from '../utilities/db.js';
import serverConfig from '../config/serverConfig.js';

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

function deleteGardenBedTable() {
  return db.run('DELETE FROM gardenBed;', {});
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

function saveGardenBedData(gardenBedData) {
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

export {
  createGardenBedTable,
  deleteGardenBedTable,
  getGardenBedData,
  getGardenBedDataById,
  saveGardenBedData,
};
