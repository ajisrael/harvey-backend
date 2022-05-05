import {
  getUserDataByEmail,
  matchPassword,
  saveUserData,
} from '../services/userHelper.js';
import generateToken from '../utilities/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const user = getUserDataByEmail(email);

  if (user && matchPassword(user.password, password)) {
    console.log(`Logged in user: ${user.name}`);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin === 1,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const userExists = getUserDataByEmail(email);

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = saveUserData({ name, email, password, isAdmin: 0 });

  if (user) {
    console.log(`Registered user: ${user.name}`);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

export { loginUser, registerUser };
