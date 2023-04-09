import mongoose from "mongoose";
const {ObjectId}=mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dnijugslc/image/upload/v1681009711/top6_mfpscl.jpg",
    },
    token:{
        type:String,
    },
    followers:[{
        type:ObjectId,
        ref:"USER"
    }],
    following:[{
        type:ObjectId,
        ref:"USER"
    }],
    
});
const user=mongoose.model("USER",userSchema);
export default user;
