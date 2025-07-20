const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

exports.createUser = async (req, res) => {
  try {
    const user = new User({ name: req.body.name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.json(users);
};

exports.claimPoints = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    user.totalPoints += 10; // example logic
    await user.save();

    res.json(user); // make sure to return updated user
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};


exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });

    const leaderboard = users.map((user, index) => ({
      name: user.name,
      totalPoints: user.totalPoints,
      rank: index + 1,
    }));

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await ClaimHistory.deleteMany({ user: userId }); // Delete user's claim history
    await user.deleteOne(); // Delete user

    res.json({ message: 'User and related claim history deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
