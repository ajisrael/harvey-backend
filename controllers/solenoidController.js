import {
  getSolenoidStateData,
  getSolenoidStateDataById,
} from '../services/solenoidHelper.js';

// @desc    Return data for of solenoid states for components
// @route   GET /api/solenoidState/data/
// @access  Public
const getData = (req, res) => {
  const page = req.query.page ? req.query.page : 1;
  if (req.body.componentId) {
    const componentId = req.body.componentId;
    console.log(`Returning solenoid state data for component ${componentId}`);
    const payload = getSolenoidStateDataById(page, componentId);
    res.json(payload);
  } else {
    console.log(`Returning all solenoid state data`);
    const payload = getSolenoidStateData(page);
    res.json(payload);
  }
};

export { getData };
