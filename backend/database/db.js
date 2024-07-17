const mongoose = require('mongoose');

const {MONGODB_CONNECTION_STRING} = require("../config/config.js")



const connectionString = MONGODB_CONNECTION_STRING;



const dbconnect = async()=>{
  try{
 
    const conn = await mongoose.connect(connectionString);
    console.log(`Database connected to host: ${conn.connection.host}`);

  }catch(error){
    console.log(`Error connecting to database: ${error.message}`);

  }
}


module.exports =  dbconnect;