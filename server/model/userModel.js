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
