const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = 3000;

app.use((req, res, next) => {  // CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(upload.array());

// Use order routes
app.use('/orders', orderRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
