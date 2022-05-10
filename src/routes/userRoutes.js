import express from 'express';
import {
  validateLoginData,
  validateRegistrationData,
} from '../middleware/userValidator.js';
import { loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/login').post(validateLoginData, loginUser);

// User registration disabled until data structures added for
// mapping beds to a garden and gardens to a list of users
//router.route('/').post(validateRegistrationData, registerUser);

export default router;
