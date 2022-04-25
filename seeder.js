import gardenBedData from './data/gardenBedData.js';
import path from 'path';
import {
  saveGardenBedData,
  deleteGardenBedData,
} from './utilities/gardenBedHelper.js';
import sqlite from 'better-sqlite3';

const db = new sqlite(path.resolve('harvey.db'));

const deleteData = () => {
  deleteGardenBedData();
};

const importData = () => {
  gardenBedData.forEach((entry) => saveGardenBedData(entry));
};

function createGardenBedTable() {
  return db
    .prepare(
      'CREATE TABLE gardenBed( ' +
        'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
        'bedId TEXT, ' +
        'airTemp REAL, ' +
        'soilTemp REAL, ' +
        'light REAL, ' +
        'moisture REAL, ' +
        'humidity REAL, ' +
        'created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL ' +
        '); '
    )
    .run();
}

if (process.argv[2] === '-d') {
  deleteData();
} else {
  try {
    createGardenBedTable();
  } catch (error) {}
  importData();
}
