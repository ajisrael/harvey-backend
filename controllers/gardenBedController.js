import gardenBedConfig from '../config/gardenBedConfig.js';
import {
  saveGardenBedData,
  getGardenBedData,
  getGardenBedDataById,
} from '../utilities/gardenBedHelper.js';

// @desc    Return garden bed config values
// @route   GET /api/gardenBed/:bedId/config
// @access  Public
const getConfig = (req, res) => {
  const bedId = req.params.bedId;
  const config = gardenBedConfig[bedId];
  if (config) {
    console.log(`Returning configuration for garden bed ${bedId}:`);
    console.log(config);
    res.json(config);
  } else {
    const message = `No config found for garden bed ${bedId}`;
    console.log(message);
    res.status(404).send(message);
  }
};

// @desc    Return data for all garden beds
// @route   GET /api/gardenBed/data/
// @access  Public
const getData = (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  console.log(`Returning all garden bed data`);
  const payload = getGardenBedData(page);
  res.json(payload);
};

// @desc    Return data for a garden bed by bedId
// @route   GET /api/gardenBed/:bedId/data
// @access  Public
const getDataById = (req, res) => {
  const bedId = req.params.bedId;
  const page = req.query.page ? req.query.page : 1;
  console.log(`Returning garden bed data for bed ${bedId}`);
  const payload = getGardenBedDataById(page, bedId);
  res.json(payload);
};

// @desc    Save data from garden bed
// @route   POST /api/gardenBed/:bedId/data
// @access  Public
const postData = (req, res) => {
  const bedId = req.params.bedId;
  console.log(`Data received from garden bed ${bedId}:`);
  console.log(req.body);

  const gardenBedData = {
    bedId: bedId,
    ...req.body,
  };

  const message = saveGardenBedData(gardenBedData);

  res.status(200).send('data received');
};

export { getConfig, getData, getDataById, postData };
