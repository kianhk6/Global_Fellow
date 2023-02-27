var express = require('express');
var router = express.Router();
const { v4: uuid } = require("uuid");
const {Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    apiKey: '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'
});

const openai = new OpenAIApi(config);

const MessageModel = require("../models/Message");

// get all messages in chat based on chat_id(params)
router.get('/', function(req, res, next) {
    MessageModel.find( { chat_id: req.query.chat_id},
    function (err, result) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).json(result);
        }
    });
});

// Store the message in the database
router.post('/', async function(req, res, next) {
    const messageToAdd = new MessageModel({
        message_id: uuid(),
        chat_id: req.quary.chat_id,
        sender: req.body.sender,
        message: req.body.message,
        time: req.body.time
      });
      messageToAdd.save();
      res.status(200).json( {message: "success", isSuccess: true} );
});

module.exports = router;