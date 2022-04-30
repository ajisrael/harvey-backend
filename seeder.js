import path from 'path';
import sqlite from 'better-sqlite3';
import {
  gardenBedTableName,
  solenoidStateTableName,
} from './constants/tableNames.js';
import gardenBedData from './data/gardenBedData.js';
import solenoidStateData from './data/solenoidStateData.js';
import {
  createGardenBedTable,
  deleteGardenBedData,
  saveGardenBedData,
} from './services/gardenBedHelper.js';
import {
  createSolenoidStateTable,
  deleteSolenoidStateData,
  saveSolenoidStateData,
} from './services/solenoidHelper.js';

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
  tryToDeleteData(deleteGardenBedData, gardenBedTableName);
  tryToDeleteData(deleteSolenoidStateData, solenoidStateTableName);
};

const tryToCreateTables = () => {
  tryToCreateTable(createGardenBedTable, gardenBedTableName);
  tryToCreateTable(createSolenoidStateTable, solenoidStateTableName);
};

const importData = () => {
  gardenBedData.forEach((entry) => saveGardenBedData(entry));
  solenoidStateData.forEach((entry) => saveSolenoidStateData(entry));
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  tryToCreateTables();
  importData();
}
