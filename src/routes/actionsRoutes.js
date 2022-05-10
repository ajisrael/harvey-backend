import express from 'express';
import { validateActionData } from '../middleware/actionsValidator.js';
import { getData, postData } from '../controllers/actionsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/data')
  .get(protect, getData)
  .post(protect, validateActionData, postData);

export default router;
