const axios = require('axios');
require('dotenv').config();
const ALPHA_VANTAGE_API = process.env.ALPHA_VANTAGE_API;

const getPriceHistory = async (symbol, interval = 'DAILY') => {
  try {
    let endpoint;
    let timeSeriesKey;

    switch(interval.toUpperCase()) {
      case 'INTRADAY':
        endpoint = 'TIME_SERIES_INTRADAY';
        timeSeriesKey = 'Time Series (5min)';
        break;
      case 'DAILY':
        endpoint = 'TIME_SERIES_DAILY';
        timeSeriesKey = 'Time Series (Daily)';
        break;
      case 'WEEKLY':
        endpoint = 'TIME_SERIES_WEEKLY';
        timeSeriesKey = 'Weekly Time Series';
        break;
      case 'MONTHLY':
        endpoint = 'TIME_SERIES_MONTHLY';
        timeSeriesKey = 'Monthly Time Series';
        break;
      default:
        endpoint = 'TIME_SERIES_DAILY';
        timeSeriesKey = 'Time Series (Daily)';
    }

    const url = `https://www.alphavantage.co/query?function=${endpoint}${interval === 'INTRADAY' ? '&interval=5min' : ''}&symbol=${symbol}&outputsize=compact&apikey=${ALPHA_VANTAGE_API}`;
    console.log('Fetching from:', url);

    const response = await axios.get(url);
    console.log('Raw API Response:', response.data);

    if (!response.data || response.data['Error Message'] || !response.data[timeSeriesKey]) {
      throw new Error('Chart data is not available');
    }

    if (response.data['Note']) {
      throw new Error('Chart data is not available');
    }

    if (!response.data || response.data['Error Message']) {
      throw new Error(response.data['Error Message'] || 'Invalid API response');
    }

    if (response.data['Note']) {
      throw new Error('API call frequency limit reached. Please try again later.');
    }

    const timeSeriesData = response.data[timeSeriesKey];
    if (!timeSeriesData) {
      console.error('Missing time series data. Available keys:', Object.keys(response.data));
      throw new Error('Invalid API response structure');
    }

    const formattedData = Object.entries(timeSeriesData)
      .map(([date, prices]) => {
        const timestamp = new Date(date).getTime() / 1000;
        return {
          time: timestamp,
          open: parseFloat(prices['1. open']),
          high: parseFloat(prices['2. high']),
          low: parseFloat(prices['3. low']),
          close: parseFloat(prices['4. close']),
          volume: parseFloat(prices['5. volume'])
        };
      })
      .filter(candle => !isNaN(candle.time) && !isNaN(candle.open))
      .sort((a, b) => a.time - b.time);

    if (formattedData.length === 0) {
      throw new Error('No valid price data available');
    }

    console.log('Formatted data sample:', formattedData[0]);
    return formattedData;

  } catch (error) {
    // console.error('Error in getPriceHistory:', error);
    // if (error.response) {
    //   console.error('API Response:', error.response.data);
    // }
    // throw new Error(error.message || 'Failed to fetch price history');
    console.error('Error in getPriceHistory:', error);
    throw new Error('Chart data is not available');
  }
};

module.exports = {
  getPriceHistory
};