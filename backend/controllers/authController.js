const Joi = require('joi');
const User =  require('../models/users')
const bcrypt = require('bcrypt'); 
const { json } = require('express');
const userDTO = require('../dto/user.js');
const jwtService = require('../services/JWTservices.js');
const RefreshToken = require('../models/token.js');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;





const authController = {

  async register(req, res, next) {
    // 1. validate user input
    const userRegisterSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });
    const { error } = userRegisterSchema.validate(req.body);

    // 2. if error in validation -> return error via middleware
    if (error) {
      return next(error);
    }

    // 3. if email or username is already registered -> return an error
    const { username, name, email, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });

      const usernameInUse = await User.exists({ username });

      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email already registered, use another email!",
        };

        return next(error);
      }

      if (usernameInUse) {
        const error = {
          status: 409,
          message: "Username not available, choose another username!",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    // 4. password hash
    const hashedPassword = await bcrypt.hash(password, 10);

  // 5. Store user data in db 

  let accessToken;
  let refreshToken;
  let user;

  try{
    const userToRegister = new User({
      username,
      name,
      email,
      password: hashedPassword
    })
   
  
   user = await userToRegister.save();

   //Token Generation

   //generating access token

   accessToken = jwtService.signAccessToken({_id: user._id}, "30m")

   //generating refresh token

   refreshToken = jwtService.signRefreshToken({_id:user._id}, "60m")

  }catch (error) {
    return next(error)
  }


  // store refresh token in db
 await jwtService.storeRefreshTOken(refreshToken, user._id);

 
  // sending token in cookies
  res.cookie("accessToken", accessToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  })



  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  })





  // 6. Send Response
  const userDto = new userDTO(user);
  return res.status(201).json({user: userDto, auth: true});


   },









   async login(req,res,next) {

    // validate user input

    // check for errors and return errors

    // match username and password

    // return response


    const userLoginSchema = Joi.object({
      username: Joi.string().min(5).max(30).required(),
      password:  Joi.string().pattern(passwordPattern).required(),

    });

    const {error}  = userLoginSchema.validate(req.body);

    if(error) {
      next(error);
    }


    const {username, password} = req.body;
    let user;

    try{
      user = await User.findOne({username: username});


      if(!user){
        const error = {
          status: 401,
          message: "Invalid Username",
        }
        return next(error);
      }


      // match password

      const match = await bcrypt.compare(password, user.password)

      if(!match){

        const error = {
          status: 401,
          message: "Invalid password!"
        }

        return next(error);
      }
    }catch(err){
       return next(err);
    }
    
    const accessToken = jwtService.signAccessToken({_id:user._id}, "30m");
    const refreshToken = jwtService.signRefreshToken({_id:user._id}, "60m");


    //update the token if needed

    try{
      await RefreshToken.updateOne({
        _id: user._id,
      }, 
    {token: refreshToken},
    {upsert: true}
    )

    }catch(error){
      return next(error);
    }

    

    
    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 24,
      httpOnly: true
    })

    
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true
    })




    const userDto = new userDTO(user);
    
    return res.status(200).json({user:userDto, auth:true});

   },
  



   async logout(req, res, next){
    console.log(req);

    // deleting the refresh token
    const {refreshToken} = req.cookies;

    try{
      await RefreshToken.deleteOne({token: refreshToken});


    }catch(error){
      return next(error)
    }
      

    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    // sending response
    res.status(200).json({user: null, auth:false});

   },

   async refresh (req, res, next){
    // getting the refresh token
    // verify the refresh token
    // generate the new refresh token
    // update db, return response

   }
}

module.exports = authController;