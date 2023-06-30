import otpModel from "../configuration/configuration.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import cron from "node-cron";
// sechudle eg
// cron.schedule('* * * * * *',()=>{
//     console.log("Every 1 sec")
// })
// verify otp 

const otpVerify =async (req,res)=>{
const {otpNumber,Key} = req.body;
const findOtp =  await otpModel.findOne({Key});
if (findOtp){
if ( await bcrypt.compare(otpNumber,findOtp.otpNumber)){
    return   res.status(200).json({message:"Succefully login with otp"});
}else {
    return   res.status(400).json({message:"Your Otp didnot Match!"});
}
}else {
    return   res.status(498).json({message:"Your Otp is Expired! "});
}

 
  
}

// nodemailer part
const createTransport = nodemailer.createTransport({
  secure:true,
  host:" smtp.gmail.com",
  service:"gmail",
    port:465,
   auth:{
    user:process.env.USER,
    pass:process.env.PASS
   }
    
});

  

// generated otp

const otpGenerat =async (req,res)=>{
    const {Key}= req.body;
if (Key===99){
const otp = otpGenerator.generate(6,{
upperCaseAlphabets:true,
specialChars:false,
digits:true,
lowerCaseAlphabets:true,
});
// mailOption
const mailOption = {
    from: {
        name:"AmazonClone",
        address: process.env.USER,
    },
to:process.env.EMAIL,
subject:"Verify your amazonclone account!",
text:`One Time Password   ${otp}\n\nTo login in account use this otp for creating new password \nExpired Time : 2 min`
}

createTransport.sendMail(mailOption,async(error,info)=>{
    if (error){
        console.log('error occur at ',error);

    } else {
        console.log('Gmail send to user ',info);      
    }
})

const hashcode = await bcrypt.hash(otp,10);
const data = await otpModel.create({
    Key:req.body.Key,
    otpNumber:hashcode,
});
console.log(data);
console.log(otp);
 return   res.status(200).json({message:"otp is generated check your email"});

}
return   res.status(200).json({message:" Woops! otp isn't generated please provide right key"});
}

export  {otpVerify,otpGenerat};
