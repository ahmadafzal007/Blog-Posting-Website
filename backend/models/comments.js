const mongoose = require('mongoose');

const {Schema} = mongoose;

const commentSchema = new Schema({
  content: {type:String, required:true},
  author: {type:mongoose.SchemaType.ObjectId, ref:"users"},
  blog: {type:mongoose.SchemaType.ObjectId, ref:"blogs"}

},
  {timestamps:true}
);

module.exports = mongoose.model("Comment", commentSchema, "comments");