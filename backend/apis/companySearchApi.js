const axios = require('axios');
require('dotenv').config();
const FMP_API = process.env.FMP_API; 

const searchCompany = async (companyName) => {
  try {
    const response = await axios.get(
      `https://financialmodelingprep.com/api/v3/search?query=${companyName}&limit=10&apikey=${FMP_API}`
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("No company found");
    }

    // Return array of company matches with symbol and name
    return response.data.map(company => ({
      symbol: company.symbol,
      name: company.name,
      exchangeShortName: company.exchangeShortName
    }));

  } catch (error) {
    console.log("Error searching company: ", error.message);
    throw new Error("Couldn't retrieve company information from API");
  }
};

module.exports = {
  searchCompany
};
