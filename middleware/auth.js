const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // only authenticated user can do certain operations
  const token = req.header('x-auth-token');
  //401 no auth status for given operation
  if (!token) res.status(401).send('Access denied, No token provided.')
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey')); //return decoded payload(which is id) if valid, ow throw excp
    req.user = decoded;   //payload can be accessed as req.user._id
    next();
  }
  catch(ex) {
    res.status(400).send('Invalid token.');
  }
}


/*
 In a middleware function:
  1. terminate the req/res life cycle
  2. or pass control to the next()

 Now, we need to apply this middleware function SELECTIVELY to endpoints that needs protection
*/
