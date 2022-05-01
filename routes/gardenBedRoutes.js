import express from 'express';
import { validateGardenBedData } from '../middleware/gardenBedValidator.js';
import { checkMoistureLevels } from '../middleware/checkMoistureLevels.js';
import { getData, postData } from '../controllers/gardenBedController.js';

const router = express.Router();

router
  .route('/data')
  .get(getData)
  .post(validateGardenBedData, checkMoistureLevels, postData);

export default router;
