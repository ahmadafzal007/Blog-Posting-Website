const mongoose = require('mongoose');


const {schema} = mongoose;

const blogSchema = new schema({
  title: {type:String, required:true},
  content: {type:String, requiered:true},
  photo: {type:String, required:true},
  author: {type:mongoose.SchemaType.ObjectId, ref:"users"}
},

 {timestamps: true}
);

module.exports = mongoose.model('Blog', blogSchema, 'blogs');  