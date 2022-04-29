import gardenBedData from './data/gardenBedData.js';
import path from 'path';
import {
  createGardenBedTable,
  saveGardenBedData,
  deleteGardenBedData,
} from './services/gardenBedHelper.js';
import sqlite from 'better-sqlite3';

const db = new sqlite(path.resolve('harvey.db'));

const deleteData = () => {
  deleteGardenBedData();
};

const importData = () => {
  gardenBedData.forEach((entry) => saveGardenBedData(entry));
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  try {
    createGardenBedTable();
  } catch (error) {}
  importData();
}
