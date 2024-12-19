const mongoose = require('mongoose');
const { Schema } = mongoose;

const holdingSchema = new Schema(
  {
    portfolioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Portfolio',
      required: true
    },
    stockSymbol: {
      type: String,
      required: [true, "Please indicate a stock symbol of your choice"]
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 0
    },
    avgPrice: {
      type: Number,
      required: true,
      default: 0
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0
    }
  }, 
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Holding', holdingSchema);