import mongoose from "mongoose";

const  otpSchema= mongoose.Schema({

    otpNumber:{
        type:String,
        required:true,
    },
    Key:{
        type:Number,
        required:true,
    }, 
    createdAt:{
type:Date, default:Date.now,index:{expires:120}
    }

},{timestamps:true,versionKey:false});



export default otpSchema;
