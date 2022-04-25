import gardenBedConfig from '../config/gardenBedConfig.js';
import {
  saveGardenBedData,
  getGardenBedData,
  getGardenBedDataById,
} from '../utilities/gardenBedHelper.js';

// @desc    Return garden bed config values
// @route   GET /api/gardenBed/:id/config
// @access  Public
const getConfig = (req, res) => {
  const id = req.params.id;
  const config = gardenBedConfig[id];
  console.log(`Returning configuration for garden bed ${id}:`);
  console.log(config);
  res.json(config);
};

// @desc    Return data for all garden beds
// @route   GET /api/gardenBed/data
// @access  Public
const getData = (req, res) => {
  console.log(`Returning all garden bed data`);
  const payload = getGardenBedData();
  res.json(payload);
};

// @desc    Return data for a garden bed by id
// @route   GET /api/gardenBed/:id/data
// @access  Public
const getDataById = (req, res) => {
  const id = req.params.id;
  console.log(`Returning garden bed data for bed ${id}`);
  const payload = getGardenBedDataById(1, id);
  res.json(payload);
};

// @desc    Save data from garden bed
// @route   POST /api/gardenBed/:id/data
// @access  Public
const postData = (req, res) => {
  const id = req.params.id;
  console.log(`Data received from garden bed ${id}:`);
  console.log(req.body);

  const gardenBedData = {
    bedId: id,
    ...req.body,
  };

  const message = saveGardenBedData(gardenBedData);

  res.send('data received').status(200);
};

export { getConfig, getData, getDataById, postData };
