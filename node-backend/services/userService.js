const User = require("../models/User");

// Create a new user
const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Get all users
const getAllUsers = async () => {
  return await User.find();
};

// Get a user by ID
const getUserById = async (userId) => {
  return await User.findById(userId);
};

// Update a user
const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

// Delete a user
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
const loginUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = user.password === password;
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
};
