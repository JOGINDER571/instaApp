import mongoose from "mongoose";
import dotENV from "dotenv";

dotENV.config({ 
  path: "./config/config.env" 
});
const URL = process.env.DB_URL;

export const connectDB = async()=>{
    // mongoose.set("strictQuery", false);
    const connection = await mongoose.connect(URL).then(()=>{
        console.log("MongoDb Connected to Server Successfully !");
      }
      ).catch((error)=>{
             console.log("error is coming",error);
      });
}