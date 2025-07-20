const ClaimHistory = require('../models/ClaimHistory');

exports.getClaimHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .populate('user', 'name')
      .sort({ claimedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
