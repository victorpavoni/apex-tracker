const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();
const port = 5000 || process.env.PORT;

dotenv.config({ path: './config.env' });

// Debuging
if(process.env.NODE_ENV === 'development')
  app.use(morgan('dev'));

// Profile routes
app.use('/api/v1/profile', require('./routes/profile'));

// Handle production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname, '/public/index.html'));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


app.listen(
  port,
  () =>  console.log(`Server runing in ${process.env.NODE_ENV} mode and listening on http://localhost:${port}`
));