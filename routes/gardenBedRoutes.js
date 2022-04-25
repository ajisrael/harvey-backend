import express from 'express';
const router = express.Router();
import {
  getConfig,
  getData,
  getDataById,
  postData,
} from '../controllers/gardenBedController.js';

router.route('/:id/config').get(getConfig);
router.route('/data').get(getData);
router.route('/:id/data').get(getDataById).post(postData);

export default router;
