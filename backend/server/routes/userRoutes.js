var express = require('express');
const User = require('../models/User');
const Chat = require('../models/Chatroom');
const swipeLeft = require('../models/SwipeLeft')
const swipeRight = require('../models/SwipeRight')
var router = express.Router();
const { v4: uuid } = require("uuid");

function interestIntersecLen(user1, user2) {
    return user1.interest.filter(interest => user2.interest.includes(interest)).length;
}

router.get('/potentialMatches', async function(req, res){
    const user = req.body.username; 
    const allUsers = await User.find(); 

    // remove user itself
    let removedUser = allUsers.filter((user2) => user2.userName !== user);

    //remove the people who the user already swiped on
    let swipeLefts = await swipeLeft.find({ user1name: user })
    let swipeRights = await swipeRight.find({ user1name: user })
    swipeLefts = swipeLefts.map((swipe) => swipe.user2name)
    swipeRights = swipeRights.map((swipe) => swipe.user2name)
    let removedSwipes = removedUser.filter((user2) => !(swipeLefts.includes(user2.userName) || swipeRights.includes(user2.userName)));
    // let removedSwipeRights =  removedSwipeLefts.filter((user2) => swipeLeft.findOne({user1name: user, user2name: user2.userName}));

    //remove the people who have the same geographical to put them at the least prioritiry
    const usersInfo = await User.findOne({userName: user}); 
    let removeSameGeographical = removedSwipes.filter((user2) => user2.geographic !== usersInfo.geographic);
    let SameGeographical = removedSwipes.filter((user2) => user2.geographic == usersInfo.geographic);

    // people who have swiped right on me    
    let swipeRightsOpposite = await swipeRight.find({ user2name: user })
    swipeRightsOpposite = swipeRightsOpposite.map((swipe) => swipe.user1name)    
    let removedSwipesFromPeopleWhoLikeUser = swipeRightsOpposite.filter((user2) => !(swipeLefts.includes(user2) || swipeRights.includes(user2)));

    // first section of the array 
    let peopleWhoLikedUser = [];

    for(let each of removedSwipesFromPeopleWhoLikeUser){
        let otherUserInfo = await User.findOne({userName: each});
        peopleWhoLikedUser.push(otherUserInfo); 

        // since we are adding people who liked user at the beggining of array we need to remove it from this part as it would be doubled
        removedSwipesFromPeopleWhoLikeUser = removeSameGeographical.filter((user2) => user2.userName != each);

    }

    // sort the user list based on the length interests interaction
    let sortedUserList = removedSwipesFromPeopleWhoLikeUser.sort(
    (user1, user2) => (interestIntersecLen(usersInfo, user2) < interestIntersecLen(usersInfo, user1)) ? -1 : (interestIntersecLen(usersInfo, user2) > interestIntersecLen(usersInfo, user1)) ? 1 : 0);

    let options = peopleWhoLikedUser.concat(sortedUserList);
    options = options.concat(SameGeographical);


    res.status(200).json({users: options , isSuccess: true});
})

router.get('/', async function(req, res){
    const user = req.body.username

    const usersInfo = await User.findOne({userName: user}); 
    if(usersInfo){
        res.status(200).json({usersInfo: usersInfo, isSuccess: true});
    }
    else{
        res.status(404).json({usersInfo: usersInfo, isSuccess: false});
    }
});

router.get('/usersThatMatchedWithUser', async function(req, res){
    const user = req.body.username

    const matches = await Chat.find({user1name: user}); 
    const matches2 = await Chat.find({user2name: user});
    
    let result = matches.concat(matches2);

    res.status(200).json(result);
});



module.exports = router;