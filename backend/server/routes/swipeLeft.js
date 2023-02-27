var express = require('express');
const swipeLeft = require('../models/SwipeLeft');
var router = express.Router();

router.post('/', async function(req, res){
    let user1 = req.body.user1name;
    let user2 = req.body.user2name;
    const user = {user1name:user1, user2name:user2}

    const swipeLeftToAdd = new swipeLeft(user);
    swipeLeftToAdd.save();

    res.status(200).json({message:user1 + "swiped left on" + user2, isSuccess: true});
});

module.exports = router;