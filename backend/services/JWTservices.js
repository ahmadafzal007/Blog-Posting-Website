const jwt = require('jsonwebtoken');

const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../config/config.js")

const RefreshToken = require('../models/token.js')

class JWTservices{
  //sign access token
  static signAccessToken(payload, expiryTime){
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: expiryTime});

  }


  //sign refresh token
  static signRefreshToken(payload, expiryTime){
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn:expiryTime});
  }

  //verify access token
  static verifyAccessToken(token){
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  }

  //verify refresh token
  static verifyRefreshToken(token){
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  }

  //store refresh token
  static async storeRefreshTOken(token, userId){
    try{
      const newToken = new RefreshToken({
        token: token,
        userId: userId
      });

      await newToken.save();


    }catch(err){
      console.log(err);
    }
  }
}


module.exports = JWTservices;