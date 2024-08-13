const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
  username: {type:String, required:true},
  name: {type:String, required:true},
  email: {type:String, required:true},
  password: {type:String, required:true}
},
 {timestamps: true}
);

module.exports = mongoose.model('User', userSchema, 'users');