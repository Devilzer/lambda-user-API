const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

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

module.exports = app;