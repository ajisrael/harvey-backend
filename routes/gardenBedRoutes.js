import express from 'express';
const router = express.Router();
import { getConfig, postData } from '../controllers/gardenBedController.js';

router.route('/:id/config').get(getConfig);
router.route('/:id/data').post(postData);

export default router;
