// index.js
const express = require("express");
const dbconnect = require("./database/db.js");
const router = require("./routes/routes.js");
const { PORT } = require("./config/config");
const errorHandler = require('./middlewares/errorHandlers.js');
const cookieParser = require("cookie-parser");



const app = express();

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});

app.use(router);

app.use(errorHandler);

dbconnect();

app.use('/storage', express.static('storage'));

app.listen(PORT, () => console.log(`Your Backend is running on PORT: ${PORT}`));
