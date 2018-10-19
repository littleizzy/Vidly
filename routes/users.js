const auth = require('../middleware/auth'); // auth -> authorization
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// Registration endpoint

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered with given email.');

  user = new User(_.pick(req.body, ['name', 'email', 'password'])); //handpick properties you need
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  //send the jwt in the http response token so the user is automatically logged in after register
  //pick only name, email properties in user obj and return new ob
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

// need a funcion to access user info at anytime
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);

});


module.exports = router;

// /api/users use this router
// joi-password-complexity
