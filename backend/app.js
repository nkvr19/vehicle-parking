const express = require('express');
const app = express();
const cors = require('cors');
const User = require('./models/UserModel');
const Location = require('./models/LocationModel');
const Registration = require('./models/RegistrationsModel');
app.use(cors());
app.use(express.json());
//Adding User to a Database
app.post('/usersregister', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const response = await User.create({ email, password });
    res.status(201).json({
      status: 'Success',
    });
  } catch (e) {
    return res.status(400).json({
      status: 'Failed',
      message: e,
    });
  }
});

//Logging in a User
app.post('/userslogin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).json({
        message: 'User Not Found',
      });
    }
    return res.status(200).json({
      message: 'User Found',
    });
  } catch (e) {
    return res.status(400).json({
      message: 'An Error Occured',
    });
  }
});

//Searching for the locations
app.post('/locations', async (req, res) => {
  try {
    const city = req.body.city;
    const resp = await Location.find({ city });
    if (resp.length === 1) {
      return res.status(200).json({
        status: 'Success',
        places: resp[0].availaat,
      });
    }
    return res.status(404).json({
      status: 'Failed',
      places: 'Not Found',
    });
  } catch (e) {
    return res.status(400).json({
      status: 'Failed',
    });
  }
});

//Booking a slot for the vehcile
app.post('/registrations', async (req, res) => {
  const { email, location, date, vehicleno } = req.body;
  try {
    const response = await Registration.create({
      email,
      location,
      date,
      vehicleno,
    });
    return res.status(201).json({
      status: 'Success',
    });
  } catch (e) {
    return res.status(400).json({
      status: 'Failed',
      message: e,
    });
  }
});
//Retrieving the bookings of a user
app.post('/viewbookings', async (req, res) => {
  try {
    const email = req.body.email;
    const bookings = await Registration.find({ email });
    return res.status(200).json({
      status: 'Success',
      message: bookings,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 'Failed',
      message: e,
    });
  }
});
module.exports = app;
