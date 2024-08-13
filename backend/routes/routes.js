// routes.js
const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();
const auth = require("../middlewares/auth.js");



// Register route
router.post('/register', authController.register);


// login route
router.post("/login", authController.login);

// logout 
router.post("/logout", auth ,authController.logout);

// refresh
router.post("/refresh", authController.refresh);



// blog routes
// create blog
// update blog
// delete blog
// read all blog
// read blog by id



// comment routes
// create comment
// read comments by blog id


module.exports = router;
