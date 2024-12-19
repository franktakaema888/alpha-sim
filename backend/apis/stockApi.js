const axios = require('axios');
require('dotenv').config()
const FINNHUB_API = process.env.FINNHUB_API

/** FinnHub
 * Used to acquire latest stock data
 */

const fetchStockPrice = async (stockSymbol) => {

  try {
    const stockData = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${FINNHUB_API}`);

    const currentPrice = stockData.data.c;

    if(!currentPrice || currentPrice < 0) throw new Error("Invalid stock price fetched");

    return currentPrice;
    
  } catch (error) {
    console.log("Error fetching stock price from API: ", error.message);
    throw new Error("Couldn't retrieve stock price from API")
  }
}

module.exports = {
  fetchStockPrice
}
