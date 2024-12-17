const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    holdingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Holding',
      required: true
    },
    orderType: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
      required: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', orderSchema);