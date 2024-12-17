
// const Holding = require('../models/holding.model.js');

const getHoldingData = async (req,res) => {
  res.status(200).send("Here are your current holdings");
}

const createStock = async (req,res) => {
  res.status(200).send("Stock has been added / created");
}

module.exports = {
  getHoldingData,
  createStock
};