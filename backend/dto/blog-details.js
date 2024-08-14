class blogDetailsDto{
  constructor(blog){
    this._id = blog._id;
    this.title = blog.title;
    this.content = blog.content;
    this.photo = blog.photo;
    this.createdAt = blog.createdAt;
    this.authorname = blog.author.name;
    this.authorUsername = blog.author.username;
  }
  
}

module.exports = blogDetailsDto;