const Blog = require("../models/blogs.js");
const Joi = require("joi");
const fs = require("fs");
const {BACKEND_SERVER_PATH} = require("../config/config.js");
const blogDTO = require("../dto/blog.js");
const blogDetailsDto = require("../dto/blog-details.js");

// title: {type:String, required:true},
// content: {type:String, requiered:true},
// photo: {type:String, required:true},
// author: {type:mongoose.SchemaType.ObjectId, ref:"users"}



const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const blogController = {


  async create(req, res, next) {

    // validatte req body

    const blogCreationSchema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      author: Joi.string().regex(mongodbIdPattern).required(),
      photo: Joi.string().required()
    })

    const { error } = blogCreationSchema.validate(req.body);

    // 2. if error in validation -> return error via middleware
    if (error) {
      return next(error);
    }

    
    const {title, content, author, photo} = req.body;

  
    //handle images

    // read a buffer
    const buffer = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base./,''), 'base64');

    //alot a random name
    const imagePath = `${Date.now()}-${author}.png`


    //save locally

    try{

      fs.writeFileSync(`storage/${imagePath}`, buffer);


    }catch(e){
      return next(e);

    }
    

    //store data into db
    
    let newBlog;
    try{
      newBlog = new Blog({
        title,
        author,
        content,
        photo: `${BACKEND_SERVER_PATH}/storage/${imagePath}`

      })

      await newBlog.save();

    }catch(err){
      return next(err);
    }

    //return response
     
    const blogDto = new blogDTO(newBlog)
    return res.status(201).json({blog: blogDto});

  },





  async getAll(req, res, next){

    let blogDto;
    try{
      const blogs = await Blog.find({});
      blogDto = [];


      for(let i=0; i<blogs.length; i++){
        const dto = new blogDTO(blogs[i]);
        blogDto.push(dto);
      }

      return res.status(200).json({blog: blogDto});

    }catch(err){
      return next(err);
    }

  },


  async getById(req, res, next){

    //validate ID

    const getByIdSchema = Joi.object({
      id: Joi.string().required(),
    })

    const {error} = getByIdSchema.validate(req.params);

    if(error){
      return next(error);
    }


    let blog;
    const {id} = req.params;
    try{

      blog = await Blog.findOne({_id: id}).populate('author');
      if (!blog) {
        const error = {
          status:401,
          message: "Blog not found",
        }
        return next(error);
      }


    }catch(err){
      return next(err);
    }


    //response 
    
    const Blogdto = new blogDetailsDto(blog);
    return res.status(200).json({blog: Blogdto});


  },


  async update(req, res, next){

  },


  async delete(req, res, next){

  }



}


module.exports = blogController;