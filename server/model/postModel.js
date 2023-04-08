import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },

  pic: {
    type: String,
    require: true,
  },
  likes: [
    {
      type: ObjectId,
      ref: "USER",
    },
  ],
  comments:[{
    text:{
      type:String
    },
    postedby:{
      type:ObjectId,
      ref:"USER"
    }
  }],
  postedby: {
    type: ObjectId,
    ref: "USER",
  },
});
const posts = mongoose.model("posts", postSchema);
export default posts;
