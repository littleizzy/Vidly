const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// Login endpoint, while logout should be done in frontend(simply delete the token)
// Why is token not stored on the db/server: for security reason, if the db is hacked, they can see the token in plain text, they dont even need to decode the pw

router.post('/', async (req, res) => {
  const { error } = validate(req.body); //first validation
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });  //second validation
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password); //bcrypt get the salt and hash req.body.password and compare
  if (!validPassword) res.status(400).send('Invalid email or password.');


  //res.send(true); Rather we need to return a jwt
  //sign(payload, secret key used to create digital signature)
  // moved to user.js schema
  const token = user.generateAuthToken();
  res.send(token);
  /*
  Returns at jwt website
  {
  "_id": "5bc7e6cb65885606dc981dd2",
  "iat": 1539833215                        "iat" is the time this jwt is created, can be used to determine the age of this jwt
}
 */

});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };
    return Joi.validate(req, schema);
  }

module.exports = router;

// /api/users use this router
// joi-password-complexity
