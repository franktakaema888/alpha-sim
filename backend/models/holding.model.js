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
    quantity: {
      type: Number,
      required: true
    },
    avgPrice: {
      type: Number,
      required: true
    }
  }, 
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Holding', holdingSchema);