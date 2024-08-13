const mongoose = require('mongoose');

const {Schema} = mongoose;


const refreshTokenSchema = Schema({
  token:{type: String, required: true},
  user: {type: mongoose.SchemaTypes.ObjectId, ref:"users"}


},
{timestamp: true}

);


module.exports = mongoose.model("RefreshToken", refreshTokenSchema, "tokens");
