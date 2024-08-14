// routes.js
const express = require("express");
const authController = require("../controllers/authController.js");
const blogController = require("../controllers/blogController.js");
const router = express.Router();
const auth = require("../middlewares/auth.js");



// Register route
router.post('/register', authController.register);


// login route
router.post("/login", authController.login);

// logout 
router.post("/logout", auth ,authController.logout);

// refresh
router.get("/refresh", authController.refresh);



// blog routes

// create blog
router.post("/blog", auth, blogController.create);

// update blog
router.put("/blog", auth, blogController.update);

// delete blog
router.delete("/blog/:id", auth, blogController.delete);

// read all blog
router.get("/blog/all", blogController.getAll);

// read blog by id
router.get("/blog/:id", auth, blogController.getById);



// comment routes
// create comment
// read comments by blog id


module.exports = router;
