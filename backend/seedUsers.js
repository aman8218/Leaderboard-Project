// seedUsers.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const names = ['Rahul', 'Kamal', 'Sanak', 'Aman', 'Neha', 'Riya', 'Pooja', 'Raj', 'Arjun', 'Priya'];
  await User.deleteMany({});
  for (let name of names) {
    await User.create({ name });
  }
  console.log('Users seeded');
  process.exit();
});
