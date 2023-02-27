var express = require('express');
const swipeRight = require('../models/SwipeRight');
const chat = require('../models/Chatroom');
var router = express.Router();
const { v4: uuid } = require("uuid");
const Chat = require('../models/Chatroom');

router.post('/', async function(req, res){
    let user1matches = (await Chat.find({user1name: req.body.user1name})).length + (await Chat.find({user1name: req.body.user2name})).length;
    
    // does not let user swipe if more than 5 matches already
    if(user1matches > 5){
        res.status(400).json({message: "swipes reached maximum", isMatched: false, isSuccess: false});
    }
    else{
        const userInfo = {user1name: req.body.user1name, user2name:req.body.user2name}
        const SwipeRightToAdd = new swipeRight(userInfo);
        SwipeRightToAdd.save();
    
    
        const userMatched = await swipeRight.find({user1name: req.body.user2name}); 
        
        if(!userMatched.length == 0){
            const str = uuid()
            const chatToAdd = new chat({chat_id: str, user1name: userMatched[0].user1name, user2name: userMatched[0].user2name});
            chatToAdd.save()
            res.status(200).json({message: req.body.user1name + " swiped right on " +  req.body.user2name, isMatched: true, isSuccess: true});
        }
        else{
            res.status(200).json({message: req.body.user1name + " swiped right on " +  req.body.user2name, isMatched: false, isSuccess: true});
        }

    }
});

router.get('/usersThatUserLikes', async function(req, res){
    const user = req.body.username

    const usersThatUserLikes = await swipeRight.find({user1name: user}); 
    
    res.status(200).json({users: usersThatUserLikes, isSuccess: true});
});


module.exports = router;