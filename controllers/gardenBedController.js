import gardenBedConfig from '../config/gardenBedConfig.js';
import { saveGardenBedData } from '../utilities/gardenBedHelper.js';

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

// @desc    Save data from garden bed
// @route   GET /api/gardenBed/:id/data
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

export { getConfig, postData };
