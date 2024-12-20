const { getPriceHistory } = require('../apis/priceHistoryApi.js');

const getStockPriceHistory = async (req, res) => {
  const { symbol, interval } = req.params;

  try {
    const priceHistory = await getPriceHistory(symbol, interval);
    res.status(200).json({
      success: true, 
      data: priceHistory
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch price history",
      error: error.message
    });
  }
};

module.exports = {
  getStockPriceHistory
};
