import db from '../utilities/db.js';
import serverConfig from '../config/serverConfig.js';
import { solenoidStateTableName } from '../constants/tableNames.js';

function createSolenoidStateTable() {
  return db.run(
    `CREATE TABLE ${solenoidStateTableName}( ` +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'componentId TEXT, ' +
      'solenoidState INTEGER, ' +
      'entryActive INTEGER, ' +
      'created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ' +
      '); ',
    {}
  );
}

function deleteSolenoidStateData() {
  return db.run(`DELETE FROM ${solenoidStateTableName};`, {});
}

function getSolenoidState(page = 1) {
  const offset = (page - 1) * serverConfig.listPerPage;
  const data = db.query(`SELECT * FROM solenoidState LIMIT ?,?`, [
    offset,
    serverConfig.listPerPage,
  ]);
  const meta = { page };

  return {
    data,
    meta,
  };
}

function getSolenoidStateById(page = 1, componentId) {
  const offset = (page - 1) * serverConfig.listPerPage;
  const data = db.query(
    `SELECT * FROM ${solenoidStateTableName} WHERE componentId = ${componentId} LIMIT ?,?`,
    [offset, serverConfig.listPerPage]
  );
  const meta = { page };

  return {
    data,
    meta,
  };
}

function saveSolenoidStateData(gardenBedData) {
  const { componentId, solenoidState, entryActive } = gardenBedData;
  const result = db.run(
    `INSERT INTO ${solenoidState} (componentId, solenoidState, entryActive) VALUES (@componentId, @solenoidState, @entryActive)`,
    { componentId, solenoidState, entryActive }
  );

  let message = 'Error in saving solenoid state data';
  if (result.changes) {
    message = 'Solenoid state data saved successfully';
  }

  return { message };
}

export {
  createSolenoidStateTable,
  deleteSolenoidStateData,
  getSolenoidState,
  getSolenoidStateById,
  saveSolenoidStateData,
};
