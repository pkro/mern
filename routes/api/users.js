const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name required')
      .not()
      .isEmpty(),
    check('email', 'Email missing or wrong format').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    console.log(req.body);
    res.send('User route');
  }

  // user exists?

  // get user gravatar

  // encrypt pass

  // return jsonwebtoken
);

module.exports = router;

//check('email', 'Email missing or wrong format', isEmail());
