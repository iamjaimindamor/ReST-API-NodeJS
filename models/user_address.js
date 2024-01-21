//importing mongoose.....
const mongoose = require('mongoose');

//creating new table for addresses

const userAdd = new mongoose.Schema({
  add_id: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },

});

const addUser = mongoose.model('addUser', userAdd);

module.exports = addUser;