const express = require("express")
const dbconnect = require("./database/db.js");

const {PORT} =  require("./config/config");

const app = express();

dbconnect();

app.get('/', (req, res)=>{
  res.json({msg: "Hello World"});
})


app.listen(PORT, console.log(`Your Backend is running on PORT: ${PORT}`));
