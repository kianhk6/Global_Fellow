const mongoose = require("mongoose");

// create schema
const schema = new mongoose.Schema({
    message_id: {
        type: String,
    },

    chatroom_id: {
        type: String,
    },

    message: {
        type: String,
    },

    sender: {
        type: String,
    },

    time: {
        type: String,
    }
});

const Message = mongoose.model("Message", schema);
module.exports = Message;