import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema.Types;
const postSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    body:{
        type:String,
    },
    image:{
        type:String,
        default:"no image",
    },
    postedby:{
        type:ObjectId,
        ref:"USER"
    },

});
const posts=mongoose.model("posts",postSchema);
export default posts;