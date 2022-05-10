import db from '../utilities/db.js';
import { solenoidStateTableName } from '../constants/tableNames.js';
import serverConfig from '../config/serverConfig.js';

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

function getSolenoidStateData() {
  const data = db.query(`SELECT * FROM ${solenoidStateTableName}`, {});

  return {
    data,
  };
}

function getSolenoidStateDataById(componentId) {
  const data = db.query(
    `SELECT * FROM ${solenoidStateTableName} WHERE componentId = '${componentId}'`,
    {}
  );

  return {
    data,
  };
}

function saveSolenoidStateData(solenoidStateData) {
  const { componentId, solenoidState, entryActive } = solenoidStateData;
  const result = db.run(
    `INSERT INTO ${solenoidStateTableName} (componentId, solenoidState, entryActive) VALUES (@componentId, @solenoidState, @entryActive)`,
    { componentId, solenoidState, entryActive }
  );

  let message = 'Error in saving solenoid state data';
  if (result.changes) {
    message = 'Solenoid state data saved successfully';
  }

  return { message };
}

function updateSolenoidState(componentId, solenoidState) {
  const result = db.run(
    `UPDATE ${solenoidStateTableName} SET solenoidState = ${solenoidState} WHERE componentId = '${componentId}';`,
    {}
  );
}

function getSolenoidStateById(componentId) {
  const solenoidStateData = db.query(
    `SELECT solenoidState FROM ${solenoidStateTableName} WHERE componentId = '${componentId}' LIMIT 1`,
    {}
  );
  return solenoidStateData[0].solenoidState;
}

function isSolenoidActive(componentId) {
  return getSolenoidStateById(componentId) !== 0;
}

function activateSolenoid(componentId) {
  console.log(`Activating ${componentId} solenoid.`);
  updateSolenoidState(componentId, serverConfig.solenoidOn);
  setTimeout(() => {
    console.log(`Timeout for ${componentId} solenoid reached.`);
    deactivateSolenoid(componentId);
  }, serverConfig.solenoidDelay);
}

function deactivateSolenoid(componentId) {
  console.log(`Deactivating ${componentId} solenoid.`);
  updateSolenoidState(componentId, serverConfig.solenoidOff);
}

export {
  createSolenoidStateTable,
  deleteSolenoidStateData,
  getSolenoidStateData,
  getSolenoidStateDataById,
  getSolenoidStateById,
  isSolenoidActive,
  saveSolenoidStateData,
  activateSolenoid,
  deactivateSolenoid,
};
