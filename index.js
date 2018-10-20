const winston = require('winston');
const express = require('express');
const app = express(); //should only be called once in entire project

require('./startup/logging')();
require('./startup/routes')(app); //call the function and pass app as parameter
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
