const mongoose = require('mongoose');

const UserToDoListSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    items: [{
        item: String,
        completed: {
            type: Boolean,
            default: false
        },
    }]
});

const UserToDoListModel = mongoose.model("UserToDoListModel",UserToDoListSchema);
module.exports = UserToDoListModel;