import express from 'express';
const router = express.Router();
import { getConfig, postData } from '../controllers/gardenBedController.js';

router.route('/').get(getConfig).post(postData);

export default router;
