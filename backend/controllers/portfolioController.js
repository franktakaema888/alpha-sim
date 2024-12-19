/**
 * PORTFOLIO ROUTES
 * - REQUIREMENTS: name, userID
 */

const Portfolio = require('../models/portfolio.model.js'); // Import portfolio model
const User = require('../models/user.model.js'); // Import user model
const Holding = require('../models/holding.model.js');

const getPortfolio = async (req,res) => {
  const { username } = req.body;

  try {
    // find the username, ensure username is unique, check if there is such a user that has been created
    const userInfo = await User.findOne({ username });

    if(!userInfo) res.status(404).message("User is not found");

    // get the username id from the user model
    const userId = userInfo._id;
    console.log(userId);
    // Populate the user information
    const populatedPortfolio = await Portfolio.find(userId).populate({
        path: 'userId'
    });

    if (!populatedPortfolio.length) {
      return res.status(404).json({ message: "No portfolios found for this user" });
    }

    res.status(200).json(populatedPortfolio);
  } catch (error) {
    res.status(500).send({message:error});
  }
}

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

module.exports = {
  getPortfolio,
  createPortfolio,
  deletePortfolio
};