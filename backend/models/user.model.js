const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true
    },
    username:{
      type: String, 
      require: [true, "Please enter a username"]
    }, 
    password:{
      type: String, 
      require: [true, "Please enter a password"]
    },
    availableFunds:{
      type: Number,
      default: 10000,
      require: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);