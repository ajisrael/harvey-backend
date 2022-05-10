import db from '../utilities/db.js';
import { pumpStateTableName } from '../constants/tableNames.js';
import serverConfig from '../config/serverConfig.js';

function createPumpStateTable() {
  return db.run(
    `CREATE TABLE ${pumpStateTableName}( ` +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'componentId TEXT, ' +
      'pumpState INTEGER, ' +
      'entryActive INTEGER, ' +
      'created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ' +
      '); ',
    {}
  );
}

function deletePumpStateData() {
  return db.run(`DELETE FROM ${pumpStateTableName};`, {});
}

function getPumpStateData() {
  const data = db.query(`SELECT * FROM ${pumpStateTableName}`, {});

  return {
    data,
  };
}

function getPumpStateDataById(componentId) {
  const data = db.query(
    `SELECT * FROM ${pumpStateTableName} WHERE componentId = '${componentId}'`,
    {}
  );

  return {
    data,
  };
}

function savePumpStateData(pumpStateData) {
  const { componentId, pumpState, entryActive } = pumpStateData;
  const result = db.run(
    `INSERT INTO ${pumpStateTableName} (componentId, pumpState, entryActive) VALUES (@componentId, @pumpState, @entryActive)`,
    { componentId, pumpState, entryActive }
  );

  let message = 'Error in saving pump state data';
  if (result.changes) {
    message = 'Pump state data saved successfully';
  }

  return { message };
}

function updatePumpState(componentId, pumpState) {
  const result = db.run(
    `UPDATE ${pumpStateTableName} SET pumpState = ${pumpState} WHERE componentId = '${componentId}';`,
    {}
  );
}

function getPumpStateById(componentId) {
  const pumpStateData = db.query(
    `SELECT pumpState FROM ${pumpStateTableName} WHERE componentId = '${componentId}' LIMIT 1`,
    {}
  );
  return pumpStateData[0].pumpState;
}

function isPumpActive(componentId) {
  return getPumpStateById(componentId) !== 0;
}

function activatePump(componentId) {
  console.log(`Activating ${componentId} pump.`);
  updatePumpState(componentId, serverConfig.pumpOn);
  setTimeout(() => {
    console.log(`Timeout for ${componentId} pump reached.`);
    deactivatePump(componentId);
  }, serverConfig.pumpDelay);
}

function deactivatePump(componentId) {
  console.log(`Deactivating ${componentId} pump.`);
  updatePumpState(componentId, serverConfig.pumpOff);
}

export {
  activatePump,
  createPumpStateTable,
  deactivatePump,
  deletePumpStateData,
  getPumpStateData,
  getPumpStateDataById,
  isPumpActive,
  savePumpStateData,
};
