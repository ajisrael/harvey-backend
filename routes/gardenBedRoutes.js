import express from 'express';
import { validateGardenBedData } from '../middleware/gardenBedValidator.js';
import { getData, postData } from '../controllers/gardenBedController.js';

const router = express.Router();

router.route('/data').get(getData).post(validateGardenBedData, postData);

export default router;
