
// assume will be executed after auth.js middleware
module.exports = function (req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied');
  next();
}

/*
401 - Unauthorized(not valid jwt, give a chance to retry and send a valid jwt)
403 - Forbidden(valid jwt but not admin)
*/
