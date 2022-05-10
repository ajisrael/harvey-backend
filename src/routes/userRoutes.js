import express from 'express';
import {
  validateLoginData,
  validateRegistrationData,
} from '../middleware/userValidator.js';
import { loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/login').post(validateLoginData, loginUser);
router.route('/').post(validateRegistrationData, registerUser);

export default router;
