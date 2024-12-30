const mongoose = require('mongoose');
const Order = require('../models/order.model.js');
const Portfolio = require('../models/portfolio.model.js');
const Holding = require('../models/holding.model.js');
const holdingController = require('../controllers/holdingController.js');
const { fetchStockPrice } = require('../apis/stockApi.js');


const getOrder = async (req, res) => {
  const { portfolioId } = req.body;

  try {
    const holdings = await Holding.find({ portfolioId });
    console.log(holdings);
    
    const holdingIds = holdings.map(holding => holding._id);
    
    const orders = await Order.find({
      holdingId: { $in: holdingIds }
    })

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this portfolio' });
    }

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve orders",
      error: error.message
    });
  }
};  


const executeOrder = async (req, res) => {
  const { portfolioId, stockSymbol, orderType, quantity, price } = req.body;

  try {
    // validate portfolioId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(portfolioId)) {
      return res.status(400).json({ 
        message: "Invalid portfolio ID" 
      });
    }
    
    // input validation
    if (!portfolioId || !stockSymbol || !orderType || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0" });
    }

    // use provided price or fetch current price
    const stockPrice = price || await fetchStockPrice(stockSymbol);
    if (!stockPrice || stockPrice < 0) {
      return res.status(400).json({ message: "Invalid stock price" });
    }

    try {
      // update or create holding
      const updatedHolding = await holdingController.updateHolding(
        portfolioId,
        stockSymbol,
        orderType.toUpperCase(),
        quantity,
        stockPrice
      );

      if (!updatedHolding && orderType.toUpperCase() === 'BUY') {
        throw new Error('Failed to create holding');
      }

      // create new order only if we have a valid holding
      const newOrder = await Order.create({
        holdingId: updatedHolding?._id,
        orderType: orderType.toUpperCase(),
        quantity,
        price: stockPrice
      });

      return res.status(201).json({
        message: 'Order executed successfully',
        order: newOrder,
        holding: updatedHolding
      });

    } catch (error) {
      console.error('Order execution error:', error);
      return res.status(400).json({
        message: error.message || "Failed to create or update stock holdings"
      });
    }

  } catch (error) {
    console.error('Order execution error:', error);
    return res.status(500).json({
      message: "Order execution failed",
      error: error.message
    });
  }
};

module.exports = {
  getOrder,
  executeOrder
}