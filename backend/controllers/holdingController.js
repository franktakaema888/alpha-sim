const Portfolio = require("../models/portfolio.model.js");
const Holding = require("../models/holding.model.js");

const getHoldingData = async (req, res) => {
  const { portfolioName, stockSymbol } = req.body;

  try {
    // get portfolioId by querying portfolio name
    const portfolioData = await Portfolio.findOne({ portfolioName });
    const portfolioId = portfolioData._id;

    if (!portfolioId) res.status(404).send("user portfolio not found");

    // find holding data through porfolio id and stock symbol
    let holding = await Holding.findOne({ portfolioId, stockSymbol }).populate({
      path: "portfolioId",
    });

    res.status(200).json({
      message: "Holdings data for stock found",
      stockHoldings: holding,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const createHoldingRecord = async (req, res) => {
  const { portfolioName, stockSymbol, totalQuantity, avgPrice, totalAmount } =
    req.body;

  try {
    const portfolioData = await Portfolio.findOne({ portfolioName });
    const portfolioId = portfolioData._id;

    if (!portfolioId) res.status(404).send("user portfolio not found");

    const newHolding = await Holding.create({
      portfolioId,
      stockSymbol,
      totalQuantity,
      avgPrice,
      totalAmount,
    });

    res
      .status(201)
      .json({ message: "New Holding Stock is created", holding: newHolding });
  } catch (error) {
    res.status(500).send("Could not create Holding Record");
  }
};

const updateHolding = async (
  portfolioId,
  stockSymbol,
  orderType,
  quantity,
  stockPrice
) => {
  try {
    // find for a holding
    let holding = await Holding.findOne({ portfolioId, stockSymbol });
    // check if the holding exist
    if (!holding) {
      // if no holding and it's a buy, create a new holding
      if (orderType === "BUY") {
        const newHolding = await Holding.create({
          portfolioId,
          stockSymbol,
          totalQuantity: quantity,
          avgPrice: stockPrice,
          totalAmount: quantity * stockPrice,
        });
        return newHolding;
      } else {
        throw new Error("Insufficient / No Stock to sell");
      }
    } else {
      // we will update exisiting holding
      if (orderType === "BUY") {
        const totalCost =
          holding.avgPrice * holding.totalQuantity + stockPrice * quantity;
        holding.totalQuantity += quantity;
        holding.avgPrice = totalCost / holding.totalQuantity;
        holding.totalAmount = totalCost;
      } else if (orderType === "SELL") {
        if (holding.totalQuantity < quantity) {
          throw new Error("There is insufficient stock to sell");
        }
        holding.totalAmount -= quantity * holding.avgPrice;
        holding.totalQuantity -= quantity;

        if (holding.totalQuantity === 0) {
          await Holding.findByIdAndDelete(holding._id);
          return null;
        }

        holding.avgPrice =
          holding.totalQuantity > 0
            ? holding.totalAmount / holding.totalQuantity
            : 0;
      }
      await holding.save();
    }

    return holding;
  } catch (error) {
    throw new Error("Failed to update holdings. ", error);
  }
};

const deleteHolding = async (req, res) => {
  const { portfolioId, stockSymbol } = req.body;

  try {
    const holding = await Holding.findOne({ portfolioId, stockSymbol });

    if (!holding) {
      return res.status(404).json({ message: "Holding not found" });
    }

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    const sellAmount = holding.totalQuantity * holding.avgPrice;

    await User.findByIdAndUpdate(portfolio.userId, {
      $inc: { availableFunds: sellAmount },
    });

    await Holding.findByIdAndDelete(holding._id);

    res.status(200).json({
      message: "Holding successfully deleted and stocks sold",
      soldAmount: sellAmount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete holding",
      error: error.message,
    });
  }
};

module.exports = {
  getHoldingData,
  createHoldingRecord,
  updateHolding,
  deleteHolding,
};
