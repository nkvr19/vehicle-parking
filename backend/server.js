const app = require('./app');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/vehicleparking', {
  useNewUrlParser: true,
});
app.listen(3000, () => {
  console.log('Started');
});
