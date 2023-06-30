import mongoose from "mongoose";
import otpSchema from "../schema/schema.js";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.DB).then(()=>{
    console.log("Mongodb Connected!");
    
}).catch((err)=>{
    console.log("error occur in connection \n",err);  
});

// model
const otpModel = mongoose.model("otp",otpSchema);

export default otpModel;

