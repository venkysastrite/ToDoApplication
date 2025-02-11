const mongoose = require("mongoose");

const UserListSchema = mongoose.Schema({
    userID :{
        type : String,
        required:true,
    },
    password : {
        type : String,
        required : true,
    },
}); 

const UserListModel = mongoose.model("UserListModel",UserListSchema);
module.exports = UserListModel;
