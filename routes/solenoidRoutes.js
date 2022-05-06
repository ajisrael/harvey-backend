import express from 'express';
import { getData } from '../controllers/solenoidController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/data').get(protect, getData);

export default router;
