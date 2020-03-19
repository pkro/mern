const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
//router.get('/', (req, res) => res.send('Auth route'));
// -> ad dmiddleware
router.get('/', auth, (req, res) => res.send('Auth route'));

module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWU3MzE2MGFiNjNlNGMxZmVlZmIxM2UwIn0sImlhdCI6MTU4NDYwMDU4NiwiZXhwIjoxNTg0OTYwNTg2fQ.mRPTOZ4wv3uofv416j9zHSRRvQ0LaflVtEiCwC2sOWs
