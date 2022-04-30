import path from 'path';
import sqlite from 'better-sqlite3';
import {
  gardenBedTableName,
} from './constants/tableNames.js';
import gardenBedData from './data/gardenBedData.js';
import {
  createGardenBedTable,
  deleteGardenBedData,
  saveGardenBedData,
} from './services/gardenBedHelper.js';

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
};

const tryToCreateTables = () => {
  tryToCreateTable(createGardenBedTable, gardenBedTableName);
};

const importData = () => {
  gardenBedData.forEach((entry) => saveGardenBedData(entry));
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  tryToCreateTables();
  importData();
}
