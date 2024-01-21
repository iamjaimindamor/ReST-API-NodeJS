
const User = require(`../models/user`);

//creating class to easily export all function to controller for fulfilling request..........

//BASIC DETAILS...................................................................................

class UserService {

  // this async create function with await so it will wait for the response and then it invoke create().........
  async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw error;
    }
  }

  //this is for getting all the entry.....
  async findAll() {
    try {
      return await User.find();
    } catch (error) {
      console.log("Im in 12357890");
      throw error;
    }
  }

  //specific entry using id...........
  async findById(id) {
    try {
      return await User.findById(id);
    } catch (error) {
      throw error;
    }
  }

  // note of [findOne] same as mentioned in authService.js............
  async findOne({ name }) {
    try {
      return await User.findOne({ name });
    } catch (error) {
      throw error;
    }
  }

  //Upadting entry using findByIdAndUpdate()..........
  async update(id, userData) {
    try {
      return await User.findByIdAndUpdate(id, userData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  //Deleting..........
  //for deleting a particular document from the Database....mongoose provides findByIdandDelete() to delete specific document using Id.....
  async delete(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();

