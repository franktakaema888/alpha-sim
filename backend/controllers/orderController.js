
const Order = require('../models/order.model.js');

const getOrder = async (req,res) => {
  res.status(200).send('These are your orders');
}

module.exports = {
  getOrder
}