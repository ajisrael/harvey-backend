import gardenBedConfig from '../config/gardenBedConfig.js';

// @desc    Return garden bed config values
// @route   GET /api/gardenBed/config
// @access  Public
const getConfig = (req, res) => {
  console.log('Returning garden bed config');
  res.json(gardenBedConfig);
};

// @desc    Save data from garden bed
// @route   GET /api/gardenBed/data
// @access  Public
const postData = (req, res) => {
  console.log('Data received from garden bed:');
  console.log(req.body);
  res.send('data received').status(200);
};

export { getConfig, postData };
