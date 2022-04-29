import express from 'express';
import { getConfig } from '../controllers/nodeController.js';

const router = express.Router();

router.route('/:nodeId/config').get(getConfig);

export default router;
