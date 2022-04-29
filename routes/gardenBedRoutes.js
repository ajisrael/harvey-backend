import express from 'express';
import { getData, postData } from '../controllers/gardenBedController.js';

const router = express.Router();

router.route('/data').get(getData).post(postData);

export default router;
