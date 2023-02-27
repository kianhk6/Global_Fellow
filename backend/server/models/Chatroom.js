const mongoose = require("mongoose");

// create schema
const schema = new mongoose.Schema({
    chatroom_id: { 
        type: String,
        unique: true, 
    },

    email1: {
        type: String,
    },

    email2: {
        type: String
    }
});

const Chat = mongoose.model("Chat", schema);
module.exports = Chat;