import express from 'express';
import { getData } from '../controllers/pumpController.js';

const router = express.Router();

router.route('/data').get(getData);

export default router;
