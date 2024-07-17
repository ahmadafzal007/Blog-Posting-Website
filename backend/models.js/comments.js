const mongoose = require('mongoose');

const {schemas} = mongoose;

const commentSchema = new schema({
  content: {type:String, required:true},
  author: {type:mongoose.SchemaType.ObjectId, ref:"users"},
  blog: {type:mongoose.SchemaType.ObjectId, ref:"blogs"}

},
  {timestamps:true}
);

module.exports = mongoose.model("Comment", commentSchema, "comments");