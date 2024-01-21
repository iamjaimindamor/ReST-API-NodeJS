//importing User from the model to further write business logic of this app 
const addUser = require(`../models/user_address`);
const mongoose = require('mongoose');

class addService {

  //creating address
  async create(addData) {
    try {
      return await addUser.create(addData);
    } catch (error) {
      throw error;
    }
  }
  //finding all the address [findAll is user defined method mongoose provides find() to fetch all the details from the database]........
  async findAll() {
    try {
      return await addUser.find();
    } catch (error) {
      console.log("Im in 1235 in addservice");
      throw error;
    }
  }

  //finding individual address
  async findById(id) {
    try {
      return await addUser.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findbyaddid(add_id){
    try {
      return await addUser.findOne({add_id});
    } catch (error) {
      throw error;
    }
  }

  //updating the address
  async update(id, userData) {
    try {
      return await addUser.findByIdAndUpdate(id, userData, { new: true });
     
    } catch (error) {
      throw error;
    }
  }

  //deleting the address
  async delete(id) {
    try {
      return await addUser.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  //lookuping.......
  async performLookup(req, res) {
    try {
      const mongooseConnection = await mongoose.connect('mongodb://0.0.0.0:27017/project', { useNewUrlParser: true, useUnifiedTopology: true });
      const db = mongooseConnection.connection;

      const result = await db.collection('users').aggregate([
        {
          $lookup: {
            from: 'addusers',
            localField: '_id',
            foreignField: 'add_id',
            as: 'User_Add'
          },
        },
      ]).toArray();

      res.json(result);

    } catch (err) {
      console.error('Error:', err);
    } finally {
      mongoose.connection.close(); // Close the Mongoose connection when done.
    }
  }
}

module.exports = new addService();