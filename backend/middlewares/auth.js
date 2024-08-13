const JWTservices = require("../services/JWTservices")
const userDto = require("../dto/user.js");
const User = require("../models/users.js");


const auth = async (req, res, next) => {

  try{
    // validating the refresh and  access tokens
    const {refreshToken, accessToken} = req.cookies;
  
  
    if(!refreshToken || !accessToken){
      const error = {
        status: 401,
        message: "Unauthorized Access"
      }    
  
      return next(error)
  
    }
  
    let _id;
    try{
      _id = JWTservices.verifyAccessToken(accessToken);
  
    }catch(e){
      return next(e);
    
    }
  
    let user;
    try{
  
      user = await User.findOne({_id: _id});
  
  
  
    }catch(e){
      return next(e);
    }
  
  
    const UserDto = new userDto(user);
    
    req.user = UserDto;
  
    next();


  }catch(err){
    return next(err);
  } 
  
  

}


module.exports = auth;