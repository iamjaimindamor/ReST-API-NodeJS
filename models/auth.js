//including mongoose libs........
const mongoose = require('mongoose');

//creating schema.......

const authSchema = new mongoose.Schema({

    username: { type: String, required: true },
    password: { type: String, require: true, unique: true },
    role: { type: String, required: true },
    auth: {type: String},
    token: { type: String }

});

//creating model.......

const Auth = mongoose.model('Auth', authSchema);

//exporting the model to used by the application......
module.exports = Auth;