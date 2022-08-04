const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email id is required'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minLength: [8, 'Minmum length of password should be 8'],
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
