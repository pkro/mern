const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
//router.get('/', (req, res) => res.send('Auth route'));
// -> add middleware
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

// log in user
// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // user exists?
    if (email && password) {
      let user = await User.findOne({ email });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          console.log(user.password + ' ' + hash);
          const result = await bcrypt.compare(user.password, hash);
          if (result) {
            return res.status(200).send('User authenticated');
          } else {
            return res.status(401).send('unauthorized');
          }
        });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

module.exports = router;
