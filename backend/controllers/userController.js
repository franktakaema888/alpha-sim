/**
 * USER ROUTES
 * - REQUIREMENTS: Username, Email, Password, CreatedAt, UpdatedAt
 */

const User = require('../models/user.model.js'); // Import user model
const Portfolio = require('../models/portfolio.model.js');
const Holding = require('../models/holding.model.js');
const Order = require('../models/order.model.js');

const getUser = async (req, res) => {
  const { username } = req.body;

  try {
    const userDetails = await User.find({username})

    if(!userDetails) res.status(404).send("user is not found");

    res.status(200).json(userDetails);
  
  } catch (error) {
    res.status(500).send({message:error});
  }
}

/**
 * Additional Addons: 
 * - Check that the username is unique and not already in the database
 */
const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await User.create(user);

    if(!user) res.status(404).send("Please enter a username or password");

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send({message:error});
  }
}

const deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const portfolios = await Portfolio.find({ userId: user._id });
    
    const portfolioIds = portfolios.map(portfolio => portfolio._id);

    const holdings = await Holding.find({ portfolioId: { $in: portfolioIds } });
    const holdingIds = holdings.map(holding => holding._id);

    await Order.deleteMany({ holdingId: { $in: holdingIds } });
    
    await Holding.deleteMany({ portfolioId: { $in: portfolioIds } });
    
    await Portfolio.deleteMany({ userId: user._id });
    
    await User.findByIdAndDelete(user._id);

    res.status(200).json({
      message: "User and all associated data deleted successfully",
      deletedData: {
        portfolios: portfolios.length,
        holdings: holdings.length
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user and associated data",
      error: error.message
    });
  }
};

module.exports = {
  getUser,
  createUser,
  deleteUser
};