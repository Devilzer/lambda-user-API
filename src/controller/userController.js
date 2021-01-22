const User = require("../model/user");
const jwt = require("jsonwebtoken");
require('dotenv').config();
//user sign up method

module.exports.register = async(req,res)=>{
    try {

        //checking for duplicate user using phone no.
        const duplicateUser = await User.findOne({phone:req.body.phone});
        if(duplicateUser){
            return res.status(400).json({
                message : "phone no already registered."
            });
        }
        else{
            const user = new User;
            user.name = req.body.name;
            user.phone = req.body.phone;
            user.password = req.body.password;
            await user.save();
            return res.status(200).json({
                message : "User registered successfully."
            });
        }
    } catch (error) {
        return res.status(400).json({
            message : `Error in creating user ${error}`
        });
    }
};


//user sign in method

module.exports.login = async(req,res)=>{
    try {
        const user = await User.findOne({phone:req.body.phone,password:req.body.password});
        if(user){
            const payload = {
                name : user.name,
                phone : user.phone,
                password :user.password
            };
            const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECERT,{
                expiresIn : "1d"
            });

            return res.status(200).json({
                message : "Login success here is your token.",
                AccessToken : accessToken
            });
        }else{
            return res.status(401).json({
                message : "Invalild username or password!"
            });
        }
    } catch (error) {
        return res.status(400).json({
            message : `Error in login ${error}`
        });
    }
};


// user update meathod
module.exports.update = async(req,res)=>{
    try {
        const authHeader = req.headers["authorization"];
        //spliting string to seperate it from bearer
        const token = authHeader && authHeader.split(" ")[1];
        if(token==null){
            return res.status(401).json({
                message: "Invalid request",
              });
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,async(err,user)=>{
            if(err){
                return res.status(401).json({
                    message: "Invalid request",
                  });
            }
            var updatedUser = await User.findOne({phone:user.phone});
            updatedUser.name = req.body.name;
            updatedUser.phone =req.body.phone;
            updatedUser.password = req.body.password;
            await updatedUser.save();
            return res.status(200).json({
                message : "User info updated"
            });
        });
        
    } catch (error) {
        return res.status(400).json({
            message : `error in updating user ${error}`
        });
    }
}