const User = require("../model/user");

//user sign up meathod

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