const axios = require('axios');
require('dotenv').config();
const ALPHA_VANTAGE_API = process.env.ALPHA_VANTAGE_API;

const getPriceHistory = async (symbol, interval = 'DAILY') => {
  try {
    let endpoint;
    switch(interval.toUpperCase()) {
      case 'INTRADAY':
        endpoint = `TIME_SERIES_INTRADAY&interval=5min&symbol=${symbol}`;
        break;
      case 'DAILY':
        endpoint = `TIME_SERIES_DAILY&symbol=${symbol}`;
        break;
      case 'WEEKLY':
        endpoint = `TIME_SERIES_WEEKLY&symbol=${symbol}`;
        break;
      case 'MONTHLY':
        endpoint = `TIME_SERIES_MONTHLY&symbol=${symbol}`;
        break;
      default:
        endpoint = `TIME_SERIES_DAILY&symbol=${symbol}`;
    }

    const response = await axios.get(
      `https://www.alphavantage.co/query?function=${endpoint}&apikey=${ALPHA_VANTAGE_API}`
    );

    if (!response.data) {
      throw new Error("No price data available");
    }

    // Transform data for TradingView chart format
    const timeSeriesData = response.data[Object.keys(response.data)[1]];
    const formattedData = Object.entries(timeSeriesData).map(([date, prices]) => ({
      time: new Date(date).getTime() / 1000,
      open: parseFloat(prices['1. open']),
      high: parseFloat(prices['2. high']),
      low: parseFloat(prices['3. low']),
      close: parseFloat(prices['4. close']),
      volume: parseFloat(prices['5. volume'])
    }));

    return formattedData;

  } catch (error) {
    console.error("Error fetching price history:", error.message);
    throw new Error("Failed to fetch price history");
  }
};

module.exports = {
  getPriceHistory
};
