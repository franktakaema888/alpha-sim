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


const executeOrder = async (req,res) => {

  let { portfolioId, holdingId, stockSymbol, orderType, quantity } = req.body;

  try {
    // convert orderType to uppercase
    orderType = orderType.toUpperCase();
    // check if inputs are there
    if(!portfolioId || !stockSymbol ||!orderType || !quantity) res.status(400).send("Missing input fields");
    // check quantity
    if(quantity <= 0) return res.status(400).send("Quantity must be greater than 0");

    // If holdingId is provided, validate it
    if(holdingId) {
      const holding = await Holding.findById(holdingId);
      if(!holding) {
        return res.status(400).send("Invalid holding ID");
      }
      if(holding.portfolioId.toString() !== portfolioId) {
        return res.status(400).send("Holding does not match portfolio");
      }
    }
    
    // get stock price data
    const stockPrice = await fetchStockPrice(stockSymbol);
    if(!stockPrice || stockPrice < 0) return res.status(400).send("Invalid stock price from API");

    let updatedHolding;
    let newOrder;

    // check if holding exists for stock, if no, create a new holding for stock and portfolio
    try {
      updatedHolding = await holdingController.updateHolding(
        portfolioId, 
        stockSymbol, 
        orderType, 
        quantity, 
        stockPrice
      );

      if (!updatedHolding) {
        return res.status(400).send('Failed to update/create holding');
      }

      // create new Order
      newOrder = await Order.create({
        holdingId: holdingId || updatedHolding._id,
        orderType,
        quantity,
        price: stockPrice
      });

      if (!newOrder) {
        return res.status(400).send('Failed to create order');
      }

      return res.status(201).json({
        message: 'Order executed successfully',
        order: newOrder,
        holding: updatedHolding
      });

    } catch (error) {
      // If order creation failed but holding was updated, we might want to rollback
      if (updatedHolding && !newOrder) {
        console.error('Order creation failed, holding might need rollback');
      }
      return res.status(404).json({
        message: "Failed to create or update stock holdings",
        error: error.message
      });
    }

  } catch (error) {
    res.status(500).json({message:"Order execution failed", error:error.message});
  }
}

module.exports = {
  getOrder,
  executeOrder
}