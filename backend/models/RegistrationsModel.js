const mongoose = require('mongoose');
const RegistrationsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
  vehicleno: {
    type: String,
    minlength: 10,
    maxlength: 10,
    required: [true, 'Vehicle No is required to proceed'],
    trim: true,
    uppercase: true,
  },
});

const Registration = mongoose.model('Registration', RegistrationsSchema);
module.exports = Registration;
