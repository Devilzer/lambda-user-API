const mongoose = require("mongoose");

//mongodb user model schema
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required :true
    },
    password : {
        type : String,
        required : true
    }
},{
    timestamps :true
});

const User = mongoose.model("Users",userSchema);

module.exports = User;