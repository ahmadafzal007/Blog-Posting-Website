const dotenv = require('dotenv').config();


const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

module.exports = {
  PORT,
  MONGODB_CONNECTION_STRING, 
  ACCESS_TOKEN_SECRET, 
  REFRESH_TOKEN_SECRET
}
