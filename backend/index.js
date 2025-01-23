//EXPRESS
const express = require('express')
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
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

// Auth0 middleware
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
});

// IMPORT ROUTES
const userRoutes = require('./routers/userRoutes.js');
const portfolioRoutes = require('./routers/portfolioRoutes.js');
const holdingRoutes = require('./routers/holdingRoutes.js');
const orderRoutes = require('./routers/orderRoutes.js');
const companySearchRoutes = require('./routers/companySearchRoutes.js');
const priceHistoryRoutes = require('./routers/priceHistoryRoutes.js');
const stockPriceRoutes = require('./routers/stockPriceRoutes.js');

/** SETUP EXPRESS ROUTES */
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Public routes
app.use('/user', userRoutes);
// Protected routes
app.use('/portfolio', checkJwt, portfolioRoutes);
app.use('/holding', checkJwt, holdingRoutes);
app.use('/order', checkJwt, orderRoutes);
app.use('/company', checkJwt, companySearchRoutes);
app.use('/price-history', checkJwt, priceHistoryRoutes);
app.use('/stock', checkJwt, stockPriceRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});