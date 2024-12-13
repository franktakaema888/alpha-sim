/**
 * USER ROUTES
 * - REQUIREMENTS: Username, Email, Password, CreatedAt, UpdatedAt
 */

const getUser = async (req, res) => {
  res.send("User Information has been attained");
}

const createUser = async (req, res) => {
  res.send("New User has been created");
}

module.exports = {
  getUser,
  createUser
};