const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  claimPoints,
  getLeaderboard,
  deleteUser
} = require('../controllers/userController');

router.post('/', createUser);
router.get('/', getUsers);
router.post('/claim/:userId', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.delete('/:userId', deleteUser);


module.exports = router;
