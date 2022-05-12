import db from '../utilities/db.js';
import serverConfig from '../config/serverConfig.js';
import { actionTableName } from '../constants/tableNames.js';

function createActionTable() {
  return db.run(
    `CREATE TABLE ${actionTableName}( ` +
      'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
      'bedIds BLOB, ' +
      'actionType TEXT, ' +
      'actionCompletedType TEXT, ' +
      'actionCompleted REAL, ' +
      'created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ' +
      '); ',
    {}
  );
}

function deleteActionData() {
  return db.run(`DELETE FROM ${actionTableName};`, {});
}

function convertActionDataBedIdsToArray(actionData) {
  let convertedActionData = [];

  actionData.forEach((entry) => {
    const convertedEntry = {
      id: entry.id,
      actionType: entry.actionType,
      actionCompletedType: entry.actionCompletedType,
      actionCompleted: entry.actionCompleted,
    };

    convertedEntry.bedIds = entry.bedIds.split(',');

    convertedActionData.push(convertedEntry);
  });

  return convertedActionData;
}

function getActionData(page = 1) {
  const offset = (page - 1) * serverConfig.listPerPage;
  const rawData = db.query(`SELECT * FROM ${actionTableName} LIMIT ?,?`, [
    offset,
    serverConfig.listPerPage,
  ]);
  const meta = { page };

  const data = convertActionDataBedIdsToArray(rawData);

  return {
    data,
    meta,
  };
}

function getActionDataById(id) {
  const rawData = db.query(
    `SELECT * FROM ${actionTableName} WHERE id = '${id}' LIMIT 1`,
    {}
  );

  const data = convertActionDataBedIdsToArray(rawData);

  return data[0];
}

function saveActionData(actionData) {
  const { bedIds, actionType, actionCompletedType, actionCompleted } =
    actionData;
  const bedIdsString = bedIds.join(',');
  const result = db.run(
    `INSERT INTO ${actionTableName} (bedIds, actionType, actionCompletedType, actionCompleted) ` +
      `VALUES (@bedIdsString, @actionType, @actionCompletedType, @actionCompleted)`,
    { bedIdsString, actionType, actionCompletedType, actionCompleted }
  );

  let message = 'Error in saving action data';
  if (result.changes) {
    message = 'Action data saved successfully';
  }

  return { message };
}

export {
  createActionTable,
  deleteActionData,
  getActionData,
  getActionDataById,
  saveActionData,
};
