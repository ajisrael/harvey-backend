import path from 'path';
import sqlite from 'better-sqlite3';
import {
  actionTableName,
  gardenBedTableName,
  pumpStateTableName,
  solenoidStateTableName,
  userTableName,
} from './constants/tableNames.js';
import actionData from './data/actionData.js';
import gardenBedData from './data/gardenBedData.js';
import pumpStateData from './data/pumpStateData.js';
import solenoidStateData from './data/solenoidStateData.js';
import users from './data/userData.js';
import {
  createActionTable,
  deleteActionData,
  saveActionData,
} from './services/actionsHelper.js';
import {
  createGardenBedTable,
  deleteGardenBedData,
  saveGardenBedData,
} from './services/gardenBedHelper.js';
import {
  createPumpStateTable,
  deletePumpStateData,
  savePumpStateData,
} from './services/pumpHelper.js';
import {
  createSolenoidStateTable,
  deleteSolenoidStateData,
  saveSolenoidStateData,
} from './services/solenoidHelper.js';
import {
  createUserTable,
  deleteUserData,
  saveUserData,
} from './services/userHelper.js';

const db = new sqlite(path.resolve('harvey.db'));

const tryToCreateTable = (createTableFunction, tableName) => {
  try {
    createTableFunction();
  } catch (error) {
    console.log(`Failed to create ${tableName} table: ${error.message}`);
  }
};

const tryToDeleteData = (deleteDataFunction, tableName) => {
  try {
    deleteDataFunction();
  } catch (error) {
    console.log(`Failed to delete ${tableName} table: ${error.message}`);
  }
};

const deleteData = () => {
  tryToDeleteData(deleteActionData, actionTableName);
  tryToDeleteData(deleteGardenBedData, gardenBedTableName);
  tryToDeleteData(deletePumpStateData, pumpStateTableName);
  tryToDeleteData(deleteSolenoidStateData, solenoidStateTableName);
  tryToDeleteData(deleteUserData, userTableName);
};

const tryToCreateTables = () => {
  tryToCreateTable(createActionTable, actionTableName);
  tryToCreateTable(createGardenBedTable, gardenBedTableName);
  tryToCreateTable(createPumpStateTable, pumpStateTableName);
  tryToCreateTable(createSolenoidStateTable, solenoidStateTableName);
  tryToCreateTable(createUserTable, userTableName);
};

const importData = () => {
  actionData.forEach((entry) => saveActionData(entry));
  gardenBedData.forEach((entry) => saveGardenBedData(entry));
  pumpStateData.forEach((entry) => savePumpStateData(entry));
  solenoidStateData.forEach((entry) => saveSolenoidStateData(entry));
  users.forEach((entry) => saveUserData(entry));
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  tryToCreateTables();
  importData();
}
