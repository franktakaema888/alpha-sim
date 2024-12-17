/**
 * USER ROUTES
 * - REQUIREMENTS: Username, Email, Password, CreatedAt, UpdatedAt
 */

const User = require('../models/user.model.js'); // Import user model

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

module.exports = {
  getUser,
  createUser
};