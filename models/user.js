
//importing mongoose.....
const mongoose = require('mongoose');

//creating schema for DB table
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  phone: { type: Number, required: true },



});

//creating model to access the DB table.....
const User = mongoose.model('User', userSchema);
//exporting model so that it can be used by services....in NODE Mvc

module.exports = User;

