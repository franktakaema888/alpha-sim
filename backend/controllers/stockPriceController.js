const { fetchStockPrice } = require('../apis/stockApi');

const getCurrentPrice = async (req, res) => {
  const { symbol } = req.params;

  try {
    const price = await fetchStockPrice(symbol);
    res.status(200).json({
      success: true,
      data: {
        symbol,
        currentPrice: price,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stock price",
      error: error.message
    });
  }
};

module.exports = {
  getCurrentPrice
};