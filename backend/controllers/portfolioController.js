/**
 * PORTFOLIO ROUTES
 * - REQUIREMENTS: name, userID
 */

const Portfolio = require('../models/portfolio.model.js'); // Import portfolio model
const User = require('../models/user.model.js'); // Import user model
const Holding = require('../models/holding.model.js');

const getPortfolio = async (req, res) => {
  const { username } = req.params;

  try {
    // first find the user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // then find their portfolio
    let portfolio = await Portfolio.findOne({ userId: user._id });
    
    // if no portfolio exists, create one automatically
    if (!portfolio) {
      portfolio = await Portfolio.create({
        userId: user._id,
        portfolioName: `${username}'s Portfolio`
      });
    }

    return res.status(200).json(portfolio);

  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch portfolio",
      error: error.message
    });
  }
};

const createPortfolio = async (req,res) => {
  // request body will contain the name of portfolio and the username
  const {portfolioName, username} = req.body;
  // console.log(portfolioName, username);

  try {
    // find the username, ensure username is unique, check if there is such a user that has been created
    const userInfo = await User.findOne({ username });

    if(!userInfo) res.status(404).message("User is not found");

    // get the username id from the user model
    const userId = userInfo._id;
    // create a new portfolio assigning the userID and portfolio name to it
    const newPortfolio = await Portfolio.create({
      userId,
      portfolioName
    });

    res.status(201).json({message:"New Portfolio is created", portfolio: newPortfolio});
  } catch (error) {
    res.status(500).send({message:error});
  }
}

const deletePortfolio = async (req, res) => {
  const { portfolioId } = req.body;

  try {

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const holdings = await Holding.find({ portfolioId });
    
    const totalValue = holdings.reduce((sum, holding) => {
      return sum + (holding.totalQuantity * holding.avgPrice);
    }, 0);

    if (holdings.length > 0) {
      await User.findByIdAndUpdate(
        portfolio.userId,
        { $inc: { availableFunds: totalValue } }
      );

      await Holding.deleteMany({ portfolioId });
    }

    await Portfolio.findByIdAndDelete(portfolioId);

    res.status(200).json({
      message: "Portfolio and associated holdings deleted successfully",
      soldAmount: totalValue,
      deletedHoldings: holdings.length
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete portfolio",
      error: error.message
    });
  }
};

const getPortfolioByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    
    // find user and their available funds
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // find their portfolio
    const portfolio = await Portfolio.findOne({ userId: user._id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // return both portfolio info and user's available funds
    res.status(200).json({
      accountBalance: user.availableFunds,
      portfolioId: portfolio._id,
      portfolioName: portfolio.portfolioName
    });

  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Error fetching portfolio data' });
  }
};

const getHoldingsByPortfolioId = async (req, res) => {
  try {
    const { portfolioId } = req.params;
    
    const holdings = await Holding.find({ portfolioId });
    
    res.status(200).json(holdings);
  } catch (error) {
    console.error('Error fetching holdings:', error);
    res.status(500).json({ message: 'Error fetching holdings data' });
  }
};

module.exports = {
  getPortfolio,
  createPortfolio,
  deletePortfolio,
  getPortfolioByUsername,
  getHoldingsByPortfolioId
};