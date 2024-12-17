const mongoose = require('mongoose');
const { Schema } = mongoose;

const portfolioSchema = new Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        require: true
    },
    portfolioName: {
      type: String,
      require: [true, "Please enter a portfolio name"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);