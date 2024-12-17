//EXPRESS
const express = require('express')
const cors = require('cors');
const app = express();
const port = 3000;
//MONGOOSE
const mongoose = require('mongoose');
require("dotenv").config();
const MongoDB = process.env.DB_URL;

/** SETUP MONGODB CONNECTION THROUGH MONGOOSE*/
main().catch(err => console.log(err));

async function main() {
  try {
    await mongoose.connect(MongoDB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

// IMPORT ROUTES
const userRoutes = require('./routers/userRoutes.js');
const portfolioRoutes = require('./routers/portfolioRoutes.js');
const holdingRoutes = require('./routers/holdingRoutes.js');
const orderRoutes = require('./routers/orderRoutes.js');

/** SETUP EXPRESS ROUTES */
app.use(express.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/holding', holdingRoutes);
app.use('/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});