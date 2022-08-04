const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  availaat: [String],
});
Location = mongoose.model('Location', locationSchema);
module.exports = Location;
