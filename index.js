const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const app = express();
const db = require("./src/config/mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/",(req,res)=>{
    const endpoints = {
        registerUser : "POST/create",
        loginUser : "POST/login",
        updateUser : "POST/update(protected)",
        getUser : "GET/get(protected)",
        getAllUser : "GET/getall(protected)"
    };
    return res.status(200).json({
        apiEndPoints : endpoints
    });
});

//using routes
app.use("/user",require("./src/routes"));

//  ONLY REQUIRED FOR UNIT TESTING(creating a local server).
// app.listen(3000,(err)=>{
//     if(err){
//         console.log("Error in starting server ",err);
//     }
//     console.log("Server is up and running at 3000");
// });


module.exports = app;