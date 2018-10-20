const winston = require('winston');


//only error happens in express will be catched, this middleware is specific to express
module.exports = function(err, req, res, next){
  //winston.log('error', err.message);
  winston.error(err.message, err); //err is metadata

  //logging level: error -> warn -> info -> verbose -> debug -> silly

  res.status(500).send('Something failed. Internal server error');
}
