// import 
import {otpVerify,otpGenerat} from "../controller/controller.js";
import express from "express";

// const 
const route = express.Router();
route.route("/verify").post(otpVerify);
route.route("/generat").post(otpGenerat);
export default route;