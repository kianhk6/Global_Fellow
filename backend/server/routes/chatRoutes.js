var express = require('express');
var router = express.Router();
const { v4: uuid } = require("uuid");

// get all chat ids based on username(params)
const ChatModel = require("../models/Chatroom");

router.get('/', async function(req, res, next) {
    let allChatsMatchUser1Name = await ChatModel.find( { user1name: req.query.username });
    let allChatsMatchUser2Name = await ChatModel.find( { user2name: req.query.username });
    allChatsMatchUser1Name.map((chat) => chat.chat_id);
    allChatsMatchUser2Name.map((chat) => chat.chat_id);

    let result = allChatsMatchUser1Name.concat(allChatsMatchUser2Name);
    res.status(200).json(result);
});

module.exports = router;