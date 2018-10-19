const winston = require('winston');

module.exports = function(err, req, res, next){
  //winston.log('error', err.message);
  winston.error(err.message);

  //logging level: error -> warn -> info -> verbose -> debug -> silly

  res.status(500).send('Something failed. Internal server error');
}
