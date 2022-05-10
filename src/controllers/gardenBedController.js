import {
  getGardenBedData,
  getGardenBedDataById,
  saveGardenBedData,
} from '../services/gardenBedHelper.js';

// @desc    Return data for garden beds
// @route   GET /api/v1/gardenBed/data
// @access  Private
const getData = (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  if (req.body.bedId) {
    const bedId = req.body.bedId;
    console.log(`Returning garden bed data for bed ${bedId}`);
    const payload = getGardenBedDataById(page, bedId);
    res.json(payload);
  } else {
    console.log(`Returning all garden bed data`);
    const payload = getGardenBedData(page);
    res.json(payload);
  }
};

// @desc    Save data from garden bed
// @route   POST /api/v1/gardenBed/data
// @access  Private
const postData = (req, res) => {
  const bedId = req.body.bedId;
  console.log(`Data received from garden bed ${bedId}:`);
  console.log(req.body);

  const gardenBedData = {
    ...req.body,
  };

  const message = saveGardenBedData(gardenBedData);

  res.status(200).send('data received');
};

export { getData, postData };