const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/user');

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
//router.get('/', (req, res) => res.send('Auth route'));
// -> ad dmiddleware
router.get('/', auth, async (req, res) => {
  try {
    // user info comes from the auth middleware where the token is decoded, req.user = decoded.user;
    const user = await User.findById(req.user.id).select('-password'); // all user data except password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
  res.send('Auth route');
});

module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU3MzE2MGFiNjNlNGMxZmVlZmIxM2UwIn0sImlhdCI6MTU4NDYwMDU4NiwiZXhwIjoxNTg0OTYwNTg2fQ.mRPTOZ4wv3uofv416j9zHSRRvQ0LaflVtEiCwC2sOWs
