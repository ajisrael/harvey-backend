import gardenBedData from './data/gardenBedData.js';
import {
  saveGardenBedData,
  deleteGardenBedData,
  createGardenBedTable,
} from './utilities/gardenBedHelper.js';

const importData = () => {
  gardenBedData.forEach((entry) => saveGardenBedData(entry));
};

const deleteData = () => {
  deleteGardenBedData();
};

// Uncomment if garden bed table needs to be recreated
//createGardenBedTable();

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
