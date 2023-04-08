import mongoose from "mongoose";
import user from "../model/userModel.js";
import jwt from "jsonwebtoken";

const reqLogin = (req,res,next)=>{
 const {authorization}=req.headers;
//  console.log("autho",authorization);
 if(!authorization){
    return res.status(401).json({error:"you must be logged in"});
 }
 const token=authorization.replace("Bearer ","");
 const JWT_KEY=process.env.JWT_KEY;
 jwt.verify(token,JWT_KEY,(error,payload)=>{
    if(error){
        return res.status(401).json({error:"you must be logged in"});
    }
    const {id}=payload;
    // console.log("requser",payload);
    
    user.findById(id).then((userData)=>{
        // console.log("userdata",userData);
        req.user=userData;
        next();
    })
 })
}
export default reqLogin;