class userDTO {
  constructor(user){
    this._id = user._id;
    this.username = user.username;
    this.name = user.name;
  }
}

module.exports = userDTO;