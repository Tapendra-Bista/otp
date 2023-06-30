// import 

import express from "express";
import path from "path";
import fs from "fs";
import https from "https";
import dotenv from "dotenv/config";
import { fileURLToPath } from "url";
import route from "./routes/routes.js";
import helmet from "helmet";
// const 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keypath =path.join(__dirname,"./security/key.pem");
const certpath =path.join(__dirname,"./security/cert.pem");
const app = express();
const port = process.env.PORT||3001;
// middleware 
app.use(express.json());
app.use("/otp",route)
app.use(helmet())

// listen
https.createServer({
    key:fs.readFileSync(keypath),
    cert:fs.readFileSync(certpath),
},app).listen(port,()=>{
    console.log("Listening to port at :",port)
});