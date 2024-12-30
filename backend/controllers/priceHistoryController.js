const { getPriceHistory } = require('../apis/priceHistoryApi.js');

const getStockPriceHistory = async (req, res) => {
  const { symbol, interval } = req.params;

  if (!symbol) {
    return res.status(400).json({
      success: false,
      message: "Chart data is not available"
    });
  }

  try {
    const priceHistory = await getPriceHistory(symbol, interval);
    
    if (!priceHistory || !Array.isArray(priceHistory) || priceHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Chart data is not available"
      });
    }

    return res.status(200).json({
      success: true,
      data: priceHistory
    });

  } catch (error) {
    console.error('Price history error:', error);
    return res.status(404).json({ 
      success: false,
      message: "Chart data is not available"
    });
  }
};


module.exports = {
  getStockPriceHistory
};
